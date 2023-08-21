import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, KeyboardEvent, useEffect } from 'react'

import { VideoType } from '../plugins/video/renderer'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { tw } from '@/helper/tw'
import { serloDomain } from '@/helper/urls/serlo-domain'

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
  const [showIframe, setShowIframe] = useState(false)

  useEffect(() => {
    setShowIframe(false)
  }, [embedUrl])

  const { strings } = useInstanceData()

  const confirmLoad = () => {
    if (!showIframe) setShowIframe(true)
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!showIframe && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      confirmLoad()
    }
  }

  return (
    <div
      className={clsx(
        tw`
          group relative mx-side mb-block block
          cursor-pointer bg-cover bg-center [contain:content]
          `,
        className
      )}
    >
      {renderPlaceholder()}
      {showIframe && children}
    </div>
  )

  function renderPlaceholder() {
    const previewImageUrl = `https://embed.${serloDomain}/thumbnail?url=${encodeURIComponent(
      embedUrl || ''
    )}`

    return (
      <div className="text-center">
        <div className="relative bg-editor-primary-100 pb-[56.2%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute left-0 h-full w-full object-cover opacity-50"
            src={previewImageUrl}
            alt={`${strings.content.previewImage}`}
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
              className={clsx('py-0.5', showIframe && 'animate-spin-slow')}
              icon={showIframe ? faSpinner : entityIconMapping[type]}
            />{' '}
            {strings.embed.general}
          </button>
        </div>
      </div>
    )
  }
}
