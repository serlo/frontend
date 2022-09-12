import { createContext } from 'react'

export const CsrfContext = createContext<() => string>(() => '')
