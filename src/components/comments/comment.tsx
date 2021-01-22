import { Comment as CommentType } from '@serlo/api'
import escapeHtml from 'escape-html'
import * as React from 'react'
import styled, { css } from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { MetaBar } from './meta-bar'
import { scrollIfNeeded } from '@/helper/scroll'

interface CommentProps {
  isParent?: boolean
  isHighlight?: boolean
  data: CommentType
}

export function Comment(props: CommentProps) {
  const highlightedComment = React.useRef<HTMLDivElement>(null)
  const { data, isParent, isHighlight } = props
  const { author, createdAt, content, id } = data

  const urlFinder = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g

  const escapedContent = escapeHtml(content)

  const escapedWithLinks = escapedContent.replace(urlFinder, (match) => {
    return `<a href="${match}" rel="ugc nofollow">${match}</a>`
  })

  React.useEffect(() => {
    scrollIfNeeded(highlightedComment.current, true)
  })

  return (
    <Wrapper
      ref={isHighlight ? highlightedComment : undefined}
      $isHighlight={isHighlight}
      $isParent={isParent}
      id={`comment-${id}`}
    >
      <MetaBar user={author} timestamp={createdAt} isParent={isParent} />
      <StyledP dangerouslySetInnerHTML={{ __html: escapedWithLinks }}></StyledP>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $isParent?: boolean; $isHighlight?: boolean }>`
  ${(props) =>
    !props.$isParent &&
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
    hyphens: auto;
    padding-left: 8px;
    overflow-wrap: break-word;

    > a {
      color: ${(props) => props.theme.colors.brand};
      word-break: break-all; /* breaks without hyphen*/
    }
  }

  border-radius: ${(props) => (props.$isParent ? '15px' : '0 15px 15px 0')};
  background-color: ${(props) =>
    props.$isHighlight ? 'rgb(251, 244, 244)' : 'transparent'};
`
