import dynamic from 'next/dynamic'
import { useState } from 'react'

import { LightBoxProps } from './light-box'
import type {
  FrontendMultiMediaNode,
  FrontendImgNode,
  FrontendContentNode,
} from '@/frontend-node-types'
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
  function openLightBox() {
    setOpen(true)
  }

  const mediaChild = media[0]
  const mediaChildIsImage = isImage(mediaChild)

  return (
    <>
      <MultimediaRenderer
        media={<>{renderNested(media, 'media')}</>}
        explanation={<>{renderNested(children, 'children')}</>}
        mediaWidth={mediaWidth}
        onClick={mediaChildIsImage ? openLightBox : undefined}
        extraImageClass={mediaChildIsImage ? 'mobile:cursor-zoom-in' : ''}
      />
      {renderLightbox()}
    </>
  )

  function renderLightbox() {
    if (!isImage(mediaChild) || !open) return null

    // simplify after deploy, db-migration and api cache updates
    const label =
      Object.hasOwn(mediaChild, 'caption') && mediaChild.caption
        ? renderNested(mediaChild.caption) ?? undefined
        : undefined

    return (
      open && (
        <LightBox
          open={open}
          onClose={() => setOpen(false)}
          alt={mediaChild.alt}
          label={label}
          src={mediaChild.src}
        />
      )
    )
  }
}

function isImage(
  child: FrontendImgNode | FrontendContentNode
): child is FrontendImgNode {
  if (!child) return false
  return (child as FrontendImgNode).type === 'img'
}
