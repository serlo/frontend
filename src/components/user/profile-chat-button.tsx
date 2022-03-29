import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { useAuthentication } from '@/auth/use-authentication'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { shouldUseNewAuth } from '@/helper/feature-auth'
import { useCreateThreadMutation } from '@/helper/mutations'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { showToastNotice } from '@/helper/show-toast-notice'

interface ProfileChatButtonProps {
  userId: number
  username: string
  isOwnProfile: boolean
  chatUrl?: string
  className?: string
}

export function ProfileChatButton({
  userId,
  username,
  isOwnProfile,
  chatUrl,
  className,
}: ProfileChatButtonProps) {
  const { strings } = useInstanceData()
  const createThread = useCreateThreadMutation()
  const auth = useAuthentication()
  const [mounted, setMounted] = useState(!shouldUseNewAuth())
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (auth.current === null) return null
  const isRegistered = !!chatUrl

  const text = isOwnProfile
    ? isRegistered
      ? strings.profiles.goToChat
      : strings.profiles.registerChat
    : isRegistered
    ? strings.profiles.directMessage
    : strings.profiles.inviteToChat

  const url = isOwnProfile ? 'https://community.serlo.org/' : chatUrl
  const onClickAction =
    isOwnProfile || isRegistered ? undefined : () => setShowInviteModal(true)

  return (
    <>
      <a
        href={url}
        onClick={onClickAction}
        className={clsx(
          className,
          'serlo-button serlo-make-interactive-green block text-center mt-[5px] w-44 self-start'
        )}
        style={{ gridArea: 'chatButton' }}
      >
        <FontAwesomeIcon icon={faPaperPlane} /> {text}
      </a>
      {!isOwnProfile && !isRegistered && renderInviteModal()}
    </>
  )

  async function inviteToChat() {
    await createThread({
      title: '',
      content: message ?? '',
      objectId: userId,
      subscribe: false,
      sendEmail: false,
    })
    showToastNotice(strings.profiles.inviteModal.success, 'success')
  }

  function renderInviteModal() {
    const { part1, part2, button } = strings.profiles.inviteModal
    const chatLink = (
      <a
        className="serlo-link whitespace-nowrap"
        href="https://community.serlo.org"
      >
        community.serlo.org
      </a>
    )
    return (
      <ModalWithCloseButton
        isOpen={showInviteModal}
        onCloseClick={() => setShowInviteModal(false)}
        title={strings.profiles.inviteToChat}
      >
        <p className="serlo-p">
          {replacePlaceholders(part1, { chatLink, username })}
          <br />
          {replacePlaceholders(part2, { username })}
        </p>
        <div
          className={clsx(
            'mx-side mt-4 mb-7 flex items-center rounded-2xl',
            'bg-brandgreen-lighter focus-within:bg-brandgreen-light',
            'transition-colors duration-200 ease-in py-1'
          )}
        >
          <TextareaAutosize
            value={message}
            id="inviteToChatMessage"
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setMessage(event.target.value)
            }}
            placeholder={strings.profiles.inviteModal.messagePlaceholder}
            minRows={2}
            className={clsx(
              'serlo-input-font-reset w-full text-lg',
              'text-black border-0 bg-transparent outline-none resize-none',
              'pr-14 pl-4',
              'placeholder-brandgreen'
            )}
          />
        </div>
        <p className="serlo-p">
          <a
            onClick={inviteToChat}
            className="serlo-button serlo-make-interactive-green"
          >
            {button}
          </a>
        </p>
      </ModalWithCloseButton>
    )
  }
}
