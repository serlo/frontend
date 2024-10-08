// context (and localStorage) for user preferences & experiments

import { createContext, ReactNode, useState } from 'react'

const preferences = {
  visualMath: {
    storeageKey: 'serlo-editor::visual-math',
    default: true,
  },
}

type PreferenceName = keyof typeof preferences

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
    const isDefault = preferences[name].default === value

    const { storeageKey } = preferences[name]
    if (isDefault) {
      localStorage.removeItem(storeageKey)
    } else {
      localStorage.setItem(storeageKey, JSON.stringify(value))
    }
    setIterator(iterator + 1)
  }

  function get(name: PreferenceName) {
    const stored = localStorage.getItem(preferences[name].storeageKey)
    return stored === null
      ? preferences[name].default
      : (JSON.parse(stored) as boolean)
  }

  return (
    <PreferenceContext.Provider value={{ set, get }}>
      {children}
    </PreferenceContext.Provider>
  )
}
