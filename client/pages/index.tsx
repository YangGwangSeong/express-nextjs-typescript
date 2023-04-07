import PostCard from '@/components/ui/post-card/PostCard';
import { Post } from '@/shared/interfaces/post.interface';
import { Sub } from '@/shared/interfaces/sub.interfeace';
import axios from 'axios';
import { useAuthStateDispatch } from 'context/auth';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const HomePage: NextPage = () => {
	const { state } = useAuthStateDispatch();
	const { authenticated } = state;

	const address = '/api/subs/sub/topSubs';

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

	const [observedPost, setObservedPost] = useState('');

	useEffect(() => {
		//포스트가 없다면 return
		if (!posts || posts.length === 0) return;
		//posts 배열안에 마지막 post에 id를 가져옵니다.
		const id = posts[posts.length - 1].identifier;
		//posts 배열에 post가 추가되서 마지막 post가 바뀌었다면
		// 바뀐 post중 마지막post를 observedPost로
		if (id !== observedPost) {
			setObservedPost(id);
			observeElement(document.getElementById(id));
		}
		return () => {};
	}, [posts]);

	const observeElement = (element: HTMLElement | null) => {
		if (!element) return;
		// 브라우저 viewport와 설정한 요소(Element)와 교차점을 관찰
		const observer = new IntersectionObserver(
			// entries는 IntersectionObserverEntry 인스턴스의 배열
			entries => {
				console.log('entries', entries);
				// isIntersecting: 관찰 대상의 교차 상태(Boolean)
				if (entries[0].isIntersecting === true) {
					console.log('마지막 포스트에 왔습니다');
					setPage(page + 1);
					observer.unobserve(element); //이전에 observe 하고 있던걸 없애준다.
				}
			},
			{ threshold: 1 },
		);
		// 대상 요소의 관찰을 시작
		observer.observe(element);
	};

	return (
		<div className="flex max-w-5xl px-4 pt-5 mx-auto">
			{/* 포스트 리스트 */}
			<div className="w-full md:mr-3 md:w-8/12">
				{isInitialLoading && (
					<p className="text-lg text-center">로딩중입니다...</p>
				)}
				{posts?.map(post => (
					<PostCard
						key={post.identifier}
						post={post}
						mutate={mutate}
					></PostCard>
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
