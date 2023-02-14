import { useRouter } from 'next/router'
import { ReactNode } from 'react'

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

  const semanticNameSource =
    element.alt && element.alt.length > 3
      ? element.alt
      : router.asPath.split('/').pop()
  const semanticName = semanticNameSource?.replace(/[^\w+]/g, '')
  const src =
    semanticName && semanticName.length > 3
      ? element.src.replace('/image.', `/${semanticName}.`)
      : element.src

  return (
    <figure
      className="serlo-image-centered"
      itemScope
      itemType="http://schema.org/ImageObject"
    >
      <div
        style={element.maxWidth ? { maxWidth: element.maxWidth } : {}}
        className="mx-auto"
      >
        {element.href ? (
          <Link
            className="w-full block"
            href={element.href}
            path={path}
            noExternalIcon
          >
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
          src={src}
          alt={element.alt || strings.content.imageAltFallback}
          itemProp="contentUrl"
        />
      </Lazy>
    )
  }

  function renderCaption() {
    if (!element.caption) return null
    if (!hasVisibleContent(element.caption)) return null
    return (
      <figcaption className="italic mt-3">
        {renderNested(element.caption, 'caption')}
      </figcaption>
    )
  }
}
