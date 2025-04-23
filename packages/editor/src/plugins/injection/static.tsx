import { LoadingSpinner } from '@editor/editor-ui/loading-spinner'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import {
  EditorInjectionDocument,
  type AnyEditorDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState, type JSX } from 'react';

function getBase(currentHost: string) {
  if (currentHost.endsWith('serlo-staging.dev'))
    return 'https://de.serlo-staging.dev'
  if (currentHost.endsWith('serlo.org')) return 'https://' + currentHost

  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://de.serlo.org'
}

interface ResponseData {
  content: AnyEditorDocument[]
  alias: string
  licenseId?: number
}

export function InjectionStaticRenderer({
  state: href,
  errorBox,
}: EditorInjectionDocument & { errorBox?: JSX.Element }) {
  const injectionStrings = useStaticStrings().plugins.injection

  const [data, setData] = useState<ResponseData | 'loading' | 'error'>(
    'loading'
  )

  useEffect(() => {
    if (!href) return

    function handleError(error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error)
      setData('error')
    }

    async function fetchSerloContent() {
      const base = getBase(window.location.host)
      const url = `${base}/api/frontend/injection-content?href=${encodeURIComponent(href)}`
      const res = await fetch(url)
      const data = (await res.json()) as
        | string
        | { content: AnyEditorDocument[]; alias: string; licenseId?: number }

      if (!res.ok) {
        handleError(data)
        return
      }
      setData(data as ResponseData)
    }

    try {
      void fetchSerloContent()
    } catch (error) {
      handleError(error)
    }
  }, [href])

  if (!href) return null

  if (data === 'loading') return <LoadingSpinner />
  if (data === 'error') return errorBox ?? null

  // injection content does not show license notice right now

  return (
    <div className="pt-4">
      <div className="mx-side border-t-3 border-brand-200 pb-4"></div>
      <StaticRenderer document={data.content} />
      <div className="mx-side border-t-3 border-brand-200 text-right text-gray-400">
        {data.licenseId && data.licenseId > 1 ? (
          <a
            className="serlo-link"
            href={`/license/detail/${data.licenseId}`}
            target="_blank"
            rel="noreferrer"
          >
            {injectionStrings.license}
          </a>
        ) : null}{' '}
        (
        <a
          className="serlo-link"
          target="_blank"
          rel="noreferrer"
          href={data.alias}
        >
          {injectionStrings.injectedContent}
        </a>
        )
      </div>
    </div>
  )
}
