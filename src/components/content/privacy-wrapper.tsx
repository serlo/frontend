import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactChild } from 'react'
import styled from 'styled-components'

import { useInstanceData } from '@/contexts/instance-context'
import { cloudflareWorkerDomain } from '@/helper/cloudflare-worker-domain'
import { makeMargin, makePadding, makePrimaryButton } from '@/helper/css'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'

// inspired by https://github.com/ibrahimcesar/react-lite-youtube-embed
// also borrowed some code

export enum Provider {
  YouTube = 'youtube',
  WikimediaCommons = 'wikimedia',
  Vimeo = 'vimeo',
  GeoGebra = 'geogebra',
  Twingle = 'twingle',
}

interface PrivacyWrapperProps {
  children: ReactChild
  placeholder?: ReactChild
  type: 'video' | 'applet' | 'twingle'
  provider: Provider
  embedUrl?: string
  twingleCallback?: () => void
}

export function PrivacyWrapper({
  children,
  placeholder,
  type,
  provider,
  embedUrl,
  twingleCallback,
}: PrivacyWrapperProps) {
  const [showIframe, setShowIframe] = React.useState(false)

  const { strings } = useInstanceData()

  const confirmLoad = () => {
    if (showIframe) return
    if (type === 'twingle' && twingleCallback) twingleCallback()
    setShowIframe(true)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!showIframe && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      confirmLoad()
    }
  }

  return (
    <Wrapper noMargin={type === 'twingle'}>
      {renderPlaceholder()}
      {showIframe && children}
    </Wrapper>
  )

  function renderPlaceholder() {
    if (placeholder) return placeholder
    const buttonLabel = strings.embed[type]
    const providerLabel = renderProvider(provider)
    if (type === 'twingle' && showIframe) return null

    const previewImageUrl = `https://embed.${cloudflareWorkerDomain}/thumbnail?url=${encodeURIComponent(
      embedUrl || ''
    )}`

    return (
      <Placeholder>
        <PreviewImageWrapper>
          <PreviewImage src={previewImageUrl} />
        </PreviewImageWrapper>
        <InfoBar>
          {replacePlaceholders(strings.embed.text, {
            provider: <b>{providerLabel}</b>,
            privacypolicy: (
              <a href="/privacy" target="_blank">
                {strings.embed.link}
              </a>
            ),
          })}
        </InfoBar>
        <ButtonWrap onClick={confirmLoad}>
          <Playbutton onKeyDown={onKeyDown}>
            <FontAwesomeIcon
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
          </Playbutton>
        </ButtonWrap>
      </Placeholder>
    )
  }

  function renderProvider(provider: Provider) {
    switch (provider) {
      case Provider.YouTube:
        return 'YouTube'
      case Provider.WikimediaCommons:
        return 'Wikimedia Commons'
      case Provider.Vimeo:
        return 'Vimeo'
      case Provider.GeoGebra:
        return 'GeoGebra'
      case Provider.Twingle:
        return 'Twingle'
    }
  }
}

const InfoBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  padding-top: 8px;
  padding-bottom: 8px;
  ${makePadding};
  background-color: ${(props) => props.theme.colors.brand};
  color: #fff;
  cursor: default;

  > a {
    color: #fff;
  }
`

const Placeholder = styled.div`
  text-align: center;
`
const ButtonWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Playbutton = styled.button`
  ${makePrimaryButton};
  font-size: 1.33rem;
  > svg {
    padding-top: 3px;
  }
`

const PreviewImageWrapper = styled.div`
  position: relative;
  padding-bottom: 56.2%;
`

const PreviewImage = styled.img`
  position: absolute;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div<{ noMargin?: boolean }>`
  ${(props) => (props.noMargin ? '' : makeMargin)};
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  position: relative;
  display: block;
  contain: content;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
`
