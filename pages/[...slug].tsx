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
import StyledH1 from '../src/components/tags/StyledH1'
import { renderArticle } from '../src/schema/articleRenderer'

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
  return (
    <>
      <Head>
        <title>{title}</title>
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
            {data &&
              (contentType === 'Article' ||
                contentType === 'Page' ||
                contentType === 'CoursePage') && (
                <ArticlePage data={data.data} />
              )}
            {contentType === 'TaxonomyTerm' && <Topic data={data.data} />}
            {(contentType === 'Video' || contentType === 'Applet') && (
              <>
                <StyledH1>{data.data.title}</StyledH1>
                {renderArticle(data.data.value.children)}
              </>
            )}
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

  // compat course to first page
  if (data.contentType === 'Course') {
    props.res.writeHead(301, {
      Location: data.data.redirect,
      // Add the content-type for SEO considerations
      'Content-Type': 'text/html; charset=utf-8'
    })
    props.res.end()
    return
  }

  return { props: { data } }
}

export default PageView
