import { Instance } from '@serlo/api'
import {
  GenericAuthorizationGuard,
  instanceToScope,
} from '@serlo/authorization'

import { useAuth } from '@/auth/auth-provider'
import { useInstanceData } from '@/contexts/instance-context'

export function useCanDo() {
  const { authorizationPayload } = useAuth()
  const instance = useInstanceData()
  const scope = instanceToScope(instance.lang as Instance)

  return (guard: GenericAuthorizationGuard) => {
    if (!authorizationPayload) {
      // eslint-disable-next-line no-console
      console.warn('No authorization context provided!')
      return false
    }
    return guard(scope)(authorizationPayload)
  }
}
