import { createContext } from 'react'

export const CalculatorAllowedContext = createContext<boolean | undefined>(
  false
)

export const CalculatorAllowedProvider = CalculatorAllowedContext.Provider
