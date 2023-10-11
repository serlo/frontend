import { v4 as uuidv4 } from 'uuid'

import { abSubmission } from './ab-submission'
import { isProduction } from './is-production'
import { ABValue } from '@/contexts/ab'

export interface ExerciseSubmissionData {
  path: string
  entityId?: number
  revisionId?: number
  type: 'sc' | 'mc' | 'input' | 'h5p' | 'text' | 'ival'
  result: 'correct' | 'wrong' | 'open' | string
}

const sesionStorageKey = 'frontend_exercise_submission_session_id'

export function exerciseSubmission(data: ExerciseSubmissionData, ab: ABValue) {
  const entityId = data.entityId ?? -1

  // check for ab testing
  if (ab) {
    abSubmission({
      entityId,
      topicId: ab.topicId,
      experiment: ab.experiment,
      group: ab.group,
      type: data.type,
      result: data.result,
    })
  }

  if (ab?.experiment === 'dreisatz_new_design') {
    if (data.result === 'correct') {
      const solved = JSON.parse(
        sessionStorage.getItem('___serlo_solved_in_session___') ?? '[]'
      ) as number[]
      if (!solved.includes(entityId)) {
        solved.push(entityId)
      }
      sessionStorage.setItem(
        '___serlo_solved_in_session___',
        JSON.stringify(solved)
      )

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const trigger = (window as any)?.__triggerRender
      if (typeof trigger === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        trigger()
      }
    }
  }

  if (!isProduction) {
    // eslint-disable-next-line no-console
    console.log(data)
    return // don't submit outside of production
  }

  if (!sessionStorage.getItem(sesionStorageKey)) {
    // set new session id
    sessionStorage.setItem(sesionStorageKey, uuidv4())
  }
  const sessionId = sessionStorage.getItem(sesionStorageKey)

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
