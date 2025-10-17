import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amirealsia.com'
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}`,
          ko: `${baseUrl}?lang=ko`,
          ja: `${baseUrl}?lang=ja`,
          zh: `${baseUrl}?lang=zh`,
        },
      },
    },
  ]
}
