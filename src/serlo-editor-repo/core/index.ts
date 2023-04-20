export { HotKeys, IgnoreKeys, GlobalHotKeys } from 'react-hotkeys'

export { SubDocument } from './sub-document'
export type { SubDocumentProps } from './sub-document'
export { Document, Editor, EditorProvider } from './editor'
export type { EditorProps, EditorProviderProps } from './editor'
export {
  ScopeContext,
  ErrorContext,
  Provider,
  useDispatch,
  useSelector,
  useStore,
  useScope,
  useScopedDispatch,
  useScopedSelector,
  useScopedStore,
} from './store'
export {
  DocumentEditorContext,
  PreferenceContext,
  PluginToolbarContext,
  setDefaultPreference,
} from './contexts'
export type { Preference } from './contexts'
export * from './plugin-toolbar'
