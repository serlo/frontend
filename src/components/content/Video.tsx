import React from 'react'
import StyledP from '../tags/StyledP'
import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

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
      <YouTubeWrapper>
        <StyledLiteYouTubeEmbed
          // id={yt[4]}
          id={'aAKYUUr8Xjc'}
          poster="sddefault" // "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault".
          title={`YouTube Video: ${iframeUrl}`}
        />
      </YouTubeWrapper>
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

//fixed and modified version of https://github.com/ibrahimcesar/react-lite-youtube-embed
//embeded here for faster developement and tracking of changes

interface LiteYouTubeEmbedProps {
  id: string
  playlist?: boolean
  poster?: string
  title?: string
  activatedClass?: string
  iframeClass?: string
  playerClass?: string
  wrapperClass?: string
}

const LiteYouTubeEmbed = ({
  id = '',
  playlist = false,
  poster = 'hqdefault',
  title = 'YouTube Embed',
  activatedClass = 'lyt-activated',
  iframeClass = '',
  playerClass = 'lty-playbtn',
  wrapperClass = 'yt-lite'
}: LiteYouTubeEmbedProps) => {
  const [preconnected, setPreconnected] = React.useState(false)
  const [iframe, setIframe] = React.useState(false)
  const [fallback, setUseFallback] = React.useState(false)

  const videoId = encodeURIComponent(id)
  const videoTitle = title
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/${poster}.jpg`
  const posterUrlFallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const iframeSrc = !playlist
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&html5=1`
    : `https://www.youtube-nocookie.com.com/embed/videoseries?list=${videoId}`
  const refVideo = React.useRef<HTMLDivElement>(null)

  const warmConnections = () => {
    if (preconnected) return
    setPreconnected(true)
  }
  const addIframe = () => {
    if (iframe) return
    setIframe(true)
  }

  React.useEffect(() => {
    const { current } = refVideo

    if (!fallback) {
      let img = new Image()
      img.onload = () => {
        if (img.width === 120) {
          //default image width
          setUseFallback(true)
        }
      }
      img.src = posterUrl
    }

    current.style.backgroundImage = `url('${
      fallback ? posterUrlFallback : posterUrl
    }')`
    current.addEventListener('pointerover', warmConnections, true)
    current.addEventListener('click', addIframe, true)

    return () => {
      current.removeEventListener('pointerover', warmConnections)
      current.removeEventListener('click', addIframe)
    }
  }, [fallback])

  return (
    <>
      <link rel="preload" href={posterUrl} as="image" />
      <>
        {preconnected && (
          <>
            <link rel="preconnect" href="https://www.youtube-nocookie.com" />
            <link rel="preconnect" href="https://www.youtube.com" />
            <link rel="preconnect" href="https://www.google.com" />
          </>
        )}
      </>
      <div
        className={`${wrapperClass} ${iframe && activatedClass}`}
        data-title={videoTitle}
        ref={refVideo}
      >
        <div className={playerClass}></div>
        {iframe && (
          <iframe
            className={iframeClass}
            title={videoTitle}
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={iframeSrc}
          ></iframe>
        )}
      </div>
    </>
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
  margin-bottom: ${props => props.theme.spacing.mb.block};

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

const YouTubeWrapper = styled.figure`
  ${makeMargin}
  padding: 0;
  .yt-lite {
    background-color: #000;
    position: relative;
    display: block;
    contain: content;
    background-position: center center;
    background-size: cover;
    cursor: pointer;
  }

  /* gradient */
  .yt-lite::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
    background-position: top;
    background-repeat: repeat-x;
    height: 60px;
    padding-bottom: 50px;
    width: 100%;
    transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  }

  /* responsive iframe with a 16:9 aspect ratio
    thanks https://css-tricks.com/responsive-iframes/
  */
  .yt-lite::after {
    content: '';
    display: block;
    padding-bottom: calc(100% / (16 / 9));
  }
  .yt-lite > iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* play button */
  .yt-lite > .lty-playbtn {
    width: 70px;
    height: 46px;
    background-color: #212121;
    z-index: 1;
    opacity: 0.8;
    border-radius: 14%; /* TODO: Consider replacing this with YT's actual svg. Eh. */
    transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  }
  .yt-lite:hover > .lty-playbtn {
    background-color: #f00;
    opacity: 1;
  }
  /* play button triangle */
  .yt-lite > .lty-playbtn:before {
    content: '';
    border-style: solid;
    border-width: 11px 0 11px 19px;
    border-color: transparent transparent transparent #fff;
  }

  .yt-lite > .lty-playbtn,
  .yt-lite > .lty-playbtn:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  /* Post-click styles */
  .yt-lite.lyt-activated {
    cursor: unset;
  }
  .yt-lite.lyt-activated::before,
  .yt-lite.lyt-activated > .lty-playbtn {
    opacity: 0;
    pointer-events: none;
  }
`

const VideoPlaceholder = styled.div`
  text-align: center;
`

const StyledLiteYouTubeEmbed = styled(LiteYouTubeEmbed)``
