import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { LightBoxProps } from './light-box'
import type {
  FrontendMultiMediaNode,
  FrontendImgNode,
  FrontendContentNode,
} from '@/data-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

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
  const width = convertToClosestQuarter(mediaWidth) // we can do this becaues witdth is only 25%, 50%, 75% or 100%

  return (
    <div className="flex flex-col-reverse mobile:block">
      <div
        onClick={mediaChildIsImage ? openLightBox : undefined}
        className={clsx(
          'mobile:float-right mobile:mt-1 mobile:-mb-1 mobile:ml-2 relative z-10',
          mediaChildIsImage && 'mobile:cursor-zoom-in',
          width == 25 && 'mobile:w-1/4',
          width == 50 && 'mobile:w-1/2',
          width == 75 && 'mobile:w-3/4',
          width == 100 && 'mobile:w-full'
        )}
      >
        {renderNested(media, 'media')}
      </div>
      {/* 1px margin fixes mistery bug in firefox */}
      <div className="ml-[1px]">{renderNested(children, 'children')}</div>
      {renderLightbox()}
      <div className="clear-both" />
    </div>
  )

  function renderLightbox() {
    if (!isImage(mediaChild) || !open) {
      return null
    }

    return (
      open && (
        <LightBox
          open={open}
          onClose={() => setOpen(false)}
          label={mediaChild.alt}
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

function convertToClosestQuarter(width: number) {
  return Math.round(width / 25) * 25
}
