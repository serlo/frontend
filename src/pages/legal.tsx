import type { GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { fetchAndConvertLegalMarkdown } from '@/fetcher/fetch-and-convert-legal-markdown'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export interface LegalData {
  contentHtml: string
  isGerman: boolean
}

export default renderedPageNoHooks<LegalData>((props) => {
  return <Content {...props} />
})

function Content({ contentHtml, isGerman }: LegalData) {
  return (
    <FrontendClientBase>
      <h1 className="serlo-h1 mt-24">
        {isGerman ? 'Impressum' : 'Legal Notice'}
      </h1>
      <div
        className="serlo-prose-hacks"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </FrontendClientBase>
  )
}

export const getStaticProps: GetStaticProps<LegalData> = async (context) => {
  const isGerman = context.locale === 'de'
  const contentHtml = await fetchAndConvertLegalMarkdown(isGerman, 'imprint.md')

  return { props: { contentHtml, isGerman } }
}
