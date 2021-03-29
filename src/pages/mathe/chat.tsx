import { GetStaticProps } from 'next'
import styled from 'styled-components'

import { PageTitle } from '@/components/content/page-title'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { StyledP } from '@/components/tags/styled-p'
import { SlugProps, SlugPageData } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { makeGreenButton } from '@/helper/css'
import { renderedPageNoHooks } from '@/helper/rendered-page'

/*
    Temporary chat implementation, only for testing
*/

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
  if (pageData.kind !== 'single-entity') return <></>
  return (
    <FrontendClientBase noContainers entityId={pageData.entityData.id}>
      <EntityBase page={pageData}>
        <PageTitle title="Chat für Mathe-Autor*innen" headTitle />
        <StyledP>
          <Button
            href="https://community.serlo.org/channel/mathe"
            target="_blank"
          >
            In neuem Tab öffnen
          </Button>
        </StyledP>
        <StyledIFrame
          width="100%;"
          height="100%"
          src="https://community.serlo.org/channel/mathe?layout=embedded"
          frameBorder="0"
        ></StyledIFrame>
      </EntityBase>
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<SlugProps> = async () => {
  const pageData = await fetchPageData('/mathe')
  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SlugPageData, // remove undefined values
    },
    revalidate: 1,
  }
}

const StyledIFrame = styled.iframe`
  min-height: 75vh;
`

const Button = styled.a`
  ${makeGreenButton}
`
