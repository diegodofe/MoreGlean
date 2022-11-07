/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'picsum.photos',
      'media.giphy.com',
      'firebasestorage.googleapis.com',
    ],
  },
}

module.exports = nextConfig
