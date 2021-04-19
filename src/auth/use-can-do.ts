import { Instance } from '@serlo/api'
import { AuthorizationGuard, instanceToScope } from '@serlo/authorization'

import { useAuthorizationPayload } from '@/contexts/authorization-payload-context'
import { useInstanceData } from '@/contexts/instance-context'

export function useCanDo() {
  // TODO: this should also work if authorization === null
  const authorizationPayload = useAuthorizationPayload()
  const instance = useInstanceData()
  const scope = instanceToScope(instance.lang as Instance)

  console.log('useCanDo aufgerufen', authorizationPayload, scope)

  return (guard: AuthorizationGuard) => {
    if (!authorizationPayload) {
      console.warn('No authorization context provided!')
      return false
    }
    return guard({
      authorizationPayload,
      scope,
    })
  }
}
