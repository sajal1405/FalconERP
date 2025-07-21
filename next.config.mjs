/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add experimental.appDir if you plan to use the app router later
  // experimental: {
  //   appDir: true,
  // },
  // This is where you would configure subdomain routing for production on Vercel
  // For local development, Next.js serves all pages from 'localhost:3000' by default
  // Vercel handles the actual domain routing based on vercel.json
  rewrites: async () => {
    return {
      beforeFiles: [
        // Admin subdomain
        {
          source: '/:path*',
          destination: '/domains/admin/pages/:path*',
          has: [{ type: 'host', value: 'admin.falconerp.com' }],
        },
        // Client subdomain
        {
          source: '/:path*',
          destination: '/domains/client/pages/:path*',
          has: [{ type: 'host', value: 'client.falconerp.com' }],
        },
        // Links subdomain
        {
          source: '/:path*',
          destination: '/domains/links/pages/:path*',
          has: [{ type: 'host', value: 'links.falconerp.com' }],
        },
        // Fedrix subdomain
        {
          source: '/:path*',
          destination: '/domains/fedrix/pages/:path*',
          has: [{ type: 'host', value: 'fedrix.falconerp.com' }],
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
