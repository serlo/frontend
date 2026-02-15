import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import { useIsSerlo } from '@editor/core/hooks/use-is-serlo'
import { serloDomain } from '@editor/utils/serlo-domain'
import { ImgHTMLAttributes, useContext } from 'react'

/**
 * Proxies external editor images via cloudflare worker
 * Temporary fix for privacy reasons. Long term we want to upload
 * images to our own bucket instead
 */
export function EditorImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const isSerlo = useIsSerlo()
  const { fileUploadConfig } = useContext(EditorMetaContext)
  return (
    <img
      {...props}
      src={getSrc(isSerlo, props.src, fileUploadConfig?.allowedImageDomains)}
      loading="lazy"
    />
  )
}

function getSrc(
  isSerlo?: boolean,
  src?: string,
  additionalAllowedDomains?: string[]
) {
  if (!isSerlo || !src) return src

  const isAllowed =
    src.match(/^https:\/\/[a-z]+.(serlo|serlo-staging).(org|dev)\//) ||
    src.startsWith('https://cdn.pixabay.com/') ||
    src.startsWith('https://pixabay.com/') ||
    isAdditionalDomainAllowed(src, additionalAllowedDomains)

  if (isAllowed) return src

  return `https://asset-proxy.${serloDomain}/image?url=${encodeURIComponent(src)}`
}

function isAdditionalDomainAllowed(
  src: string,
  additionalAllowedDomains?: string[]
): boolean {
  if (!additionalAllowedDomains || additionalAllowedDomains.length === 0) {
    return false
  }

  try {
    const url = new URL(src)
    return additionalAllowedDomains.some((domain) => {
      // Support wildcards like *.example.com
      if (domain.startsWith('*.')) {
        const baseDomain = domain.slice(2)
        // Ensure the match occurs at a subdomain boundary
        // e.g., *.example.com matches sub.example.com but not evilexample.com
        return (
          url.hostname.endsWith('.' + baseDomain) || url.hostname === baseDomain
        )
      }
      return url.hostname === domain
    })
  } catch {
    return false
  }
}
