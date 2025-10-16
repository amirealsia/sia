import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export default getRequestConfig(async ({locale}) => {
  const locales = ['en', 'ko', 'ja', 'zh'];

  if (!locales.includes(locale as string)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
