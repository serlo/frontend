import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { makeGreenButton } from '@/helper/css'
import { useCreateThreadMutation } from '@/helper/mutations'
import { showToastNotice } from '@/helper/show-toast-notice'

interface ProfileChatButtonProps {
  userId: number
  isOwnProfile: boolean
  chatUrl?: string
}

export function ProfileChatButton({
  userId,
  isOwnProfile,
  chatUrl,
}: ProfileChatButtonProps) {
  const { strings } = useInstanceData()
  const createThread = useCreateThreadMutation()
  const auth = useAuthentication()
  if (auth.current === null) return null

  const text = isOwnProfile
    ? chatUrl
      ? strings.profiles.goToChat
      : strings.profiles.registerChat
    : chatUrl
    ? strings.profiles.directMessage
    : strings.profiles.inviteToChat

  const url = isOwnProfile ? 'https://community.serlo.org/' : chatUrl
  const onClickAction = isOwnProfile || chatUrl ? undefined : inviteToChat

  return (
    <ChatButton href={url} onClick={onClickAction}>
      <FontAwesomeIcon icon={faPaperPlane} /> {text}
    </ChatButton>
  )

  async function inviteToChat() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _userId = userId
    await createThread({
      title: '',
      content: 'Hi, wanna chat?!',
      objectId: 1565, // userId TODO: add support for comments in user pages in db-layer
      subscribe: false,
      sendEmail: false,
    })
    showToastNotice('✨ Erfolgreich eingeladen!', 'success')
  }
}

const ChatButton = styled.a`
  ${makeGreenButton}
  display: block;
  width: 175px;
  text-align: center;
  grid-area: chatButton;
  align-self: self-start;
  margin-top: 5px;
`
