/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['pg', '@electric-sql/pglite'],
  },
  async rewrites() {
    return [
      {
        source: '/family',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
