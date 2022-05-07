import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

import { Link } from '../content/link'
import { MathSpanProps } from '../content/math-span'
import { CommentsData } from './comment-area'
import { MetaBar } from './meta-bar'
import { replaceWithJSX } from '@/helper/replace-with-jsx'
import { scrollIfNeeded } from '@/helper/scroll'

interface CommentProps {
  threadId: string
  isParent?: boolean
  isHighlight?: boolean
  data: CommentsData[number]
  highlight: (id: number) => void
}

const MathSpan = dynamic<MathSpanProps>(() =>
  import('@/components/content/math-span').then((mod) => mod.MathSpan)
)

export function Comment({
  data,
  threadId,
  isHighlight,
  highlight,
  isParent,
}: CommentProps) {
  const commentRef = useRef<HTMLDivElement>(null)
  const { author, createdAt, content, id } = data

  // Step 1: Replace formulas
  const r1 = replaceWithJSX([content], /%%(.+?)%%/g, (str, i) => (
    <MathSpan key={`math-${i}`} formula={str} />
  ))

  // Step 2: Replace urls in remaining strings
  const r2 = replaceWithJSX(
    r1,
    /(https?:\/\/(?:www\.)?(?:[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b)(?:[-a-zA-Z0-9@:%_+~#?&//=]*))/g,
    (str, i) => (
      <Link
        key={`link-${i}`}
        href={str}
        className="serlo-link break-all"
        unreviewed
      >
        {str}
      </Link>
    )
  )

  useEffect(() => {
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
      <p className="serlo-p mb-0 whitespace-pre-line break-words">{r2}</p>
    </div>
  )
}
