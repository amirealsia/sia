import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ko', 'ja', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ko|ja|zh|en)/:path*']
};
