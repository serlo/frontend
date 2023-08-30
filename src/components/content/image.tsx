import { usePathname } from 'next/navigation'

import type { FrontendImageNode } from '@/frontend-node-types'
import { hasVisibleContent } from '@/helper/has-visible-content'
import type { RenderNestedFunction } from '@/schema/article-renderer'
import { ImageRenderer } from '@/serlo-editor/plugins/image/renderer'

interface ImageProps {
  element: FrontendImageNode
  extraInfo?: JSX.Element
  renderNested: RenderNestedFunction
}

export function Image({ element, extraInfo, renderNested }: ImageProps) {
  const pathname = usePathname() ?? ''
  const { alt, href, maxWidth, src, caption } = element

  return (
    <>
      <ImageRenderer
        image={{
          src: getSemanticSource(),
          href,
          alt,
          maxWidth,
        }}
        caption={
          caption && hasVisibleContent(caption) ? (
            <>{renderNested(caption, 'caption')}</>
          ) : null
        }
      />
      {extraInfo}
    </>
  )

  function getSemanticSource() {
    if (!src) return src
    const semanticNameSource =
      alt && alt.length > 3 ? alt : pathname.split('/').pop()
    const semanticName = semanticNameSource?.replace(/[^\w+]/g, '')
    return semanticName && semanticName.length > 3
      ? src.replace('/image.', `/${semanticName}.`)
      : src
  }
}
