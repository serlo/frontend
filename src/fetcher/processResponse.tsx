import { horizonData } from '../data/horizondata'
import { createTitle } from './createTitle'
import { createBreadcrumbs } from './createBreadcrumbs'
import { createNavigation } from './createNavigation'
import { createData } from './createData'
import { createLicense } from './createLicense'

interface ReqData {
  uuid: {
    __typename: string
  }
}

interface ProcessedResponse {
  contentType: string
  title: string
  breadcrumbs
  navigation: object
  data: any //todo
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

function shuffle(a) {
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
