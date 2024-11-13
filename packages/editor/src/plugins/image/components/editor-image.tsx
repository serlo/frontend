import { serloDomain } from '@editor/utils/serlo-domain'
import { SerloOnlyFeaturesContext } from '@editor/utils/serlo-extra-context'
import { ImgHTMLAttributes, useContext } from 'react'

/**
 * Proxies external editor images via cloudflare worker
 * Temporary fix for privacy reasons. Long term we want to upload
 * images to our own bucket instead
 */
export function EditorImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const isSerlo = useContext(SerloOnlyFeaturesContext).isSerlo
  return <img {...props} src={getSrc(isSerlo, props.src)} />
}

function getSrc(isSerlo?: boolean, src?: string) {
  if (!isSerlo || !src) return src

  const isAllowed =
    src.match(/^https:\/\/[a-z]+.(serlo|serlo-staging).(org|dev)\//) ||
    src.startsWith('https://pixabay.com/')

  if (isAllowed) return src

  return `https://asset-proxy.${serloDomain}/image?url=${encodeURIComponent(src)}`
}
