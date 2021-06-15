import {
  faFacebookSquare,
  faWhatsappSquare,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons'
import {
  faCopy,
  faEnvelope,
  faCompass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import * as React from 'react'
import styled from 'styled-components'

import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { EntityIdContext } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import {
  makeMargin,
  makeGreenTransparentButton,
  inputFontReset,
} from '@/helper/css'
import { submitEvent } from '@/helper/submit-event'

export interface ShareModalProps {
  open: boolean
  onClose: () => void
  contentId?: number
}

export interface ShareData {
  contentId: number
}

export function ShareModal({ open, onClose, contentId }: ShareModalProps) {
  const shareInputRef = React.useRef<HTMLInputElement>(null)
  const [copySuccess, setCopySuccess] = React.useState('')
  const { strings } = useInstanceData()
  const id = React.useContext(EntityIdContext)

  if (!open) return null

  if (open && id) {
    // submit event
    submitEvent(`share_${id}`)
  }

  function onCloseClick() {
    setCopySuccess('')
    onClose()
  }

  function copyToClipboard(event: React.MouseEvent, text?: string) {
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
      //TODO: Translate
      text: 'Link in die Zwischenablage kopiert. Einfach auf <a href="https://www.mebis.bayern.de/">mebis</a> einfügen!',
    },
  ]

  return (
    <ModalWithCloseButton
      isOpen={open}
      onCloseClick={onCloseClick}
      title={strings.share.title}
    >
      <ShareInput
        ref={shareInputRef}
        onFocus={(e) => e.target.select()}
        defaultValue={url}
      />{' '}
      {document.queryCommandSupported('copy') && (
        <>
          <Button onClick={copyToClipboard} as="button">
            <FontAwesomeIcon icon={faCopy} /> {strings.share.copyLink}
          </Button>
          {copySuccess !== '' && <Gray>{copySuccess}&nbsp;</Gray>}
          <br />
        </>
      )}{' '}
      <ButtonWrapper>
        {buildButtons(socialShare, copyToClipboard)}
      </ButtonWrapper>
      <ButtonWrapper>{buildButtons(lmsShare, copyToClipboard)}</ButtonWrapper>
    </ModalWithCloseButton>
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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    text?: string
  ) => void
) {
  //

  return list.map((entry: EntryData) => {
    const isCopyLink = entry.href === 'copy' //for mebis

    if (isCopyLink)
      return (
        <Button
          as="button"
          onClick={(
            event: React.MouseEvent<
              /*HTMLButtonElement (note: as-construct is breaking the type here)*/ any,
              MouseEvent
            >
          ) => {
            copyToClipboard(event, entry.text)
          }}
          key={entry.title}
        >
          <FontAwesomeIcon icon={entry.icon} /> {entry.title}
        </Button>
      )
    else
      return (
        <Button href={entry.href} key={entry.title}>
          <FontAwesomeIcon icon={entry.icon} /> {entry.title}
        </Button>
      )
  })
}

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
  ${makeGreenTransparentButton}
  ${inputFontReset}
  font-weight: bold;
  margin-left: 20px;
  display: inline;

  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
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
