import { parseH5pUrl } from '@editor/plugins/h5p/renderer'
import type { EditorH5PDocument } from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { useEntityData } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

const H5PPlayerUI = dynamic(
  () => import('@lumieducation/h5p-react').then((mod) => mod.H5PPlayerUI),
  { ssr: false }
)

// Special version for serlo.org with exercise submission events
export function H5pSerloStaticRenderer(props: EditorH5PDocument) {
  const { asPath } = useRouter()
  const ab = useAB()
  const { entityId, revisionId } = useEntityData()
  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)
  const [onClient, setOnClient] = useState(false)
  const id = parseH5pUrl(props.state)
  const { strings } = useInstanceData()

  useEffect(() => {
    requestAnimationFrame(() => {
      setOnClient(true)
    })
    const handleSubmissionEvent = (e: Event) => {
      const e_id = (e as CustomEvent).detail as string
      const id = parseH5pUrl(props.state)

      if (e_id === id) {
        exerciseSubmission(
          {
            path: asPath,
            entityId,
            revisionId,
            result: e.type === 'h5pExerciseCorrect' ? 'correct' : 'wrong',
            type: 'h5p',
          },
          ab,
          trackExperiment
        )
      }
    }
    const { body } = window.document
    body.addEventListener('h5pExerciseCorrect', handleSubmissionEvent)
    body.addEventListener('h5pExerciseWrong', handleSubmissionEvent)

    return () => {
      // Unbind the event listener on clean up
      body.removeEventListener('h5pExerciseCorrect', handleSubmissionEvent)
      body.removeEventListener('h5pExerciseWrong', handleSubmissionEvent)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!id) {
    return <p className="serlo-p">{strings.errors.defaultMessage}</p>
  }

  if (!onClient) {
    return (
      <div
        className="mx-side mb-block"
        style={{ width: 727, height: 500 }}
      ></div>
    )
  }

  console.log('why is this renderer on the server?')

  return (
    <div className="mx-side mb-block" style={{ width: 727, minHeight: 500 }}>
      <H5PPlayerUI
        contentId={id}
        loadContentCallback={async (contentId) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const data = await (
            await fetch(`/api/frontend/lumi/embed/${contentId}`)
          ).json()
          console.log(data)
          return data
        }}
      />
    </div>
  )
}
