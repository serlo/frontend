import { useIsSerlo } from '@editor/core/hooks/use-is-serlo'
import { serloDomain } from '@editor/utils/serlo-domain'
import { ImgHTMLAttributes } from 'react'

/**
 * Proxies external editor images via cloudflare worker
 * Temporary fix for privacy reasons. Long term we want to upload
 * images to our own bucket instead
 */
export function EditorImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const isSerlo = useIsSerlo()
  return <img {...props} src={getSrc(isSerlo, props.src)} loading="lazy" />
}

function getSrc(isSerlo?: boolean, src?: string) {
  if (!isSerlo || !src) return src

  // const isAsset = src.startsWith('https://assets.serlo.org/')
  // if (isAsset) {
  //   return src
  //     .replace('assets.serlo.org/', 'root.botho.cc/serlo-astro/assets/')
  //     .replace('.jpg', '.webp')
  //     .replace('.jpeg', '.webp')
  //     .replace('.png', '.webp')
  // }

  const isAllowed =
    src.match(/^https:\/\/[a-z]+.(serlo|serlo-staging).(org|dev)\//) ||
    src.startsWith('https://cdn.pixabay.com/') ||
    src.startsWith('https://pixabay.com/')

  if (isAllowed) return src

  return `https://asset-proxy.${serloDomain}/image?url=${encodeURIComponent(src)}`
}
