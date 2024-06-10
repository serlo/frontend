import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { FaIcon } from '../fa-icon'
import { useAuthentication } from '@/auth/use-authentication'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useCreateThreadMutation } from '@/mutations/thread'

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
  const [mounted, setMounted] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => setMounted(true), [])

  if (!mounted || !auth) return null
  const isRegistered = !!chatUrl

  const text = isOwnProfile
    ? strings.profiles[isRegistered ? 'goToChat' : 'registerChat']
    : strings.profiles[isRegistered ? 'directMessage' : 'inviteToChat']

  const url = isOwnProfile ? 'https://community.serlo.org/' : chatUrl
  const onClickAction =
    isOwnProfile || isRegistered ? undefined : () => setShowInviteModal(true)

  return (
    <>
      <a
        href={url}
        onClick={onClickAction}
        className={cn(
          className,
          'serlo-button-green mt-[5px] block w-44 self-start text-center [grid-area:chatButton]'
        )}
      >
        <FaIcon icon={faPaperPlane} /> {text}
      </a>
      {!isOwnProfile && !isRegistered && renderInviteModal()}
    </>
  )

  async function inviteToChat() {
    setPending(true)
    const success = await createThread({
      title: '',
      content: message ?? '',
      objectId: userId,
      subscribe: false,
      sendEmail: false,
    })
    setPending(false)
    if (success) {
      setShowInviteModal(false)
      showToastNotice(strings.profiles.inviteModal.success, 'success')
    } else showToastNotice(strings.loading.unknownProblem, 'warning')
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
        setIsOpen={setShowInviteModal}
        title={strings.profiles.inviteToChat}
      >
        <p className="serlo-p">
          {replacePlaceholders(part1, { chatLink, username })}
          <br />
          {replacePlaceholders(part2, { username })}
        </p>
        <div
          className={cn(`
            mx-side mb-7 mt-4 flex items-center rounded-2xl
            bg-brandgreen-50 py-1
            transition-colors duration-200 ease-in focus-within:bg-brandgreen-100
          `)}
        >
          <TextareaAutosize
            value={message}
            id="inviteToChatMessage"
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setMessage(event.target.value)
            }}
            placeholder={strings.profiles.inviteModal.messagePlaceholder}
            minRows={2}
            className={cn(
              'serlo-input-font-reset w-full text-lg',
              'resize-none border-0 bg-transparent text-black outline-none',
              'pl-4 pr-14',
              'placeholder-brandgreen'
            )}
          />
        </div>
        <p className="serlo-p">
          <a
            onClick={pending ? undefined : inviteToChat}
            className="serlo-button-green"
          >
            <FaIcon
              icon={pending ? faSpinner : faPaperPlane}
              className={cn(pending && 'animate-spin-slow')}
            />{' '}
            {button}
          </a>
        </p>
      </ModalWithCloseButton>
    )
  }
}
