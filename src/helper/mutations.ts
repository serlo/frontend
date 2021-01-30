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

import { showToastNotice } from './show-toast-notice'
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

  const setUuidStateMutation = async function (input: UuidSetStateInput) {
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
      setTimeout(() => {
        showToastNotice(
          `✨ Erfolgreich ${input.trashed ? 'gelöscht' : 'wiederhergestellt'}.`,
          'success'
        )
      }, 600)
      setTimeout(() => {
        refresh()
      }, 3000)
    } else handleError(response)
  }
  return async (input: UuidSetStateInput) => await setUuidStateMutation(input)
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

  const setThreadArchivedMutation = async function (
    input: ThreadSetThreadArchivedInput
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

  return async (input: ThreadSetThreadArchivedInput) =>
    await setThreadArchivedMutation(input)
}

export function useSetCommentStateMutation() {
  const auth = useAuth()
  const entityId = useEntityId()

  const setCommentStateMutation = async function (
    input: ThreadSetCommentStateInput
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

  return async (input: ThreadSetCommentStateInput) =>
    await setCommentStateMutation(input)
}

export function useCreateThreadMutation() {
  const auth = useAuth()

  const createThreadMutation = async function (input: ThreadCreateThreadInput) {
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

  return async (input: ThreadCreateThreadInput) =>
    await createThreadMutation(input)
}

export function useCreateCommentMutation() {
  const auth = useAuth()
  const entityId = useEntityId()

  const createCommentMutation = async function (
    input: ThreadCreateCommentInput
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

  return async (input: ThreadCreateCommentInput) =>
    await createCommentMutation(input)
}

function handleError(response?: object) {
  console.log(response)
  showToastNotice(`Das hat leider nicht geklappt…`, 'warning')
}
