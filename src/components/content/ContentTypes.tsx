import React from 'react'
import dynamic from 'next/dynamic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import ShareModal from '../navigation/ShareModal'

import EdtrIoRenderer from '../../content-api/transform-edtr-io-state'
import Ups from '../Ups'
import WipHint from '../WipHint'
import styled from 'styled-components'
import Breadcrumbs from '../navigation/Breadcrumbs'
import { StyledP } from '../tags/StyledP'
import { StyledUl } from '../tags/StyledUl'
import { StyledLi } from '../tags/StyledLi'
import { StyledA } from '../tags/StyledA'
import { StyledH1 } from '../tags/StyledH1'
import { ToolLine } from '../navigation/ToolLine'
import { ToolLineButton } from '../navigation/ToolLineButton'
const LegacyRenderer = dynamic(
  import('../../content-api/transform-legacy-state')
)

export default function ContentTypes(props) {
  const { data } = props
  if (data.contentType === 'article' || data.contentType === 'Page revision') {
    return renderArticle(data.data)
  }
  if (data.contentType === 'topic' || data.contentType === 'subject') {
    return (
      <>
        <WipHint part="Taxonomie" />
        {data.data.breadcrumbs && (
          <Breadcrumbs entries={data.data.breadcrumbs} />
        )}
        <StyledH1>{data.data.title}</StyledH1>
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
        {data.data.breadcrumbs && (
          <Breadcrumbs entries={data.data.breadcrumbs} />
        )}
        <StyledH1>Aufgaben</StyledH1>
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
      {content.breadcrumbs && <Breadcrumbs entries={content.breadcrumbs} />}
      <StyledH1>{content.title}</StyledH1>
      <ToolLine>
        {content.legacy && (
          <LegacyIndicator title="Inhalt im alten Format">L</LegacyIndicator>
        )}
        <ToolLineButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
        </ToolLineButton>
        <ToolLineButton
          onClick={() => {
            window.location.href = '/create'
          }}
        >
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
