import { Instance } from '@serlo/api'
import {
  AuthorizationGuard,
  AuthorizationPayload,
  instanceToScope,
} from '@serlo/authorization'
import { gql } from 'graphql-request'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { useInstanceData } from '@/contexts/instance-context'

export function useCanDo() {
  // TODO: this should also work if authorization === null
  const instance = useInstanceData()
  const scope = instanceToScope(instance.lang as Instance)
  const { data } = useGraphqlSwrWithAuth<{
    authorization: AuthorizationPayload
  }>({
    query: gql`
      {
        authorization
      }
    `,
  })

  return (guard: AuthorizationGuard) => {
    // TODO: this shouldn't even happen, right?
    if (data === undefined) {
      return false
    }
    return guard({
      authorizationPayload: data.authorization,
      scope,
    })
  }
}
