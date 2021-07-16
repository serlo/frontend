import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { makeGreenButton } from '@/helper/css'
import { shouldUseNewAuth } from '@/helper/feature-auth'
// import { useCreateThreadMutation } from '@/helper/mutations'
import { showToastNotice } from '@/helper/show-toast-notice'

interface ProfileChatButtonProps {
  userId: number
  isOwnProfile: boolean
  chatUrl?: string
  className?: string
}

export function ProfileChatButton({
  userId,
  isOwnProfile,
  chatUrl,
  className,
}: ProfileChatButtonProps) {
  const { strings } = useInstanceData()
  // const createThread = useCreateThreadMutation()
  const auth = useAuthentication()
  const [mounted, setMounted] = useState(!shouldUseNewAuth())

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
  const onClickAction = isOwnProfile || isRegistered ? undefined : inviteToChat

  return (
    <ChatButton href={url} onClick={onClickAction} className={className}>
      <FontAwesomeIcon icon={faPaperPlane} /> {text}
    </ChatButton>
  )

  function inviteToChat() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _userId = userId
    showToastNotice('⚠️ Sorry! Feature will be added soon ⚠️')
    // await createThread({
    //   title: '',
    //   content: 'Hi, wanna chat?!',
    //   objectId: 1565, // userId TODO: add support for comments in user pages in db-layer
    //   subscribe: false,
    //   sendEmail: false,
    // })
    // showToastNotice('✨ Erfolgreich eingeladen!', 'success')
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
