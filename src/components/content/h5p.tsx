import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

import { useInstanceData } from '@/contexts/instance-context'
import { exerciseSubmission } from '@/helper/exercise-submission'

export interface H5pProps {
  url: string
  context: {
    entityId: number
    revisionId: number
  }
}

export function parseH5pUrl(url: string) {
  const result = /https:\/\/app\.lumi\.education\/run\/([\w-]+)/i.exec(url)
  return result ? result[1] : null
}

export function H5p({ url, context }: H5pProps) {
  const id = parseH5pUrl(url)
  const { strings } = useInstanceData()
  const { asPath } = useRouter()

  useEffect(() => {
    window.document.body.addEventListener('h5pExerciseCorrect', (e) => {
      const e_id = (e as CustomEvent).detail as string
      if (e_id === id) {
        exerciseSubmission({
          path: asPath,
          entityId: context.entityId,
          revisionId: context.revisionId,
          result: 'correct',
          type: 'h5p',
        })
      }
    })
    window.document.body.addEventListener('h5pExerciseWrong', (e) => {
      const e_id = (e as CustomEvent).detail as string
      if (e_id === id) {
        exerciseSubmission({
          path: asPath,
          entityId: context.entityId,
          revisionId: context.revisionId,
          result: 'wrong',
          type: 'h5p',
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!id) {
    return <p className="serlo-p">{strings.errors.defaultMessage}</p>
  }

  const src = `/api/frontend/lumi/embed/${id}`

  return (
    <div className="mx-side mb-block">
      <iframe
        src={src}
        width="727"
        height="500"
        allowFullScreen
        allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
      ></iframe>
      <Script src="/_assets/h5p-resizer.js" />
    </div>
  )
}
