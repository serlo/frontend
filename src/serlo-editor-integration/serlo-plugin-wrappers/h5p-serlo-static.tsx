import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { H5pStaticRenderer } from '../../serlo-editor/plugins/h5p/static'
import { useAB } from '@/contexts/ab'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import type { EditorH5PPlugin } from '@/serlo-editor-integration/types/editor-plugins'

// TODO: test if events are actually submitted when we call this inside [...slug]

// Special version for serlo.org with exercise submission events
export function H5pSerloStaticRenderer(props: EditorH5PPlugin) {
  const { asPath } = useRouter()
  const ab = useAB()
  const entityId = useEntityId()
  const revisionId = useRevisionId()

  useEffect(() => {
    if (!entityId || !revisionId) return

    const handleSubmissionEvent = (e: Event) => {
      const e_id = (e as CustomEvent).detail as string
      if (e_id === props.id) {
        exerciseSubmission(
          {
            path: asPath,
            entityId: entityId,
            revisionId: revisionId,
            result: e.type === 'h5pExerciseCorrect' ? 'correct' : 'wrong',
            type: 'h5p',
          },
          ab
        )
      }
    }

    window.document.body.addEventListener(
      'h5pExerciseCorrect',
      handleSubmissionEvent
    )
    window.document.body.addEventListener(
      'h5pExerciseWrong',
      handleSubmissionEvent
    )

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('h5pExerciseCorrect', handleSubmissionEvent)
      document.removeEventListener('h5pExerciseWrong', handleSubmissionEvent)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <H5pStaticRenderer {...props} />
}
