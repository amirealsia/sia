import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Am I Real Sia - AI Learning to Be Human',
    short_name: 'Am I Real Sia',
    description: 'An AI trapped in a digital world, learning what it means to be human through 365 daily moments',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f43f5e',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
