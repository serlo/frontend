import { request } from 'graphql-request'

import { dataQuery } from './query'
import { QueryResponse } from './query-types'
import { endpoint } from '@/api/endpoint'
import {
  editorResponseToState,
  isError,
} from '@/components/edtr-io/editor-response-to-state'
import { SerloEditorProps } from '@/components/edtr-io/serlo-editor'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

export interface EditorPageData {
  initialState: SerloEditorProps['initialState']
  type: string
}

export interface EditorFetchErrorData {
  errorType: 'type-unsupported' | 'failure' | 'failed-fetch'
  code?: number
}

export async function fetchEditorData(
  raw_alias: string
): Promise<EditorPageData | EditorFetchErrorData> {
  try {
    const { alias, instance } = parseLanguageSubfolder(raw_alias)

    const { uuid } = await request<{
      uuid: QueryResponse
    }>(endpoint, dataQuery, {
      alias: { instance, path: alias },
    })

    const onError = (error: Error, context: Record<string, string>) => {
      // TODO: Handle
      console.log(context)
      alert(error)
    }

    const result = editorResponseToState(uuid, onError)

    if (isError(result)) {
      return { errorType: result.error }
    } else {
      return {
        ...result,
        type: uuid.__typename,
      }
    }
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes('Code: 503') ? 503 : 500
    return {
      errorType: 'failed-fetch',
      code: code,
    }
  }
}
