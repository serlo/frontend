import React from 'react'
import styled from 'styled-components'

import { FrontendMultiMediaNode } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export function Multimedia({
  mediaWidth,
  media,
  children,
}: FrontendMultiMediaNode) {
  return (
    <>
      <Wrapper mediaWidth={mediaWidth}>{renderArticle(media)}</Wrapper>
      {renderArticle(children)}
      <Clear />
    </>
  )
}

interface WrapperProps {
  mediaWidth: number
}
const Wrapper = styled.div<WrapperProps>`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    float: right;
    width: ${(props) => props.mediaWidth}%;
    margin-top: 5px;
    margin-bottom: -3px;
    margin-left: 7px;
  }
`
const Clear = styled.div`
  clear: both;
`
