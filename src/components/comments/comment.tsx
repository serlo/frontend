import * as React from 'react'
// import { Box, Grid } from 'grommet'

import { StyledP } from '../tags/styled-p'
import { CommentForm, SendProps } from './comment-form'
import { MetaBar } from './meta-bar'
import styled, { css } from 'styled-components'

interface CommentProps extends Comment {
  leaf?: boolean
  onSendComment?: (props: SendProps) => void
}

interface Comment {
  id: number
  user: User
  body: string
  children?: Comment[]
  timestamp: number
  entity?: Entity
}

interface User {
  id: number
  username: string
}

interface Entity {
  id: number
  label: string
}

export function Comment({
  id,
  user,
  body,
  children,
  timestamp,
  leaf,
  entity,
  onSendComment,
}: CommentProps) {
  console.log(onSendComment)

  return (
    <Wrapper leaf={leaf}>
      {entity !== undefined
        ? null
        : //(
          // <Text margin={{ bottom: 'small' }}>
          //   Zu{' '}
          //   <Anchor href={`https://serlo.org/${entity.id}`}>
          //     {entity.label}
          //   </Anchor>
          //   :
          // </Text>
          //)
          null}

      <MetaBar user={user} timestamp={timestamp} leaf={leaf} />

      <StyledP>{body}</StyledP>

      {children && !leaf
        ? children.map((comment) => {
            return (
              <Comment
                key={comment.id}
                leaf
                onSendComment={onSendComment}
                {...comment}
              />
            )
          })
        : null}
      {leaf || entity === undefined ? null : (
        <CommentForm
          placeholder="Deine Antwort …"
          reply
          parent_id={id}
          onSendComment={onSendComment}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ leaf?: boolean }>`
  ${(props) =>
    props.leaf &&
    css`
      border-left: 7px solid
        ${(props) => props.theme.colors.lightBlueBackground};
      padding-top: 3px;
      padding-bottom: 2px;
      margin: 20px 0 20px ${(props) => props.theme.defaults.sideSpacingMobile};
    `}

  > p {
    margin-bottom: 0;
  }
`
