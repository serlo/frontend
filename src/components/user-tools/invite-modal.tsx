import { useContext, useEffect } from 'react'

import { Link } from '../content/link'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { EntityIdContext } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { submitEvent } from '@/helper/submit-event'

export interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const { lang, strings, footerData } = useInstanceData()
  const modalStrings = strings.edit.inviteModal
  const id = useContext(EntityIdContext)

  useEffect(() => {
    if (isOpen) submitEvent('invite2edit-open-modal')
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
      <p className="serlo-p border-t-[1px] pt-8 mt-24 mb-0 text-base">
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
            submitEvent('invite2edit-click-login')
            onClose()
          }}
        >
          <Link
            className="serlo-button serlo-make-interactive-primary"
            href="/api/auth/login"
          >
            {modalStrings.loginButton}
          </Link>
        </a>
        <a
          onClick={() => {
            submitEvent('invite2edit-click-register')
            onClose()
          }}
        >
          <Link
            className="ml-4 serlo-button serlo-make-interactive-green"
            href="/user/register"
          >
            {modalStrings.registerButton}
          </Link>
        </a>
      </>
    )
  }
}
