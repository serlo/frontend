import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { unrevisedRevisionsSubjectsQuery } from './query'
import {
  Instance,
  UnrevisedRevisionsQuery,
  UnrevisedRevisionsQueryVariables,
} from '../graphql-types/operations'
import { endpoint } from '@/api/endpoint'
import { UnrevisedRevisionsPage } from '@/data-types'

export async function requestUnrevisedRevisionsBySubjects(
  instance: Instance
): Promise<UnrevisedRevisionsPage | undefined> {
  const variables = {
    instance,
  }
  try {
    const data = await request<
      UnrevisedRevisionsQuery,
      UnrevisedRevisionsQueryVariables
    >(endpoint, unrevisedRevisionsSubjectsQuery, variables)

    const subject = data.subject
    const authorization = data.authorization as AuthorizationPayload
    return {
      kind: 'unrevisedRevisions',
      revisionsData: subject,
      newsletterPopup: false,
      authorization,
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return undefined
  }
}
