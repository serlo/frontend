// context (and localStorage) for user preferences & experiments

import { createContext, ReactNode, useState } from 'react'

const preferences = {
  visualMath: {
    storageKey: 'serlo-editor::visual-math',
    defaultValue: true,
  },
  intermediateTasksExperiment: {
    storageKey: 'serlo-editor::intermediate-tasks',
    defaultValue: false,
  },
}

export type PreferenceName = keyof typeof preferences

export interface Preference {
  set: (key: PreferenceName, value: boolean) => void
  get: (key: PreferenceName) => boolean
}

export const PreferenceContext = createContext<Preference>({
  set: () => {},
  get: () => {
    return false
  },
})

export function PreferenceContextProvider({
  children,
}: {
  children: ReactNode
}) {
  // just to make sure the context updates
  const [iterator, setIterator] = useState(0)

  function set(name: PreferenceName, value: boolean) {
    setWithoutContext(name, value)
    setIterator(iterator + 1)
  }

  return (
    <PreferenceContext.Provider value={{ set, get: getWithoutContext }}>
      {children}
    </PreferenceContext.Provider>
  )
}

export function setWithoutContext(name: PreferenceName, value: boolean) {
  const { storageKey, defaultValue } = preferences[name]

  const isDefault = defaultValue === value

  if (isDefault) localStorage.removeItem(storageKey)
  else localStorage.setItem(storageKey, value ? '1' : '0')
}

export function getWithoutContext(name: PreferenceName) {
  const { storageKey, defaultValue } = preferences[name]

  if (typeof window === 'undefined') return defaultValue
  const stored = localStorage.getItem(storageKey)

  return stored === null ? defaultValue : stored === '1'
}
