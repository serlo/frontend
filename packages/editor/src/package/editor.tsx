import { Editor, type EditorProps } from '@editor/core'
import { type GetDocument } from '@editor/core/types'
import { createBasicPlugins } from '@editor/editor-integration/create-basic-plugins'
import { createRenderers } from '@editor/editor-integration/create-renderers'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { LtikContext } from '@editor/plugins/edusharing-asset/ltik-context'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { SupportedLanguage } from '@editor/types/language-data'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { getCurrentDatetime } from '@editor/utils/get-current-datetime'
import { InstanceDataProvider } from '@serlo/frontend/src/contexts/instance-context'
import { LoggedInDataProvider } from '@serlo/frontend/src/contexts/logged-in-data-context'

import { defaultSerloEditorProps } from './config'
import { editorData } from './editor-data'
import { getEditorVersion } from './editor-version'
import {
  type StorageFormat,
  createEmptyDocument,
  migrate,
  type EditorVariant,
} from './storage-format'

import '@/assets-webkit/styles/serlo-tailwind.css'

export interface SerloEditorProps {
  children: EditorProps['children']
  plugins?: (EditorPluginType | TemplatePluginType)[]
  initialState?: unknown // Either type `StorageFormat` or outdated storage format that will be migrated to `StorageFormat`
  onChange?: (state: StorageFormat) => void
  language?: SupportedLanguage
  editorVariant: EditorVariant
  _testingSecret?: string | null
  _ltik?: string
}

/** For exporting the editor */
export function SerloEditor(props: SerloEditorProps) {
  const {
    children,
    editorVariant,
    onChange,
    language,
    plugins,
    _testingSecret,
    _ltik,
  } = {
    ...defaultSerloEditorProps,
    ...props,
  }

  const initialState = !props.initialState
    ? createEmptyDocument(editorVariant)
    : props.initialState

  const { migratedState, stateChanged } = migrate(initialState, editorVariant)

  if (onChange && stateChanged) {
    onChange(migratedState)
  }

  const { instanceData, loggedInData } = editorData[language]

  const allPlugins = createBasicPlugins(plugins, _testingSecret)
  editorPlugins.init(allPlugins)

  const basicRenderers = createRenderers()
  editorRenderers.init(basicRenderers)

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <LtikContext.Provider value={_ltik}>
          <div className="serlo-editor-hacks">
            <Editor
              initialState={migratedState.document}
              onChange={handleDocumentChange}
            >
              {children}
            </Editor>
          </div>
        </LtikContext.Provider>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )

  // Parameter `changed` is ignored. Even if it is false, we still want to call onChange.
  function handleDocumentChange({ getDocument }: { getDocument: GetDocument }) {
    if (!onChange) return
    const document = getDocument()
    if (!document) return
    onChange({
      ...migratedState,
      dateModified: getCurrentDatetime(),
      editorVersion: getEditorVersion(),
      document,
    })
  }
}
