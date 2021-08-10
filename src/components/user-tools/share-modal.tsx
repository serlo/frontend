import {
  faFacebookSquare,
  faWhatsappSquare,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons'
import {
  faCopy,
  faEnvelope,
  faCompass,
  faDownload,
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
import { showToastNotice } from '@/helper/show-toast-notice'
import { submitEvent } from '@/helper/submit-event'

export interface ShareModalProps {
  open: boolean
  onClose: () => void
  showPdf?: boolean
}

interface EntryData {
  title: string
  icon: IconDefinition
  href?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export function ShareModal({ open, onClose, showPdf }: ShareModalProps) {
  const shareInputRef = React.useRef<HTMLInputElement>(null)
  const { strings, lang } = useInstanceData()
  const id = React.useContext(EntityIdContext)

  if (!open || !id) return null

  if (open) {
    // submit event
    submitEvent(`share_${id}`)
  }

  function copyToClipboard(event: React.MouseEvent, text?: string) {
    const target = event.target as HTMLAnchorElement
    shareInputRef.current!.select()
    document.execCommand('copy')
    target.focus()
    showToastNotice(
      '👌 ' + (text ? text : strings.share.copySuccess),
      'success'
    )
  }

  const shareUrl = `${window.location.protocol}//${window.location.host}/${id}`
  const urlEncoded = encodeURIComponent(shareUrl)
  const titleEncoded = encodeURIComponent(document.title)

  const socialShare = [
    {
      title: 'E-Mail',
      icon: faEnvelope,
      href: `mailto:?subject=${titleEncoded}&body=${encodeURIComponent(
        document.title + '\n' + shareUrl
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
        document.title + ': ' + shareUrl
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
      onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        copyToClipboard(
          event,
          'Link in die Zwischenablage kopiert.\r\nEinfach auf Mebis (www.mebis.bayern.de) einfügen!'
        )
      },
    },
  ]

  const path = window.location.pathname
  const fileName = `serlo__${path.split('/').pop() ?? id}.pdf`

  const getPdfData = (noSolutions?: boolean) => {
    return {
      title: strings.share[noSolutions ? 'pdfNoSolutions' : 'pdf'],
      icon: faDownload,
      download: fileName,
      onClick: () => {
        showToastNotice('🐒 ' + strings.loading.oneMomentPlease)
      },
      href: `/api/pdf?id=${id}${noSolutions ? '&noSolutions' : ''}`,
    }
  }

  const lmsData = lang === 'de' ? lmsShare : [lmsShare[0]] //mebis only in de
  const pdfData = [getPdfData(), getPdfData(true)]

  return (
    <ModalWithCloseButton
      isOpen={open}
      onCloseClick={onClose}
      title={strings.share.title}
    >
      {renderShareInput()}
      {renderButtons(socialShare)}
      {renderButtons(lmsData)}
      {showPdf && (
        <>
          <hr className="mt-8 mb-8 mx-side" />
          {renderButtons(pdfData)}
        </>
      )}
    </ModalWithCloseButton>
  )

  function renderShareInput() {
    return (
      <>
        <ShareInput
          ref={shareInputRef}
          onFocus={(e) => e.target.select()}
          defaultValue={shareUrl}
        />{' '}
        {document.queryCommandSupported('copy') && (
          <>
            <Button onClick={copyToClipboard} as="button">
              <FontAwesomeIcon icon={faCopy} /> {strings.share.copyLink}
            </Button>
            <br />
          </>
        )}
      </>
    )
  }

  function renderButtons(list: EntryData[]) {
    return (
      <ButtonWrapper>
        {list.map((entry: EntryData) => {
          return (
            <Button
              href={entry.href ?? undefined}
              key={entry.title}
              onClick={entry.onClick ?? undefined}
            >
              <FontAwesomeIcon icon={entry.icon} /> {entry.title}
            </Button>
          )
        })}
      </ButtonWrapper>
    )
  }
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
  margin-left: 12px;
  display: inline;

  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    ${makeMargin}
    margin-top: 6px;
    display: block;
  }
`
