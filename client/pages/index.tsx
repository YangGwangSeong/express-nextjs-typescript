import PostCard from '@/components/ui/post-card/PostCard';
import { Post } from '@/shared/interfaces/post.interface';
import { Sub } from '@/shared/interfaces/sub.interfeace';
import axios from 'axios';
import { useAuthStateDispatch } from 'context/auth';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const HomePage: NextPage = () => {
	const { state } = useAuthStateDispatch();
	const { authenticated } = state;

	const address = 'http://localhost:4000/api/subs/sub/topSubs';

	const getKey = (pageIndex: number, previousPageData: Post[]) => {
		if (previousPageData && !previousPageData.length) return null;
		return `/api/posts?page=${pageIndex}`;
	};

	const {
		data,
		error,
		size: page,
		setSize: setPage,
		isValidating,
		mutate,
	} = useSWRInfinite<Post[]>(getKey);
	const isInitialLoading = !data && !error;
	const posts: Post[] = data ? ([] as Post[]).concat(...data) : [];

	const { data: topSubs } = useSWR<Sub[]>(address);

	return (
		<div className="flex max-w-5xl px-4 pt-5 mx-auto">
			{/* 포스트 리스트 */}
			<div className="w-full md:mr-3 md:w-8/12">
				{isInitialLoading && (
					<p className="text-lg text-center">로딩중입니다...</p>
				)}
				{posts?.map(post => (
					<PostCard key={post.identifier} post={post}></PostCard>
				))}
				{isValidating && posts.length > 0 && (
					<p className="text-lg text-center">Loading More...</p>
				)}
			</div>
			<div className="hidden w-4/12 ml-3 md:block">
				<div className="bg-white border rounded">
					<div className="p-4 border-b">
						<p className="text-lg font-semibold text-center">상위 커뮤니티</p>
					</div>
					<div>
						{topSubs?.map(sub => (
							<div
								key={sub.name}
								className="flex items-center px-4 py-2 text-xs border-b"
							>
								<Link href={`/r/${sub.name}`}>
									<Image
										src={sub.imageUrl}
										className="rounded-full cursor-pointer"
										alt={'Sub'}
										width={24}
										height={24}
										style={{ width: 24, height: 24 }}
									></Image>
								</Link>
								<Link
									href={`/r/${sub.name}`}
									className="ml-2 font-bold hover:cursor-pointer"
								>
									/r/{sub.name}
								</Link>
								<p className="ml-auto font-medium">{sub.postCount}</p>
							</div>
						))}
					</div>
					{authenticated && (
						<div className="w-full py-6 text-center">
							<Link
								href={'/subs/create'}
								className="w-full p-2 text-center text-white bg-gray-400 rounded"
							>
								커뮤니티 만들기
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
