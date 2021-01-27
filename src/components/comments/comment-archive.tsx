import React from 'react'
import styled from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { ThreadsData } from './comment-area'
import { Thread } from './thread'
import { useInstanceData } from '@/contexts/instance-context'
import { makeLightButton } from '@/helper/css'
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
  const [showArchived, setShowArchived] = React.useState<boolean>(
    show ? true : false
  )
  const { strings } = useInstanceData()

  function toogleShowArchived() {
    setShowArchived(!showArchived)
  }

  if (data === undefined || data.length === 0) return null

  return (
    <>
      <StyledP>
        <ShowArchivedButton
          onClick={toogleShowArchived}
          onPointerUp={(e) => e.currentTarget.blur()}
        >
          {replacePlaceholders(strings.comments.showArchived, {
            threads: strings.entities.threads,
          })}{' '}
          ▾
        </ShowArchivedButton>
      </StyledP>
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

const ShowArchivedButton = styled.button`
  ${makeLightButton};
  margin-top: 16px;
`
