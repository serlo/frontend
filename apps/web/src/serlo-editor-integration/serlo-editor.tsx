import { type EditorProps } from '@editor/core'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { SerloOnlyFeaturesContext } from '@editor/utils/serlo-extra-context'
import dynamic from 'next/dynamic'
import { mergeDeepRight } from 'ramda'
import { type ReactNode } from 'react'

import { ArticleAddModal } from './components/article-add-modal/article-add-modal'
import { ExternalRevisionLoader } from './components/external-revision-loader'
import { SaveButton } from './components/save-button'
import { createPlugins } from './create-plugins'
import { createRenderers } from './create-renderers'
import { useSerloHandleLearnerEvent } from './use-handle-learner-event'
import { useInstanceData } from '@/contexts/instance-context'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

const Editor = dynamic(() => import('@editor/core').then((mod) => mod.Editor), {
  ssr: false,
})

export interface SerloEditorProps {
  children?: ReactNode
  isInTestArea?: boolean
  onSave: (data: SetEntityMutationData) => Promise<void | boolean>
  initialState: EditorProps['initialState']
}

export function SerloEditor({
  onSave,
  isInTestArea,
  initialState,
  children,
}: SerloEditorProps) {
  const { lang, licenses } = useInstanceData()

  const handleLearnerEvent = useSerloHandleLearnerEvent()

  // simplest way to provide plugins to editor that can also easily be adapted by edusharing
  editorPlugins.init(createPlugins({ lang }))

  // some plugins rely on static renderes
  editorRenderers.init(createRenderers())

  editorLearnerEvent.init(handleLearnerEvent)

  const editString =
    lang === 'de' ? mergeDeepRight(editStringsEn, editStringsDe) : editStringsEn

  const isNewEntity = !(initialState.state as AnyEditorDocument)?.id

  return (
    <EditStringsProvider value={editString}>
      <SerloOnlyFeaturesContext.Provider
        value={{ isSerlo: true, licenses, ArticleAddModal }}
      >
        <Editor initialState={initialState}>
          <SaveButton onSave={onSave} isInTestArea={isInTestArea} />
          {isNewEntity ? (
            <ExternalRevisionLoader
              templateType={initialState.plugin as TemplatePluginType}
            />
          ) : null}

          {children}
        </Editor>
      </SerloOnlyFeaturesContext.Provider>
    </EditStringsProvider>
  )
}
