import type { NextConfig } from "next";

const repositoryName = "bouwvizier-4d-demo";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? `/${repositoryName}` : "",
  assetPrefix: isProduction ? `/${repositoryName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
