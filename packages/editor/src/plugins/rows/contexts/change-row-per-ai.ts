import { createContext } from 'react'

export const ChangeRowPerAiContext = createContext<(() => void) | null>(null)
