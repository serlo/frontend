import { createContext } from 'react'

import { FocusPath } from '@/serlo-editor/types'

// This is a hack for not needing to store the current focus path in the editor
// store.
//
// TODO: Move storing of the focus inside of the store.
export const FocusContext = createContext<FocusPath>([])
