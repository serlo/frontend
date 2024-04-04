import { parseH5pUrl } from '@editor/plugins/h5p/renderer'
import { H5pStaticRenderer } from '@editor/plugins/h5p/static'
import type { EditorH5PDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAB } from '@/contexts/ab'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'

// Special version for serlo.org with exercise submission events
export function H5pSerloStaticRenderer(props: EditorH5PDocument) {
  const { asPath } = useRouter()
  const ab = useAB()
  const entityId = useEntityId()
  const revisionId = useRevisionId()

  useEffect(() => {
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
          ab
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

  return <H5pStaticRenderer {...props} />
}
