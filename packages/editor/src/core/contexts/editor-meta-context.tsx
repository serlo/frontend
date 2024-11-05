import type { EditorVariant } from '@editor/package/storage-format'
import { createContext } from 'react'

interface EditorMeta {
  variant: EditorVariant
}

export const EditorMetaContext = createContext<EditorMeta>({
  variant: 'unknown',
})
