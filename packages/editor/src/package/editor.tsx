import { Editor, type EditorProps } from '@editor/core'
import { EditorVariantContext } from '@editor/core/contexts/editor-variant-context'
import { type GetDocument } from '@editor/core/types'
import { createBasicPlugins } from '@editor/editor-integration/create-basic-plugins'
import { createRenderers } from '@editor/editor-integration/create-renderers'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { StaticStringsProvider } from '@editor/i18n/static-strings-provider'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { LtikContext } from '@editor/plugins/edusharing-asset/ltik-context'
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

// TODO: figure out styling
// eslint-disable-next-line import/no-unassigned-import
import '../../../../apps/web/src/assets-webkit/styles/serlo-tailwind.css'

export interface SerloEditorProps {
  children: EditorProps['children']
  plugins?: (EditorPluginType | TemplatePluginType)[]
  initialState?: unknown // Either type `StorageFormat` or outdated storage format that will be migrated to `StorageFormat`
  onChange?: (state: StorageFormat) => void
  language?: SupportedLanguage
  editorVariant: EditorVariant
  isProductionEnvironment?: boolean
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
    isProductionEnvironment,
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

  const { staticStrings, editStrings } = editorData[language]

  const allPlugins = createBasicPlugins(plugins, _testingSecret)
  editorPlugins.init(allPlugins)

  const basicRenderers = createRenderers()
  editorRenderers.init(basicRenderers)

  return (
    <StaticStringsProvider value={staticStrings}>
      <EditStringsProvider value={editStrings}>
        <EditorVariantContext.Provider value={editorVariant}>
          <LtikContext.Provider value={_ltik}>
            {isProductionEnvironment ? null : renderTestEnvironmentWarning()}
            <Editor
              initialState={migratedState.document}
              onChange={handleDocumentChange}
            >
              {children}
            </Editor>
          </LtikContext.Provider>
        </EditorVariantContext.Provider>
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
    return (
      <div className="bg-editor-primary-100 px-1.5 py-0.5 text-sm">
        {editStrings.savedContentMightDisappearWarning}
      </div>
    )
  }
}
