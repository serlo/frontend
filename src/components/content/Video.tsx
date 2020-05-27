import React from 'react'
import StyledP from '../tags/StyledP'
import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import LiteYouTubeEmbed from '../../../external/LiteYouTubeEmbed'

export default function Video(props) {
  const { url } = props

  if (/^(https?:\/\/)?(.*?upload\.wikimedia\.org\/)(.+)/.exec(url)) {
    // render wikimedia as video tag
    return (
      <VideoWrapper>
        <video controls src={url} />
      </VideoWrapper>
    )
  }

  let iframeUrl

  const yt = /^(https?:\/\/)?(.*?youtube\.com\/watch\?(.*&)?v=|.*?youtu\.be\/)(.+)/.exec(
    url
  )
  if (yt) {
    iframeUrl = `https://www.youtube-nocookie.com/embed/${yt[4]}?html5=1`
    return (
      <LiteYouTubeEmbed
        id={yt[4]}
        poster="sddefault" // "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault".
        title={`YouTube Video: ${iframeUrl}`}
      />
    )
  }

  const vimeo = /^(https?:\/\/)?(.*?vimeo\.com\/)(.+)/.exec(url)
  if (vimeo) {
    iframeUrl = `https://player.vimeo.com/video/${vimeo[3]}`
  }

  const br = /^(https?:\/\/)?(.*?br\.de\/)(.+)/.exec(url)
  if (br) {
    iframeUrl = `https://www.br.de/mediathek/embed/${br[3]}`
  }

  if (iframeUrl) {
    return (
      <VideoWrapper>
        <iframe src={iframeUrl} />
      </VideoWrapper>
    )
  }

  return (
    <VideoPlaceholder>
      <FontAwesomeIcon icon={faFilm} size="5x" />
      <StyledP>Es gab ein Problem mit dem Video: {url}</StyledP>
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
