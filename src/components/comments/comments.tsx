import {
  faComments,
  faQuestionCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AbstractUuid,
  Comment as CommentApiType,
  Thread as ThreadApiType,
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

// PROTOTYPE
export type CommentsData = Thread[]

export interface Thread {
  status: 'active' | 'trashed' | 'archived'
  id: number
  /*entity: {
    title: string
    alias: string
    type: string
  }*/
  question: CommentData
  replies: CommentData[]
}

export interface CommentData {
  id: number
  timestamp: string
  user: { username: string; id: number }
  text: string
}

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

// TODO: rework data structure

function createThread(thread: ThreadApiType): Thread {
  const question = thread.comments.nodes[0]
  const replies = thread.comments.nodes.slice(1)
  return {
    status: thread.trashed
      ? 'trashed'
      : thread.archived
      ? 'archived'
      : 'active',
    id: question.id,
    question: createComment(question),
    replies: replies.filter((reply) => !reply.trashed).map(createComment),
  }
}

function createComment(node: CommentApiType): CommentData {
  return {
    id: node.id,
    timestamp: node.createdAt,
    text: node.content,
    user: {
      ...node.author,
      username: node.author.alias.substring(
        node.author.alias.lastIndexOf('/') + 1
      ),
    },
  }
}

export function Comments({ id: _id }: CommentsProps) {
  const [data, setData] = React.useState<CommentsData | null>(null)
  const [commentCount, setCommentCount] = React.useState(0)
  const [failure, setFailure] = React.useState<String | null>(null)
  const [showArchived, setShowArchived] = React.useState<boolean>(false)
  const [showThreadChildren, setShowThreadChildren] = React.useState<number[]>(
    []
  )
  const { strings } = useInstanceData()
  const auth = useAuth()

  React.useEffect(() => {
    // todo: fetch data
    void (async () => {
      try {
        const queryData = await request<{ uuid: AbstractUuid }>(
          endpoint,
          query,
          { id: _id }
        )
        if (queryData !== null) {
          const existingThreads = queryData.uuid.threads.nodes.filter(
            (node) => !node.trashed
          )
          const output = existingThreads.map(createThread)
          setData(output)
          setCommentCount(
            output.reduce((acc, val) => {
              return acc + val.replies.length + 1
            }, 0)
          )
        }
      } catch (e: unknown) {
        console.log(e)
        setFailure((e as string).toString())
      }
    })()
  }, [_id])

  function toogleShowArchived() {
    setShowArchived(!showArchived)
  }

  if (failure) {
    return <StyledP>{failure}</StyledP>
  }

  if (!data)
    return (
      <StyledP>
        <ColoredIcon>
          <FontAwesomeIcon icon={faSpinner} spin size="1x" />
        </ColoredIcon>{' '}
        {strings.comments.loading}
      </StyledP>
    )

  if (!auth.current && commentCount == 0) return null // avoid rendering anything

  return (
    <div>
      {auth.current && (
        <CustomH2>
          <StyledIcon icon={faQuestionCircle} /> {strings.comments.question}
        </CustomH2>
      )}

      {auth.current && (
        <CommentForm
          placeholder={strings.comments.placeholder}
          parent_id={_id}
          // onSendComment={}
        />
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
            {renderThreads('active')}
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
            {showArchived && renderThreads('archived')}
          </Lazy>
        </>
      )}
    </div>
  )

  function renderThreads(showStatus: Thread['status']) {
    return data?.map((thread) => {
      if (thread.status !== showStatus) return null
      return (
        <ThreadWrapper key={thread.id}>
          {/* <p>
          Eine Diskussion zu {thread.entity.type}{' '}
          <a href={thread.entity.alias}>{thread.entity.title}</a>.
        </p>
        <p>
          Status: {thread.status}, Upvotes: {thread.upvotes}
        </p>
        <p>hier Link zu upvoten</p> */}
          <Comment
            id={thread.question.id}
            timestamp={thread.question.timestamp}
            user={thread.question.user}
            body={thread.question.text}
            isParent
            key={thread.question.id}
          />
          {renderThreadReplies(thread)}
        </ThreadWrapper>
      )
    })
  }

  function renderThreadReplies(thread: Thread) {
    const length = thread.replies.length

    //only show first reply by default

    if (length === 0) return renderReplyForm(thread.id)

    if (length === 1)
      return (
        <div>
          {thread.replies.map(renderComment)}
          {renderReplyForm(thread.id)}
        </div>
      )

    return showThreadChildren.includes(thread.id) ? (
      <div>
        {thread.replies.map(renderComment)}
        {renderReplyForm(thread.id)}
      </div>
    ) : (
      <div>
        {renderComment(thread.replies[0])}
        <StyledP>
          <ShowChildrenButton
            onClick={() =>
              setShowThreadChildren([...showThreadChildren, thread.id])
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
      </div>
    )
  }

  function renderComment(comment: CommentData) {
    return (
      <Comment
        id={comment.id}
        key={comment.id}
        timestamp={comment.timestamp}
        user={comment.user}
        body={comment.text}
      />
    )
  }

  function renderReplyForm(threadId: number) {
    return (
      auth.current && (
        <CommentForm
          placeholder={strings.comments.placeholderReply}
          parent_id={threadId}
          reply
        />
      )
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
  ${makeLightButton}
  margin-top: 16px;
`

const ShowChildrenButton = styled.button`
  ${makeLightButton}
`
