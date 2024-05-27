/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nextjs-blog-gt.s3.amazonaws.com',
                pathname: '/defaults/*',
                port: ''
            }
        ]
    }
};

export default nextConfig;
