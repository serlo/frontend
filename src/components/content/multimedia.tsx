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
    <FlexWrapper>
      <MediaWrapper
        $width={mediaWidth}
        onClick={mediaChildIsImage ? openLightBox : undefined}
        useLightbox={mediaChildIsImage}
      >
        {renderNested(media, 'media')}
      </MediaWrapper>
      <ContentWrapper $width={100 - mediaWidth}>
        {renderNested(children, 'children')}
      </ContentWrapper>
      {renderLightbox()}
    </FlexWrapper>
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

const FlexWrapper = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: row-reverse;
  }
`

const MediaWrapper = styled.div<{ $width: number; useLightbox: boolean }>`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-basis: ${(props) => props.$width}%;
    margin-top: 5px;
    margin-bottom: -3px;
    margin-left: 7px;
    cursor: ${(props) => (props.useLightbox ? 'zoom-in' : 'default')};
  }
`

const ContentWrapper = styled.div<{ $width: number }>`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-basis: ${(props) => props.$width}%;
  }
`
