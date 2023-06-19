import { Entity, UuidType } from '@serlo/authorization'
import { createContext, ReactNode, useState } from 'react'

import {
  debouncedStoreToLocalStorage,
  getStateFromLocalStorage,
  LocalStorageNotice,
} from './components/local-storage-notice'
import { createPlugins } from './plugins'
import { useCanDo } from '@/auth/use-can-do'
import { MathSpan } from '@/components/content/math-span'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'
import { Editor, EditorProps } from '@/serlo-editor/core'
import { getPluginRegistry } from '@/serlo-editor/plugins/rows/get-plugin-registry'

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
}: SerloEditorProps) {
  const canDo = useCanDo()
  const userCanSkipReview = canDo(Entity.checkoutRevision)
  const [useStored, setUseStored] = useState(false)

  const { lang } = useInstanceData()

  const loggedInData = useLoggedInData()
  if (!loggedInData)
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    )

  const editorStrings = loggedInData.strings.editor

  const plugins = createPlugins({ editorStrings, instance: lang })

  return (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <SaveContext.Provider
      value={{ onSave, userCanSkipReview, entityNeedsReview }}
    >
      <LocalStorageNotice useStored={useStored} setUseStored={setUseStored} />
      <MathSpan formula="" /> {/* preload formula plugin */}
      <Editor
        onError={onError}
        plugins={plugins}
        pluginRegistry={getPluginRegistry('root', editorStrings)}
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
