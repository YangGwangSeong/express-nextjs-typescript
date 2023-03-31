import { Post } from '@/shared/interfaces/post.interface';
import axios from 'axios';
import { useAuthStateDispatch } from 'context/auth';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { FaArrowDown, FaArrowUp, FaCommentAlt } from 'react-icons/fa';

const PostCard: FC<{ post: Post; subMutate?: () => void }> = ({
	post,
	subMutate,
}) => {
	const { state } = useAuthStateDispatch();
	const { authenticated, user } = state;
	const router = useRouter();
	const isInSubPage = router.pathname === '/r/[sub]';

	const vote = async (value: number) => {
		if (!authenticated) router.push('/login');

		if (value === post.userVote) value = 0;

		try {
			await axios.post('/api/votes', {
				identifier: post.identifier,
				slug: post.slug,
				value: value,
			});
			if (subMutate) subMutate();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex mb-4 bg-white rounded" id={post.identifier}>
			<div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
				<div
					className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
					onClick={() => vote(1)}
				>
					{post.userVote === 1 ? (
						<FaArrowUp className="mx-auto text-red-500" />
					) : (
						<FaArrowUp />
					)}
				</div>
				<p className="text-xs font-bold">{post.voteScore}</p>
				<div
					className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
					onClick={() => vote(-1)}
				>
					{post.userVote === -1 ? (
						<FaArrowDown className="mx-auto text-blue-500" />
					) : (
						<FaArrowDown />
					)}
				</div>
			</div>
			{/* 포스트 데이터부분 */}
			<div className="w-full p-2">
				{!isInSubPage && (
					<div className="flex items-center">
						<Link href={`/r/${post.subName}`}>
							{post.sub && (
								<Image
									className="rounded-full cursor-pointer"
									src={post.sub?.imageUrl}
									alt={'sub'}
									width={12}
									height={12}
								></Image>
							)}
						</Link>
						<Link
							className="ml-2 text-xs font-bold cursor-pointer hover:underline"
							href={`/r/${post.subName}`}
						>
							/r/{post.subName}
						</Link>
						<span className="mx-1 text-xs text-gray-400">•</span>
					</div>
				)}

				<p className="text-xs text-gray-400">
					Posted by
					<Link className="mx-1 hover:underline" href={`/u/${post.username}`}>
						/u/{post.username}
					</Link>
					<Link className="mx-1 hover:underline" href={post.url}>
						{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
					</Link>
				</p>
				{/* </div> */}
				<Link className="my-1 text-lg font-medium" href={post.url}>
					{post.title}
				</Link>
				{post.body && <p className="my-1 text-sm">{post.body}</p>}
				<div className="my-1">
					<Link className="flex" href={post.url}>
						<div className="flex flex-col justify-center">
							<FaCommentAlt className="mr-1 text-xs"></FaCommentAlt>
						</div>
						<span>{post.commentCount}</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
