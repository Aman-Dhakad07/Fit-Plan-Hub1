/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['res.cloudinary.com', 'via.placeholder.com'],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;



// next.config.js
// javascript
// /**@type {import('next').NextConfig}   */
// const nextConfig = {
//    reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ['res.cloudinary.com', 'via.placeholder.com'],
//   },
//   env: {
//     API_URL: process.env.NEXT_PUBLIC_API_URL,
//   },
// }

// module.exports = nextConfig
