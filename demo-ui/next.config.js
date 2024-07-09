/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DOMAIN: 'http://localhost:8080',
    },
    images: {
        domains: ['localhost'],
    },
};

module.exports = nextConfig;
