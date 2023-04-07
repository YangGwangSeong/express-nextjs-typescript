/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['www.gravatar.com', 'localhost', process.env.PRODUCTIONIMAGE],
	},
};

module.exports = nextConfig;
