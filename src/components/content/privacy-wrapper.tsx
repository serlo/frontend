import {
  faCubes,
  faPlayCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactChild } from 'react'
import styled from 'styled-components'

import { makeMargin, makePadding, makePrimaryButton } from '@/helper/css'

// inspired by https://github.com/ibrahimcesar/react-lite-youtube-embed
// also borrowed some code

interface PrivacyWrapperProps {
  children: ReactChild
  placeholder?: ReactChild
  type: 'video' | 'applet'
  previewImageUrl: string
}

export function PrivacyWrapper({
  children,
  placeholder,
  type,
  previewImageUrl,
}: PrivacyWrapperProps) {
  const [showIframe, setShowIframe] = React.useState(false)

  const addIframe = () => {
    if (showIframe) return
    setShowIframe(true)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!showIframe && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      addIframe()
    }
  }

  return (
    <Wrapper>
      {renderPlaceholder()}
      {showIframe && children}
    </Wrapper>
  )

  function renderPlaceholder() {
    if (placeholder) return placeholder
    return (
      <Placeholder>
        {previewImageUrl && (
          <PreviewImageWrapper>
            <PreviewImage src={previewImageUrl} />
          </PreviewImageWrapper>
        )}
        <InfoBar>
          This is basically the gate to hell. Wanderers, be warned.{' '}
          <a href="/test">Testlink</a>.
        </InfoBar>
        <ButtonWrap onClick={addIframe}>
          <Playbutton onKeyDown={onKeyDown}>
            <FontAwesomeIcon
              icon={
                showIframe
                  ? faSpinner
                  : type === 'video'
                  ? faPlayCircle
                  : faCubes
              }
              spin={showIframe}
            />{' '}
            {type === 'video' && 'Video abspielen'}
            {type === 'applet' && 'Applet laden'}
          </Playbutton>
        </ButtonWrap>
      </Placeholder>
    )
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
  ${makePadding}
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
  ${makePrimaryButton}
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

const Wrapper = styled.div`
  ${makeMargin}
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  position: relative;
  display: block;
  contain: content;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
`
