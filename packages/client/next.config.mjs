/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sites",
        destination: "/sites/all",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
