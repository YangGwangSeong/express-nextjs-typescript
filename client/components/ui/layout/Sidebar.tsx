import { Sub } from '@/shared/interfaces/sub.interfeace';
import { useAuthStateDispatch } from 'context/auth';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { FC } from 'react';

const Sidebar: FC<{ sub: Sub }> = ({ sub }) => {
	const { state } = useAuthStateDispatch();
	const { authenticated } = state;

	return (
		<div className="hidden w-4/12 ml-3 md:block">
			<div className="bg-white border rounded">
				<div className="p-3 bg-gray-400 rounded-t">
					<p className="font-semibold text-white">커뮤니티에 대해서</p>
				</div>
				<div className="p-3">
					<p className="mb-3 text-base">{sub?.description}</p>
					<div className="flex mb-3 text-sm font-medium">
						<div className="w-1/2">
							<p>100</p>
							<p>멤버</p>
						</div>
					</div>
					<p className="my-3">{dayjs(sub?.createdAt).format('MM.DD.YYYY')}</p>
					{authenticated && (
						<div className="mx-0 my-2">
							<Link
								href={`/r/${sub.name}/create`}
								className="w-full p-2 text-sm text-white bg-gray-400 rounded"
							>
								포스트 생성
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
