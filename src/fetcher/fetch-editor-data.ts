import { request } from 'graphql-request'

import { createBreadcrumbs } from './create-breadcrumbs'
import {
  MainUuidQuery,
  RevisionUuidQuery,
  RevisionUuidQueryVariables,
} from './graphql-types/operations'
import { dataQuery } from './query'
import { MainUuidType } from './query-types'
import { revisionQuery } from './revision/query'
import { endpoint } from '@/api/endpoint'
import { BreadcrumbsData, UuidType, UuidWithRevType } from '@/data-types'
import {
  editorResponseToState,
  isError,
} from '@/edtr-io/editor-response-to-state'
import { revisionResponseToResponse } from '@/edtr-io/revision-response-to-response'
import { SerloEditorProps } from '@/edtr-io/serlo-editor'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

export interface EditorPageData {
  initialState: SerloEditorProps['initialState']
  type: UuidWithRevType | UuidType.Page
  converted?: boolean
  needsReview: boolean
  id?: number // only for existing
  taxonomyParentId?: number // only for new
  errorType: 'none'
  breadcrumbsData?: BreadcrumbsData | null
}

export interface EditorFetchErrorData {
  errorType: 'failed-fetch'
}

const noReviewTypes: UuidWithRevType[] = [
  UuidType.TaxonomyTerm,
  UuidType.Page,
  UuidType.User,
]

export const sandboxUrlStart = '/community/106082/'

export async function fetchEditorData(
  localeString: string,
  ids?: string[]
): Promise<EditorPageData | EditorFetchErrorData> {
  if (!ids) return { errorType: 'failed-fetch' }
  let data: MainUuidType | undefined | null = null
  const repoId = parseInt(ids[0])
  const revisionId = parseInt(ids[1])

  if (revisionId && !isNaN(revisionId)) {
    const { uuid } = await request<
      RevisionUuidQuery,
      RevisionUuidQueryVariables
    >(endpoint, revisionQuery, {
      id: revisionId,
    })
    data = revisionResponseToResponse(uuid)
  } else {
    const raw_alias = '/' + localeString + '/' + repoId.toString()
    const { alias, instance } = parseLanguageSubfolder(raw_alias)

    const { uuid } = await request<MainUuidQuery>(endpoint, dataQuery, {
      alias: { instance, path: alias },
    })
    data = uuid
  }

  if (!data) return { errorType: 'failed-fetch' }

  const result = editorResponseToState(data)

  const breadcrumbsData = createBreadcrumbs(data)

  const isSandbox =
    breadcrumbsData &&
    breadcrumbsData.some((entry) => entry.url?.startsWith(sandboxUrlStart))

  const typeNeedsReview = !noReviewTypes.includes(
    data.__typename as UuidWithRevType
  )
  const needsReview = !isSandbox && typeNeedsReview

  if (isError(result)) {
    throw new Error(result.error)
  } else {
    return {
      ...result,
      type: data.__typename as UuidWithRevType,
      needsReview,
      id: repoId,
      errorType: 'none',
      breadcrumbsData: breadcrumbsData ?? null,
    }
  }
}
