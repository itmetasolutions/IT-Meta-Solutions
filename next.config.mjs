/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./styles"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async rewrites() {
    // Local dev only: `next dev` has no serverless runtime, so proxy /api to
    // the Express dev server (npm run dev:server, port 3001) — same pattern
    // the old Vite dev server used. In production, Vercel routes /api/* to
    // api/index.js directly; this rewrite is inert there.
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
