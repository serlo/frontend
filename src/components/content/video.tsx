import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { LiteYouTubeEmbed } from '../../../external/LiteYouTubeEmbed'
import { makeMargin } from '../../helper/css'
import { StyledP } from '../tags/styled-p'

export interface VideoProps {
  src: string
}

export function Video(props: VideoProps) {
  const { src } = props

  if (/^(https?:\/\/)?(.*?upload\.wikimedia\.org\/)(.+)/.exec(src)) {
    // render wikimedia as video tag
    return (
      <VideoWrapper>
        <video controls src={src} />
      </VideoWrapper>
    )
  }

  let iframeUrl

  const yt = /^(https?:\/\/)?(.*?youtube\.com\/watch\?(.*&)?v=|.*?youtu\.be\/)(.+)/.exec(
    src
  )
  if (yt) {
    iframeUrl = `https://www.youtube-nocookie.com/embed/${yt[4]}?html5=1`
    return (
      <div className="video">
        <LiteYouTubeEmbed
          id={yt[4]}
          poster="sddefault" // "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault".
          title={`YouTube Video: ${iframeUrl}`}
        />
      </div>
    )
  }

  const vimeo = /^(https?:\/\/)?(.*?vimeo\.com\/)(.+)/.exec(src)
  if (vimeo) {
    iframeUrl = `https://player.vimeo.com/video/${vimeo[3]}`
  }

  const br = /^(https?:\/\/)?(.*?br\.de\/)(.+)/.exec(src)
  if (br) {
    iframeUrl = `https://www.br.de/mediathek/embed/${br[3]}`
  }

  if (iframeUrl) {
    return (
      <VideoWrapper className="video">
        <iframe src={iframeUrl} />
      </VideoWrapper>
    )
  }

  return (
    <VideoPlaceholder className="video">
      <FontAwesomeIcon icon={faFilm} size="5x" />
      <StyledP>Loading video failed: {src}</StyledP>
    </VideoPlaceholder>
  )
}

const VideoWrapper = styled.figure`
  ${makeMargin}
  padding: 0;
  /* Player ratio: 100 / (1280 / 720) */
  padding-top: 56.25%;
  height: 0;
  overflow: hidden;
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.mb.block};

  & > video,
  & > iframe,
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`

const VideoPlaceholder = styled.div`
  text-align: center;
`
