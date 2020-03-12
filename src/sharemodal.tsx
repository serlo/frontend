import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCopy,
  faTimes,
  faEnvelope,
  faCompass
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookSquare,
  faWhatsappSquare,
  faGoogle
} from '@fortawesome/free-brands-svg-icons'

import Modal from './reactmodal'

export default function ShareModal(props) {
  if (typeof window === 'undefined') return null
  const { open, onClose } = props
  const shareInputRef = React.useRef(null)
  const [copySuccess, setCopySuccess] = React.useState('')

  function copyToClipboard(e) {
    shareInputRef.current.select()
    document.execCommand('copy')
    e.target.focus()
    setCopySuccess('In Zwischenablage kopiert!')
  }

  const url = window.location.href
  const urlEncoded = encodeURIComponent(url)
  const titleEncoded = encodeURIComponent(document.title)

  const socialShare = [
    {
      title: 'E-Mail',
      icon: faEnvelope,
      href: `mailto:?subject=${titleEncoded}&body=${encodeURIComponent(
        document.title + '\n' + url
      )}`
    },
    {
      title: 'Facebook',
      icon: faFacebookSquare,
      href: `https://www.facebook.com/sharer.php?u=${urlEncoded}`
    },
    {
      title: 'Whatsapp',
      icon: faWhatsappSquare,
      href: `whatsapp://send?text=${encodeURIComponent(
        document.title + ': ' + url
      )}`
    }
  ]

  const lmsShare = [
    {
      title: 'Google Classroom',
      icon: faGoogle,
      href: `https://classroom.google.com/u/0/share?url=${urlEncoded}&title=${titleEncoded}&body=`
    },
    {
      title: 'Mebis',
      icon: faCompass,
      href: 'https://www.facebook.com/sharer.php?u={url}'
    }
  ]

  return (
    <Modal isOpen={open} onRequestClose={onClose} style={ModalStyles}>
      <StyledH2>Teile den Inhalt!</StyledH2>
      <div>
        <ShareInput
          ref={shareInputRef}
          onFocus={e => e.target.select()}
          defaultValue={url}
        />{' '}
        {document.queryCommandSupported('copy') && (
          <Button onClick={copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} /> Kopieren
          </Button>
        )}{' '}
        <br />
        <Gray>{copySuccess}&nbsp;</Gray>
        <CloseButton onClick={onClose} title="Close">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </CloseButton>
        <div>{buildButtons(socialShare)}</div>
        <br />
        <div>{buildButtons(lmsShare)}</div>
      </div>
    </Modal>
  )
}

const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '480px',
    borderRadius: '17px'
  }
}

const StyledH2 = styled.h2`
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.01em;
`

const ShareInput = styled.input`
  border-radius: 18px;
  border: 0;
  padding: 5px;
  width: 250px;
  background-color: ${props => lighten(0.45, props.theme.colors.brandGreen)};

  &:focus {
    outline: none;
    box-shadow: 0 0 4px 0 ${props => props.theme.colors.brand};
  }
`

const Button = styled.button`
  color: ${props => props.theme.colors.brandGreen};
  background-color: transparent;
  border: none;
  &:hover {
    color: white;
    background-color: ${props => props.theme.colors.brandGreen};
  }
  padding: 5px;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 20px;
`

const Gray = styled.small`
  opacity: 0.6;
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
`
const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  color: ${props => props.theme.colors.dark1};
  &:hover {
    background-color: ${props => props.theme.colors.brand};
    color: white;
  }
  width: 40px;
  height: 40px;
  border-radius: 30px;
  text-align: center;
`

function buildButtons(list) {
  return list.map(entry => (
    <Button
      onClick={() => {
        window.location.href = entry.href
      }}
      key={entry.title}
    >
      <FontAwesomeIcon icon={entry.icon} /> {entry.title}
    </Button>
  ))
}
