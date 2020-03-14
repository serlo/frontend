import Header from './header'
import Toolbox from './toolbox'
import Footer from './footer'
import styled from 'styled-components'

import ContentTypes from './contenttypes'

export default function Main(props) {
  const { data } = props
  return (
    <div lang="de">
      <Header />
      <Toolbox />
      <DummyContainer>
        <ContentTypes data={data} />
      </DummyContainer>
      <Footer />
    </div>
  )
}

const DummyContainer = styled.main`
  margin-left: auto;
  margin-right: auto;
  max-width 900px;
  overflow: hidden;
`
