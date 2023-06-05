import { useRouter } from 'next/router'

import { Link } from './link'
import { useInstanceData } from '@/contexts/instance-context'
import type { FrontendImgNode } from '@/frontend-node-types'
import { hasVisibleContent } from '@/helper/has-visible-content'
import { RenderNestedFunction } from '@/schema/article-renderer'

interface ImageProps {
  element: FrontendImgNode
  extraInfo?: JSX.Element
  renderNested: RenderNestedFunction
}

export function Image({ element, extraInfo, renderNested }: ImageProps) {
  const router = useRouter()
  const { strings } = useInstanceData()
  const { alt, href, maxWidth, src, caption } = element

  const semanticNameSource =
    alt && alt.length > 3 ? alt : router.asPath.split('/').pop()
  const semanticName = semanticNameSource?.replace(/[^\w+]/g, '')
  const semanticSrc =
    semanticName && semanticName.length > 3
      ? src.replace('/image.', `/${semanticName}.`)
      : src

  return (
    <figure
      className="serlo-image-centered"
      itemScope
      itemType="http://schema.org/ImageObject"
    >
      <div style={maxWidth ? { maxWidth: maxWidth } : {}} className="mx-auto">
        {href ? (
          <Link className="block w-full" href={href} noExternalIcon>
            {renderImage()}
          </Link>
        ) : (
          renderImage()
        )}
        {renderCaption()}
        {extraInfo ?? null}
      </div>
    </figure>
  )

  function renderImage() {
    return (
      <img
        className="serlo-img"
        src={semanticSrc}
        alt={alt || strings.content.imageAltFallback}
        itemProp="contentUrl"
        loading="lazy"
      />
    )
  }

  function renderCaption() {
    if (!caption || !hasVisibleContent(caption)) return null
    return (
      <figcaption className="mt-3 italic">
        {renderNested(caption, 'caption')}
      </figcaption>
    )
  }
}
