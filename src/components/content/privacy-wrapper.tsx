import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { ReactChild, useState, KeyboardEvent } from 'react'

import { useInstanceData } from '@/contexts/instance-context'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { serloDomain } from '@/helper/serlo-domain'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

// inspired by https://github.com/ibrahimcesar/react-lite-youtube-embed
// also borrowed some code

interface PrivacyWrapperProps {
  children: ReactChild
  className?: string
  placeholder?: ReactChild
  type: 'video' | 'applet' | 'twingle'
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
  const [showIframe, setShowIframe] = useState(false)
  const isTwingle = provider === ExternalProvider.Twingle
  const { checkConsent, giveConsent } = useConsent()

  const { strings } = useInstanceData()

  const confirmLoad = () => {
    giveConsent(provider)
    if (onLoad) onLoad()
    if (showIframe) return
    if (isTwingle && twingleCallback) twingleCallback()
    setShowIframe(true)
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!showIframe && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      confirmLoad()
    }
  }

  return (
    <div
      style={{ contain: 'content' }}
      className={clsx(
        className,
        !isTwingle && 'mx-side',
        'mb-block relative block cursor-pointer',
        'bg-cover bg-center group'
      )}
    >
      {renderPlaceholder()}
      {showIframe && children}
    </div>
  )

  function renderPlaceholder() {
    if (placeholder) return placeholder
    const buttonLabel = replacePlaceholders(strings.embed[type], {
      provider: provider,
    })
    if (isTwingle && showIframe) return null

    const previewImageUrl = isTwingle
      ? '/_assets/img/donations-form.png'
      : `https://embed.${serloDomain}/thumbnail?url=${encodeURIComponent(
          embedUrl || ''
        )}`

    return (
      <div className="text-center">
        <div className="relative pb-[56.2%] bg-brand-100">
          <img
            className={clsx(
              'absolute left-0 object-cover w-full h-full',
              isTwingle ? 'opacity-50' : 'opacity-90'
            )}
            src={previewImageUrl}
            alt={`${strings.content.previewImage} ${provider}`}
          />
        </div>
        {!checkConsent(provider) && (
          <div className="relative z-10 py-2 text-left px-side bg-brand text-white cursor-default">
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
        <div
          className="absolute -top-24 inset-0 flex justify-around items-center mobile:-top-12"
          onClick={confirmLoad}
        >
          <button
            className={clsx(
              'serlo-button serlo-make-interactive-primary',
              'text-[1.33rem] group-hover:bg-brand-light group-hover:text-white'
            )}
            onKeyDown={onKeyDown}
          >
            <FontAwesomeIcon
              className="pt-1"
              icon={
                showIframe
                  ? faSpinner
                  : type === 'twingle'
                  ? faHeart
                  : entityIconMapping[type]
              }
              spin={showIframe}
            />{' '}
            {buttonLabel}
          </button>
        </div>
      </div>
    )
  }
}
