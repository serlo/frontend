import { fetchContent } from '../src/content-api/fetchContentFromSerloOrg'
import Header from '../src/components/navigation/Header'
import ContentTypes from '../src/components/content/ContentTypes'
import MetaMenu from '../src/components/navigation/MetaMenu'
import MobileMetaMenu from '../src/components/navigation/MobileMetaMenu'
import Footer from '../src/components/navigation/Footer'
import styled from 'styled-components'
import { metamenudata } from '../src/metamenudata'
import Breadcrumbs from '../src/components/navigation/Breadcrumbs'
import HSpace from '../src/components/content/HSpace'
import Horizon from '../src/components/content/Horizon'
import { horizonData } from '../src/horizondata'
import fetch from 'isomorphic-unfetch'
import absoluteUrl from 'next-absolute-url'

function PageView(props) {
  const { data } = props
  const alias = data.alias
  const isMeta =
    alias == '/serlo' || metamenudata.some(entry => alias == entry.url)
  const showBreadcrumbs =
    data.contentType === 'Article' || data.contentType === 'Page'
  return (
    <>
      <Header />
      {isMeta && (
        <>
          <MobileMetaMenu links={metamenudata} pagealias={alias} />
          <MetaMenu links={metamenudata} pagealias={alias} />
        </>
      )}
      <RelatveContainer>
        <MaxWidthDiv>
          {showBreadcrumbs && data.breadcrumbs && (
            <Breadcrumbs entries={data.breadcrumbs} />
          )}
          <main>
            <ContentTypes data={data} />
          </main>
          <HSpace amount={40} />
          <Horizon entries={horizonData} randoms={data.randoms} />
        </MaxWidthDiv>
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

const MaxWidthDiv = styled.div`
  max-width: 800px;
`

export async function getServerSideProps(props) {
  const { origin } = absoluteUrl(props.req)
  const res = await fetch(`${origin}/api/${props.params.slug.join('/')}`)
  const data = await res.json()
  return { props: { data } }
}

export default PageView
