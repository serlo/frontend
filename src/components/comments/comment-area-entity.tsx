import { useState, useRef, useEffect } from 'react'

import { Guard } from '../guard'
import { CommentArea } from './comment-area'
import { useCommentData } from '@/fetcher/use-comment-data'
import { scrollToPrevious } from '@/helper/scroll'

export interface CommentAreaEntityProps {
  entityId: number
  noForms?: boolean
}

export function CommentAreaEntity({
  entityId,
  noForms,
}: CommentAreaEntityProps) {
  const container = useRef<HTMLDivElement>(null)
  const { commentData, commentCount, error } = useCommentData(entityId)
  const [highlightedCommentId, setHighlightedCommentId] = useState<
    number | undefined
  >(undefined)

  const showAll =
    typeof window !== 'undefined' &&
    window.location.hash.startsWith('#comment-')

  useEffect(() => {
    if (showAll && highlightedCommentId === undefined) {
      if (container.current) scrollToPrevious(container.current)
      const id = parseInt(window.location.hash.replace('#comment-', ''))
      if (!isNaN(id)) setHighlightedCommentId(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll, container, entityId])

  return (
    <div ref={container} className="print:hidden">
      <Guard data={commentData} error={error}>
        <CommentArea
          commentData={commentData}
          commentCount={commentCount}
          entityId={entityId}
          noForms={noForms}
        />
      </Guard>
    </div>
  )
}
