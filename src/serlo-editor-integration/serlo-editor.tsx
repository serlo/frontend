import { Entity, UuidType } from '@serlo/authorization'
import { createContext, ReactNode, useState } from 'react'

import {
  debouncedStoreToLocalStorage,
  getStateFromLocalStorage,
  LocalStorageNotice,
} from './components/local-storage-notice'
import { getPluginRegistry } from './get-plugin-registry'
import { createPlugins } from './plugins'
import { useCanDo } from '@/auth/use-can-do'
import { MathSpan } from '@/components/content/math-span'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'
import { Editor, EditorProps } from '@/serlo-editor/core'
import { createDefaultDocumentEditor } from '@/serlo-editor/default-document-editor'

export interface SerloEditorProps {
  children?: ReactNode
  entityNeedsReview: boolean
  onSave: (data: SetEntityMutationData) => Promise<void>
  onError?: (error: Error, context: Record<string, string>) => void
  initialState: EditorProps['initialState'] // expects "deserialized" state now
  type: UuidType
}

export interface LooseEdtrData {
  [key: string]: EditorProps['initialState'] | null | undefined
}

export interface LooseEdtrDataDefined {
  [key: string]: EditorProps['initialState']
}

export const SaveContext = createContext<{
  onSave: SerloEditorProps['onSave']
  userCanSkipReview: boolean
  entityNeedsReview: boolean
}>({
  onSave: () => Promise.reject(),
  userCanSkipReview: false,
  entityNeedsReview: true,
})

export function SerloEditor({
  onSave,
  entityNeedsReview,
  onError,
  initialState,
  children,
  type,
}: SerloEditorProps) {
  const canDo = useCanDo()
  const userCanSkipReview = canDo(Entity.checkoutRevision)
  const [useStored, setUseStored] = useState(false)
  const loggedInData = useLoggedInData()
  if (!loggedInData)
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    )

  const editorStrings = loggedInData.strings.editor

  const plugins = createPlugins({
    registry: getPluginRegistry(type, editorStrings),
    type,
    editorStrings,
  })

  const DocumentEditor = createDefaultDocumentEditor()

  return (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <SaveContext.Provider
      value={{ onSave, userCanSkipReview, entityNeedsReview }}
    >
      <LocalStorageNotice useStored={useStored} setUseStored={setUseStored} />
      <MathSpan formula="" /> {/* preload formula plugin */}
      <Editor
        DocumentEditor={DocumentEditor}
        onError={onError}
        plugins={plugins}
        initialState={useStored ? getStateFromLocalStorage()! : initialState}
        editable
        onChange={({ changed, getDocument }) => {
          if (!changed) return
          void debouncedStoreToLocalStorage(getDocument())
        }}
      >
        {children}
      </Editor>
    </SaveContext.Provider>
  )
}
