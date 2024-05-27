import { v4 as uuidv4 } from 'uuid'

import { isProduction } from './is-production'
import { ABValue } from '@/contexts/ab'

export interface ExerciseSubmissionData {
  path: string
  entityId?: number
  revisionId?: number
  type: 'sc' | 'mc' | 'input' | 'h5p' | 'text' | 'ival' | 'blanks' | 'spoiler'
  result: 'correct' | 'wrong' | 'open' | string
  sessionId?: string
}

const handleDreisatzNewDesign = (
  data: ExerciseSubmissionData,
  entityId: number
) => {
  if (data.result !== 'correct') return

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

const sessionStorageKey = 'frontend_exercise_submission_session_id'

export function exerciseSubmission(
  data: ExerciseSubmissionData,
  ab: ABValue,
  submitFn: (data: any) => Promise<any>
) {
  const entityId = data.entityId ?? -1

  if (ab?.experiment === 'dreisatz_new_design') {
    handleDreisatzNewDesign(data, entityId)
  }

  if (!sessionStorage.getItem(sessionStorageKey)) {
    // set new session id
    sessionStorage.setItem(sessionStorageKey, uuidv4())
  }

  const sessionId = sessionStorage.getItem(sessionStorageKey) as string
  const { revisionId, path } = data

  if (!isProduction) {
    // eslint-disable-next-line no-console
    console.log(data)
    return // don't submit outside of production
  }

  void (async () => {
    await submitFn({
      path: path,
      entityId: data.entityId || -1,
      type: data.type,
      result: data.result,
      revisionId: revisionId || -1,
      sessionId,
    })
  })()
}
