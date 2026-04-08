import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sondaggio",
        destination: "https://forms.gle/1g7xzPWj1RLgB5R68",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
