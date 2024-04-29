import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { v4 as uuidv4 } from 'uuid'

const fallback = { plugin: EditorPluginType.Rows, id: uuidv4() }
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
