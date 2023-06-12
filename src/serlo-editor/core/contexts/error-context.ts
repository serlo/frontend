import { createContext } from 'react'

export const ErrorContext = createContext<
  ((error: Error, errorInfo: { componentStack: string }) => void) | undefined
>(undefined)
