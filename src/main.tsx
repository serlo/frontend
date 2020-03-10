import Header from './header'
import Footer from './footer'
import styled from 'styled-components'

export default function Main(props) {
  const { data } = props
  return (
    <>
      <Header />
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
