import { Subject } from '@serlo/api'
import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { Instance } from '../query-types'
import { unrevisedRevisionsQuery } from './query'
import { endpointNoCache } from '@/api/endpoint'
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
    }>(endpointNoCache, unrevisedRevisionsQuery, variables)
    console.log('request.ts Mathe nodes')
    console.log(subject.subjects[0].unrevisedEntities.nodes.length)
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
