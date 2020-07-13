import {
  faFacebookSquare,
  faWhatsappSquare,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons'
import {
  faCopy,
  faTimes,
  faEnvelope,
  faCompass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { makeMargin, makeGreenButton, inputFontReset } from '../../helper/css'
import { Modal } from '../modal'
import { StyledH2 } from '../tags/styled-h2'
import { useInstanceData } from '@/contexts/instance-context'

interface ShareModalProps {
  open: boolean
  onClose: () => void
  contentId?: number
}

export interface ShareData {
  contentId: number
}

export function ShareModal(props: ShareModalProps) {
  const { open, onClose, contentId } = props
  const shareInputRef = React.useRef<HTMLInputElement>(null)
  const [copySuccess, setCopySuccess] = React.useState('')
  const { strings } = useInstanceData()

  if (!open) return null

  function copyToClipboard(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    text?: string
  ) {
    const target = event.target as HTMLAnchorElement
    shareInputRef.current!.select()
    document.execCommand('copy')
    target.focus()
    setCopySuccess(text ? text : strings.share.copySuccess)
  }

  const url = contentId
    ? `https://${window.location.hostname}/${contentId}`
    : window.location.href
  const urlEncoded = encodeURIComponent(url)
  const titleEncoded = encodeURIComponent(document.title)

  const socialShare = [
    {
      title: 'E-Mail',
      icon: faEnvelope,
      href: `mailto:?subject=${titleEncoded}&body=${encodeURIComponent(
        document.title + '\n' + url
      )}`,
    },
    {
      title: 'Facebook',
      icon: faFacebookSquare,
      href: `https://www.facebook.com/sharer.php?u=${urlEncoded}`,
    },
    {
      title: 'Whatsapp',
      icon: faWhatsappSquare,
      href: `whatsapp://send?text=${encodeURIComponent(
        document.title + ': ' + url
      )}`,
    },
  ]

  const lmsShare = [
    {
      title: 'Google Classroom',
      icon: faGoogle,
      href: `https://classroom.google.com/u/0/share?url=${urlEncoded}&title=${titleEncoded}&body=`,
    },
    {
      title: 'Mebis',
      icon: faCompass,
      href: 'copy',
      text:
        'Link in die Zwischenablage kopiert. Einfach auf <a href="https://www.mebis.bayern.de/">mebis</a> einfügen!',
    },
  ]

  return (
    <StyledModal isOpen={open} onRequestClose={onClose}>
      <StyledH2>{strings.share.title}</StyledH2>
      <div>
        <ShareInput
          ref={shareInputRef}
          onFocus={(e) => e.target.select()}
          defaultValue={url}
        />{' '}
        {document.queryCommandSupported('copy') && (
          <>
            <Button onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faCopy} /> {strings.share.copyLink}
            </Button>
            {copySuccess !== '' && (
              <Gray
                dangerouslySetInnerHTML={{ __html: copySuccess + '&nbsp;' }}
              />
            )}
            <br />
          </>
        )}{' '}
        <CloseButton onClick={onClose} title={strings.share.close}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </CloseButton>
        <ButtonWrapper>
          {buildButtons(socialShare, copyToClipboard)}
        </ButtonWrapper>
        <ButtonWrapper>{buildButtons(lmsShare, copyToClipboard)}</ButtonWrapper>
      </div>
    </StyledModal>
  )
}

interface EntryData {
  title: string
  icon: IconDefinition
  href: string
  text?: string
}

function buildButtons(
  list: EntryData[],
  copyToClipboard: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    text?: string
  ) => void
) {
  return list.map((entry: EntryData) => (
    <Button
      href={entry.href !== 'copy' ? entry.href : undefined}
      onClick={
        entry.href === 'copy'
          ? (e) => {
              copyToClipboard(e, entry.text)
            }
          : undefined
      }
      key={entry.title}
    >
      <FontAwesomeIcon icon={entry.icon} /> {entry.title}
    </Button>
  ))
}

//this is overriding the styles of the modal-content only. see doc to change overlay etc.
export const StyledModal = styled(Modal)`
  position: absolute;
  top: 40%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border-radius: 12px;
  max-width: 85%;
  border: 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 10px 30px 10px;
  background-color: #fff;
  outline: none;
`

const ButtonWrapper = styled.div`
  margin-top: 17px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: row;
  }
`

const ShareInput = styled.input`
  ${inputFontReset}

  border-radius: 18px;
  border: 0;
  padding: 5px 10px;
  width: 250px;

  ${makeMargin}
  margin-bottom: 8px;
  margin-right: 0;

  background-color: ${(props) => lighten(0.45, props.theme.colors.brandGreen)};

  &:focus {
    outline: none;
    box-shadow: 0 0 4px 0 ${(props) => props.theme.colors.brand};
  }
`

const Button = styled.a`
  ${makeGreenButton}
  font-weight: bold;
  margin-left: 20px;
  display: inline;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    ${makeMargin}
    margin-top: 6px;
    display: block;
  }
`

const Gray = styled.small`
  color: ${(props) => props.theme.colors.brand};
  ${makeMargin}
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 10px;
  display: block;

  > a {
    color: ${(props) => props.theme.colors.brand};
    font-weight: bold;
  }
`
const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  color: ${(props) => props.theme.colors.dark1};
  &:hover {
    background-color: ${(props) => props.theme.colors.brand};
    color: white;
  }
  width: 35px;
  height: 35px;
  border-radius: 30px;
  text-align: center;
`
