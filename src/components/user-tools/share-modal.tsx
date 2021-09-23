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
import clsx from 'clsx'
import * as React from 'react'

import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { EntityIdContext } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { submitEvent } from '@/helper/submit-event'

export interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  showPdf?: boolean
}

interface EntryData {
  title: string
  icon: IconDefinition
  href?: string
  download?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export function ShareModal({ isOpen, onClose, showPdf }: ShareModalProps) {
  const shareInputRef = React.useRef<HTMLInputElement>(null)
  const { strings, lang } = useInstanceData()
  const id = React.useContext(EntityIdContext)

  if (!isOpen || !id) return null

  submitEvent(`share_${id}`)

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
  const host =
    window.location.hostname == 'localhost' ? `https://${lang}.serlo.org` : ''

  const getPdfData = (noSolutions?: boolean) => {
    return {
      title: strings.share[noSolutions ? 'pdfNoSolutions' : 'pdf'],
      icon: faDownload,
      download: fileName,
      onClick: () => {
        showToastNotice('🐒 ' + strings.loading.oneMomentPlease)
      },
      href: `${host}/api/pdf/${id}${noSolutions ? '?noSolutions' : ''}`,
    }
  }

  const lmsData = lang === 'de' ? lmsShare : [lmsShare[0]] //mebis only in de
  const pdfData = [getPdfData(), getPdfData(true)]

  return (
    <ModalWithCloseButton
      isOpen={isOpen}
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
        <input /*ShareInput*/
          className={clsx(
            'rounded-2xl border-none py-1 px-2.5 w-[250px]',
            'mx-side mb-2 mr-0 bg-brandgreen-lighter',
            'focus:outline-none focus:shadow-input'
          )}
          ref={shareInputRef}
          onFocus={(e) => e.target.select()}
          defaultValue={shareUrl}
        />{' '}
        {document.queryCommandSupported('copy') && (
          <>
            <button className={shareButton} onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faCopy} /> {strings.share.copyLink}
            </button>
            <br />
          </>
        )}
      </>
    )
  }

  function renderButtons(list: EntryData[]) {
    return (
      <div className="flex items-start flex-col sm:flex-row mt-4">
        {list.map((entry: EntryData) => {
          return (
            <a
              className={shareButton}
              href={entry.href ?? undefined}
              key={entry.title}
              onClick={entry.onClick ?? undefined}
              download={entry.download}
            >
              <FontAwesomeIcon icon={entry.icon} /> {entry.title}
            </a>
          )
        })}
      </div>
    )
  }
}

const shareButton = /* className={ */ clsx(
  'serlo-button text-brandgreen hover:bg-brandgreen hover:text-white',
  'mx-side mt-1.5 block text-base py-0.5',
  'sm:ml-3 sm:mr-0 sm:inline sm:mt-0'
) /*}*/
