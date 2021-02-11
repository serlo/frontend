import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { EventCounter } from '../event-counter'
import { StyledP } from '../tags/styled-p'
import { LicenseNotice } from './license-notice'
import { PrivacyWrapper } from './privacy-wrapper'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData } from '@/data-types'
import { submitEventWithPath } from '@/helper/submit-event'
import { ExternalProvider } from '@/helper/use-consent'
import { NodePath } from '@/schema/article-renderer'

export interface VideoProps {
  src: string
  path?: NodePath
  license?: LicenseData
}

export function Video(props: VideoProps) {
  const { lang } = useInstanceData()

  const { src, path, license } = props

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
    return renderVideo(ExternalProvider.WikimediaCommons)
  }

  function renderYoutube(path: string) {
    const videoId = encodeURIComponent(path.split('&', 1)[0])
    const useSubtitles = path.indexOf('cc_load_policy=1') > 0
    const iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&html5=1${
      useSubtitles ? `&cc_lang_pref=${lang}&cc_load_policy=1` : ''
    }`
    return renderVideo(ExternalProvider.YouTube, iframeUrl)
  }

  function renderVimeo(id: string) {
    const iframeUrl = `https://player.vimeo.com/video/${id}?autoplay=1`
    return renderVideo(ExternalProvider.Vimeo, iframeUrl)
  }

  function renderVideo(provider: ExternalProvider, iframeUrl?: string) {
    return (
      <>
        <PrivacyWrapper
          type="video"
          provider={provider}
          embedUrl={iframeUrl}
          eventCounter={<EventCounter prefix="loadvideo" path={path} />}
          onLoad={() => {
            submitEventWithPath('loadvideo', path)
          }}
        >
          <VideoWrapper className="video">
            {provider === ExternalProvider.WikimediaCommons && (
              <video controls src={src} />
            )}
            {(provider === ExternalProvider.YouTube ||
              ExternalProvider.Vimeo) && (
              <iframe
                src={iframeUrl}
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </VideoWrapper>
        </PrivacyWrapper>
        {license && !license.default && (
          <StyledP>
            <LicenseNotice minimal data={license} type="video" />
          </StyledP>
        )}
      </>
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
