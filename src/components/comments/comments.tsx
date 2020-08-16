import { faComments, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { Comment } from './comment'
import { CommentForm } from './comment-form'
import { Lazy } from '@/components/content/lazy'
import { StyledH2 } from '@/components/tags/styled-h2'

export interface CommentsProps {
  id: number
}

// PROTOTYPE
export type CommentsData = Discussion[]

export interface Discussion {
  status: 'open' | 'closed'
  upvotes: number
  id: number
  entity: {
    title: string
    alias: string
    type: string
  }
  question: CommentData
  replies: CommentData[]
}

export interface CommentData {
  id: number
  timestamp: number
  user: { username: string; id: number }
  text: string
}

export function Comments({ id: _id }: CommentsProps) {
  const [data, setData] = React.useState<CommentsData | null>(null)
  React.useEffect(() => {
    // todo: fetch data
    setData([
      {
        status: 'open',
        upvotes: 2,
        id: 5555,
        entity: {
          title: 'Parabeln',
          alias: '/1234',
          type: 'Artikel',
        },
        question: {
          id: 6666,
          timestamp: 1597314547,
          user: { username: 'Markus', id: 123 },
          text: 'hey, Ich habe da so eine Frage',
        },
        replies: [
          {
            id: 7777,
            timestamp: 1597314547,
            user: { username: 'Thomas', id: 124 },
            text: 'Schieß los',
          },
          {
            id: 7778,
            timestamp: 1597344547,
            user: { username: 'Jürgen', id: 125 },
            text: 'Ja das stimmt so!',
          },
        ],
      },
    ])
  }, [])

  if (!data) return null

  return (
    <div>
      <CustomH2>
        <StyledIcon icon={faQuestionCircle} /> Hast du eine Frage?
      </CustomH2>

      <CommentForm
        placeholder="Deine Frage oder Anregung …"
        parent_id={123123}
        // onSendComment={}
      />

      {/* TODO: calculate amount of comments (and children) or get from server */}
      <CustomH2>
        <StyledIcon icon={faComments} /> 12 Kommentare
      </CustomH2>

      <Lazy>{data.map(buildDisussion)}</Lazy>
    </div>
  )

  function buildDisussion(discussion: Discussion) {
    return (
      <div>
        {/* <p>
          Eine Diskussion zu {discussion.entity.type}{' '}
          <a href={discussion.entity.alias}>{discussion.entity.title}</a>.
        </p>
        <p>
          Status: {discussion.status}, Upvotes: {discussion.upvotes}
        </p>
        <p>hier Link zu upvoten</p> */}
        {buildComment(discussion.question)}
        <div>
          {discussion.replies.map((comment) => (
            <Comment
              id={comment.id}
              key={comment.id}
              timestamp={comment.timestamp}
              user={comment.user}
              body={comment.text}
              leaf
            />
          ))}
          <CommentForm
            placeholder="Deine Frage oder Anregung …"
            parent_id={123123}
            reply
          />
        </div>
      </div>
    )
  }

  function buildComment(comment: CommentData) {
    return (
      <Comment
        id={comment.id}
        timestamp={comment.timestamp}
        user={comment.user}
        body={comment.text}
      />
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
