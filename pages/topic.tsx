import Header from '../src/components/navigation/Header'
import { smallTopic, topic } from '../src/topicdummydata'
import Footer from '../src/components/navigation/Footer'
import styled from 'styled-components'
import Topic from '../src/components/content/Topic'

export default function TopicTest() {
  return (
    <>
      <Header />
      <Container>
        <h2>Topic fuer Uebersichten</h2>
        <Topic data={smallTopic}></Topic>

        <h2>Topic Detailansicht</h2>
        <Topic data={topic}></Topic>
      </Container>
      <Footer />
    </>
  )
}

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`
