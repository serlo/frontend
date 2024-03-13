import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useState, KeyboardEvent, useEffect } from 'react'

import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

// inspired by https://github.com/ibrahimcesar/react-lite-youtube-embed
// also borrowed some code

export interface PrivacyWrapperProps {
  children: JSX.Element
  className?: string
  placeholder?: JSX.Element
  type: 'video' | 'applet' | 'twingle' | 'audio'
  provider: ExternalProvider
  embedUrl?: string
  twingleCallback?: () => void
  onLoad?: () => void
}

export function PrivacyWrapper({
  children,
  placeholder,
  className,
  type,
  provider,
  embedUrl,
  twingleCallback,
  onLoad,
}: PrivacyWrapperProps) {
  const [showContent, setShowContent] = useState(false)
  const isTwingle = provider === ExternalProvider.Twingle
  const { checkConsent, giveConsent } = useConsent()
  const [consentGiven, setConsentGiven] = useState(false)

  const { strings } = useInstanceData()

  const confirmLoad = () => {
    giveConsent(provider)
    setConsentGiven(true)
    if (onLoad) onLoad()
    if (showContent) return
    if (isTwingle && twingleCallback) twingleCallback()
    setShowContent(true)
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!showContent && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      confirmLoad()
    }
  }

  useEffect(() => {
    const isConsentGiven = checkConsent(provider)
    if (isTwingle && twingleCallback && isConsentGiven) {
      confirmLoad()
    }
    setConsentGiven(isConsentGiven)

    // If we already have the consent (in localstorage, we can show the iframe
    // immediately)
    if (isConsentGiven && provider === ExternalProvider.Vocaroo) {
      setShowContent(true)
    }

    // only run on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={cn(
        className,
        !isTwingle && 'mx-side',
        `
          group relative mb-block block cursor-pointer
          bg-cover bg-center [contain:content]
        `
      )}
    >
      {showContent ? children : renderPlaceholder()}
    </div>
  )

  function renderPlaceholder() {
    if (placeholder) return placeholder
    const buttonLabel = replacePlaceholders(strings.embed[type], {
      provider: provider,
    })

    const previewImageUrl = isTwingle
      ? '/_assets/img/donations-form.png'
      : `https://embed.serlo.org/thumbnail?url=${encodeURIComponent(
          embedUrl || ''
        )}`

    return (
      <div className="w-full">
        <div className="relative aspect-[16/9] w-full rounded-xl bg-brand-100">
          <Image
            src={previewImageUrl}
            alt={`${strings.content.previewImage} ${provider}`}
            fill
            sizes="(max-width: 1023px) 100vw, 770px"
            className={cn(
              'rounded-xl',
              // video and twingle previews have empty white space at the top & bottom so object-cover works better here.
              type === 'video' || type === 'twingle'
                ? 'object-cover'
                : 'object-contain',
              isTwingle ? 'opacity-50' : 'opacity-90'
            )}
          />
          <div
            className="absolute inset-0 flex items-center justify-around"
            onClick={confirmLoad}
          >
            <button
              className={cn(
                isTwingle ? 'serlo-button-blue' : 'serlo-button-light',
                'group-hover:bg-brand-500 group-hover:text-white'
              )}
              onKeyDown={onKeyDown}
            >
              <FaIcon
                className="py-0.5"
                icon={type === 'twingle' ? faHeart : entityIconMapping[type]}
              />{' '}
              {buttonLabel}
            </button>
          </div>
        </div>
        {!consentGiven && (
          <div className="cursor-default bg-brand-100 px-side py-2 text-left text-brand-700">
            {replacePlaceholders(strings.embed.text, {
              provider: <b>{provider}</b>,
              privacypolicy: (
                <a href="/privacy" target="_blank" className="underline">
                  {strings.entities.privacyPolicy}
                </a>
              ),
            })}
          </div>
        )}
      </div>
    )
  }
}
