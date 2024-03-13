import { useState } from 'react'

import type { ThreadsData } from './comment-area'
import { Thread } from './thread'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export interface CommentArchiveProps {
  show?: boolean
  data?: ThreadsData
  highlightedCommentId?: number
  highlight: (o: number) => void
}

export function CommentArchive({
  show,
  data,
  highlightedCommentId,
  highlight,
}: CommentArchiveProps) {
  const [showArchived, setShowArchived] = useState<boolean>(show ? true : false)
  const { strings } = useInstanceData()

  function toogleShowArchived() {
    setShowArchived(!showArchived)
  }

  if (data === undefined || data.length === 0) return null

  return (
    <>
      <p className="serlo-p">
        <button
          onClick={toogleShowArchived}
          className="serlo-button-light mt-4"
        >
          {replacePlaceholders(strings.comments.showArchived, {
            threads: strings.entities.threads,
          })}{' '}
          <span
            className={
              showArchived ? 'inline-block translate-y-0.5 rotate-180' : ''
            }
          >
            ▾
          </span>
        </button>
      </p>
      {showArchived && renderThreads()}
    </>
  )

  function renderThreads() {
    return (
      data &&
      data.map((thread) => (
        <Thread
          key={thread.id}
          thread={thread}
          showChildren
          highlightedCommentId={highlightedCommentId}
          highlight={highlight}
        />
      ))
    )
  }
}
