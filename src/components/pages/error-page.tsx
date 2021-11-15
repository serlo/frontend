import Head from 'next/head'
import { useState, useEffect } from 'react'

import { PageTitle } from '../content/page-title'
import { HSpace } from '@/components/content/h-space'
import { useInstanceData } from '@/contexts/instance-context'
import { ErrorData } from '@/data-types'
import { triggerSentry } from '@/helper/trigger-sentry'

export function ErrorPage({ code, message }: ErrorData) {
  const [path, setPath] = useState('')
  const [hasSerloBacklink, setHasSerloBacklink] = useState(false)
  const { strings } = useInstanceData()

  useEffect(() => {
    void triggerSentry({ message, code })

    setPath(window.location.pathname)

    const previousPage = sessionStorage.getItem('previousPathname')
    setHasSerloBacklink(previousPage ? previousPage.length > 0 : false)
  }, [code, message])

  const isProbablyTemporary = code > 500

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <PageTitle title={strings.errors.title} headTitle />
      <p className="serlo-p text-2xl" id="error-page-description">
        {strings.errors.defaultMessage}{' '}
        {!isProbablyTemporary && (
          <>
            <br />
            {strings.errors.permanent}
          </>
        )}
      </p>
      <p className="serlo-p text-2xl">
        {isProbablyTemporary && strings.errors.temporary}
      </p>
      <p className="serlo-p">{renderButtons()}</p>
      <HSpace amount={70} />
      <p className="serlo-p">
        <b>Error: {code}</b>
      </p>
      {process.env.NODE_ENV !== 'production' && (
        <p className="serlo-p">
          Details:{' '}
          <a className="serlo-link" href={`/api/frontend${path}`}>
            /api/frontend
            {path}
          </a>
        </p>
      )}
      <HSpace amount={100} />
    </>
  )

  function renderButtons() {
    return (
      <>
        {isProbablyTemporary ? (
          renderSmartBacklink()
        ) : (
          <>
            {renderBacklink()}
            {renderHomeLink()}
          </>
        )}
        {isProbablyTemporary && (
          <button
            className="serlo-button serlo-make-interactive-primary mr-4 mt-4"
            onClick={() => window.location.reload()}
          >
            {strings.errors.refreshNow}
          </button>
        )}
      </>
    )
  }

  function renderHomeLink() {
    //no csr here
    return (
      <a
        href="/"
        className="serlo-button serlo-make-interactive-primary mr-4 mt-4"
      >
        {strings.errors.backToHome}
      </a>
    )
  }

  function renderBacklink() {
    if (!hasSerloBacklink) return null
    return (
      <button
        className="serlo-button serlo-make-interactive-primary mr-4 mt-4"
        onClick={() => window.history.back()}
      >
        {strings.errors.backToPrevious}
      </button>
    )
  }

  function renderSmartBacklink() {
    if (hasSerloBacklink) return renderBacklink()
    return renderHomeLink()
  }
}
