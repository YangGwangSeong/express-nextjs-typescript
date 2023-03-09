import NavBar from '@/components/ui/layout/NavBar';
import '@/styles/globals.css';
import { AuthProvider } from 'context/auth';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const authRoutes = ['/register', '/login'];
	const authRoute = authRoutes.includes(pathname);

	return (
		<AuthProvider>
			{!authRoute && <NavBar></NavBar>}
			<div className={authRoute ? '' : 'pt-12'}>
				<Component {...pageProps} />
			</div>
		</AuthProvider>
	);
}
