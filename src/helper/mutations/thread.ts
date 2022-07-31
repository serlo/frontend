import { gql } from 'graphql-request'
import NProgress from 'nprogress'
import { mutate, useSWRConfig } from 'swr'

import { useMutationFetch } from './use-mutation-fetch'
import { useEntityId } from '@/contexts/entity-id-context'
import {
  ThreadCreateCommentInput,
  ThreadCreateThreadInput,
  ThreadSetCommentStateInput,
  ThreadSetThreadArchivedInput,
  ThreadSetThreadStateInput,
} from '@/fetcher/graphql-types/operations'

const threadArchiveMutation = gql`
  mutation threadSetArchived($input: ThreadSetThreadArchivedInput!) {
    thread {
      setThreadArchived(input: $input) {
        success
      }
    }
  }
`

export function useThreadArchivedMutation() {
  const entityId = useEntityId()
  const mutationFetch = useMutationFetch()
  const { cache } = useSWRConfig()

  return async function (input: ThreadSetThreadArchivedInput) {
    NProgress.start()

    const success = await mutationFetch(threadArchiveMutation, input)

    if (success) {
      await mutate(`comments::${entityId}`)
      resetAllThreadsCache(cache)
      NProgress.done()
    }
    return success
  }
}

const setThreadStateMutation = gql`
  mutation threadSetState($input: ThreadSetThreadStateInput!) {
    thread {
      setThreadState(input: $input) {
        success
      }
    }
  }
`

export function useSetThreadStateMutation() {
  const entityId = useEntityId()
  const mutationFetch = useMutationFetch()
  const { cache } = useSWRConfig()

  return async function (input: ThreadSetThreadStateInput) {
    const success = await mutationFetch(setThreadStateMutation, input)

    if (success) await mutate(`comments::${entityId}`)
    resetAllThreadsCache(cache)
    return success
  }
}

const setCommentStateMutation = gql`
  mutation threadSetCommentState($input: ThreadSetCommentStateInput!) {
    thread {
      setCommentState(input: $input) {
        success
      }
    }
  }
`

export function useSetCommentStateMutation() {
  const entityId = useEntityId()
  const mutationFetch = useMutationFetch()
  const { cache } = useSWRConfig()

  return async function (input: ThreadSetCommentStateInput) {
    const success = await mutationFetch(setCommentStateMutation, input)

    if (success) await mutate(`comments::${entityId}`)
    resetAllThreadsCache(cache)
    return success
  }
}

const createThreadMutation = gql`
  mutation createThread($input: ThreadCreateThreadInput!) {
    thread {
      createThread(input: $input) {
        success
      }
    }
  }
`

export function useCreateThreadMutation() {
  const mutationFetch = useMutationFetch()
  const { cache } = useSWRConfig()

  return async function (input: ThreadCreateThreadInput) {
    const success = await mutationFetch(createThreadMutation, input)

    if (success) await mutate(`comments::${input.objectId}`)
    resetAllThreadsCache(cache)
    return success
  }
}

const createCommentMutation = gql`
  mutation createComment($input: ThreadCreateCommentInput!) {
    thread {
      createComment(input: $input) {
        success
      }
    }
  }
`

export function useCreateCommentMutation() {
  const mutationFetch = useMutationFetch()
  const entityId = useEntityId()
  const { cache } = useSWRConfig()

  return async function (input: ThreadCreateCommentInput) {
    const success = await mutationFetch(createCommentMutation, input)

    if (success) await mutate(`comments::${entityId}`)
    resetAllThreadsCache(cache)

    return success
  }
}

function resetAllThreadsCache(cache: unknown) {
  if (!(cache instanceof Map)) {
    throw new Error(
      'matchMutate requires the cache provider to be a Map instance'
    )
  }

  const keys = []
  for (const key of cache.keys() as IterableIterator<string>) {
    const shouldBeMutated =
      key.startsWith('$inf$') && key.includes('query getAllThreads')

    if (shouldBeMutated) {
      keys.push(key)
    }
  }

  keys.forEach((key) => {
    void mutate(key)
  })
}
