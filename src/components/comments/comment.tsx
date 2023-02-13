import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { Link } from '../content/link'
import { MathSpanProps } from '../content/math-span'
import { CommentsData } from './comment-area'
import { MetaBar } from './meta-bar'
import { useAuth } from '@/auth/use-auth'
import { replaceWithJSX } from '@/helper/replace-with-jsx'
import { scrollIfNeeded } from '@/helper/scroll'

interface CommentProps {
  threadId: string
  isParent?: boolean
  isHighlight?: boolean
  data: CommentsData[number]
  highlight: (id: number) => void
  noScroll?: boolean
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
  noScroll,
}: CommentProps) {
  const commentRef = useRef<HTMLDivElement>(null)
  const { author, createdAt, content, id } = data

  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(content)

  const auth = useAuth()

  const isOwn = auth.authenticationPayload?.id === author.id

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
    if (!noScroll && isHighlight) {
      setTimeout(() => {
        scrollIfNeeded(commentRef.current)
      }, 900)
    }

    if (commentRef.current) {
      commentRef.current.style.backgroundColor = isHighlight
        ? '#fdf5e4'
        : 'transparent'
    }
  }, [isHighlight, noScroll])

  return (
    <div
      ref={commentRef}
      id={`comment-${id}`}
      className={clsx(
        'transition-colors duration-700 ease-out',
        isParent
          ? 'rounded-2xl'
          : clsx(
              'border-l-6 border-brand-200',
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
        isOwn={isOwn}
        startEditing={() => {
          setEditing(true)
        }}
      />
      {editing ? (
        <>
          <textarea
            className="serlo-p mb-2 break-words whitespace-pre-line w-full border-2"
            onChange={(e) => {
              setVal(e.target.value)
            }}
          >
            {val}
          </textarea>
          <button
            className="serlo-button-green ml-4"
            onClick={() => {
              alert(val)
            }}
          >
            Speichern
          </button>
          <button
            className="ml-4"
            onClick={() => {
              setEditing(false)
            }}
          >
            abbrechen
          </button>
        </>
      ) : (
        <p className="serlo-p mb-0 whitespace-pre-line break-words">{r2}</p>
      )}
    </div>
  )
}
