const withPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
		dest: "public",
		register: true,
        disable: process.env.NODE_ENV === 'development',
		skipWaiting: true,
	},
}

module.exports = withPWA(nextConfig)