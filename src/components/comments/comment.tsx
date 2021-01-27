import { Comment as CommentType } from '@serlo/api'
import escapeHtml from 'escape-html'
import * as React from 'react'
import styled, { css } from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { MetaBar } from './meta-bar'
import { scrollIfNeeded } from '@/helper/scroll'

interface CommentProps {
  threadId: string
  isParent?: boolean
  isHighlight?: boolean
  data: CommentType
  highlight: (id: number) => void
  entityId: number
}

export function Comment({
  data,
  threadId,
  isHighlight,
  highlight,
  entityId,
  isParent,
}: CommentProps) {
  const commentRef = React.useRef<HTMLDivElement>(null)
  const { author, createdAt, content, id } = data

  const urlFinder = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g

  const escapedContent = escapeHtml(content)

  const escapedWithLinks = escapedContent.replace(urlFinder, (match) => {
    return `<a href="${match}" rel="ugc nofollow">${match}</a>`
  })

  React.useEffect(() => {
    if (isHighlight) {
      setTimeout(() => {
        scrollIfNeeded(commentRef.current)
      }, 500)
    }

    if (commentRef.current) {
      commentRef.current.style.backgroundColor = isHighlight
        ? 'rgb(251, 243, 243)'
        : 'transparent'
    }
  }, [isHighlight])

  return (
    <Wrapper ref={commentRef} $isParent={isParent} id={`comment-${id}`}>
      <MetaBar
        user={author}
        timestamp={createdAt}
        isParent={isParent}
        threadId={threadId}
        id={id}
        entityId={entityId}
        highlight={highlight}
      />
      <StyledP dangerouslySetInnerHTML={{ __html: escapedWithLinks }}></StyledP>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $isParent?: boolean }>`
  ${(props) =>
    !props.$isParent &&
    css`
      border-left: 7px solid
        ${(props) => props.theme.colors.lightBlueBackground};
      padding: 3px 0 2px 4px;
      margin: 20px 0 20px ${(props) => props.theme.defaults.sideSpacingMobile};
    `}

  > p {
    margin-bottom: 0;
    white-space: pre-line;
    hyphens: auto;
    overflow-wrap: break-word;

    > a {
      color: ${(props) => props.theme.colors.brand};
      word-break: break-all; /* breaks without hyphen*/
    }
  }

  border-radius: ${(props) => (props.$isParent ? '15px' : '0 15px 15px 0')};
  transition: background-color 0.8s ease-out;
`
