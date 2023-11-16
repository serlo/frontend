import { request } from 'graphql-request'

import { createBreadcrumbs } from './create-breadcrumbs'
import type {
  MainUuidQuery,
  RevisionUuidQuery,
  RevisionUuidQueryVariables,
} from './graphql-types/operations'
import { dataQuery } from './query'
import type { MainUuidType } from './query-types'
import { revisionQuery } from './revision/query'
import { testAreaId } from './testArea'
import { endpoint } from '@/api/endpoint'
import {
  type BreadcrumbsData,
  UuidType,
  type UuidWithRevType,
} from '@/data-types'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'
import {
  convertEditorResponseToState,
  isError,
} from '@/serlo-editor-integration/convert-editor-response-to-state'
import { revisionResponseToResponse } from '@/serlo-editor-integration/revision-response-to-response'
import type { SerloEditorProps } from '@/serlo-editor-integration/serlo-editor'

export interface EditorPageData {
  initialState: SerloEditorProps['initialState']
  type: UuidWithRevType
  entityNeedsReview: boolean
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

export async function fetchEditorData(
  localeString: string,
  ids?: string[]
): Promise<EditorPageData | EditorFetchErrorData> {
  if (!ids) return { errorType: 'failed-fetch' }
  let data: MainUuidType | undefined | null = null
  const repoId = parseInt(ids[0])
  const revisionId = parseInt(ids[1])

  const raw_alias = '/' + localeString + '/' + repoId.toString()
  const { alias, instance } = parseLanguageSubfolder(raw_alias)

  if (revisionId && !isNaN(revisionId)) {
    const { uuid } = await request<
      RevisionUuidQuery,
      RevisionUuidQueryVariables
    >(endpoint, revisionQuery, {
      id: revisionId,
    })
    data = revisionResponseToResponse(uuid)
  } else {
    const { uuid } = await request<MainUuidQuery>(endpoint, dataQuery, {
      alias: { instance, path: alias },
    })
    data = uuid
  }

  if (!data) return { errorType: 'failed-fetch' }

  const result = convertEditorResponseToState(data)

  const breadcrumbsData = createBreadcrumbs(data, instance)

  const isTestArea =
    breadcrumbsData && breadcrumbsData.some((entry) => entry.id === testAreaId)

  const typeNeedsReview = !noReviewTypes.includes(
    data.__typename as UuidWithRevType
  )
  const entityNeedsReview = !isTestArea && typeNeedsReview

  if (isError(result)) {
    throw new Error(result.error)
  } else {
    return {
      initialState: { ...result },
      type: data.__typename as UuidWithRevType,
      entityNeedsReview,
      id: repoId,
      errorType: 'none',
      breadcrumbsData: breadcrumbsData ?? null,
    }
  }
}
