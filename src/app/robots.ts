import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://andypratama.vercel.app/sitemap.xml',
    host: 'https://andypratama.vercel.app',
  }
}
