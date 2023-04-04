import PostCard from '@/components/ui/post-card/PostCard';
import { Comment } from '@/shared/interfaces/comment.interface';
import { Post } from '@/shared/interfaces/post.interface';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import useSWR from 'swr';

const UserPage: NextPage = () => {
	const router = useRouter();
	const username = router.query.username;

	const { data, error } = useSWR(username ? `/api/users/${username}` : null);
	console.log(data);
	if (!data) return null;
	return (
		<div className="flex max-w-5xl px-4 pt-5 mx-auto">
			{/* 유저 포스트 댓글 리스트 */}
			<div className="w-full md:mr-3 md:w-8/12">
				{data.user.map((data: any) => {
					if (data.type === 'Post') {
						const post: Post = data;
						return <PostCard key={post.identifier} post={post}></PostCard>;
					} else {
						const comment: Comment = data;
						return (
							<div
								key={comment.identifier}
								className="flex my-4 bg-white rounded"
							>
								<div className="flex-shrink-0 w-10 py-10 text-center bg-gray-200 rounded-l">
									<FaCommentAlt className="text-xs text-gray-500"></FaCommentAlt>
								</div>
								<div className="w-full p-2">
									<p className="mb-2 text-xs text-gray-500">
										<Link
											href={`/u/${comment.username}`}
											className="cursor-pointer hover:underline"
										>
											{comment.username}
										</Link>
										<span>commented on</span>
										<Link
											href={`${comment.post?.url}`}
											className="cursor-pointer font-semibold hover:underline"
										>
											{comment.post?.title}
										</Link>
										<span>*</span>
										<Link
											href={`/r/${comment.post?.subName}`}
											className="cursor-pointer text-black hover:underline"
										>
											/r/{comment.post?.subName}
										</Link>
									</p>
									<hr />
									<p className="p-1">{comment.body}</p>
								</div>
							</div>
						);
					}
				})}
			</div>
			{/* 유저정보 */}
			<div className="hidden w-4/12 ml-3 md:block">
				<div className="flex items-center p-3 bg-gray-400 rounded-t">
					<Image
						src={'https://www.gravatar.com/avatar/0000?d=mp&f=y'}
						alt={'user profile'}
						className="mx-auto border border-white rounded-full"
						width={40}
						height={40}
					></Image>
					<p className="pl-2 text-md">{data.user.username}</p>
				</div>
				<div>
					<p>{dayjs(data.user.createdAt).format('YYYY.MM.DD')} 가입</p>
				</div>
			</div>
		</div>
	);
};

export default UserPage;
