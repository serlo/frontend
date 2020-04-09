import Header from '../src/components/navigation/Header'
import ContentTypes from '../src/components/content/ContentTypes'
import Footer from '../src/components/navigation/Footer'
import styled from 'styled-components'
import HSpace from '../src/components/content/HSpace'
import Horizon from '../src/components/content/Horizon'
import { horizonData } from '../src/horizondata'
import fetch from 'isomorphic-unfetch'
import absoluteUrl from 'next-absolute-url'
import dynamic from 'next/dynamic'

const MetaMenu = dynamic(() => import('../src/components/navigation/MetaMenu'))
const Breadcrumbs = dynamic(() =>
  import('../src/components/navigation/Breadcrumbs')
)

function PageView(props) {
  const { data } = props
  console.log(`Fetch time: ${data.fetchTime}ms`)
  const { alias, isMeta, showBreadcrumbs, horizonIndices, breadcrumbs } = data
  return (
    <>
      <Header />
      {isMeta && <MetaMenu pagealias={alias} />}
      <RelatveContainer>
        <MaxWidthDiv>
          {showBreadcrumbs && breadcrumbs && (
            <Breadcrumbs entries={breadcrumbs} />
          )}
          <main>
            <ContentTypes data={data} />
          </main>
          <HSpace amount={40} />
          <Horizon entries={horizonIndices.map(index => horizonData[index])} />
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
  const startTime = Date.now()
  const res = await fetch(`${origin}/api/${props.params.slug.join('/')}`)
  const data = await res.json()
  data.fetchTime = Date.now() - startTime
  return { props: { data } }
}

export default PageView
