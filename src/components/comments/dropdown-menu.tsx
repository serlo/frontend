import {
  faCheck,
  faPaperclip,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from 'styled-components'

import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { UserRoles } from '@/data-types'
import { makeTransparentButton } from '@/helper/css'
import {
  useSetCommentStateMutation,
  useThreadArchivedMutation,
} from '@/helper/mutations'

interface DropdownMenuProps {
  isParent?: boolean
  date: Date
  id: number
  highlight: (id: number) => void
  onAnyClick: () => void
  threadId?: string
}

export function DropdownMenu({
  isParent,
  id,
  date,
  highlight,
  onAnyClick,
  threadId,
}: DropdownMenuProps) {
  const { lang, strings } = useInstanceData()
  const auth = useAuth()
  const isAllowed =
    auth.current !== null &&
    (auth.current?.roles.indexOf(UserRoles.Moderator) > -1 ||
      auth.current?.roles.indexOf(UserRoles.Admin) > -1)

  const setThreadArchived = useThreadArchivedMutation()
  const setCommentState = useSetCommentStateMutation()

  return (
    <DropContent>
      <DropContentButton onClick={onLinkToComment}>
        <FontAwesomeIcon icon={faPaperclip} /> {strings.comments.copyLink}
      </DropContentButton>
      {isAllowed && (
        <>
          {isParent && (
            <DropContentButton onClick={onArchiveThread}>
              <FontAwesomeIcon icon={faCheck} />{' '}
              {strings.comments.archiveThread}
            </DropContentButton>
          )}
          <DropContentButton onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />{' '}
            {isParent
              ? strings.comments.deleteThread
              : strings.comments.deleteComment}
          </DropContentButton>
        </>
      )}
      <Time>
        {strings.comments.postedOn} {date.toLocaleString(lang)}
      </Time>
    </DropContent>
  )

  function onLinkToComment() {
    onAnyClick()
    highlight(id)
    history.replaceState(null, '', `#comment-${id}`)
    copyToClipboad(window.location.href)
  }

  function copyToClipboad(text: string) {
    const input = document.createElement('input')
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

  function onDelete() {
    onAnyClick()
    if (!isParent) {
      void setCommentState({ id, trashed: true })
    }
  }

  function onArchiveThread() {
    onAnyClick()
    if (isParent && threadId) {
      void setThreadArchived({ id: threadId, archived: true })
    }
  }
}

const DropContent = styled.div`
  text-align: right;
  background-color: ${(props) => props.theme.colors.lightBackground};
  padding: 12px 15px 12px 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  max-width: 250px;
  border-radius: 10px;
`

const DropContentButton = styled.button`
  ${makeTransparentButton}
  margin-bottom: 0.2rem;
  font-size: 1rem;
  font-weight: normal;
`

const Time = styled.span`
  display: block;
  font-size: 0.8rem;
  margin-top: 15px;
  color: ${(props) => props.theme.colors.gray};
`
