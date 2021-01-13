import { Comment as CommentType } from '@serlo/api'
import * as React from 'react'
import styled, { css } from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { MetaBar } from './meta-bar'

interface CommentProps {
  isParent?: boolean
  data: CommentType
}

export function Comment({ data, isParent }: CommentProps) {
  const { author, createdAt, content } = data
  return (
    <Wrapper isParent={isParent}>
      <MetaBar user={author} timestamp={createdAt} isParent={isParent} />
      <StyledP>{content}</StyledP>
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
    white-space: pre-line;
    padding-left: 8px;
  }
`
