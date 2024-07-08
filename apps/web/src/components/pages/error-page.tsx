import { useState, useEffect } from 'react'

import { PageTitle } from '../content/page-title'
import { HeadTags } from '../head-tags'
import { HSpace } from '@/components/content/h-space'
import { useInstanceData } from '@/contexts/instance-context'
import { getTranslatedType } from '@/helper/get-translated-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { triggerSentry } from '@/helper/trigger-sentry'

interface ErrorPageProps {
  code: number
  message?: string
}

export function ErrorPage({ code, message }: ErrorPageProps) {
  const [path, setPath] = useState('')
  const [hasSerloBacklink, setHasSerloBacklink] = useState(false)
  const { strings } = useInstanceData()
  const errStrings = strings.errors

  useEffect(() => {
    if (!window.location.pathname.startsWith('/error/deleted')) {
      void triggerSentry({ message, code })
    }

    setPath(window.location.pathname)

    const previousPage = sessionStorage.getItem('previousPathname')
    setHasSerloBacklink(previousPage ? previousPage.length > 0 : false)
  }, [code, message])

  const isProbablyTemporary = code > 500
  const isDeletedComment = path.startsWith('/error/deleted/')

  const title = isDeletedComment
    ? `🧹 ${errStrings.deletedComment.title}`
    : errStrings.title
  const text = isDeletedComment
    ? replacePlaceholders(errStrings.deletedComment.text, {
        type: getTranslatedType(strings, 'comment'),
        break: <br />,
      })
    : errStrings.defaultMessage

  const additionalText = isDeletedComment
    ? ''
    : isProbablyTemporary
      ? errStrings.temporary
      : errStrings.permanent

  const titleText = isDeletedComment ? 'Deleted Comment' : title

  return (
    <>
      <HeadTags data={{ title: titleText }} noIndex />
      <PageTitle title={titleText} />
      <p className="serlo-p text-2xl" id="error-page-description">
        {text}
      </p>
      <p className="serlo-p text-2xl">{additionalText}</p>
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
            className="serlo-button-blue mr-4 mt-4"
            onClick={() => window.location.reload()}
          >
            {errStrings.refreshNow}
          </button>
        )}
      </>
    )
  }

  function renderHomeLink() {
    // don't use csr here to make sure we refresh everything after crashing
    return (
      // eslint-disable-next-line @next/next/no-html-link-for-pages
      <a href="/" className="serlo-button-blue mr-4 mt-4">
        {errStrings.backToHome}
      </a>
    )
  }

  function renderBacklink() {
    if (!hasSerloBacklink) return null
    return (
      <button
        className="serlo-button-blue mr-4 mt-4"
        onClick={() => window.history.back()}
      >
        {errStrings.backToPrevious}
      </button>
    )
  }

  function renderSmartBacklink() {
    if (hasSerloBacklink) return renderBacklink()
    return renderHomeLink()
  }
}
