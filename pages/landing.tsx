import Header from '../src/components/navigation/Header'
import LandingSubjects from '../src/components/landing/LandingSubjects'
import Footer from '../src/components/navigation/Footer'
import styled from 'styled-components'

// import CloseSVG from '../public/img/serlo-logo.svg'
export default function PageView(props) {
  const { data } = props
  return (
    <>
      <Header />
      <RelatveContainer>
        <Landing />
      </RelatveContainer>
      <Footer />
    </>
  )
}

const RelatveContainer = styled.div`
  position: relative;
`

function Landing() {
  return (
    <>
      <section>
        <LandingSubjects />
      </section>
      <section>something</section>
      <section>yeah</section>
    </>
  )
}
