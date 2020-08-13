import React from 'react'

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
  question: Comment
  replies: Comment[]
}

export interface Comment {
  id: number
  time: string
  user: string
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
          time: 'vor 2 Tagen',
          user: 'Markus',
          text: 'hey, Ich habe da so eine Frage',
        },
        replies: [
          {
            id: 7777,
            time: 'vor einem Tag',
            user: 'Thomas',
            text: 'Schieß los',
          },
        ],
      },
    ])
  }, [])

  if (!data) return null

  return (
    <div>
      <p>Schreibe einen Kommentar: hier Link</p>
      <hr />
      {data.map(buildDisussion)}
    </div>
  )

  function buildDisussion(discussion: Discussion) {
    return (
      <div>
        <p>
          Eine Diskussion zu {discussion.entity.type}{' '}
          <a href={discussion.entity.alias}>{discussion.entity.title}</a>.
        </p>
        <p>
          Status: {discussion.status}, Upvotes: {discussion.upvotes}
        </p>
        <p>hier Link zu upvoten</p>
        {buildComment(discussion.question)}
        <div style={{ marginLeft: 30 }}>
          {discussion.replies.map(buildComment)}
          <p>Auf Diskussion antworten, hier Link</p>
        </div>
        <hr />
      </div>
    )
  }

  function buildComment(comment: Comment) {
    return (
      <div style={{ borderBottom: '1px solid black' }}>
        <p>
          {comment.user} ({comment.time})
        </p>
        <p>{comment.text}</p>
        <p>Hier Link zu flaggen</p>
      </div>
    )
  }
}
