import React from 'react'
import dynamic from 'next/dynamic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import {
  ArticleHeading,
  ToolLine,
  ToolLineButton,
  StyledLi,
  StyledA,
  StyledUl,
  StyledP
} from './visuals'
import ShareModal from './sharemodal'

import EdtrIoRenderer from '../content-api/transform-edtr-io-state'
import Ups from './ups'
import WipHint from './wiphint'
import styled from 'styled-components'
const LegacyRenderer = dynamic(import('../content-api/transform-legacy-state'))

export default function ContentTypes(props) {
  const { data } = props
  if (data.contentType === 'article' || data.contentType === 'Page revision') {
    return renderArticle(data.data)
  }
  if (data.contentType === 'topic' || data.contentType === 'subject') {
    return (
      <>
        <WipHint part="Taxonomie" />
        <ArticleHeading>{data.data.title}</ArticleHeading>
        <StyledUl>
          {data.data.anchors.map((entry, index) => (
            <StyledLi key={index}>
              <StyledA href={entry.href}>{entry.title}</StyledA>
            </StyledLi>
          ))}
        </StyledUl>
      </>
    )
  }
  if (
    data.contentType === 'topic-folder' ||
    data.contentType === 'text-exercise'
  ) {
    return (
      <>
        <WipHint part="Aufgaben" />
        <ArticleHeading>Aufgaben</ArticleHeading>
        {data.data.contents.map((entry, index) => (
          <>
            <hr key={index} />
            <EdtrIoRenderer state={JSON.parse(entry)} key={index + '__x'} />
          </>
        ))}
        <hr />
        <StyledP>
          <small>
            Inhalte im alten Format werden nicht angezeigt, Anzahl:{' '}
            {data.data.legacyCount}
          </small>
        </StyledP>
      </>
    )
  }
  return <Ups type={data.contentType} />
}

function renderArticle(content) {
  const [open, setOpen] = React.useState(false)
  let comp = null
  if (content.edtrio) {
    comp = <EdtrIoRenderer state={JSON.parse(content.edtrio)} />
  } else {
    comp = <LegacyRenderer state={content.legacy} />
  }
  return (
    <>
      <DesktopOnly>
        <WipHint part="Desktop-Ansicht" />
      </DesktopOnly>
      <ArticleHeading>{content.title}</ArticleHeading>
      <ToolLine>
        {content.legacy && (
          <LegacyIndicator title="Inhalt im alten Format">L</LegacyIndicator>
        )}
        <ToolLineButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
        </ToolLineButton>
        <ToolLineButton>
          <FontAwesomeIcon icon={faPencilAlt} size="1x" /> Bearbeiten
        </ToolLineButton>
        {<ShareModal open={open} onClose={() => setOpen(false)} />}
      </ToolLine>
      {comp}
    </>
  )
}

const DesktopOnly = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const LegacyIndicator = styled.div`
  color: ${props => props.theme.colors.dark1};
  border: 1px solid;
  border-radius: 100px;
  height: 18px;
  width: 20px;
  margin-top: 5px;
  padding-top: 2px;
  text-align: center;
  margin-right: 4px;
  cursor: default;
  user-select: none;
`
