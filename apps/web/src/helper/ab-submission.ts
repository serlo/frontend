import { v4 as uuidv4 } from 'uuid'

import { isProduction } from './is-production'

export interface ABSubmissionData {
  entityId: number
  topicId: number
  group: string
  experiment: string
  type:
    | 'sc'
    | 'mc'
    | 'input'
    | 'h5p'
    | 'text'
    | 'ival'
    | 'rating'
    | 'visit'
    | 'blanks'
    | 'spoiler'
  result: 'correct' | 'wrong' | 'open' | string
}

const sesionStorageKey = '___serlo_ab_session___'

export function abSubmission(
  data: ABSubmissionData,
  submitFn: (data: any) => Promise<any>
) {
  if (!sessionStorage.getItem(sesionStorageKey)) {
    // set new session id
    sessionStorage.setItem(sesionStorageKey, uuidv4())
  }
  const sessionId = sessionStorage.getItem(sesionStorageKey)

  // console.log(data)
  void (async () => {
    await submitFn({ ...data, sessionId, isProduction })
  })()
}
