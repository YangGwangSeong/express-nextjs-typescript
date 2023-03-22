import Sidebar from '@/components/ui/layout/Sidebar';
import { Sub } from '@/shared/interfaces/sub.interfeace';
import axios from 'axios';
import { useAuthStateDispatch } from 'context/auth';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

const SubPage: NextPage = () => {
	const [ownSub, setOwnSub] = useState(false);
	const { state } = useAuthStateDispatch();
	const { authenticated, user } = state;

	axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
	axios.defaults.withCredentials = true;

	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const subName = router.query.sub;
	const { data: sub, error } = useSWR(subName ? `/api/subs/${subName}` : null);
	console.log(sub);
	const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files === null) return;

		const file = e.target.files[0];

		const formData = new FormData();
		formData.append('file', file);
		formData.append('type', fileInputRef.current!.name);

		try {
			await axios.post(`/api/subs/${sub?.name}/upload`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const openFileInput = (type: string) => {
		const fileInput = fileInputRef.current;
		if (fileInput) {
			fileInput.name = type;
			fileInput.click();
		}
	};

	useEffect(() => {
		if (!sub) return;
		setOwnSub(authenticated && user?.username === sub.username);
	}, [sub]);

	return (
		<>
			{sub && (
				<>
					<div>
						<input
							type="file"
							hidden={true}
							ref={fileInputRef}
							onChange={uploadImage}
						/>
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
									onClick={() => openFileInput('banner')}
								></div>
							) : (
								<div
									className="h-20 bg-gray-400"
									onClick={() => openFileInput('banner')}
								></div>
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
											onClick={() => openFileInput('image')}
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
					<div className="flex mx-w-5xl px-4 pt-5 mx-auto">
						<div className="w-full md:mr-3 md:w-8/12 "></div>
						<Sidebar sub={sub}></Sidebar>
					</div>
				</>
			)}
		</>
	);
};

export default SubPage;
