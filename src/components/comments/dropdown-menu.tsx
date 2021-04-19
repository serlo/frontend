import {
  faCheck,
  faPaperclip,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Thread } from '@serlo/authorization'
import styled from 'styled-components'

import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { makeTransparentButton } from '@/helper/css'
import {
  useSetCommentStateMutation,
  useSetThreadStateMutation,
  useThreadArchivedMutation,
} from '@/helper/mutations'

interface DropdownMenuProps {
  isParent?: boolean
  archived?: boolean
  date: Date
  id: number
  highlight: (id: number) => void
  onAnyClick: () => void
  threadId?: string
}

export function DropdownMenu({
  isParent,
  archived,
  id,
  date,
  highlight,
  onAnyClick,
  threadId,
}: DropdownMenuProps) {
  const { lang, strings } = useInstanceData()

  const setThreadArchived = useThreadArchivedMutation()
  const setThreadState = useSetThreadStateMutation()
  const setCommentState = useSetCommentStateMutation()
  // const setThreadArchived = useThreadArchivedMutation()
  // const setCommentState = useSetCommentStateMutation()

  const canDo = useCanDo()

  console.log(canDo(Thread.setThreadState), canDo(Thread.setCommentState))

  const canDelete = isParent
    ? canDo(Thread.setThreadState)
    : canDo(Thread.setCommentState)
  const canArchive = isParent && canDo(Thread.setThreadArchived)

  return (
    <DropContent>
      <DropContentButton onClick={onLinkToComment}>
        <FontAwesomeIcon icon={faPaperclip} /> {strings.comments.copyLink}
      </DropContentButton>
      {canArchive && (
        <DropContentButton onClick={onArchiveThread}>
          <FontAwesomeIcon icon={faCheck} />{' '}
          {archived
            ? strings.comments.restoreThread
            : strings.comments.archiveThread}
        </DropContentButton>
      )}
      {canDelete && (
        <DropContentButton onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />{' '}
          {isParent
            ? strings.comments.deleteThread
            : strings.comments.deleteComment}
        </DropContentButton>
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
      void setCommentState({ id: [id], trashed: true })
      return
    }
    if (isParent && threadId) {
      void setThreadState({ id: [threadId], trashed: true })
      // void setCommentState({ id: [id], trashed: true })
    }
  }

  function onArchiveThread() {
    onAnyClick()
    if (isParent && threadId) {
      void setThreadArchived({ id: [threadId], archived: !archived })
      // void setThreadArchived({ id: [threadId], archived: true })
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
  ${makeTransparentButton};
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
