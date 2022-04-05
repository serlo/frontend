import {
  faCheck,
  faPaperclip,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Thread } from '@serlo/authorization'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import {
  useSetCommentStateMutation,
  useSetThreadStateMutation,
  useThreadArchivedMutation,
} from '@/helper/mutations/thread'

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

  const canDo = useCanDo()

  const canDelete = isParent
    ? canDo(Thread.setThreadState)
    : canDo(Thread.setCommentState)
  const canArchive = isParent && canDo(Thread.setThreadArchived)

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
    }
  }

  function onArchiveThread() {
    onAnyClick()
    if (isParent && threadId) {
      void setThreadArchived({ id: [threadId], archived: !archived })
    }
  }

  function buildButton(onClick: () => void, children: JSX.Element) {
    return (
      <button
        className={clsx(
          'serlo-button serlo-make-interactive-transparent-blue',
          'mb-1 text-base font-normal leading-browser'
        )}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}
