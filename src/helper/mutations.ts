import {
  ThreadCreateCommentInput,
  ThreadCreateThreadInput,
  ThreadMutation,
  ThreadSetCommentStateInput,
  ThreadSetThreadArchivedInput,
  UuidMutation,
  UuidSetStateInput,
} from '@serlo/api'
import { gql } from 'graphql-request'
import NProgress from 'nprogress'
import { mutate } from 'swr'

import { useRefreshFromAPI } from './use-refresh-from-api'
import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { AuthPayload, useAuth } from '@/auth/use-auth'
import { useEntityId } from '@/contexts/entity-id-context'

const authFetchThread = async (
  input: { query: string; variables: object },
  auth: React.RefObject<AuthPayload>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
) =>
  (await createAuthAwareGraphqlFetch(auth)(JSON.stringify(input))) as {
    thread: ThreadMutation
  }

export function useSetUuidStateMutation() {
  const auth = useAuth()
  const refresh = useRefreshFromAPI()

  return async (input: UuidSetStateInput) =>
    await setUuidStateMutation(auth, input, refresh)
}

export async function setUuidStateMutation(
  auth: React.RefObject<AuthPayload>,
  input: UuidSetStateInput,
  refresh: ReturnType<typeof useRefreshFromAPI>
) {
  const args = {
    query: gql`
      mutation setUuidState($input: UuidSetStateInput!) {
        uuid {
          setState(input: $input) {
            success
          }
        }
      }
    `,
    variables: {
      input,
    },
  }
  const response = (await createAuthAwareGraphqlFetch(auth)(
    JSON.stringify(args)
  )) as {
    uuid: UuidMutation
  }
  if (response.uuid.setState?.success) {
    // TODO: some type of cache mutation would make a lot more sense here
    refresh()
  }
}

// export function useNotificationSetStateMutation() {
//   const auth = useAuth()

//   return async (input: NotificationSetStateInput) =>
//     await notificationSetStateMutation(auth, input)
// }

// export async function notificationSetStateMutation(
//   auth: React.RefObject<AuthPayload>,
//   input: NotificationSetStateInput
// ) {
//   const args = {
//     query: gql`
//       mutation setState($input: NotificationSetStateInput!) {
//         notification {
//           setState(input: $input) {
//             success
//           }
//         }
//       }
//     `,
//     variables: {
//       input,
//     },
//   }
//   const response = await authFetchThread(args, auth)
//   console.log(response)
// }

// export async function setThreadState(id: number, unread: boolean) {
//   const input = {
//     query: gql`
//       mutation setState($input: NotificationSetStateInput!) {
//         notification {
//           setState(input: $input) {
//             success
//           }
//         }
//       }
//     `,
//     variables: {
//       input: {
//         id,
//         unread,
//       },
//     },
//   }
//   const result = await createAuthAwareGraphqlFetch(auth)(JSON.stringify(input))
//   console.log(result)
// }

export function useThreadArchivedMutation() {
  const auth = useAuth()
  const entityId = useEntityId()

  return async (input: ThreadSetThreadArchivedInput) =>
    await setThreadArchivedMutation(auth, input, entityId)
}

async function setThreadArchivedMutation(
  auth: React.RefObject<AuthPayload>,
  input: ThreadSetThreadArchivedInput,
  entityId: number
) {
  const args = {
    query: gql`
      mutation setState($input: ThreadSetThreadArchivedInput!) {
        thread {
          setThreadArchived(input: $input) {
            success
          }
        }
      }
    `,
    variables: { input },
  }
  NProgress.start()

  const response = await authFetchThread(args, auth)

  if (response.thread.setThreadArchived?.success) {
    await mutate(`comments::${entityId}`)
    NProgress.done()
    return true
  } else {
    handleError(response)
    NProgress.done()
    return false
  }
}

export function useSetCommentStateMutation() {
  const auth = useAuth()
  const entityId = useEntityId()

  return async (input: ThreadSetCommentStateInput) =>
    await setCommentStateMutation(auth, input, entityId)
}

async function setCommentStateMutation(
  auth: React.RefObject<AuthPayload>,
  input: ThreadSetCommentStateInput,
  entityId: number
) {
  const args = {
    query: gql`
      mutation setState($input: ThreadSetCommentStateInput!) {
        thread {
          setCommentState(input: $input) {
            success
          }
        }
      }
    `,
    variables: {
      input: { input },
    },
  }
  const response = await authFetchThread(args, auth)
  handleError(response)

  if (response.thread.setCommentState?.success) {
    return !!(await mutate(`comments::${entityId}`))
  } else {
    handleError(response)
    return false
  }
}

export function useCreateThreadMutation() {
  const auth = useAuth()

  return async (input: ThreadCreateThreadInput) =>
    await createThreadMutation(auth, input)
}

async function createThreadMutation(
  auth: React.RefObject<AuthPayload>,
  input: ThreadCreateThreadInput
) {
  const args = {
    query: gql`
      mutation createThread($input: ThreadCreateThreadInput!) {
        thread {
          createThread(input: $input) {
            success
          }
        }
      }
    `,
    variables: { input },
  }

  const response = await authFetchThread(args, auth)

  if (response.thread.createThread?.success) {
    return !!(await mutate(`comments::${input.objectId}`))
  } else {
    handleError(response)
    return false
  }
}

export function useCreateCommentMutation() {
  const auth = useAuth()
  const entityId = useEntityId()

  return async (input: ThreadCreateCommentInput) =>
    await createCommentMutation(auth, input, entityId)
}

async function createCommentMutation(
  auth: React.RefObject<AuthPayload>,
  input: ThreadCreateCommentInput,
  entityId: number
) {
  const args = {
    query: gql`
      mutation createComment($input: ThreadCreateCommentInput!) {
        thread {
          createComment(input: $input) {
            success
          }
        }
      }
    `,
    variables: { input },
  }

  try {
    const response = await authFetchThread(args, auth)

    if (response.thread.createComment?.success) {
      return !!(await mutate(`comments::${entityId}`))
    }
  } catch (e) {
    handleError(e)
    return false
  }
}

function handleError(response: object) {
  console.log(response)
  //   const showToastNotice = useToastNotice()
  //   showToastNotice(`Das hat leider nicht geklappt…`, 'warning')
}
