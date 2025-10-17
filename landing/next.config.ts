import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',

  // 성능 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 이미지 최적화 (static export용)
  images: {
    unoptimized: true, // static export에서는 필수
  },

  // 압축 활성화
  compress: true,

  // 실험적 기능
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
};

export default withNextIntl(nextConfig);
