import {
  EditorPluginType,
  StorageFormat,
  type AnyEditorDocument,
} from '@editor/package'

const fallback = { plugin: EditorPluginType.Rows }
/**
 * Parses a serialized static editor document (e.g. from the database)
 * into an static document (`AnyEditorDocument`)
 * it also unwraps editor storage format
 */
export function parseDocumentString(input?: string): AnyEditorDocument {
  if (!input || !input.startsWith('{')) return fallback

  try {
    const result = JSON.parse(input) as StorageFormat | AnyEditorDocument

    // unwrapped editor document
    if (Object.hasOwn(result, 'plugin')) {
      return typeof result.plugin === 'string' ? result : fallback
    }
    // editor storage format with document
    if (Object.hasOwn(result, 'document')) {
      return typeof result.document.plugin === 'string'
        ? result.document
        : fallback
    }
    return fallback
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error parsing', e)
    return fallback
  }
}
