/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbopackFileSystemCacheForDev: true,
    },
    cacheComponents: true,
};

export default nextConfig;
