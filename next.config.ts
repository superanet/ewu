import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone'
  // 实验性功能已禁用，因为使用的是稳定版本而非 canary 版本
  // experimental: {
  //   ppr: true,
  //   clientSegmentCache: true
  // }
};

export default nextConfig;
