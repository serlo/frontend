import { v4 as uuidv4 } from 'uuid'

export interface ExerciseSubmissionData {
  path: string
  entityId: number
  revisionId: number
  type: 'sc' | 'mc' | 'input' | 'h5p' | 'text'
  result: 'correct' | 'wrong' | 'open'
}

const sesionStorageKey = 'frontend_exercise_submission_session_id'

export function exerciseSubmission(data: ExerciseSubmissionData) {
  if (!sessionStorage.getItem(sesionStorageKey)) {
    // set new session id
    sessionStorage.setItem(sesionStorageKey, uuidv4())
  }
  const sessionId = sessionStorage.getItem(sesionStorageKey)

  // console.log(data)

  void (async () => {
    await fetch('/api/frontend/exercise-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, sessionId }),
    })
  })()
}
