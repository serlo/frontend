import { createContext, useContext, useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { abSubmission } from '@/helper/ab-submission'

export const experiments: {
  experiment: string
  ids: number[]
  start: number
  end: number
}[] = [
  {
    experiment: 'baseline',
    ids: [25103],
    start: -1,
    end: new Date('2023-09-15T00:00:00+0200').getTime(),
  },
  {
    experiment: 'dreisatzv0',
    ids: [66809],
    start: -1,
    end: new Date('2023-09-30T00:00:00+0200').getTime(),
  },
  {
    experiment: 'dreisatz_new_design',
    ids: [66809],
    start: -1,
    end: -1, // only available through url params
  },
  {
    experiment: 'reorder_trig',
    ids: [30680],
    start: -1,
    end: new Date('2023-09-15T00:00:00+0200').getTime(),
  },
  {
    experiment: 'headings',
    ids: [25616],
    start: -1,
    end: new Date('2023-09-30T00:00:00+0200').getTime(),
  },
]

const ABContext = createContext<ABValue>(null)

export const ABProvider = ABContext.Provider

export function useAB() {
  const value = useContext(ABContext)
  const auth = useAuthentication()

  if (auth) return null

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
    const urlSearchParams = new URLSearchParams(window.location.search)
    const experiment =
      experiments.find(
        (exp) =>
          exp.ids.includes(entityId) &&
          exp.start <= Date.now() &&
          exp.end > Date.now()
      )?.experiment ?? urlSearchParams.get('experiment')
    if (!experiment) {
      return // no experiments active
    }
    let group = sessionStorage.getItem('___serlo_ab_group___')
    if (!group) {
      group = Math.random() < 0.5 ? 'a' : 'b'
      sessionStorage.setItem('___serlo_ab_group___', group)
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
