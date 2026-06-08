/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
