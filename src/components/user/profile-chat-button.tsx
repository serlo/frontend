import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

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
      <style jsx>{`
        a {
          display: block;
          width: 175px;
          text-align: center;
          grid-area: chatButton;
          align-self: self-start;
          margin-top: 5px;
        }
      `}</style>
      <a
        href={url}
        onClick={onClickAction}
        className={clsx(
          className,
          'serlo-button serlo-make-interactive-green '
        )}
      >
        <FontAwesomeIcon icon={faPaperPlane} /> {text}
      </a>
      {!isOwnProfile && !isRegistered && renderInviteModal()}
    </>
  )

  async function inviteToChat() {
    await createThread({
      title: '',
      content: strings.profiles.invitation
        .replace('%username%', auth.current?.username!)
        .replace('%chatlink%', 'https://community.serlo.org'),
      objectId: userId,
      subscribe: false,
      sendEmail: false,
    })
    showToastNotice('✨ Erfolgreich eingeladen!', 'success')
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
