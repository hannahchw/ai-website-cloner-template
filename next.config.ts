import type { NextConfig } from "next";

// STATIC_EXPORT=1 npm run build -> plain HTML/CSS/JS in out/, for hosting as a static page.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      images: { unoptimized: true },
    }
  : {
      output: "standalone",
    };

export default nextConfig;
