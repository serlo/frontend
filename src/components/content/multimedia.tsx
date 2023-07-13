import dynamic from 'next/dynamic'
import { useState } from 'react'

import { LightBoxProps } from './light-box'
import type { FrontendMultiMediaNode } from '@/frontend-node-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'
import { MultimediaRenderer } from '@/serlo-editor/plugins/multimedia/renderer'

const LightBox = dynamic<LightBoxProps>(() =>
  import('./light-box').then((mod) => mod.LightBox)
)

export function Multimedia({
  mediaWidth,
  media,
  children,
  renderNested,
}: FrontendMultiMediaNode & { renderNested: RenderNestedFunction }) {
  const [open, setOpen] = useState(false)
  const mediaChild = media[0]
  const mediaChildIsImage = mediaChild?.type === 'img'
  const showLightbox = mediaChildIsImage && open

  // hide empty plugins
  const isEmpty =
    !mediaChild &&
    children.length === 1 &&
    children[0] &&
    children[0].children?.length === 1 &&
    children[0].children?.[0].children?.length === 0

  if (isEmpty) return null

  return (
    <>
      <MultimediaRenderer
        media={<>{renderNested(media, 'media')}</>}
        explanation={<>{renderNested(children, 'children')}</>}
        mediaWidth={mediaWidth}
        onClick={mediaChildIsImage ? () => setOpen(true) : undefined}
        extraImageClass={mediaChildIsImage ? 'mobile:cursor-zoom-in' : ''}
      />
      {showLightbox ? (
        <LightBox
          onClose={() => setOpen(false)}
          alt={mediaChild.alt}
          label={renderNested(mediaChild.caption ?? [])}
          src={mediaChild.src}
        />
      ) : null}
    </>
  )
}
