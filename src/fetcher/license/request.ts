import { request } from 'graphql-request'

import { licenseDetailsQuery } from './query'
import { convertState } from '../convert-state'
import {
  LicenseDetailsQuery,
  LicenseDetailsQueryVariables,
} from '../graphql-types/operations'
import { endpoint } from '@/api/endpoint'
import { LicenseDetailPage, PageNotFound } from '@/data-types'

export async function requestLicensePage(
  id: number
): Promise<LicenseDetailPage | PageNotFound> {
  const result = await request<
    LicenseDetailsQuery,
    LicenseDetailsQueryVariables
  >(endpoint, licenseDetailsQuery, { id })

  const license = result.license.license

  if (!license) {
    return { kind: 'not-found' }
  }

  return {
    kind: 'license-detail',
    licenseData: {
      id,
      title: license.title,
      content: convertState(license.content),
      isDefault: license.default,
    },
  }
}
