import { useRouter } from 'next/router'

import { Lazy } from './lazy'
import { Link } from './link'
import { useInstanceData } from '@/contexts/instance-context'
import type { FrontendImgNode } from '@/frontend-node-types'
import { hasVisibleContent } from '@/helper/has-visible-content'
import { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

interface ImageProps {
  element: FrontendImgNode
  path: NodePath
  extraInfo?: JSX.Element
  renderNested: RenderNestedFunction
}

export function Image({ element, path, extraInfo, renderNested }: ImageProps) {
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
          <Link className="w-full block" href={href} path={path} noExternalIcon>
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
      <Lazy>
        <img
          className="serlo-img"
          src={semanticSrc}
          alt={alt || strings.content.imageAltFallback}
          itemProp="contentUrl"
        />
      </Lazy>
    )
  }

  function renderCaption() {
    if (!caption || !hasVisibleContent(caption)) return null
    return (
      <figcaption className="italic mt-3">
        {renderNested(caption, 'caption')}
      </figcaption>
    )
  }
}
