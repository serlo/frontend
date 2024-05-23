// import { isProduction } from './is-production'
import { ABValue } from '@/contexts/ab'

export interface ExerciseSubmissionData {
  path: string
  entityId?: number
  revisionId?: number
  type: 'sc' | 'mc' | 'input' | 'h5p' | 'text' | 'ival' | 'blanks' | 'spoiler'
  result: 'correct' | 'wrong' | 'open' | string
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

export function exerciseSubmission(
  data: ExerciseSubmissionData,
  ab: ABValue,
  submitFn: (data: ExerciseSubmissionData) => void
) {
  const entityId = data.entityId ?? -1

  if (ab?.experiment === 'dreisatz_new_design') {
    handleDreisatzNewDesign(data, entityId)
  }

  // Shane: This can be restored later, right now we want to test on staging
  // if (!isProduction) {
  //   // eslint-disable-next-line no-console
  //   console.log(data)
  //   return // don't submit outside of production
  // }

  submitFn(data)
}
