import { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = () => {
	return (
		<div className="flex max-w-5xl px-4 pt-5 mx-auto">
			<div className="w-full md:mr-3 md:w-8/12"></div>
			<div className="hidden w-4/12 ml-3 md:block">
				<div className="bg-white border rounded">
					<div className="p-4 border-b">
						<p className="text-lg font-semibold text-center">상위 커뮤니티</p>
					</div>
					<div></div>
					<div className="w-full py-6 text-center">
						<Link
							href={'/subs/create'}
							className="w-full p-2 text-center text-white bg-gray-400 rounded"
						>
							커뮤니티 만들기
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
