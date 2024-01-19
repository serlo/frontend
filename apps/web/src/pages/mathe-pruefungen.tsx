import { GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MathExamsLanding } from '@/components/pages/math-exams-landing'
import { TaxonomyPage } from '@/data-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<{ pageData: TaxonomyPage }>(() => {
  return (
    <FrontendClientBase noContainers noHeaderFooter>
      <MathExamsLanding />
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale !== 'de') return { notFound: true }
  return { props: {} }
}
