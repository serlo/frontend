import { micromark } from 'micromark'
import { GetStaticProps } from 'next'

import { LegalData, legalRepo } from './legal'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<LegalData>((props) => {
  return <Content {...props} />
})

function Content({ contentHtml, isGerman }: LegalData) {
  return (
    <FrontendClientBase>
      <h1 className="serlo-h1 mt-24">
        {isGerman ? 'Nutzungsbedigungen und Urheberrecht' : 'Terms of Use'}
      </h1>
      <main
        className="serlo-prose-hacks"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </FrontendClientBase>
  )
}

export const getStaticProps: GetStaticProps<LegalData> = async (context) => {
  const isGerman = context.locale === 'de'
  const url = `${legalRepo}/${isGerman ? 'de' : 'en'}/terms.md`

  try {
    const response = await fetch(url)
    const markdown = await response.text()
    const contentHtml = micromark(markdown, {
      allowDangerousHtml: true,
    })
    return { props: { contentHtml, isGerman } }
  } catch (e) {
    console.error(e)
    return { notFound: true }
  }
}
