import {
  ThreadCreateCommentInput,
  ThreadCreateThreadInput,
  ThreadSetCommentStateInput,
  ThreadSetThreadArchivedInput,
  ThreadSetThreadStateInput,
} from '@serlo/api'
import { gql } from 'graphql-request'
import NProgress from 'nprogress'
import { mutate } from 'swr'

import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useEntityId } from '@/contexts/entity-id-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useThreadArchivedMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation setState($input: ThreadSetThreadArchivedInput!) {
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

  const mutation = gql`
    mutation setState($input: ThreadSetThreadStateInput!) {
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
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) await mutate(`comments::${entityId}`)
    return success
  }

  return async (input: ThreadSetThreadStateInput) =>
    await setThreadStateMutation(input)
}

export function useSetCommentStateMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation setState($input: ThreadSetCommentStateInput!) {
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
    return success
  }

  return async (input: ThreadSetCommentStateInput) =>
    await setCommentStateMutation(input)
}

export function useCreateThreadMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

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
    return success
  }

  return async (input: ThreadCreateThreadInput) =>
    await createThreadMutation(input)
}

export function useCreateCommentMutation() {
  const auth = useAuthentication()
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()

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
    return success
  }

  return async (input: ThreadCreateCommentInput) =>
    await createCommentMutation(input)
}
