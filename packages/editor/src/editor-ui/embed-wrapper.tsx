import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { entityIconMapping } from '@serlo/frontend/src/helper/icon-by-entity-type'
import { serloDomain } from '@serlo/frontend/src/helper/urls/serlo-domain'
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

  const { strings } = useInstanceData()

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
            <FaIcon className="py-0.5" icon={entityIconMapping[type]} />{' '}
            {strings.embed.general}
          </button>
        </div>
      </div>
    )
  }
}
