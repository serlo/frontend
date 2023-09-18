import { request } from 'graphql-request'

import { licenseDetailsQuery } from './query'
import {
  LicenseDetailsQuery,
  LicenseDetailsQueryVariables,
} from '../graphql-types/operations'
import { graphqlEndpoint } from '@/api/endpoint'
import { LicenseDetailPage, PageNotFound } from '@/data-types'
import { FrontendContentNode } from '@/frontend-node-types'
import { ConvertNode, convert } from '@/schema/convert-edtr-io-state'

export async function requestLicensePage(
  id: number
): Promise<LicenseDetailPage | PageNotFound> {
  const result = await request<
    LicenseDetailsQuery,
    LicenseDetailsQueryVariables
  >(graphqlEndpoint, licenseDetailsQuery, { id })

  const { license } = result.license

  if (!license) return { kind: 'not-found' }

  // hack to remove undefined pluginId value, can be removed when we move to app directory
  const content = JSON.parse(
    JSON.stringify(convert(JSON.parse(license.content) as ConvertNode))
  ) as FrontendContentNode[]

  return {
    kind: 'license-detail',
    licenseData: {
      id,
      title: license.title,
      content,
      isDefault: license.default,
    },
  }
}
