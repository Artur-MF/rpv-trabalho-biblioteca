import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async redirects() {
    return [
      {
        source: '/', // Quando acessar a raiz vazia
        destination: '/home', // Joga para a home
        permanent: true,
      },
    ]
  },
  

  reactStrictMode: true,
};

export default nextConfig;
