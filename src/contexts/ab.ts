import { createContext, useContext, useEffect, useState } from 'react'

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

  return value ?? {}
}

type ABValue = null | {
  entityId: number
  experiments: string[]
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
    setValue({
      group,
      entityId,
      experiments: experiments
        .filter(
          (exp) =>
            exp.ids.includes(entityId) &&
            exp.start >= Date.now() &&
            exp.end < Date.now()
        )
        .map((exp) => exp.experiment),
    })
  }, [entityId])

  return value
}
