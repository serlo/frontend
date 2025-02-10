import {
  defaultPlugins,
  EditorPluginType,
  TemplatePluginType,
  SerloOnlyFeaturesContext,
  type SerloEditorProps as EditorProps,
} from '@editor/package'
import dynamic from 'next/dynamic'
import { useContext } from 'react'

import { ArticleAddModal } from './components/article-add-modal/article-add-modal'
import { ExternalRevisionLoader } from './components/external-revision-loader'
import { SaveButton } from './components/save-button'
import { extraSerloPlugins } from './extra-serlo-plugins'
import { extraSerloRenderers } from './extra-serlo-renderers'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { isProduction } from '@/helper/is-production'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

const Editor = dynamic(
  () => import('@editor/package').then((mod) => mod.SerloEditor),
  {
    ssr: false,
  }
)

export interface SerloEditorProps {
  isInTestArea?: boolean
  onSave: (data: SetEntityMutationData) => Promise<void | boolean>
  initialState: EditorProps['initialState']
}

export function SerloEditor({
  onSave,
  isInTestArea,
  initialState,
}: SerloEditorProps) {
  const { lang, licenses } = useInstanceData()
  const auth = useAuthentication()

  const isRevisionView = useContext(RevisionViewContext)
  const isNewEntity = !(initialState as { state?: { id?: string } }).state?.id

  return (
    <SerloOnlyFeaturesContext.Provider
      value={{ isRevisionView, licenses, ArticleAddModal }}
    >
      <Editor
        language={lang === 'de' ? 'de' : 'en'}
        editorVariant="serlo-org"
        userId={String(auth?.id)}
        plugins={[
          ...defaultPlugins,
          TemplatePluginType.Applet,
          TemplatePluginType.Article,
          TemplatePluginType.Course,
          TemplatePluginType.Event,
          TemplatePluginType.Page,
          TemplatePluginType.Taxonomy,
          TemplatePluginType.TextExercise,
          TemplatePluginType.TextExerciseGroup,
          TemplatePluginType.User,
          TemplatePluginType.Video,
          EditorPluginType.Article,
          EditorPluginType.Course,
          EditorPluginType.PageLayout,
          EditorPluginType.ArticleIntroduction,
          EditorPluginType.Injection,
          EditorPluginType.Anchor,
          EditorPluginType.ExerciseGroup,
          EditorPluginType.InteractiveVideo,
          EditorPluginType.Audio,
          EditorPluginType.H5p,
        ]}
        isProductionEnvironment={isProduction}
        initialState={initialState}
        styleReset={false}
        extraSerloPlugins={extraSerloPlugins}
        extraSerloRenderers={extraSerloRenderers}
      >
        {(editor) => {
          const hasPendingChanges = editor.history.pendingChanges !== 0
          return (
            <>
              <SaveButton
                onSave={onSave}
                isChanged={hasPendingChanges}
                selectRootDocument={editor.selectRootDocument}
                isInTestArea={isInTestArea}
              />
              {isNewEntity ? (
                <ExternalRevisionLoader
                  templateType={
                    (initialState as { plugin: TemplatePluginType }).plugin
                  }
                  dispatchReplaceRootDocument={
                    editor.dispatchReplaceRootDocument
                  }
                />
              ) : null}
              {editor.element}
            </>
          )
        }}
      </Editor>
    </SerloOnlyFeaturesContext.Provider>
  )
}
