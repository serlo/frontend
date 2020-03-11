import Header from './header'
import Toolbox from './toolbox'
import Footer from './footer'
import styled from 'styled-components'

export default function Main(props) {
  const { data } = props
  return (
    <>
      <Header />
      <Toolbox />
      <DummyContainer>
        <div dangerouslySetInnerHTML={{ __html: data.content.content }} />
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
`
