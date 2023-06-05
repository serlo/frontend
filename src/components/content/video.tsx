import { faFilm } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import { LicenseNotice } from './license/license-notice'
import { PrivacyWrapper } from './privacy-wrapper'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData } from '@/data-types'
import { ExternalProvider } from '@/helper/use-consent'

export interface VideoProps {
  src: string
  license?: LicenseData
}

export function Video({ src, license }: VideoProps) {
  const { lang } = useInstanceData()

  const vimeo = /^(https?:\/\/)?(.*?vimeo\.com\/)(.+)/.exec(src)
  if (vimeo) return renderVimeo(vimeo[3])

  const wikimedia = /^(https?:\/\/)?(.*?upload\.wikimedia\.org\/)(.+)/.exec(src)
  if (wikimedia) return renderWikimedia()

  const youtube =
    /^(https?:\/\/)?(.*?youtube\.com\/watch\?(.*&)?v=|.*?youtu\.be\/)([a-zA-Z0-9_-]{11})/.exec(
      src
    )
  if (youtube) return renderYoutube(youtube[4])

  return (
    <div className="text-center print:hidden">
      <FaIcon icon={faFilm} className="h-16" />
      <p className="serlo-p">Loading video failed: {src}</p>
    </div>
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
          className="print:hidden"
        >
          <div className="m-0 p-0">
            {provider === ExternalProvider.WikimediaCommons && (
              <video controls src={src} className={videoElementCls} />
            )}
            {(provider === ExternalProvider.YouTube ||
              ExternalProvider.Vimeo) && (
              <iframe
                src={iframeUrl}
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className={videoElementCls}
              />
            )}
          </div>
        </PrivacyWrapper>
        {license && !license.isDefault && (
          <p className="serlo-p">
            <LicenseNotice minimal data={license} type="video" />
          </p>
        )}
        <p className="serlo-p hidden print:block">[{src}]</p>
      </>
    )
  }
}

const videoElementCls =
  /* className={ */ 'absolute top-0 left-0 h-full w-full border-none z-20 bg-black/30' /*}*/
