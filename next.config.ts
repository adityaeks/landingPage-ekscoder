import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/?$/, "") ||
      "https://portal.ekscoder.com";

    return [
      {
        source: "/modul/:slug",
        destination: `${backendUrl}/modul/:slug`,
      },
      {
        source: "/modul/:slug/pdf",
        destination: `${backendUrl}/modul/:slug/pdf`,
      },
      {
        source: "/modul/:slug/ask-ai",
        destination: `${backendUrl}/modul/:slug/ask-ai`,
      },
    ];
  },
};

export default nextConfig;
