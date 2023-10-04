import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import type { CommentsData } from './comment-area'
import { CommentForm } from './comment-form'
import { MetaBar } from './meta-bar'
import { Link } from '../content/link'
import type { MathSpanProps } from '../content/math-span'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { replaceWithJSX } from '@/helper/replace-with-jsx'
import { scrollIfNeeded } from '@/helper/scroll'
import { tw } from '@/helper/tw'
import { useEditCommentMutation } from '@/mutations/thread'

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
  const { strings } = useInstanceData()

  const [isEditing, setIsEditing] = useState(false)

  const editCommentMutation = useEditCommentMutation()

  const auth = useAuth()

  const isOwnEditable =
    auth.authenticationPayload?.id === author.id &&
    !data.archived &&
    !data.trashed

  // Step 1: Replace formulas
  const r1 = replaceWithJSX([content], /%%(.+?)%%/g, (str, i) => (
    <MathSpan key={`math-${i}`} formula={str} />
  ))

  // Step 2: Replace urls in remaining strings
  const commentContent = replaceWithJSX(
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
  }, [isHighlight, noScroll])

  return (
    <div
      ref={commentRef}
      id={`comment-${id}`}
      className={clsx(
        'pb-0.5 pt-1 transition-colors duration-700 ease-out',
        isParent
          ? ''
          : tw`
            mb-5 ml-4 mt-8 border-l-6 border-brand-200 
            pb-0.5
          `
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
        isEditing={isEditing}
        startEditing={
          isOwnEditable && !isEditing
            ? () => {
                setIsEditing(true)
              }
            : undefined
        }
      />
      {isEditing ? (
        <>
          <CommentForm
            placeholder={strings.comments.placeholder}
            onSend={async (content) => {
              const result = await editCommentMutation({
                commentId: id,
                content,
              })
              if (result) setIsEditing(false)
              return result
            }}
            cancelEditing={() => setIsEditing(false)}
            content={content}
            isEditing
          />
          <button
            onClick={() => setIsEditing(false)}
            className="serlo-button-blue-transparent -mt-6 ml-auto mr-6 block text-base"
          >
            {strings.comments.cancelEdit}
          </button>
        </>
      ) : (
        <p
          className={clsx(
            'serlo-p mb-0 whitespace-pre-line break-words',
            isHighlight ? 'rounded-xl bg-editor-primary-100 !p-2' : ''
          )}
        >
          {commentContent}
        </p>
      )}
    </div>
  )
}
