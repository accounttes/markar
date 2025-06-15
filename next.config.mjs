/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ru-msk-dr3-1.store.cloud.mts.ru',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/cars',
        destination: 'https://testing-api.ru-rating.ru/cars',
      },
    ];
  },
};

export default nextConfig; 