import fetchContent from '../src/content-api/fetchContentFromSerloOrg'
import Header from '../src/components/navigation/Header'
import ContentTypes from '../src/components/content/ContentTypes'
import Footer from '../src/components/navigation/Footer'
import styled from 'styled-components'
import { metamenudata } from '../src/metamenudata'

function PageView(props) {
  const { data } = props
  const alias = data.alias
  if (alias == '/serlo' || metamenudata.some(entry => alias == entry.url)) {
    return (
      <>
        <Header />
        <MobileMenuWrapper>
          {metamenudata.map(entry => (
            <a href={entry.url} key={entry.url}>
              {entry.title}
            </a>
          ))}
        </MobileMenuWrapper>
        <RelatveContainer>
          <SideMenuWrapper>
            {metamenudata.map(entry => (
              <p key={entry.url}>
                <a href={entry.url}>{entry.title}</a>
              </p>
            ))}
          </SideMenuWrapper>
          <StyledMain>
            <ContentTypes data={data} />
          </StyledMain>
          <SideMenuBalancer></SideMenuBalancer>
        </RelatveContainer>
        <Footer />
      </>
    )
  }
  return (
    <>
      <Header />
      <RelatveContainer>
        <StyledMain>
          <ContentTypes data={data} />
        </StyledMain>
      </RelatveContainer>
      <Footer />
    </>
  )
}

const RelatveContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`

const StyledMain = styled.main`
  max-width: 800px;
  overflow: hidden;
`

const SideMenuWrapper = styled.div`
  display: none;
  width: 200px;
  flex-shrink: 0;
  margin-right: 30px;
  background-color: lightgreen;
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }
`

const SideMenuBalancer = styled.div`
  display: none;
  width: 200px;
  flex-shrink: 1;
  flex-grow: 0;
  margin-left: 30px;
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }
`

const MobileMenuWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: lightsteelblue;
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
  & a {
    margin-right: 10px;
  }
`

export async function getServerSideProps(props) {
  const data = await fetchContent('/' + props.params.slug.join('/'))
  return { props: { data } }
}

export default PageView
