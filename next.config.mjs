/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["www.shinyhunters.com"], // 외부 호스트 추가
  },
};

export default nextConfig;
