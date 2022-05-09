import {
  ThreadCreateCommentInput,
  ThreadCreateThreadInput,
  ThreadSetCommentStateInput,
  ThreadSetThreadArchivedInput,
  ThreadSetThreadStateInput,
} from '@serlo/api'
import { gql } from 'graphql-request'
import NProgress from 'nprogress'
import { mutate, useSWRConfig } from 'swr'

import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useEntityId } from '@/contexts/entity-id-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useThreadArchivedMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()
  const { cache } = useSWRConfig()

  const mutation = gql`
    mutation threadSetArchived($input: ThreadSetThreadArchivedInput!) {
      thread {
        setThreadArchived(input: $input) {
          success
        }
      }
    }
  `

  const setThreadArchivedMutation = async function (
    input: ThreadSetThreadArchivedInput
  ) {
    NProgress.start()

    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) {
      await mutate(`comments::${entityId}`)
      resetAllThreadsCache(cache)
      NProgress.done()
    }
    return success
  }

  return async (input: ThreadSetThreadArchivedInput) =>
    await setThreadArchivedMutation(input)
}

export function useSetThreadStateMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()
  const { cache } = useSWRConfig()

  const mutation = gql`
    mutation threadSetState($input: ThreadSetThreadStateInput!) {
      thread {
        setThreadState(input: $input) {
          success
        }
      }
    }
  `

  const setThreadStateMutation = async function (
    input: ThreadSetThreadStateInput
  ) {
    console.log('setThreadStateMutation')
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${entityId}`)
    resetAllThreadsCache(cache)
    return success
  }

  return async (input: ThreadSetThreadStateInput) =>
    await setThreadStateMutation(input)
}

export function useSetCommentStateMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()
  const { cache } = useSWRConfig()

  const mutation = gql`
    mutation threadSetCommentState($input: ThreadSetCommentStateInput!) {
      thread {
        setCommentState(input: $input) {
          success
        }
      }
    }
  `

  const setCommentStateMutation = async function (
    input: ThreadSetCommentStateInput
  ) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${entityId}`)
    resetAllThreadsCache(cache)
    return success
  }

  return async (input: ThreadSetCommentStateInput) =>
    await setCommentStateMutation(input)
}

export function useCreateThreadMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()
  const { cache } = useSWRConfig()

  const mutation = gql`
    mutation createThread($input: ThreadCreateThreadInput!) {
      thread {
        createThread(input: $input) {
          success
        }
      }
    }
  `
  const createThreadMutation = async function (input: ThreadCreateThreadInput) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${input.objectId}`)
    resetAllThreadsCache(cache)
    return success
  }

  return async (input: ThreadCreateThreadInput) =>
    await createThreadMutation(input)
}

export function useCreateCommentMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()
  const { cache } = useSWRConfig()

  const mutation = gql`
    mutation createComment($input: ThreadCreateCommentInput!) {
      thread {
        createComment(input: $input) {
          success
        }
      }
    }
  `

  const createCommentMutation = async function (
    input: ThreadCreateCommentInput
  ) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${entityId}`)
    resetAllThreadsCache(cache)

    return success
  }

  return async (input: ThreadCreateCommentInput) =>
    await createCommentMutation(input)
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
