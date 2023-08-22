import { v4 as uuidv4 } from 'uuid'

import { isProduction } from './is-production'

export interface ABSubmissionData {
  entityId: number
  topicId: number
  group: string
  experiment: string
  type: 'sc' | 'mc' | 'input' | 'h5p' | 'text' | 'ival' | 'rating' | 'visit'
  result: 'correct' | 'wrong' | 'open' | string
}

const sesionStorageKey = '___serlo_ab_session___'

export function abSubmission(data: ABSubmissionData) {
  if (!sessionStorage.getItem(sesionStorageKey)) {
    // set new session id
    sessionStorage.setItem(sesionStorageKey, uuidv4())
  }
  const sessionId = sessionStorage.getItem(sesionStorageKey)

  // console.log(data)

  void (async () => {
    await fetch('/api/frontend/ab-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, sessionId, isProduction }),
    })
  })()
}
