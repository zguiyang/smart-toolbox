/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sites",
        destination: "/sites/inbox",
        permanent: true,
      },
      {
        source: "/articles",
        destination: "/articles/inbox",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.vvhan.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
