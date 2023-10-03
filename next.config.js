/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [process.env.NEXT_PUBLIC_IMAGE],
  },
}

module.exports = nextConfig
