/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    transpilePackages: [
        '@electric-sql/pglite-react', // Optional
        '@electric-sql/pglite',
    ],
}

export default nextConfig;
