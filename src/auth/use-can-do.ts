import { Instance } from '@serlo/api'
import {
  GenericAuthorizationGuard,
  instanceToScope,
} from '@serlo/authorization'

import { useAuthorizationPayload } from '@/contexts/authorization-payload-context'
import { useInstanceData } from '@/contexts/instance-context'

export function useCanDo() {
  // TODO: this should also work if authorization === null
  const authorizationPayload = useAuthorizationPayload()
  const instance = useInstanceData()
  const scope = instanceToScope(instance.lang as Instance)

  return (guard: GenericAuthorizationGuard) => {
    if (!authorizationPayload) {
      console.warn('No authorization context provided!')
      return false
    }
    return guard(scope)(authorizationPayload)
  }
}
