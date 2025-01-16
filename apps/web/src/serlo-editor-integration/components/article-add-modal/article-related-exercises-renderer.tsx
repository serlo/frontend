import { SerloRenderer } from '@editor/package'
import { useEffect, useState } from 'react'

import { LoadingSpinner } from '@/components/loading/loading-spinner'

export function ArticleRelatedExercisesRenderer({ href }: { href: string }) {
  const [content, setContent] = useState<string | 'loading' | 'error'>(
    'loading'
  )

  useEffect(() => {
    if (!href) return

    function handleError(error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error)
      setContent('error')
    }

    async function fetchSerloContent() {
      const url = `/api/frontend/injection-content?href=${encodeURIComponent(href)}`
      const res = await fetch(url)
      const data = (await res.json()) as string

      if (!res.ok) return handleError(data)
      setContent(data)
    }

    try {
      void fetchSerloContent()
    } catch (error) {
      handleError(error)
    }
  }, [href])

  if (!href || content === 'error') return null
  if (content === 'loading') return <LoadingSpinner />

  return (
    <SerloRenderer editorVariant="serlo-org" state={content} skipMigration />
  )
}
