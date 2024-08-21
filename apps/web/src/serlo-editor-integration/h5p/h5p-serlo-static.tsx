import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { useEffect } from 'react'

import { EditorH5PDocument } from '.'
import { parseH5pUrl } from './renderer'
import { H5pStaticRenderer } from './static'

// Special version for serlo.org with exercise submission events
export function H5pSerloStaticRenderer(props: EditorH5PDocument) {
  useEffect(() => {
    const handleSubmissionEvent = (e: Event) => {
      const e_id = (e as CustomEvent).detail as string
      const id = parseH5pUrl(props.state)

      if (e_id === id) {
        editorLearnerEvent.trigger?.({
          verb: 'answered',
          correct: e.type === 'h5pExerciseCorrect',
          contentType: 'h5p-exercise',
        })
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
