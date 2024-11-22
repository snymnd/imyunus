import type { NextConfig } from 'next';
import nextRemoteRefresh from 'next-remote-refresh';
import path from 'path';

const withRemoteRefresh = nextRemoteRefresh({
  paths: [path.resolve(__dirname, 'src', 'contents')],
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

export default withRemoteRefresh(nextConfig);
