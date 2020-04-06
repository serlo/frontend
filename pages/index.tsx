import styled from 'styled-components'

import Header from '../src/components/navigation/Header'
import LandingSubjects from '../src/components/landing/LandingSubjects'
import LandingAbout from '../src/components/landing/LandingAbout'
import Footer from '../src/components/navigation/Footer'
import Topic from '../src/components/content/Topic'
import { TopicPurposes } from '../src/components/content/Topic'

export default function Landing() {
  return (
    <>
      <Header />
      <Container></Container>
      <Footer />
    </>
  )
}

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`
