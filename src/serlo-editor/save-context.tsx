import { createContext, useContext } from 'react'

import { SerloEditorProps } from '../serlo-editor-integration/serlo-editor'

export const SaveContext = createContext<{
  onSave: SerloEditorProps['onSave']
  userCanSkipReview: boolean
  entityNeedsReview: boolean
}>({
  onSave: () => Promise.reject(),
  userCanSkipReview: false,
  entityNeedsReview: true,
})

export const useSaveContext = () => useContext(SaveContext)
