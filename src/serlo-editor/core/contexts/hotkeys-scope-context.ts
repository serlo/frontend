import { createContext, useContext } from 'react'

export interface ScopeData {
  rootUpDownEnter: boolean
}

const HotkeysScopeContext = createContext<ScopeData>({ rootUpDownEnter: true })

export const HotkeysScopeProvider = HotkeysScopeContext.Provider

export function useHotkeysScope() {
  return useContext(HotkeysScopeContext)
}
