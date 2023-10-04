import { Entity, type UuidType } from '@serlo/authorization'
import { type ReactNode, useState } from 'react'

import {
  debouncedStoreToLocalStorage,
  getStateFromLocalStorage,
  LocalStorageNotice,
} from './components/local-storage-notice'
import { SaveContext } from './context/save-context'
import { createPlugins } from './create-plugins'
import { useCanDo } from '@/auth/use-can-do'
import { MathSpan } from '@/components/content/math-span'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'
import { Editor, type EditorProps } from '@/serlo-editor/core'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'

export interface SerloEditorProps {
  children?: ReactNode
  entityNeedsReview: boolean
  onSave: (data: SetEntityMutationData) => Promise<void>
  initialState: EditorProps['initialState']
  type: UuidType
}

export interface LooseEdtrData {
  [key: string]: EditorProps['initialState'] | null | undefined
}

export interface LooseEdtrDataDefined {
  [key: string]: EditorProps['initialState']
}

export function SerloEditor({
  onSave,
  entityNeedsReview,
  initialState,
  children,
  type,
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

  // simplest way to provide plugins to editor that can also easily be adapted by edusharing
  editorPlugins.init(
    createPlugins({
      editorStrings,
      instance: lang,
      parentType: type,
    })
  )

  return (
    <SaveContext.Provider
      value={{ onSave, userCanSkipReview, entityNeedsReview }}
    >
      <LocalStorageNotice useStored={useStored} setUseStored={setUseStored} />
      <MathSpan formula="" /> {/* preload formula plugin */}
      <Editor
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
