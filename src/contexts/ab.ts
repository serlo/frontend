import { createContext, useContext, useEffect, useState } from 'react'

import { abSubmission } from '@/helper/ab-submission'

const experiments: {
  experiment: string
  ids: number[]
  start: number
  end: number
}[] = [
  {
    experiment: 'headingsv1',
    ids: [1553],
    start: -1,
    end: -1,
  },
]

const ABContext = createContext<ABValue>(null)

export const ABProvider = ABContext.Provider

export function useAB() {
  const value = useContext(ABContext)

  return value ?? null
}

export type ABValue = null | {
  topicId: number
  experiment: string
  group: string
}

export function useABValue(entityId: number) {
  const [value, setValue] = useState<ABValue>(null)

  useEffect(() => {
    // check which experiment is currently active
    // check group and set group if appropriate
    let group = sessionStorage.getItem('___serlo_ab_group___')
    if (!group) {
      group = Math.random() < 0.5 ? 'a' : 'b'
      sessionStorage.setItem('___serlo_ab_group___', group)
    }
    const experiment = experiments.find(
      (exp) =>
        exp.ids.includes(entityId) &&
        exp.start >= Date.now() &&
        exp.end < Date.now()
    )?.experiment
    if (!experiment) {
      return // no experiments active
    }
    abSubmission({
      entityId: -1,
      experiment,
      group,
      result: '',
      topicId: entityId,
      type: 'visit',
    })
    setValue({
      group,
      topicId: entityId,
      experiment,
    })
  }, [entityId])

  return value
}
