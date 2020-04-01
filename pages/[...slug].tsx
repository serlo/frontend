import { fetchContent } from '../src/content-api/fetchContentFromSerloOrg'
import Header from '../src/components/navigation/Header'
import ContentTypes from '../src/components/content/ContentTypes'
import MetaMenu from '../src/components/navigation/MetaMenu'
import MobileMetaMenu from '../src/components/navigation/MobileMetaMenu'
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
        <MobileMetaMenu links={metamenudata} pagealias={alias} />
        <MetaMenu links={metamenudata} pagealias={alias} />
        <RelatveContainer>
          <StyledMain>
            <ContentTypes data={data} />
          </StyledMain>
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

export async function getServerSideProps(props) {
  const data = await fetchContent('/' + props.params.slug.join('/'))
  return { props: { data } }
}

export default PageView
