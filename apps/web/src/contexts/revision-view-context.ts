import { createContext } from 'react'

export const RevisionViewContext = createContext<boolean | undefined>(false)

export const RevisionViewProvider = RevisionViewContext.Provider
