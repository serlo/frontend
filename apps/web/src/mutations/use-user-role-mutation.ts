import { gql } from 'graphql-request'
import { useSWRConfig, Cache } from 'swr'
// eslint-disable-next-line import/no-internal-modules
import { ScopedMutator } from 'swr/_internal'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
import { UserRoleInput } from '@/fetcher/graphql-types/operations'

const addMutation = gql`
  mutation addRole($input: UserRoleInput!) {
    user {
      addRole(input: $input) {
        success
      }
    }
  }
`

const removeMutation = gql`
  mutation removeRole($input: UserRoleInput!) {
    user {
      removeRole(input: $input) {
        success
      }
    }
  }
`

export function useUserAddOrRemoveRoleMutation() {
  const mutationFetch = useMutationFetch()
  const { mutate, cache } = useSWRConfig()
  const successHandler = useSuccessHandler()

  return async function (input: UserRoleInput, isAdd: boolean) {
    const success = await mutationFetch(
      isAdd ? addMutation : removeMutation,
      input
    )

    if (success) {
      if (successHandler({ success, toastKey: 'updated' })) {
        resetUserRolesCache(cache, mutate)
      }
    }
    return success
  }
}

function resetUserRolesCache(cache: Cache<any>, mutate: ScopedMutator) {
  if (!(cache instanceof Map)) {
    throw new Error(
      'matchMutate requires the cache provider to be a Map instance'
    )
  }
  const keys = []
  for (const key of cache.keys() as IterableIterator<string>) {
    const shouldBeMutated =
      key.startsWith('$inf$') && key.includes('query usersByRole')

    if (shouldBeMutated) {
      keys.push(key)
    }
  }

  keys.forEach((key) => {
    void mutate(key)
  })
}
