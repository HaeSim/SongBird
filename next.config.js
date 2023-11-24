/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
  swSrc: 'public/service-worker.js',
});

module.exports = withBundleAnalyzer(
  withPWA({
    eslint: {
      dirs: ['.'],
    },
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    output: 'standalone',
    env: {
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    },
    swcMinify: true,
  })
);
