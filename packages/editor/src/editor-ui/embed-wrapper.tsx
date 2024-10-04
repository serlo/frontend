import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { cn } from '@editor/utils/cn'
import { serloDomain } from '@editor/utils/serlo-domain'
import { faCubes, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { useState, KeyboardEvent, useEffect } from 'react'

import { VideoType } from '../plugins/video/renderer'

// based on PrivacyWrapper
// inspired by https://github.com/ibrahimcesar/react-lite-youtube-embed
// also borrowed some code

interface EmbedWrapperProps {
  children: JSX.Element
  className?: string
  type: 'video' | 'applet'
  provider: 'GeoGebra' | VideoType
  embedUrl?: string
}

export function EmbedWrapper({
  children,
  className,
  type,
  embedUrl,
}: EmbedWrapperProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(false)
  }, [embedUrl])

  const embedStrings = useStaticStrings().embed

  const confirmLoad = () => {
    if (!showContent) setShowContent(true)
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!showContent && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      confirmLoad()
    }
  }

  return (
    <div
      className={cn(
        `
        group relative mx-side mb-block block
        cursor-pointer bg-cover bg-center [contain:content]
        `,
        className
      )}
    >
      {showContent ? children : renderPlaceholder()}
    </div>
  )

  function renderPlaceholder() {
    const previewImageUrl = `https://embed.${serloDomain}/thumbnail?url=${encodeURIComponent(
      embedUrl || ''
    )}`

    return (
      <div className="w-full">
        <div className="relative flex aspect-[16/9] w-full justify-center rounded-xl bg-editor-primary-100">
          <img
            className="w-full object-contain opacity-50"
            src={previewImageUrl}
            alt={`${embedStrings.previewImage}`}
          />
        </div>
        <div
          className="absolute inset-0 flex items-center justify-around"
          onClick={confirmLoad}
        >
          <button
            className="serlo-button-editor-primary group-hover:bg-editor-primary"
            onKeyDown={onKeyDown}
          >
            <FaIcon
              className="py-0.5"
              icon={type === 'video' ? faPlayCircle : faCubes}
            />{' '}
            {embedStrings.activateEmbed}
          </button>
        </div>
      </div>
    )
  }
}
