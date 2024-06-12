import { GetStaticProps } from 'next'

import type { LegalData } from './legal'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { fetchAndConvertLegalMarkdown } from '@/fetcher/fetch-and-convert-legal-markdown'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<LegalData>((props) => {
  return <Content {...props} />
})

function Content({ contentHtml, isGerman }: LegalData) {
  return (
    <FrontendClientBase>
      <PageTitle
        title={
          isGerman ? 'Nutzungsbedigungen und Urheberrecht' : 'Terms of Use'
        }
        headTitle
      />
      <div
        className="serlo-prose-hacks"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </FrontendClientBase>
  )
}

export const getStaticProps: GetStaticProps<LegalData> = async (context) => {
  const isGerman = context.locale === 'de'
  const contentHtml = await fetchAndConvertLegalMarkdown(isGerman, 'terms.md')

  return { props: { contentHtml, isGerman } }
}
