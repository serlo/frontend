import fetchContent from '../src/content-api/fetchcontent'
import Header from '../src/header'
import Toolbox from '../src/toolbox'
import { DummyContainer } from '../src/visuals'
import ContentTypes from '../src/content-api/contenttypes'
import Footer from '../src/footer'

function PageView(props) {
  const { data } = props
  return (
    <>
      <Header />
      <Toolbox />
      <DummyContainer>
        <ContentTypes data={data} />
      </DummyContainer>
      <Footer />
    </>
  )
}

export async function getServerSideProps(props) {
  const data = await fetchContent('/' + props.params.slug.join('/'))
  return { props: { data } }
}

export default PageView
