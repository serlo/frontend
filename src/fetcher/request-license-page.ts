import * as GraphQL from '@serlo/api'
import { request } from 'graphql-request'

import { convertState } from './convert-state'
import { createHorizon } from './create-horizon'
import { licenseDetailsQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { LicenseDetailPage } from '@/data-types'

export async function requestLicensePage(
  id: number,
  instance: string
): Promise<LicenseDetailPage> {
  const { license } = await request<{ license: GraphQL.License }>(
    endpoint,
    licenseDetailsQuery(id)
  )
  const horizonData = instance == 'de' ? createHorizon() : undefined

  return {
    kind: 'license-detail',
    licenseData: {
      content: convertState(license.content),
      title: license.title,
      iconHref: license.iconHref,
    },
    newsletterPopup: false,
    horizonData,
    metaData: {
      title: license.title,
      contentType: 'page',
    },
  }
}
