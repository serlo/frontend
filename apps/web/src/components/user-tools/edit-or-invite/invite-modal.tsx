import { useEffect } from 'react'

import { Link } from '../../content/link'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { loginUrl, registrationUrl } from '@/components/pages/auth/utils'
import { useInstanceData } from '@/contexts/instance-context'
import { useEntityData } from '@/contexts/uuids-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { submitEvent } from '@/helper/submit-event'

export interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
  type: string
}

export function InviteModal({ isOpen, onClose, type }: InviteModalProps) {
  const { lang, strings, footerData } = useInstanceData()
  const modalStrings = strings.editOrAdd.inviteModal
  const { entityId } = useEntityData()

  useEffect(() => {
    if (isOpen) submitEvent('invite2edit-open-modal-' + type)
  })

  if (!isOpen || !entityId) return null

  return (
    <ModalWithCloseButton
      isOpen={isOpen}
      setIsOpen={(open) => {
        if (!open) {
          onClose()
        }
      }}
      title={modalStrings.title}
      className="top-1/2"
    >
      <p className="serlo-p">
        {replacePlaceholders(modalStrings.text, { break: <br /> })}
      </p>
      <p className="serlo-p">{renderButtons()}</p>
      <p className="serlo-p mb-0 mt-24 border-t-[1px] pt-8 text-base">
        {replacePlaceholders(modalStrings.psText, {
          link: (
            <Link
              href={lang === 'de' ? '/community' : footerData.participationHref}
              onClick={onClose}
            >
              {modalStrings.psLinkText}
            </Link>
          ),
        })}
      </p>
    </ModalWithCloseButton>
  )

  function renderButtons() {
    return (
      <>
        <Link
          className="serlo-button-blue"
          href={loginUrl}
          onClick={() => {
            submitEvent('invite2edit-click-login-' + type)
            onClose()
          }}
        >
          {modalStrings.loginButton}
        </Link>
        <Link
          className="serlo-button-green ml-4"
          href={registrationUrl}
          onClick={() => {
            submitEvent('invite2edit-click-register-' + type)
            onClose()
          }}
        >
          {modalStrings.registerButton}
        </Link>
      </>
    )
  }
}
