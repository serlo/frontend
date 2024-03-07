import { GetStaticProps } from 'next'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  return (
    <FrontendClientBase noContainers noHeaderFooter>
      <>
        Outside of the dev environment you would be redirected in the cloudflare
        worker to{' '}
        <Link href="/mathe-pruefungen/bayern">
          Math Exams Landing Page for Bayern
        </Link>{' '}
        for example.
      </>
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<object> = async () => {
  return isProduction ? { notFound: true } : { props: {} }
}
