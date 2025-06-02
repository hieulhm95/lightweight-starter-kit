import nextBundleAnalyzer from '@next/bundle-analyzer';
import withCladUI from './withCladUI.mjs';
import rewrites from './nextRewrites.mjs';

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isDev = process.env.NODE_ENV === 'development';
const assetPrefix = !isDev ? process.env.NEXT_PUBLIC_ASSET_PREFIX : undefined;
console.info(`chotot - assetPrefix '${assetPrefix}'`);

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  assetPrefix,
  rewrites,
  /* only applied to swc
  compiler: {
    removeConsole: true,
  }, */
};

const nextConfig = withBundleAnalyzer(withCladUI(config));

// TODO: dns for api gateway warm up, use me if needed, else, remove below
// const dns = require('dns');
// dns.lookup('gateway.chotot.com', (err, address, family) => {
//   console.log('address: %j family: IPv%s', address, family);
// });

export default nextConfig;
