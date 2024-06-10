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
import QRCode from 'qrcode.react'
import { MouseEvent, useState, useEffect } from 'react'

import { FaIcon, FaIconProps } from '../../fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { useEntityData } from '@/contexts/uuids-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
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
  const { strings, lang } = useInstanceData()
  const { entityId } = useEntityData()
  const pathOrId = path ?? entityId
  const [isClipboardSupported, setIsClipboardSupported] = useState(false)

  useEffect(() => {
    setIsClipboardSupported(navigator.clipboard !== undefined)
  }, [])

  if (!isOpen || !pathOrId) return null

  async function copyToClipboard(text?: string) {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToastNotice(
        '👌 ' + (text ? text : strings.share.copySuccess),
        'success'
      )
    } catch (err) {
      showToastNotice(
        '❌ ' + (text ? text : strings.share.copyFailed),
        'warning'
      )
    }
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
      onClick: () =>
        void copyToClipboard(
          'Link in die Zwischenablage kopiert.\r\nEinfach auf Mebis (www.mebis.bayern.de) einfügen!'
        ),
    },
  ]

  const getPdfData = (noSolutions?: boolean) => {
    if (!entityId) return null
    const pathName = window.location.pathname
    const fileName = `serlo__${pathName.split('/').pop() ?? entityId}.pdf`
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
      href: `${host}/api/pdf/${entityId}${noSolutions ? '?noSolutions' : ''}`,
    }
  }

  const lmsData = lang === Instance.De ? lmsShare : [lmsShare[0]] // mebis only in de
  const pdfData = [getPdfData(), getPdfData(true)]

  return (
    <ModalWithCloseButton
      isOpen={isOpen}
      onCloseClick={onClose}
      title={strings.share.title}
      className="top-1/2"
    >
      <div className="mx-side mb-4 sm:float-right sm:mb-0">
        <QRCode value={shareUrl} renderAs="svg" fgColor={colors.brand} />
      </div>
      {renderShareInput()}
      <hr className="mx-side my-4" />
      {renderButtons(lmsData)}
      <hr className="mx-side my-4" />
      {renderButtons(socialShare)}
      {showPdf && (
        <>
          <hr className="mx-side my-4" />
          {renderButtons(pdfData)}
        </>
      )}
    </ModalWithCloseButton>
  )

  function renderShareInput() {
    return (
      <>
        <input
          className={cn(`
            mb-2 ml-3 mr-0 w-[250px] rounded-2xl
            border-none bg-brandgreen-50 px-2.5 py-1
            focus:shadow-input focus:outline-none
          `)}
          onFocus={(e) => e.target.select()}
          defaultValue={shareUrl}
        />
        {isClipboardSupported && (
          <>
            <br />
            <button className={shareButton} onClick={() => copyToClipboard()}>
              <FaIcon icon={faCopy} /> {strings.share.copyLink}
            </button>
          </>
        )}
      </>
    )
  }

  function renderButtons(list: (EntryData | null)[]) {
    return (
      <div className="mt-4 flex flex-col items-start sm:flex-row">
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

const shareButton = cn(`
  serlo-button-green-transparent
  mx-side mt-1.5 block py-0.5 text-base
  sm:ml-3 sm:mr-0 sm:mt-0 sm:inline
`)
