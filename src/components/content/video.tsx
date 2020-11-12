import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { PrivacyWrapper, Provider } from './privacy-wrapper'

export interface VideoProps {
  src: string
}

export function Video(props: VideoProps) {
  const [vimeoImg, setVimeoImg] = React.useState('')

  const { src } = props

  const vimeo = /^(https?:\/\/)?(.*?vimeo\.com\/)(.+)/.exec(src)
  if (vimeo) return renderVimeo(vimeo[3])

  const wikimedia = /^(https?:\/\/)?(.*?upload\.wikimedia\.org\/)(.+)/.exec(src)
  if (wikimedia) return renderWikimedia()

  const youtube = /^(https?:\/\/)?(.*?youtube\.com\/watch\?(.*&)?v=|.*?youtu\.be\/)(.+)/.exec(
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
    //there is probably an easier way of getting this?
    const seperator = '/commons/'
    const parts = src.split(seperator)
    const baseURL = parts[0]
    const filenameWithPath = parts[1]
    const filename = filenameWithPath.substring(
      filenameWithPath.lastIndexOf('/') + 1
    )
    const previewImageUrl = `${baseURL}${seperator}thumb/${filenameWithPath}/800px--${filename}.jpg`
    return renderVideo(previewImageUrl, Provider.WikimediaCommons)
  }

  function renderYoutube(id: string) {
    const videoId = encodeURIComponent(id)
    const previewImageUrl = `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`
    // const previewImageFallbackUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    const iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&html5=1`

    return renderVideo(previewImageUrl, Provider.YouTube, iframeUrl)
  }

  function renderVimeo(id: string) {
    const iframeUrl = `https://player.vimeo.com/video/${id}?autoplay=1`

    if (vimeoImg === '') return fetchVimeoInfo()
    return renderVideo(vimeoImg, Provider.Vimeo, iframeUrl)
  }

  function fetchVimeoInfo() {
    void fetch(
      'https://vimeo.com/api/oembed.json?url=' + encodeURIComponent(src)
    )
      .then((res) => res.json())
      .then((data) => {
        setVimeoImg(data.thumbnail_url.replace(/_[0-9|x]+/, ''))
      })
    return null
  }

  function renderVideo(
    previewImageUrl: string,
    provider: Provider,
    iframeUrl?: string
  ) {
    return (
      <PrivacyWrapper
        type="video"
        previewImageUrl={previewImageUrl}
        provider={provider}
      >
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
