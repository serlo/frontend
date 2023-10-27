import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { AnyEditorDocument } from '@/serlo-editor-integration/types/editor-plugins'

const fallback = { plugin: EditorPluginType.Rows }
/**
 * Parses a serialized static editor document (e.g. from the database)
 * into an static document (`AnyEditorDocument`)
 */
export function parseDocumentString(input?: string): AnyEditorDocument {
  if (!input || !input.startsWith('{')) return fallback

  try {
    const result = JSON.parse(input) as AnyEditorDocument
    return typeof result.plugin === 'string' ? result : fallback
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error parsing', e)
    return fallback
  }
}
