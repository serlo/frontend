// eslint-disable-next-line import/no-internal-modules
import { Editor, EditorProps } from '@edtr-io/core/beta'
// eslint-disable-next-line import/no-internal-modules
import { createDefaultDocumentEditor } from '@edtr-io/default-document-editor/beta'
import { Entity, UuidType } from '@serlo/authorization'
import { createContext, ReactNode } from 'react'

import { CsrfContext } from './csrf-context'
import { getPluginRegistry } from './get-plugin-registry'
import { createPlugins } from './plugins'
import { useCanDo } from '@/auth/use-can-do'
import { MathSpan } from '@/components/content/math-span'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

export interface SerloEditorProps {
  getCsrfToken(): string
  children?: ReactNode
  needsReview: boolean
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
  showSkipCheckout: boolean
  needsReview: boolean
}>({
  onSave: () => {
    return Promise.reject()
  },
  showSkipCheckout: false,
  needsReview: true,
})

export function SerloEditor({
  getCsrfToken,
  onSave,
  needsReview,
  onError,
  initialState,
  children,
  type,
}: SerloEditorProps) {
  const canDo = useCanDo()
  const showSkipCheckout = canDo(Entity.checkoutRevision) && needsReview

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

  const stored = getStored()
  const useStored = stored && confirm(editorStrings.edtrIo.oldRevisionFound)

  return (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <CsrfContext.Provider value={getCsrfToken}>
      <SaveContext.Provider value={{ onSave, showSkipCheckout, needsReview }}>
        <MathSpan formula="" /> {/* preload formula plugin */}
        <Editor
          DocumentEditor={DocumentEditor}
          onError={onError}
          plugins={plugins}
          initialState={useStored ? stored : initialState}
          editable
        >
          {children}
        </Editor>
      </SaveContext.Provider>
    </CsrfContext.Provider>
  )
}

function getStored() {
  const edtr = localStorage.getItem('edtr')
  if (!edtr) return

  const state = JSON.parse(edtr) as LooseEdtrData
  return state[window.location.pathname]
}

export function storeState(state?: EditorProps['initialState'] | null) {
  const currentValue = localStorage.getItem('edtr')
  const edtr = currentValue ? (JSON.parse(currentValue) as LooseEdtrData) : {}

  edtr[window.location.pathname] = state

  localStorage.setItem('edtr', JSON.stringify(edtr))
}
