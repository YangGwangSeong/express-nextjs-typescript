import axios from 'axios';
import { NextPage } from 'next';
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

	return <div>subs</div>;
};

export default SubPage;
