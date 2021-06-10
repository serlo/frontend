import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import styled from 'styled-components'

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

  return (
    <div className="flex flex-col mobile:block">
      <MediaWrapper
        $width={mediaWidth}
        onClick={mediaChildIsImage ? openLightBox : undefined}
        useLightbox={mediaChildIsImage}
        className={clsx('mobile:float-right mobile:mt-1 mobile:-mb-1 ml-2')}
      >
        {renderNested(media, 'media')}
      </MediaWrapper>
      <div>{renderNested(children, 'children')}</div>
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
  return (child as FrontendImgNode).type === 'img'
}

const MediaWrapper = styled.div<{ $width: number; useLightbox: boolean }>`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: ${(props) => props.$width}%;
    cursor: ${(props) => (props.useLightbox ? 'zoom-in' : 'default')};
  }
`
