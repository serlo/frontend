import type { EditorVariant } from '@editor/package/storage-format'
import { createContext } from 'react'

export interface EditorMeta {
  editorVariant: EditorVariant
  userId?: string
}

export const EditorMetaContext = createContext<EditorMeta>({
  editorVariant: 'unknown',
})
