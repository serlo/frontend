import { LoadingSpinner } from '@editor/editor-ui/loading-spinner'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import {
  EditorInjectionDocument,
  type AnyEditorDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'

function getHost(currentHost: string) {
  if (currentHost.endsWith('serlo-staging.dev')) return currentHost
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://serlo.org'
}

export function InjectionStaticRenderer({
  state: href,
  errorBox,
}: EditorInjectionDocument & { errorBox?: JSX.Element }) {
  const [content, setContent] = useState<
    AnyEditorDocument[] | 'loading' | 'error'
  >('loading')

  useEffect(() => {
    if (!href) return

    function handleError(error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error)
      setContent('error')
    }

    async function fetchSerloContent() {
      const host = getHost(window.location.host)
      const url = `${host}/api/frontend/injection-content?href=${encodeURIComponent(href)}`
      const res = await fetch(url)
      const data = (await res.json()) as string | AnyEditorDocument[]

      if (!res.ok) return handleError(data)
      setContent(data as AnyEditorDocument[])
    }

    try {
      void fetchSerloContent()
    } catch (error) {
      handleError(error)
    }
  }, [href])

  if (!href) return null

  if (content === 'loading') return <LoadingSpinner />
  if (content === 'error') return errorBox ?? null

  return (
    <div className="border-b-3 border-brand-200 py-4 text-gray-900">
      <StaticRenderer document={content} />
    </div>
  )
}
