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
  StyledUl
} from '../visuals'
import ShareModal from '../sharemodal'

import EdtrIoRenderer from './transform-edtr-io-state'
import Ups from './ups'
import WipHint from './wiphint'
const LegacyRenderer = dynamic(import('./transform-legacy-state'))

export default function ContentTypes(props) {
  const { data } = props
  console.log(data.contentType)
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
  return <Ups />
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
      <ArticleHeading>{content.title}</ArticleHeading>
      <ToolLine>
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
