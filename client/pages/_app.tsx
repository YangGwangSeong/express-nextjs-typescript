import NavBar from '@/components/ui/layout/NavBar';
import '@/styles/globals.css';
import axios from 'axios';
import { AuthProvider } from 'context/auth';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const authRoutes = ['/register', '/login'];
	const authRoute = authRoutes.includes(pathname);

	const fetcher = async (url: string) => {
		try {
			const res = await axios.get(url);
			return res.data;
		} catch (error: any) {
			throw error.response.data;
		}
	};

	return (
		<SWRConfig value={{ fetcher }}>
			<AuthProvider>
				{!authRoute && <NavBar></NavBar>}
				<div className={authRoute ? '' : 'pt-16'}>
					<Component {...pageProps} />
				</div>
			</AuthProvider>
		</SWRConfig>
	);
}
