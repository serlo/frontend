import {
  faComments,
  faQuestionCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

export interface CommentsProps {
  id: number
}

// PROTOTYPE
export type CommentsData = Discussion[]

export interface Discussion {
  status: 'open' | 'closed'
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
  timestamp: number
  user: { username: string; id: number }
  text: string
}

// TODO: Type the query

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

function createDiscussion(thread: any): Discussion {
  const question = thread.comments.nodes[0]
  const replies = thread.comments.nodes.slice(1)
  return {
    status: thread.archived || thread.trashed ? 'closed' : 'open',
    id: question.id,
    question: createComment(question),
    replies: replies
      .filter((reply: any) => !reply.trashed && !reply.archived)
      .map(createComment),
  }
}

function createComment(node: any): CommentData {
  return {
    id: node.id,
    timestamp: node.createdAt,
    text: node.content,
    user: {
      ...node.author,
      username: node.author.alias.substring(
        (node.author.alias.lastIndexOf('/') as number) + 1
      ),
    },
  }
}

export function Comments({ id: _id }: CommentsProps) {
  const [data, setData] = React.useState<CommentsData | null>(null)
  const [commentCount, setCommentCount] = React.useState(0)
  const [failure, setFailure] = React.useState<String | null>(null)
  const { strings } = useInstanceData()
  const auth = useAuth()

  React.useEffect(() => {
    // todo: fetch data
    void (async () => {
      try {
        const queryData = await request(endpoint, query, { id: _id })
        if (queryData !== null) {
          const activeThreads = queryData.uuid.threads.nodes.filter(
            (node: any) => !node.archived && !node.trashed
          )
          const output = activeThreads.map(createDiscussion)
          setData(output)
          setCommentCount(
            output.reduce((acc: any, val: any) => {
              return (acc as number) + (val.replies.length as number) + 1
            }, 0)
          )
        }
      } catch (e) {
        console.log(e)
        setFailure(e.toString())
      }
    })()
  }, [_id])

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

          <Lazy>{data.map(buildDisussion)}</Lazy>
        </>
      )}
    </div>
  )

  function buildDisussion(discussion: Discussion) {
    return (
      <div key={discussion.id}>
        {/* <p>
          Eine Diskussion zu {discussion.entity.type}{' '}
          <a href={discussion.entity.alias}>{discussion.entity.title}</a>.
        </p>
        <p>
          Status: {discussion.status}, Upvotes: {discussion.upvotes}
        </p>
        <p>hier Link zu upvoten</p> */}
        <Comment
          id={discussion.question.id}
          timestamp={discussion.question.timestamp}
          user={discussion.question.user}
          body={discussion.question.text}
          isParent
          key={discussion.question.id}
        />
        <div>
          {discussion.replies.map((comment) => (
            <Comment
              id={comment.id}
              key={comment.id}
              timestamp={comment.timestamp}
              user={comment.user}
              body={comment.text}
            />
          ))}
          {auth.current && (
            <CommentForm
              placeholder={strings.comments.placeholderReply}
              parent_id={discussion.id}
              reply
            />
          )}
        </div>
      </div>
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
