import {
  defaultPlugins,
  EditorPluginType,
  TemplatePluginType,
  SerloOnlyFeaturesContext,
  type StorageFormat,
} from '@editor/package'
import dynamic from 'next/dynamic'
import { useContext, useRef } from 'react'

import { ArticleAddModal } from './components/article-add-modal/article-add-modal'
import { ExternalRevisionLoader } from './components/external-revision-loader'
import { SaveButton } from './components/save-button'
import { extraSerloPlugins } from './extra-serlo-plugins'
import { extraSerloRenderers } from './extra-serlo-renderers'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { getDefaultLicense } from '@/data/licenses/licenses-helpers'
import { isProduction } from '@/helper/is-production'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

const Editor = dynamic(
  () => import('@editor/package').then((mod) => mod.SerloEditor),
  {
    ssr: false,
  }
)

const plugins = [
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
  EditorPluginType.Anchor,
  EditorPluginType.Article,
  EditorPluginType.ArticleIntroduction,
  EditorPluginType.Audio,
  EditorPluginType.Course,
  EditorPluginType.ExerciseGroup,
  EditorPluginType.H5p,
  EditorPluginType.Injection,
  EditorPluginType.InteractiveVideo,
  EditorPluginType.PageLayout,
]

export interface SerloEditorProps {
  isInTestArea?: boolean
  onSave: (data: SetEntityMutationData) => Promise<void | boolean>
  initialState: StorageFormat
}

export function SerloEditor({
  onSave,
  isInTestArea,
  initialState,
}: SerloEditorProps) {
  // No need to rerender on Editor change, therefore `useRef`
  const editorState = useRef(initialState)
  const prefilledChangesRef = useRef<string | undefined>(undefined)

  const { lang, licenses } = useInstanceData()
  const auth = useAuthentication()

  const templatePluginState = initialState.document.state as unknown & {
    licenseId: number
  }
  const licenseId =
    templatePluginState && Object.hasOwn(templatePluginState, 'licenseId')
      ? templatePluginState.licenseId
      : getDefaultLicense(licenses).id

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
        plugins={plugins}
        isProductionEnvironment={isProduction}
        initialState={initialState}
        styleReset={false}
        extraSerloPlugins={extraSerloPlugins}
        extraSerloRenderers={extraSerloRenderers}
        onChange={(state) => {
          editorState.current = state
        }}
      >
        {(editor) => {
          const hasPendingChanges = editor.history.pendingChanges !== 0
          return (
            <>
              {editorState.current.document.state ? (
                <SaveButton
                  onSave={onSave}
                  isChanged={hasPendingChanges}
                  editorState={editorState}
                  isInTestArea={isInTestArea}
                  prefilledChanges={prefilledChangesRef.current}
                  licenseId={licenseId}
                />
              ) : null}
              {isNewEntity ? (
                <ExternalRevisionLoader
                  templateType={
                    initialState.document.plugin as TemplatePluginType
                  }
                  dispatchReplaceRootDocument={
                    editor.dispatchReplaceRootDocument
                  }
                  prefilledChangesRef={prefilledChangesRef}
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
