import Header from './header'
import Toolbox from './toolbox'
import Footer from './footer'
import styled from 'styled-components'

import EdtrIoRenderer from './transform-edtr-io-state'
import LegacyRenderer from './transform-legacy-state'

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
    <>
      <Header />
      <Toolbox />
      <DummyContainer>
        <h1>{data.content.title}</h1>
        {comp}
      </DummyContainer>
      <Footer />
    </>
  )
}

const DummyContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width 1000px;
  padding: 32px;
  overflow: hidden;
`
