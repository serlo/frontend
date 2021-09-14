import { Subject } from '@serlo/api'
import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { Instance } from '../query-types'
import { unrevisedRevisionsQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { UnrevisedRevisionsPage } from '@/data-types'

export async function requestUnrevisedRevisions(
  instance: Instance
): Promise<UnrevisedRevisionsPage | undefined> {
  const variables = {
    instance,
  }
  try {
    const { subject, authorization } = await request<{
      subject: { subjects: Subject[] }
      authorization: AuthorizationPayload
    }>(endpoint, unrevisedRevisionsQuery, variables)
    return {
      kind: 'unrevisedRevisions',
      revisionsData: subject,
      newsletterPopup: false,
      authorization,
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return undefined
  }
}
