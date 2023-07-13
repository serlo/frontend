import { useContext, useEffect } from 'react'

import { Link } from '../../content/link'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { loginUrl, registrationUrl } from '@/components/pages/auth/utils'
import { EntityIdContext } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
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
  const id = useContext(EntityIdContext)

  useEffect(() => {
    if (isOpen) submitEvent('invite2edit-open-modal-' + type)
  })

  if (!isOpen || !id) return null

  return (
    <ModalWithCloseButton
      isOpen={isOpen}
      onCloseClick={onClose}
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
            <a onClick={onClose}>
              <Link
                href={
                  lang === 'de' ? '/community' : footerData.participationHref
                }
              >
                {modalStrings.psLinkText}
              </Link>
            </a>
          ),
        })}
      </p>
    </ModalWithCloseButton>
  )

  function renderButtons() {
    return (
      <>
        {' '}
        <a
          onClick={() => {
            submitEvent('invite2edit-click-login-' + type)
            onClose()
          }}
        >
          <Link className="serlo-button-blue" href={loginUrl}>
            {modalStrings.loginButton}
          </Link>
        </a>
        <a
          onClick={() => {
            submitEvent('invite2edit-click-register-' + type)
            onClose()
          }}
        >
          <Link className="serlo-button-green ml-4" href={registrationUrl}>
            {modalStrings.registerButton}
          </Link>
        </a>
      </>
    )
  }
}
