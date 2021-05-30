import { Comment as CommentType } from '@serlo/api'
import clsx from 'clsx'
import escapeHtml from 'escape-html'
import * as React from 'react'

import { MetaBar } from './meta-bar'
import { scrollIfNeeded } from '@/helper/scroll'

interface CommentProps {
  threadId: string
  isParent?: boolean
  isHighlight?: boolean
  data: CommentType
  highlight: (id: number) => void
}

export function Comment({
  data,
  threadId,
  isHighlight,
  highlight,
  isParent,
}: CommentProps) {
  const commentRef = React.useRef<HTMLDivElement>(null)
  const { author, createdAt, content, id } = data

  const urlFinder =
    /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g

  const escapedContent = escapeHtml(content)

  const escapedWithLinks = escapedContent.replace(urlFinder, (match) => {
    return `<a href="${match}" rel="ugc nofollow" class="text-brand break-all">${match}</a>` // handle this special case
  })

  React.useEffect(() => {
    if (isHighlight) {
      setTimeout(() => {
        scrollIfNeeded(commentRef.current)
      }, 500)
    }

    if (commentRef.current) {
      commentRef.current.style.backgroundColor = isHighlight
        ? 'rgb(251, 243, 243)'
        : 'transparent'
    }
  }, [isHighlight])

  return (
    <div
      ref={commentRef}
      id={`comment-${id}`}
      className={clsx(
        'transition-colors duration-700 ease-out',
        isParent
          ? 'rounded-2xl'
          : clsx(
              'border-l-6 border-brand-150',
              'pt-1 pb-0.5 pl-1 mt-8 mb-5 ml-4',
              'rounded-r-2xl'
            )
      )}
    >
      <MetaBar
        user={author}
        timestamp={createdAt}
        isParent={isParent}
        threadId={threadId}
        archived={data.archived}
        id={id}
        highlight={highlight}
      />
      <p
        className={clsx('serlo-p mb-0 whitespace-pre-line break-words')}
        dangerouslySetInnerHTML={{ __html: escapedWithLinks }}
      ></p>
    </div>
  )
}
