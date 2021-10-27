import { request } from 'graphql-request'

import { dataQuery } from './query'
import { QueryResponse, QueryResponseRevision } from './query-types'
import { revisionQuery } from './revision/query'
import { endpoint } from '@/api/endpoint'
import {
  editorResponseToState,
  isError,
} from '@/edtr-io/editor-response-to-state'
import { revisionResponseToResponse } from '@/edtr-io/revision-response-to-response'
import { SerloEditorProps } from '@/edtr-io/serlo-editor'
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
  localeString: string,
  ids?: string[]
): Promise<EditorPageData | EditorFetchErrorData> {
  try {
    if (!ids)
      return {
        errorType: 'failed-fetch',
        code: 400,
      }
    let data = null
    const repoId = parseInt(ids[0])
    const revisionId = parseInt(ids[1])

    const onError = (error: Error, context: Record<string, string>) => {
      // TODO: Handle
      console.log(context)
      alert(error)
    }

    if (revisionId && !isNaN(revisionId)) {
      const { uuid } = await request<{
        uuid: QueryResponseRevision
      }>(endpoint, revisionQuery, {
        id: revisionId,
      })
      data = revisionResponseToResponse(uuid)
    } else {
      const raw_alias = '/' + localeString + '/' + repoId.toString()
      const { alias, instance } = parseLanguageSubfolder(raw_alias)

      const { uuid } = await request<{
        uuid: QueryResponse
      }>(endpoint, dataQuery, {
        alias: { instance, path: alias },
      })
      data = uuid
    }

    if (!data) return { errorType: 'failed-fetch' }

    const result = editorResponseToState(data, onError)

    if (isError(result)) {
      return { errorType: result.error }
    } else {
      return {
        ...result,
        type: data.__typename,
      }
    }
  } catch (e) {
    const code = ((e as Error).message ?? e).includes('Code: 503') ? 503 : 500
    return {
      errorType: 'failed-fetch',
      code: code,
    }
  }
}
