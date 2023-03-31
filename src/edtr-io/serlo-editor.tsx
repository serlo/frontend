// eslint-disable-next-line import/no-internal-modules
import { Entity, UuidType } from '@serlo/authorization'
import { createContext, ReactNode, useState } from 'react'
import { Editor, EditorProps } from 'test-edtr-io/core'
// eslint-disable-next-line import/no-internal-modules
import { createDefaultDocumentEditor } from 'test-edtr-io/default-document-editor'

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
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

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
  const { strings } = useInstanceData()
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
    strings,
  })

  const DocumentEditor = createDefaultDocumentEditor({
    i18n: {
      settings: {
        buttonLabel: editorStrings.edtrIo.settings,
        modalTitle: editorStrings.edtrIo.extendedSettings,
        modalCloseLabel: editorStrings.edtrIo.close,
      },
    },
  })

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
      <style jsx global>{`
        /* fixes bug in chromium based browsers v105+ */
        /* https://github.com/ianstormtaylor/slate/issues/5110#issuecomment-1234951122 */
        div[data-slate-editor] {
          -webkit-user-modify: read-write !important;
        }
        /*
         * Fix for misplacement of slate placeholders
         * TODO: Investigate whether we still need this fix after slate upgrade
         */
        span[data-slate-leaf='true'] > span > span[contenteditable='false'] {
          vertical-align: initial !important;
        }
      `}</style>
    </SaveContext.Provider>
  )
}
