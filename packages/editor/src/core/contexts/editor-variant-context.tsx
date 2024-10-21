import type { EditorVariant } from '@editor/package/storage-format'
import { createContext } from 'react'

export const EditorVariantContext = createContext<EditorVariant>('unknown')
