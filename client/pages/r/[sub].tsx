import axios from 'axios';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
const SubPage: NextPage = () => {
	axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
	axios.defaults.withCredentials = true;

	const fetcher = async (url: string) => {
		try {
			const res = await axios.get(url);
			return res.data;
		} catch (error: any) {
			throw error.response.data;
		}
	};

	const router = useRouter();
	const subName = router.query.sub;
	const { data: sub, error } = useSWR(
		subName ? `/api/subs/${subName}` : null,
		fetcher,
	);
	console.log(sub);
	return (
		<>
			{sub && (
				<>
					<div>
						<div className="bg-gray-400">
							{sub.bannerUrl ? (
								<div
									className="h-56"
									style={{
										backgroundImage: `url(${sub.bannerUrl})`,
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}
								></div>
							) : (
								<div className="h-20 bg-gray-400"></div>
							)}
						</div>
						<div className="h-20 bg-white">
							<div className="relative flex mx-w-5xl px-5 mx-auto">
								<div className="absolute" style={{ top: -15 }}>
									{sub.imageUrl && (
										<Image
											src={sub.imageUrl}
											alt="커뮤니티 이미지"
											width={70}
											height={70}
											className="rounded-full"
										></Image>
									)}
								</div>
								<div className="pt-1 pl-24">
									<div className="flex items-center">
										<h1 className="text-3xl font-bold">{sub.title}</h1>
									</div>
									<p className="text-small font-bold text-gray-400">
										/r/{sub.name}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex mx-w-5xl px-4 pt-5 mx-auto"></div>
				</>
			)}
		</>
	);
};

export default SubPage;
