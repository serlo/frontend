import { Editor, type EditorProps } from '@editor/core'
import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import { type GetDocument } from '@editor/core/types'
import {
  createPlugins,
  type ExtraSerloPlugins,
} from '@editor/editor-integration/create-plugins'
import {
  createRenderers,
  type ExtraSerloRenderers,
} from '@editor/editor-integration/create-renderers'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { StaticStringsProvider } from '@editor/i18n/static-strings-provider'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { SupportedLanguage } from '@editor/types/language-data'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { getCurrentDatetime } from '@editor/utils/get-current-datetime'

import { defaultSerloEditorProps } from './config'
import { editorData } from './editor-data'
import { getEditorVersion } from './editor-version'
import {
  type StorageFormat,
  createEmptyDocument,
  migrate,
  type EditorVariant,
} from './storage-format'

// eslint-disable-next-line import/no-unassigned-import
import '../tailwind/editor.css'

export interface SerloEditorProps {
  children: EditorProps['children']
  plugins?: (EditorPluginType | TemplatePluginType)[]
  initialState?: unknown // Type `StorageFormat` or outdated storage format that will be migrated to `StorageFormat` or null
  onChange?: (state: StorageFormat) => void
  language?: SupportedLanguage
  editorVariant: EditorVariant
  isProductionEnvironment?: boolean
  userId?: string
  styleReset?: boolean
  _testingSecret?: string | null
  _ltik?: string
  /** @deprecated Only temporarily allowed for serlo.org. */
  extraSerloPlugins?: ExtraSerloPlugins
  /** @deprecated Only temporarily allowed for serlo.org. */
  extraSerloRenderers?: ExtraSerloRenderers
}

/** For exporting the editor */
export function SerloEditor(props: SerloEditorProps) {
  const {
    children,
    editorVariant,
    onChange,
    language,
    plugins,
    isProductionEnvironment,
    userId,
    styleReset,
    _testingSecret,
    _ltik,
    extraSerloPlugins,
    extraSerloRenderers,
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

  const { staticStrings, editStrings } = editorData[language]

  const allPlugins = createPlugins(
    plugins,
    _testingSecret,
    language,
    extraSerloPlugins
  )
  editorPlugins.init(allPlugins)

  const basicRenderers = createRenderers(extraSerloRenderers)
  editorRenderers.init(basicRenderers)

  return (
    <StaticStringsProvider value={staticStrings}>
      <EditStringsProvider value={editStrings}>
        <EditorMetaContext.Provider
          value={{ editorVariant, userId, ltik: _ltik }}
        >
          {renderTestEnvironmentWarning()}
          <div className={styleReset ? 'serlo-editor-style-reset' : ''}>
            <Editor
              initialState={migratedState.document}
              onChange={handleDocumentChange}
            >
              {children}
            </Editor>
          </div>
        </EditorMetaContext.Provider>
      </EditStringsProvider>
    </StaticStringsProvider>
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

  function renderTestEnvironmentWarning() {
    if (isProductionEnvironment) return null
    return (
      <div className="test-environment-warning my-3 bg-editor-primary-100 px-1.5 py-0.5 text-sm">
        {editStrings.savedContentMightDisappearWarning}
      </div>
    )
  }
}
