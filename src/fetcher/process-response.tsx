import { horizonData } from '../data/horizon'
import { createBreadcrumbs } from './create-breadcrumbs'
import { createData, EntityTypeData } from './create-data'
import { createLicense } from './create-license'
import { createNavigation } from './create-navigation'
import { createTitle } from './create-title'
import { QueryResponse, License, TaxonomyTermType } from './query'
import { HeaderLink, BreadcrumbsData, FrontendContentNode } from '@/data-types'

interface ReqData {
  uuid: QueryResponse
}

//mystery type so far.
export interface ResponseDataQuickFix {
  title?: string
  value?: FrontendContentNode
  exercises?: FrontendContentNode[]
  metaDescription?: string
  type?: TaxonomyTermType
}

export interface ProcessedResponse {
  contentType: QueryResponse['__typename']
  title: string
  breadcrumbs?: BreadcrumbsData
  navigation?: HeaderLink[]
  data: EntityTypeData
  license?: License
  horizonIndices: Array<number>
}

export function processResponse(reqData: ReqData): ProcessedResponse {
  return {
    contentType: reqData.uuid.__typename,
    title: createTitle(reqData.uuid) ?? 'Serlo',
    breadcrumbs: createBreadcrumbs(reqData.uuid),
    navigation: createNavigation(reqData.uuid),
    data: createData(reqData.uuid),
    license: createLicense(reqData.uuid),
    horizonIndices: chooseHorizonEntries(Object.keys(horizonData)),
  }
}

function chooseHorizonEntries(entries: string[]) {
  const selected = []

  while (selected.length < 3) {
    const index = parseInt(entries[Math.floor(Math.random() * entries.length)])
    if (Math.random() > horizonData[index].frequency) continue
    if (selected.indexOf(index) === -1) selected.push(index)
  }
  return selected
}
