import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { PrivacyWrapper, Provider } from './privacy-wrapper'
import { useInstanceData } from '@/contexts/instance-context'

export interface VideoProps {
  src: string
}

export function Video(props: VideoProps) {
  const { lang } = useInstanceData()

  const { src } = props

  const vimeo = /^(https?:\/\/)?(.*?vimeo\.com\/)(.+)/.exec(src)
  if (vimeo) return renderVimeo(vimeo[3])

  const wikimedia = /^(https?:\/\/)?(.*?upload\.wikimedia\.org\/)(.+)/.exec(src)
  if (wikimedia) return renderWikimedia()

  const youtube = /^(https?:\/\/)?(.*?youtube\.com\/watch\?(.*&)?v=|.*?youtu\.be\/)([a-zA-Z0-9_-]{11})/.exec(
    src
  )
  if (youtube) return renderYoutube(youtube[4])

  return (
    <VideoPlaceholder className="video">
      <FontAwesomeIcon icon={faFilm} size="5x" />
      <StyledP>Loading video failed: {src}</StyledP>
    </VideoPlaceholder>
  )

  function renderWikimedia() {
    return renderVideo(Provider.WikimediaCommons)
  }

  function renderYoutube(path: string) {
    const videoId = encodeURIComponent(path.split('&', 1)[0])
    const useSubtitles = path.indexOf('cc_load_policy=1') > 0
    const iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&html5=1${
      useSubtitles ? `&cc_lang_pref=${lang}&cc_load_policy=1` : ''
    }`
    return renderVideo(Provider.YouTube, iframeUrl)
  }

  function renderVimeo(id: string) {
    const iframeUrl = `https://player.vimeo.com/video/${id}?autoplay=1`
    return renderVideo(Provider.Vimeo, iframeUrl)
  }

  function renderVideo(provider: Provider, iframeUrl?: string) {
    return (
      <PrivacyWrapper type="video" provider={provider} embedUrl={iframeUrl}>
        <VideoWrapper className="video">
          {provider === 'wikimedia' && <video controls src={src} />}
          {(provider === 'youtube' || provider === 'vimeo') && (
            <iframe
              src={iframeUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </VideoWrapper>
      </PrivacyWrapper>
    )
  }
}

const VideoWrapper = styled.figure`
  margin: 0;
  padding: 0;
  & > video,
  & > iframe,
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    z-index: 6;
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const VideoPlaceholder = styled.div`
  text-align: center;
`
