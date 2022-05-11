import { ReactNode } from 'react'

import { Lazy } from './lazy'
import { Link } from './link'
import type { FrontendImgNode } from '@/data-types'
import { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

interface ImageProps {
  element: FrontendImgNode
  path: NodePath
  extraInfo?: JSX.Element
  renderNested: RenderNestedFunction
}

export function Image({ element, path, extraInfo, renderNested }: ImageProps) {
  const wrapInA = (comp: ReactNode) => {
    if (element.href) {
      // needs investigation if this could be simplified
      return (
        <Link
          className="w-full block"
          href={element.href}
          path={path}
          noExternalIcon
        >
          {comp}
        </Link>
      )
    }
    return comp
  }

  return (
    <div
      className="serlo-image-centered"
      itemScope
      itemType="http://schema.org/ImageObject"
    >
      <div
        style={element.maxWidth ? { maxWidth: element.maxWidth } : {}}
        className="mx-auto"
      >
        {wrapInA(
          <Lazy>
            <img
              className="serlo-img"
              src={element.src}
              alt={element.alt || 'Bild'}
              itemProp="contentUrl"
            />
          </Lazy>
        )}
        {renderCaption()}
        {extraInfo ?? null}
      </div>
    </div>
  )

  function renderCaption() {
    if (!element.caption) return null
    return <p className="italic">{renderNested(element.caption, 'caption')}</p>
  }
}
