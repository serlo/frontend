import fetchContent from '../src/content-api/fetchcontent'
import Header from '../src/components/header'
import Toolbox from '../src/components/toolbox'
import { DummyContainer } from '../src/components/visuals'
import ContentTypes from '../src/components/contenttypes'
import Footer from '../src/components/footer'

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
