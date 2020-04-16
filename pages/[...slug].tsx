import Header from '../src/components/navigation/Header'
import Footer from '../src/components/navigation/Footer'
import styled from 'styled-components'
import HSpace from '../src/components/content/HSpace'
import Horizon from '../src/components/content/Horizon'
import { horizonData } from '../src/data/horizondata'
import fetch from 'isomorphic-unfetch'
import absoluteUrl from 'next-absolute-url'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import ArticlePage from '../src/components/content/ArticlePage'
import StyledP from '../src/components/tags/StyledP'

const MetaMenu = dynamic(() => import('../src/components/navigation/MetaMenu'))
const Breadcrumbs = dynamic(() =>
  import('../src/components/navigation/Breadcrumbs')
)
const Topic = dynamic(() => import('../src/components/content/Topic'))

function PageView(props) {
  const { data } = props
  const {
    alias,
    isMeta,
    showBreadcrumbs,
    horizonIndices,
    breadcrumbs,
    contentType,
    title
  } = data

  const metaContentType = contentType.toLowerCase()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="content_type" content={metaContentType} />
        <meta property="og:title" content={title} />
      </Head>
      <Header />
      {isMeta && <MetaMenu pagealias={alias} />}
      <RelatveContainer>
        <MaxWidthDiv>
          {data.error ? <StyledP>{data.error}</StyledP> : null}
          {showBreadcrumbs && breadcrumbs && (
            <Breadcrumbs entries={breadcrumbs} />
          )}
          <main>
            {data && (contentType === 'Article' || contentType === 'Page') && (
              <ArticlePage data={data.data} />
            )}
            {contentType === 'TaxonomyTerm' && <Topic data={data.data} />}
          </main>
          <HSpace amount={40} />
          {horizonIndices && (
            <Horizon
              entries={horizonIndices.map(index => horizonData[index])}
            />
          )}
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
  const res = await fetch(
    `${origin}/api/${encodeURIComponent(props.params.slug.join('/'))}`
  )
  const data = await res.json()
  return { props: { data } }
}

export default PageView
