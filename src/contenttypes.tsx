import React from 'react'
import dynamic from 'next/dynamic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import { ArticleHeading, ToolLine, ToolLineButton } from './visuals'
import ShareModal from './sharemodal'

import EdtrIoRenderer from './transform-edtr-io-state'
const LegacyRenderer = dynamic(import('./transform-legacy-state'))

export default function ContentTypes(props) {
  const { data } = props
  if (data.type === 'article') {
    return renderArticle(data.content)
  }
  return (
    <>
      <p>Aufgabentyp in Arbeit: {data.type}</p>
      <p>{JSON.stringify(data)}</p>
    </>
  )
}

function renderArticle(content) {
  const [open, setOpen] = React.useState(false)
  let innerContent = JSON.parse(content.content)
  let comp = null
  if (innerContent.plugin) {
    comp = <EdtrIoRenderer state={innerContent} />
  } else {
    comp = <LegacyRenderer state={innerContent} />
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
