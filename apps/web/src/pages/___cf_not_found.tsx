import { GetServerSideProps, NextPage } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      noIndex
      showNav={false}
      authorization={{}}
    >
      <div className="mt-12 p-12 text-center">
        <h1 className="serlo-h1">Diese URL kennen wir leider nicht. 😶‍🌫️</h1>
        (sorry, we don&apos;t seem to know this url)
        <br />
        <a className="serlo-button-blue mt-6" href="https://serlo.org">
          👉 serlo.org
        </a>
      </div>
    </FrontendClientBase>
  )
}
export default ContentPage

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.statusCode = 404
  return { props: {} }
}
