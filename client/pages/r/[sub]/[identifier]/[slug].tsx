import { Post } from '@/shared/interfaces/post.interface';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const PostPage: NextPage = () => {
	const router = useRouter();
	const { identifier, sub, slug } = router.query;

	const { data: post, error } = useSWR<Post>(
		identifier && slug ? `/api/posts/${identifier}/${slug}` : null,
	);

	return <div>PostPage</div>;
};

export default PostPage;
