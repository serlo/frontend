import { horizonData } from '../data/horizon'
import { createBreadcrumbs } from './create-breadcrumbs'
import { createData } from './create-data'
import { createLicense } from './create-license'
import { createNavigation } from './create-navigation'
import { createTitle } from './create-title'

interface ReqData {
  uuid: {
    __typename: string
  }
}

interface ProcessedResponse {
  contentType: string
  title: string
  breadcrumbs: any // TODO:
  navigation: object
  data: any // TODO:
  license: string
  horizonIndices: Array<object>
}

export function processResponse(reqData: ReqData): ProcessedResponse {
  return {
    contentType: reqData.uuid.__typename,
    title: createTitle(reqData.uuid) ?? 'Serlo',
    breadcrumbs: createBreadcrumbs(reqData.uuid),
    navigation: createNavigation(reqData.uuid),
    data: createData(reqData.uuid),
    license: createLicense(reqData.uuid),
    horizonIndices: shuffle(Object.keys(horizonData)),
  }
}

// TODO:
function shuffle(a: any[]) {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    const r = Math.random()
    j = Math.floor(r * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}
