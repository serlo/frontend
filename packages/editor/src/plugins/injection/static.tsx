import { LoadingSpinner } from '@editor/editor-ui/loading-spinner'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import {
  EditorInjectionDocument,
  type AnyEditorDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'

const fetchHost =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://serlo.org'

export function InjectionStaticRenderer({
  state: href,
  errorBox,
}: EditorInjectionDocument & { errorBox?: JSX.Element }) {
  const [content, setContent] = useState<
    AnyEditorDocument[] | 'loading' | 'error'
  >('loading')

  const [base, hash] = href.split('#')

  const cleanedHref = base.startsWith('/') ? base : `/${base}`

  useEffect(() => {
    if (!cleanedHref) return

    const url = `${fetchHost}/api/frontend/injection-content?path=${encodeURIComponent(cleanedHref)}&hash=${hash ? encodeURIComponent(hash) : ''}`

    function handleError(error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error)
      setContent('error')
    }

    try {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            void res
              .text()
              .then((text) => {
                throw new Error(text)
              })
              .catch(handleError)
          } else {
            void res
              .json()
              .then((data) => {
                // eslint-disable-next-line no-console
                console.log(data)
                setContent(data as AnyEditorDocument[])
              })
              .catch(handleError)
          }
        })
        .catch(handleError)
    } catch (e) {
      handleError(e)
    }
  }, [cleanedHref, hash])

  if (!href || !cleanedHref) return null

  if (content === 'loading') return <LoadingSpinner />
  if (content === 'error') return errorBox ?? null

  return (
    <div className="border-b-3 border-brand-200 py-4 text-gray-900">
      <StaticRenderer document={content} />
    </div>
  )
}
