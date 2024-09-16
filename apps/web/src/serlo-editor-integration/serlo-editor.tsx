import { Editor, type EditorProps } from '@editor/core'
import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { Entity } from '@serlo/authorization'
import { type ReactNode, useState } from 'react'

import {
  debouncedStoreToLocalStorage,
  getStateFromLocalStorage,
  LocalStorageNotice,
} from './components/local-storage-notice'
import { IsSerloContext } from './context/is-serlo-context'
import { SaveContext } from './context/save-context'
import { createPlugins } from './create-plugins'
import { createRenderers } from './create-renderers'
import { useSerloHandleLearnerEvent } from './use-trigger-learner-event'
import { useCanDo } from '@/auth/use-can-do'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidWithRevType } from '@/data-types'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

export interface SerloEditorProps {
  children?: ReactNode
  entityNeedsReview: boolean
  onSave: (data: SetEntityMutationData) => Promise<void | boolean>
  initialState: EditorProps['initialState']
  type: UuidWithRevType | 'User'
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
  const handleLearnerEvent = useSerloHandleLearnerEvent()

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
      parentType: type,
    })
  )

  // some plugins rely on static renderes
  editorRenderers.init(createRenderers())

  editorLearnerEvent.init(handleLearnerEvent)

  return (
    <IsSerloContext.Provider value>
      <SaveContext.Provider
        value={{ onSave, userCanSkipReview, entityNeedsReview }}
      >
        <LocalStorageNotice useStored={useStored} setUseStored={setUseStored} />
        <Editor
          initialState={useStored ? getStateFromLocalStorage()! : initialState}
          onChange={({ changed, getDocument }) => {
            if (!changed) return
            void debouncedStoreToLocalStorage(getDocument())
          }}
        >
          {children}
        </Editor>
      </SaveContext.Provider>
    </IsSerloContext.Provider>
  )
}
