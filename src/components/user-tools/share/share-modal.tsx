import {
  faFacebookSquare,
  faGoogle,
  faWhatsappSquare,
} from '@fortawesome/free-brands-svg-icons'
import {
  faCompass,
  faCopy,
  faDownload,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import QRCode from 'qrcode.react'
import { MouseEvent, useRef, useContext } from 'react'

import { FaIcon, FaIconProps } from '../../fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { EntityIdContext } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { colors } from '@/helper/colors'
import { showToastNotice } from '@/helper/show-toast-notice'

export interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  showPdf?: boolean
  path?: string
}

interface EntryData {
  title: string
  icon: FaIconProps['icon']
  href?: string
  download?: string
  onClick?: (event: MouseEvent) => void
}

export function ShareModal({
  isOpen,
  onClose,
  showPdf,
  path,
}: ShareModalProps) {
  const shareInputRef = useRef<HTMLInputElement>(null)
  const { strings, lang } = useInstanceData()
  const id = useContext(EntityIdContext)
  const pathOrId = path ?? id

  if (!isOpen || !pathOrId) return null

  function copyToClipboard(event: MouseEvent, text?: string) {
    const target = event.target as HTMLAnchorElement
    shareInputRef.current!.select()
    document.execCommand('copy')
    target.focus()
    showToastNotice(
      '👌 ' + (text ? text : strings.share.copySuccess),
      'success'
    )
  }

  const shareUrl = `${window.location.protocol}//${window.location.host}/${pathOrId}`
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
      onClick: (event: MouseEvent) => {
        copyToClipboard(
          event,
          'Link in die Zwischenablage kopiert.\r\nEinfach auf Mebis (www.mebis.bayern.de) einfügen!'
        )
      },
    },
  ]

  const getPdfData = (noSolutions?: boolean) => {
    if (!id) return null
    const pathName = window.location.pathname
    const fileName = `serlo__${pathName.split('/').pop() ?? id}.pdf`
    const host =
      window.location.hostname === 'localhost'
        ? `https://${lang}.serlo.org`
        : ''

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

  const lmsData = lang === Instance.De ? lmsShare : [lmsShare[0]] //mebis only in de
  const pdfData = [getPdfData(), getPdfData(true)]

  return (
    <ModalWithCloseButton
      isOpen={isOpen}
      onCloseClick={onClose}
      title={strings.share.title}
      className="top-1/2"
    >
      <div className="sm:float-right mx-side mb-4 sm:mb-0">
        <QRCode value={shareUrl} renderAs="svg" fgColor={colors.brand} />
      </div>
      {renderShareInput()}
      <hr className="my-4 mx-side" />
      {renderButtons(lmsData)}
      <hr className="my-4 mx-side" />
      {renderButtons(socialShare)}
      {showPdf && (
        <>
          <hr className="my-4 mx-side" />
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
            'ml-3 mb-2 mr-0 bg-brandgreen-50',
            'focus:outline-none focus:shadow-input'
          )}
          ref={shareInputRef}
          onFocus={(e) => e.target.select()}
          defaultValue={shareUrl}
        />{' '}
        {document.queryCommandSupported('copy') && (
          <>
            <br />
            <button className={shareButton} onClick={copyToClipboard}>
              <FaIcon icon={faCopy} /> {strings.share.copyLink}
            </button>
          </>
        )}
      </>
    )
  }

  function renderButtons(list: (EntryData | null)[]) {
    return (
      <div className="flex items-start flex-col sm:flex-row mt-4">
        {list.map((entry: EntryData | null) => {
          if (!entry) return null
          return (
            <a
              className={shareButton}
              href={entry.href ?? undefined}
              key={entry.title}
              onClick={entry.onClick ?? undefined}
              download={entry.download}
            >
              <FaIcon icon={entry.icon} /> {entry.title}
            </a>
          )
        })}
      </div>
    )
  }
}

const shareButton = /* className={ */ clsx(
  'serlo-button-green-transparent',
  'mx-side block mt-1.5 text-base py-0.5',
  'sm:ml-3 sm:mr-0 sm:inline sm:mt-0'
) /* } */
