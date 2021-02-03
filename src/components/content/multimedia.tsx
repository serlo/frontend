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
    <>
      <Wrapper
        mediaWidth={mediaWidth}
        onClick={mediaChildIsImage ? openLightBox : undefined}
        useLightbox={mediaChildIsImage}
      >
        {renderNested(media, 'media')}
      </Wrapper>
      {renderNested(children, 'children')}
      {renderLightbox()}
      <Clear />
    </>
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

interface WrapperProps {
  mediaWidth: number
  useLightbox: boolean
}
const Wrapper = styled.div<WrapperProps>`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    float: right;
    width: ${(props) => props.mediaWidth}%;
    margin-top: 5px;
    margin-bottom: -3px;
    margin-left: 7px;
    cursor: ${(props) => (props.useLightbox ? 'zoom-in' : 'default')};
  }
`
const Clear = styled.div`
  clear: both;
`
