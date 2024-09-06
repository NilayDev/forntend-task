/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

export default config;
