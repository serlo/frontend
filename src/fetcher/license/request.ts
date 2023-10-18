import { request } from 'graphql-request'

import { licenseDetailsQuery } from './query'
import {
  LicenseDetailsQuery,
  LicenseDetailsQueryVariables,
} from '../graphql-types/operations'
import { endpoint } from '@/api/endpoint'
import { LicenseDetailPage, PageNotFound } from '@/data-types'
import { parseDocumentString } from '@/serlo-editor/static-renderer/helper/parse-document-string'
import { EditorRowsDocument } from '@/serlo-editor-integration/types/editor-plugins'

export async function requestLicensePage(
  id: number
): Promise<LicenseDetailPage | PageNotFound> {
  const result = await request<
    LicenseDetailsQuery,
    LicenseDetailsQueryVariables
  >(endpoint, licenseDetailsQuery, { id })

  const { license } = result.license

  if (!license) return { kind: 'not-found' }

  // hack to remove undefined pluginId value, can be removed when we move to app directory
  const content = parseDocumentString(license.content) as EditorRowsDocument

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
