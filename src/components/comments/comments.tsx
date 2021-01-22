import {
  faComments,
  faExclamationCircle,
  faQuestionCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comment as CommentType, Thread as ThreadType } from '@serlo/api'
import React from 'react'
import styled from 'styled-components'

import { Lazy } from '../content/lazy'
import { StyledP } from '../tags/styled-p'
import { Comment } from './comment'
import { CommentForm } from './comment-form'
import { useAuth } from '@/auth/use-auth'
import { StyledH2 } from '@/components/tags/styled-h2'
import { useInstanceData } from '@/contexts/instance-context'
import { makeLightButton } from '@/helper/css'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { scrollToPrevious } from '@/helper/scroll'
import { useCommentData } from '@/helper/use-comment-data'

export interface CommentsProps {
  id: number
}

export type CommentsData = CommentType[]
export type ThreadsData = ThreadType[]

export function Comments({ id: parentId }: CommentsProps) {
  const [showArchived, setShowArchived] = React.useState<boolean>(false)
  const [showThreadChildren, setShowThreadChildren] = React.useState<number[]>(
    []
  )
  const [highlightedCommentId, setHighlightedCommentId] = React.useState<
    number | undefined
  >(undefined)
  const container = React.useRef<HTMLDivElement>(null)

  const { strings } = useInstanceData()
  const auth = useAuth()

  const { commentData, commentCount, error } = useCommentData(parentId)

  function toogleShowArchived() {
    setShowArchived(!showArchived)
  }

  React.useEffect(() => {
    if (window.location.hash.startsWith('#comment-')) {
      if (container.current) scrollToPrevious(container.current)

      const id = parseInt(window.location.hash.replace('#comment-', ''))
      if (!isNaN(id)) setHighlightedCommentId(id)
    }
  }, [])

  return (
    <div ref={container}>
      {!commentData || commentCount === undefined
        ? renderErrorOrLoading()
        : renderContent()}
    </div>
  )

  function renderErrorOrLoading() {
    return (
      <StyledP id="comments">
        <ColoredIcon>
          <FontAwesomeIcon
            icon={error ? faExclamationCircle : faSpinner}
            spin={!error}
            size="1x"
          />
        </ColoredIcon>{' '}
        {error ? strings.comments.error : strings.comments.loading}
      </StyledP>
    )
  }

  function renderContent() {
    if (commentCount === undefined || (!auth.current && commentCount == 0))
      return null

    return (
      <>
        {auth.current && (
          <>
            <CustomH2 id="comments">
              <StyledIcon icon={faQuestionCircle} /> {strings.comments.question}
            </CustomH2>
            <CommentForm
              placeholder={strings.comments.placeholder}
              parentId={parentId}
              // onSendComment={}
            />
          </>
        )}

        {commentCount > 0 && (
          <>
            <CustomH2>
              {/* i18n Note: Pluralisation hack */}
              <StyledIcon icon={faComments} /> {commentCount}{' '}
              {commentCount === 1
                ? strings.comments.commentsOne
                : strings.comments.commentsMany}
            </CustomH2>

            <Lazy>
              {renderThreads(commentData.active ?? [])}
              {renderArchive()}
            </Lazy>
          </>
        )}
      </>
    )
  }

  function renderThreads(threads: ThreadsData) {
    return threads?.map((thread, index) => {
      return (
        <ThreadWrapper key={`${thread.createdAt}_${index}`}>
          {/* //TODO: implement threadId in api */}
          {renderComments([thread.comments.nodes[0]], true)}
          {renderThreadComments(thread.comments.nodes.slice(1), 0)}
        </ThreadWrapper>
      )
    })
  }

  function renderThreadComments(comments: CommentsData, threadId: number) {
    const length = comments.length
    //only show first reply by default
    if (length < 2 || showThreadChildren.includes(threadId))
      return (
        <>
          {length > 0 && renderComments(comments)}
          {renderReplyForm(threadId)}
        </>
      )

    return (
      <>
        {renderComments([comments[0]])}
        <StyledP>
          <ShowChildrenButton
            onClick={() =>
              setShowThreadChildren([...showThreadChildren, threadId])
            }
          >
            {length === 2
              ? strings.comments.showMoreReply
              : replacePlaceholders(strings.comments.showMoreReplies, {
                  number: (length - 1).toString(),
                })}{' '}
            ▾
          </ShowChildrenButton>
        </StyledP>
      </>
    )
  }

  function renderComments(comments: CommentsData, isParent?: boolean) {
    return comments.map((comment) => {
      const isHighlight = comment.id === highlightedCommentId
      return (
        <Comment
          key={comment.id}
          data={comment}
          isParent={isParent}
          isHighlight={isHighlight}
        />
      )
    })
  }

  function renderReplyForm(threadId: number) {
    return (
      auth.current && (
        <CommentForm
          placeholder={strings.comments.placeholderReply}
          parentId={threadId}
          reply
        />
      )
    )
  }

  function renderArchive() {
    if (
      !commentData ||
      commentData.archived === undefined ||
      commentData.archived.length === 0
    )
      return null
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
        {showArchived && renderThreads(commentData.archived ?? [])}
      </>
    )
  }
}

const CustomH2 = styled(StyledH2)`
  margin-top: 40px;
  border-bottom: 0;
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`

const ColoredIcon = styled.span`
  color: ${(props) => props.theme.colors.brand};
`

const ThreadWrapper = styled.div`
  margin-bottom: 45px;
`

const ShowArchivedButton = styled.button`
  ${makeLightButton};
  margin-top: 16px;
`

const ShowChildrenButton = styled.button`
  ${makeLightButton}
`
