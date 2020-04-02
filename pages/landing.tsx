import Header from '../src/components/navigation/Header'
import LandingSubjects from '../src/components/landing/LandingSubjects'
import LandingAbout from '../src/components/landing/LandingAbout'
import Footer from '../src/components/navigation/Footer'
import styled from 'styled-components'

// import CloseSVG from '../public/img/serlo-logo.svg'
export default function Landing(props) {
  const { data } = props
  return (
    <>
      <Header />
      <RelatveContainer>
        <Section>
          <LandingSubjects />
        </Section>

        <AboutSection>
          <LandingAbout />
        </AboutSection>

        <Section>yeah</Section>
      </RelatveContainer>
      <Footer />
    </>
  )
}

const RelatveContainer = styled.div`
  position: relative;
`

const Section = styled.section``

const AboutSection = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
  }
`
