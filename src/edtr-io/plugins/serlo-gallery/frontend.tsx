import { SerloGalleryRenderer } from './renderer'
import type { FrontendSerloGalleryNode } from '@/frontend-node-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export function SerloGalleryAdapter({
  children,
  renderNested,
}: FrontendSerloGalleryNode & {
  renderNested: RenderNestedFunction
}) {
  if (!children || children.length < 2) return null

  const images = children.map((child) => renderNested([child], 'gallery image'))

  return <SerloGalleryRenderer images={images as JSX.Element[]} />
}
