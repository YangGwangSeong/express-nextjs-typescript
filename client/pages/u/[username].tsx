import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const UserPage: NextPage = () => {
	const router = useRouter();
	const username = router.query.username;

	const { data, error } = useSWR(username ? `/api/user/${username}` : null);
	return <div>UserPage</div>;
};

export default UserPage;
