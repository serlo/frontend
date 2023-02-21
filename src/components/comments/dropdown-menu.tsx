import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { Thread } from '@serlo/authorization'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
import { useCanDo } from '@/auth/use-can-do'
import { useEntityId } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import {
  useSetCommentStateMutation,
  useSetThreadStateMutation,
  useThreadArchivedMutation,
} from '@/mutations/thread'

interface DropdownMenuProps {
  isParent?: boolean
  archived?: boolean
  date: Date
  id: number
  highlight: (id: number) => void
  onAnyClick: () => void
  threadId?: string
  startEditing?: () => void
}

export function DropdownMenu({
  isParent,
  archived,
  id,
  date,
  highlight,
  onAnyClick,
  threadId,
  startEditing,
}: DropdownMenuProps) {
  const { lang, strings } = useInstanceData()

  const setThreadArchived = useThreadArchivedMutation()
  const setThreadState = useSetThreadStateMutation()
  const setCommentState = useSetCommentStateMutation()

  const canDo = useCanDo()

  const canDelete = isParent
    ? canDo(Thread.setThreadState)
    : canDo(Thread.setCommentState)
  const canArchive = isParent && canDo(Thread.setThreadArchived)

  // we assume that the user who can create a comment can also edit it
  const canEdit = isParent
    ? canDo(Thread.createThread)
    : canDo(Thread.createComment)

  const entityId = useEntityId()

  return (
    <div
      className={clsx(
        'text-right bg-brand-50 py-3 pr-4 pl-2.5',
        'shadow max-w-65 rounded-lg'
      )}
    >
      {buildButton(
        onLinkToComment,
        <>
          <FaIcon icon={faPaperclip} /> {strings.comments.copyLink}
        </>
      )}
      {canEdit &&
        startEditing &&
        buildButton(
          startEditing,
          <>
            {' '}
            <FaIcon icon={faPencil} /> {strings.comments.edit}
          </>
        )}
      {canArchive &&
        buildButton(
          onArchiveThread,
          <>
            <FaIcon icon={faCheck} />{' '}
            {archived
              ? strings.comments.restoreThread
              : strings.comments.archiveThread}
          </>
        )}
      {canDelete &&
        buildButton(
          onDelete,
          <>
            <FaIcon icon={faTrash} />{' '}
            {isParent
              ? strings.comments.deleteThread
              : strings.comments.deleteComment}
          </>
        )}
      <span className={clsx('block text-sm mt-3.5 text-truegray-500')}>
        {strings.comments.postedOn} {date.toLocaleString(lang)}
      </span>
    </div>
  )

  function onLinkToComment() {
    const isOnEntity = window.location.href.includes(entityId.toString())
    onAnyClick()
    if (isOnEntity) highlight(id)
    history.replaceState(null, '', `/${entityId}/#comment-${id}`)
    copyToClipboad(window.location.href)
    showToastNotice('👌 ' + strings.share.copySuccess, 'success')
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
      if (window.confirm(strings.comments.deleteComment + '?')) {
        void setCommentState({ id: [id], trashed: true })
      }
      return
    }
    if (isParent && threadId) {
      if (window.confirm(strings.comments.deleteThread + '?')) {
        void setThreadState({ id: [threadId], trashed: true })
      }
    }
  }

  function onArchiveThread() {
    onAnyClick()
    if (isParent && threadId) {
      if (window.confirm(strings.comments.archiveThread + '?')) {
        void setThreadArchived({ id: [threadId], archived: !archived })
      }
    }
  }

  function buildButton(onClick: () => void, children: JSX.Element) {
    return (
      <button
        className={clsx(
          'serlo-button-blue-transparent',
          'mb-1 text-base font-normal leading-browser'
        )}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}
