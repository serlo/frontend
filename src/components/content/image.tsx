import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { Lazy } from './lazy'
import { Link } from './link'
import { useInstanceData } from '@/contexts/instance-context'
import type { FrontendImgNode } from '@/frontend-node-types'
import { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

interface ImageProps {
  element: FrontendImgNode
  path: NodePath
  extraInfo?: JSX.Element
  renderNested: RenderNestedFunction
}

export function Image({ element, path, extraInfo, renderNested }: ImageProps) {
  const pathname = usePathname()!
  const { strings } = useInstanceData()

  const semanticNameSource =
    element.alt && element.alt.length > 3
      ? element.alt
      : pathname.split('/').pop()
  const semanticName = semanticNameSource?.replace(/[^\w+]/g, '')
  const src =
    semanticName && semanticName.length > 3
      ? element.src.replace('/image.', `/${semanticName}.`)
      : element.src

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
              src={src}
              alt={element.alt || strings.content.imageAltFallback}
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
    return (
      <div className="italic mt-3">
        {renderNested(element.caption, 'caption')}
      </div>
    )
  }
}
