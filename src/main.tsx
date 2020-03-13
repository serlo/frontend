import Header from './header'
import Toolbox, { IconButton } from './toolbox'
import Footer from './footer'
import styled from 'styled-components'

import dynamic from 'next/dynamic'

import EdtrIoRenderer from './transform-edtr-io-state'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons'

const LegacyRenderer = dynamic(import('./transform-legacy-state'))

export default function Main(props) {
  const { data } = props
  let content
  try {
    content = JSON.parse(data.content.content)
  } catch (e) {
    return <p>Unknown content type</p>
  }
  let comp = null
  if (content.plugin) {
    comp = <EdtrIoRenderer state={content} />
  } else {
    comp = <LegacyRenderer state={content} />
  }

  return (
    <div lang="de">
      <Header />
      <Toolbox />
      <DummyContainer>
        <ArticleHeading>{data.content.title}</ArticleHeading>
        <ToolLine>
          <IconButton>
            <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
          </IconButton>
        </ToolLine>
        {comp}
      </DummyContainer>
      <Footer />
    </div>
  )
}

const DummyContainer = styled.main`
  margin-left: auto;
  margin-right: auto;
  max-width 1000px;
  overflow: hidden;
`

const ArticleHeading = styled.h1`
  margin-top: 42px;
  margin-left: 15px;
  font-size: 32px;
  padding: 0;
  margin-right: 15px;
  margin-bottom: 0;
`

const ToolLine = styled.div`
  margin-right: 16px;
  margin-top: 4px;
  display: none;
  @media (max-width: 500px) {
    display: flex;
  }
  margin-bottom: 12px;
  justify-content: flex-end;
`
