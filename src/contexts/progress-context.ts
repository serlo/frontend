import type { NProgress } from 'nprogress'
import React from 'react'

export const ProgressContext = React.createContext<NProgress | null>(null)

export const ProgressProvider = ProgressContext.Provider

export function useProgress() {
  return React.useContext(ProgressContext)
}
