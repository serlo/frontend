import fetchContent from '../src/content-api/fetchContentFromSerloOrg'
import Header from '../src/components/navigation/Header'
import ContentTypes from '../src/components/content/ContentTypes'
import Footer from '../src/components/navigation/Footer'
import { StyledMain } from '../src/components/tags/StyledMain'

function PageView(props) {
  const { data } = props
  return (
    <>
      <Header />
      <StyledMain>
        <ContentTypes data={data} />
      </StyledMain>
      <Footer />
    </>
  )
}

export async function getServerSideProps(props) {
  const data = await fetchContent('/' + props.params.slug.join('/'))
  return { props: { data } }
}

export default PageView
