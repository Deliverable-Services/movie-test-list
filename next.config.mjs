/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/public/uploads/:path*", // Optional, if you need custom rewrites
      },
    ];
  },
};

export default nextConfig;
