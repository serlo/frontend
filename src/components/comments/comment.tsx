import { Comment as CommentType } from '@serlo/api'
import * as React from 'react'
import styled, { css } from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { MetaBar } from './meta-bar'
import { htmlEscapeString } from '@/helper/html-escape'

interface CommentProps {
  isParent?: boolean
  data: CommentType
}

export function Comment({ data, isParent }: CommentProps) {
  const { author, createdAt, content } = data

  const urlFinder = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g

  //could content end up here unescaped?
  const escapedContent = htmlEscapeString(content)

  const contentWithLinks = escapedContent.replace(urlFinder, (match) => {
    return `<a href="${match}" rel="ugc nofollow">${match}</a>`
  })

  return (
    <Wrapper isParent={isParent}>
      <MetaBar user={author} timestamp={createdAt} isParent={isParent} />
      <StyledP dangerouslySetInnerHTML={{ __html: contentWithLinks }}></StyledP>
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
    overflow-wrap: break-word;
    word-break: break-all;
    hyphens: auto;
    padding-left: 8px;

    > a {
      color: ${(props) => props.theme.colors.brand};
    }
  }
`
