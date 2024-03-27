import { GetServerSideProps } from 'next'

import sitemapData from '../data/sitemap.json'

interface SitemapEntry {
  url: string
  lastMod?: string
}

function generateSiteMap(posts: SitemapEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       .map(({ url, lastMod }) => {
         return `
       <url>
           <loc>${`https://de.serlo.org${url}`}</loc>${
             lastMod
               ? `
           <lastmod>${lastMod}</lastmod>`
               : ''
           }
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function Sitemap() {
  // noop
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // collect content

  // TODO: activate after this is deployed: https://github.com/serlo/quickbar-updater/pull/3
  //   const request = await fetch('https://serlo.github.io/quickbar-updater/sitemap.json')
  //   const sitemapData = (await request.json()) as SitemapEntry[]

  // generate sitemap
  const sitemap = generateSiteMap([...nextStaticPages,...sitemapData])

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 's-maxage=86400') // one day

  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default Sitemap

const nextStaticPages: SitemapEntry[] = [
  { url: '/' },
  { url: '/biologie' },
  { url: '/chemie' },
  { url: '/chemie' },
  { url: '/editor' },
  { url: '/informatik' },
  { url: '/metadata' },
  { url: '/nachhaltigkeit' },
  { url: '/privacy' },
  { url: '/spenden' },
  { url: '/mathe-pruefungen' },
  { url: '/mathe-pruefungen/bayern' },
  { url: '/mathe-pruefungen/niedersachsen' },
]
