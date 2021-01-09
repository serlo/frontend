import {
  faComments,
  faExclamationCircle,
  faQuestionCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AbstractUuid,
  Comment as CommentType,
  Thread as ThreadType,
} from '@serlo/api'
import { gql, request } from 'graphql-request'
import React from 'react'
import styled from 'styled-components'

import { Lazy } from '../content/lazy'
import { StyledP } from '../tags/styled-p'
import { Comment } from './comment'
import { CommentForm } from './comment-form'
import { endpoint } from '@/api/endpoint'
import { useAuth } from '@/auth/use-auth'
import { StyledH2 } from '@/components/tags/styled-h2'
import { useInstanceData } from '@/contexts/instance-context'
import { makeLightButton } from '@/helper/css'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export interface CommentsProps {
  id: number
}

export type CommentsData = CommentType[]
export type ThreadsData = ThreadType[]

const query = gql`
  query getComments($id: Int!) {
    uuid(id: $id) {
      ... on AbstractUuid {
        threads {
          nodes {
            archived
            trashed
            comments {
              nodes {
                id
                trashed
                content
                archived
                createdAt
                author {
                  username
                  alias
                  id
                  activeAuthor
                  activeDonor
                  activeReviewer
                }
              }
            }
          }
        }
      }
    }
  }
`

export function Comments({ id: parentId }: CommentsProps) {
  const [data, setData] = React.useState<{
    active: ThreadsData
    archived: ThreadsData
  } | null>(null)
  const [commentCount, setCommentCount] = React.useState(0)
  const [failure, setFailure] = React.useState<String | null>(null)
  const [showArchived, setShowArchived] = React.useState<boolean>(false)
  const [showThreadChildren, setShowThreadChildren] = React.useState<number[]>(
    []
  )
  const { strings } = useInstanceData()
  const auth = useAuth()

  React.useEffect(() => {
    void (async () => {
      try {
        const queryData = await request<{ uuid: AbstractUuid }>(
          endpoint,
          query,
          { id: parentId }
        )
        if (queryData !== null) {
          //TODO: for api: Trashed threads should not even be send to the frontend here
          const untrashedThreads = queryData.uuid.threads.nodes.filter(
            (node) => !node.trashed
          )

          const activeThreads = untrashedThreads.filter(
            (thread) => !thread.archived
          )
          const archivedThreads = untrashedThreads.filter(
            (thread) => thread.archived
          )

          setData({ active: activeThreads, archived: archivedThreads })

          setCommentCount(
            untrashedThreads.reduce((acc, thread) => {
              return acc + thread.comments.nodes.length
            }, 0)
          )
        }
      } catch (e: unknown) {
        console.log(e)
        setFailure((e as string).toString())
      }
    })()
  }, [parentId])

  function toogleShowArchived() {
    setShowArchived(!showArchived)
  }

  if (!data)
    return (
      <StyledP>
        <ColoredIcon>
          <FontAwesomeIcon
            icon={failure ? faExclamationCircle : faSpinner}
            spin={!failure}
            size="1x"
          />
        </ColoredIcon>{' '}
        {failure ? strings.comments.error : strings.comments.loading}
      </StyledP>
    )

  if (!auth.current && commentCount == 0) return null // avoid rendering anything

  return (
    <>
      {auth.current && (
        <>
          <CustomH2>
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
            {renderThreads(data.active)}
            {renderArchive()}
          </Lazy>
        </>
      )}
    </>
  )

  function renderThreads(threads: ThreadsData) {
    return threads?.map((thread) => {
      return (
        <ThreadWrapper key={thread.createdAt}>
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
      return <Comment key={comment.id} data={comment} isParent={isParent} />
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
    if (!data || data.archived.length === 0) return null
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
        {showArchived && renderThreads(data.archived)}
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
