import { createContext } from 'react'

import type { SerloEditorProps } from '../serlo-editor'

export const SaveContext = createContext<{
  onSave: SerloEditorProps['onSave']
  isInTestArea?: boolean
}>({
  onSave: () => Promise.reject(),
  isInTestArea: false,
})
