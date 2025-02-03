import type { ImgHTMLAttributes } from 'react'

import { serloDomain } from '@/helper/urls/serlo-domain'

/**
 * Proxies external images via cloudflare worker
 * Temporary fix for privacy reasons. Long term we want to upload
 * images to our own bucket instead
 */
export function ProxyImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={getSrc(props.src)} />
}

function getSrc(src?: string) {
  if (!src) return src

  const isAllowed =
    src.match(/^https:\/\/[a-z]+.(serlo|serlo-staging).(org|dev)\//) ||
    src.startsWith('https://pixabay.com/')

  if (isAllowed) return src

  return `https://asset-proxy.${serloDomain}/image?url=${encodeURIComponent(src)}`
}
