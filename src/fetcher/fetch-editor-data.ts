import { request } from 'graphql-request'

import { editorResponseToState } from './editor-response-to-state'
import { dataQuery } from './query'
import { QueryResponse } from './query-types'
import { endpoint } from '@/api/endpoint'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

export interface EditorPageData {
  initialState: unknown
  type: string
}

export async function fetchEditorData(
  raw_alias: string
): Promise<EditorPageData> {
  try {
    const { alias, instance } = parseLanguageSubfolder(raw_alias)

    const { uuid } = await request<{
      uuid: QueryResponse
    }>(endpoint, dataQuery, {
      alias: { instance, path: alias },
    })

    return {
      initialState: editorResponseToState(uuid),
      type: uuid.__typename.toLowerCase(), // TODO: check expected format
    }
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes('Code: 503') ? 503 : 500
    return {
      type: 'error',
      initialState: { message, code },
    }
  }
}
