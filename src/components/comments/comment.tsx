import * as React from 'react'
import styled, { css } from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { SendProps } from './comment-form'
import { MetaBar } from './meta-bar'

interface CommentProps extends Comment {
  isParent?: boolean
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
  // id,
  user,
  body,
  // children,
  timestamp,
  isParent,
}: // onSendComment,
CommentProps) {
  return (
    <Wrapper isParent={isParent}>
      <MetaBar user={user} timestamp={timestamp} isParent={isParent} />
      <StyledP>{body}</StyledP>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isParent?: boolean }>`
  ${(props) =>
    !props.isParent &&
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
