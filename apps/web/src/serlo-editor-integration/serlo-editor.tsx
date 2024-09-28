import { Editor, type EditorProps } from '@editor/core'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { IsSerloContext } from '@editor/utils/is-serlo-context'
import { Entity } from '@serlo/authorization'
import { mergeDeepRight } from 'ramda'
import { type ReactNode } from 'react'

import { SaveContext } from './context/save-context'
import { createPlugins } from './create-plugins'
import { createRenderers } from './create-renderers'
import { useSerloHandleLearnerEvent } from './use-handle-learner-event'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

export interface SerloEditorProps {
  children?: ReactNode
  entityNeedsReview: boolean
  onSave: (data: SetEntityMutationData) => Promise<void | boolean>
  initialState: EditorProps['initialState']
}

export function SerloEditor({
  onSave,
  entityNeedsReview,
  initialState,
  children,
}: SerloEditorProps) {
  const canDo = useCanDo()
  const userCanSkipReview = canDo(Entity.checkoutRevision)
  const { lang } = useInstanceData()

  const handleLearnerEvent = useSerloHandleLearnerEvent()

  // simplest way to provide plugins to editor that can also easily be adapted by edusharing
  editorPlugins.init(createPlugins({ lang }))

  // some plugins rely on static renderes
  editorRenderers.init(createRenderers())

  editorLearnerEvent.init(handleLearnerEvent)

  const editString =
    lang === 'de' ? mergeDeepRight(editStringsEn, editStringsDe) : editStringsEn

  return (
    <EditStringsProvider value={editString}>
      <IsSerloContext.Provider value>
        <SaveContext.Provider
          value={{ onSave, userCanSkipReview, entityNeedsReview }}
        >
          <Editor initialState={initialState}>{children}</Editor>
        </SaveContext.Provider>
      </IsSerloContext.Provider>
    </EditStringsProvider>
  )
}
