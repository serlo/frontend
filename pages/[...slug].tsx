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
import CookieBar from '../src/components/content/CookieBar'
import LicenseNotice from '../src/components/content/LicenseNotice'

const MetaMenu = dynamic(() => import('../src/components/navigation/MetaMenu'))
const Breadcrumbs = dynamic(() =>
  import('../src/components/navigation/Breadcrumbs')
)
const Topic = dynamic(() => import('../src/components/content/Topic'))

function PageView(props) {
  const { data } = props
  const {
    horizonIndices,
    breadcrumbs,
    contentType,
    title,
    navigation,
    license
  } = data

  function buildMetaContentType() {
    //match legacy content types that are used by google custom search
    if (contentType === undefined) return ''
    if (contentType === 'Exercise') return 'text-exercise'
    if (contentType === 'CoursePage') return 'course-page'
    if (data.data?.type === 'topicFolder') return 'topic-folder'
    if (contentType === 'TaxonomyTerm') return 'topic'
    //Article, Video, Applet
    return contentType.toLowerCase()
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="content_type" content={buildMetaContentType()} />
        <meta property="og:title" content={title} />
      </Head>
      <Header />
      {navigation && (
        <MetaMenu pagealias={'/' + data.data.id} navigation={navigation} />
      )}
      <RelatveContainer>
        <MaxWidthDiv>
          {data.error ? (
            <>
              <HSpace amount={100} />
              <StyledH1>404</StyledH1>
              <StyledP>Diese Seite konnte nicht geladen werden.</StyledP>
            </>
          ) : null}
          {breadcrumbs && !(contentType === 'Page' && navigation) && (
            <Breadcrumbs entries={breadcrumbs} />
          )}
          <main>
            {data &&
              data.data &&
              (contentType === 'Article' ||
                contentType === 'Page' ||
                contentType === 'CoursePage') && (
                <ArticlePage data={data.data} />
              )}
            {contentType === 'TaxonomyTerm' && data.data && (
              <Topic data={data.data} />
            )}
            {(contentType === 'Video' || contentType === 'Applet') && (
              <>
                <StyledH1 displayMode>{data.data.title}</StyledH1>
                {renderArticle(data.data.value.children)}
              </>
            )}
            {(contentType === 'Exercise' ||
              contentType === 'ExerciseGroup') && (
              <>{renderArticle(data.data.value.children)}</>
            )}
            {license && <LicenseNotice data={license} />}
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
      <CookieBar />
    </>
  )
}

const RelatveContainer = styled.div`
  position: relative;
`

const MaxWidthDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

export async function getServerSideProps(props) {
  const { origin } = absoluteUrl(props.req)
  const res = await fetch(
    `${origin}/api/${encodeURIComponent(props.params.slug.join('/'))}?redirect`
  )
  const data = await res.json()

  // compat course to first page
  if (data.redirect) {
    props.res.writeHead(301, {
      Location: encodeURI(data.redirect),
      // Add the content-type for SEO considerations
      'Content-Type': 'text/html; charset=utf-8'
    })
    props.res.end()
    return
  }

  if (data.error) {
    props.res.statusCode = 404
  }

  return { props: { data } }
}

export default PageView
