import type { NextConfig } from "next";

/** GitHub Pages serves this repo at /ember — only set during CI deploy. */
const basePath = process.env.GITHUB_PAGES === "true" ? "/ember" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
