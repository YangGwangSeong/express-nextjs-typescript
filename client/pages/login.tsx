import InputGroup from '@/components/ui/field/InputGroup';
import axios from 'axios';
import { AuthAction, useAuthStateDispatch } from 'context/auth';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

const LoginPage: NextPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErros] = useState<any>({});

	const router = useRouter();
	axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

	const { dispatch, state } = useAuthStateDispatch();

	if (state.authenticated) router.push('/');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				'/api/auth/login',
				{ password, username },
				{ withCredentials: true },
			);

			dispatch({ type: 'LOGIN', payload: res.data?.user });
			router.push('/');
		} catch (error: any) {
			console.log(error);
			setErros(error.response.data || {});
		}
	};

	return (
		<div className="bg-white">
			<div className="flex flex-col items-center justify-center h-screen p-6">
				<div className="w-10/12 mx-auto md:w-96">
					<h1 className="mb-2 text-lg font-medium">로그인</h1>
					<form onSubmit={handleSubmit}>
						<InputGroup
							placeholder="Username"
							value={username}
							setValue={setUsername}
							error={errors.username}
						/>
						<InputGroup
							placeholder="Password"
							value={password}
							setValue={setPassword}
							error={errors.password}
						/>
						<button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
							로그인
						</button>
					</form>
					<small>
						아직 아이디가 없나요?
						<Link href="/register" className="ml-1 text-blue-500 uppercase">
							회원가입
						</Link>
					</small>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
