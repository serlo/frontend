import fetchContentQL from '../src/content-api/fetchContentFromSerloOrg'
import Header from '../src/components/navigation/Header'
import ContentTypes from '../src/components/content/ContentTypes'
import Footer from '../src/components/navigation/Footer'
import { StyledMain } from '../src/components/tags/StyledMain'
import styled from 'styled-components'

function PageView(props) {
  const { data } = props
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
`

export async function getServerSideProps(props) {
  const data = await fetchContentQL('/' + props.params.slug.join('/'))
  return { props: { data } }
}

export default PageView
