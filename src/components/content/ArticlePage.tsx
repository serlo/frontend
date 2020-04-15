import React from 'react'
import StyledH1 from '../tags/StyledH1'
import ToolLine from '../navigation/ToolLine'
import ToolLineButton from '../navigation/ToolLineButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import ShareModal from '../navigation/ShareModal'
import { renderArticle } from '../../schema/articleRenderer'
import HSpace from './HSpace'
import Toolbox from '../navigation/Toolbox'

export default function ArticlePage({ data }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <StyledH1 displayMode>{data.title}</StyledH1>
      <ToolLine>
        <ToolLineButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
        </ToolLineButton>
      </ToolLine>
      {data.value && renderArticle(data.value.children)}
      <HSpace amount={20} />
      <ToolLine>
        <ToolLineButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
        </ToolLineButton>
      </ToolLine>
      <Toolbox
        onShare={() => setOpen(true)}
        onEdit={() => {
          if (!window.location.host.includes('serlo.org')) {
            window.open(
              window.location.protocol +
                '//' +
                window.location.host +
                '/create?id=' +
                encodeURIComponent(window.location.pathname.substring(1)),
              '_blank'
            )
          }
        }}
      />
      <ShareModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
