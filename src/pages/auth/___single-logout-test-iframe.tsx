import Head from 'next/head'

import { PageTitle } from '@/components/content/page-title'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen bg-white max-w-xl m-auto pt-12">
        <PageTitle headTitle title="Single Logout test iframe" />
        <iframe
          src="https://de.serlo-staging.dev/auth/single-logout"
          className="m-side b-2 border-brand w-full h-96 max-w-xl shadow-menu"
        />
        <iframe
          src="https://de.serlo-staging.dev/api/single-logout-server"
          className="m-side b-2 border-brand w-full h-96 max-w-xl shadow-menu"
        />
      </div>
    </>
  )
})
