import InputGroup from '@/components/ui/field/InputGroup';
import axios from 'axios';
import { useAuthStateDispatch } from 'context/auth';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

const RegisterPage: NextPage = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErros] = useState<any>({});
	const { state } = useAuthStateDispatch();

	const router = useRouter();
	if (state.authenticated) router.push('/');

	axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.post('/api/auth/register', {
				email: email,
				password: password,
				username: username,
			});

			router.push('/login');
		} catch (error: any) {
			console.log('error', error);
			setErros(error.response.data || {});
		}
	};

	return (
		<div className="bg-white">
			<div className="flex flex-col items-center justify-center h-screen p-6">
				<div className="w-10/12 mx-auto md:w-96">
					<h1 className="mb-2 text-lg font-medium">회원가입</h1>
					<form onSubmit={handleSubmit}>
						<InputGroup
							placeholder="Email"
							value={email}
							setValue={setEmail}
							error={errors.email}
						/>
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
							회원가입
						</button>
					</form>
					<small>
						이미 가입하셨나요?
						<Link href="/login" className="ml-1 text-blue-500 uppercase">
							로그인
						</Link>
					</small>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
