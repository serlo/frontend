import {
  ThreadCreateCommentInput,
  ThreadCreateThreadInput,
  ThreadMutation,
} from '@serlo/api'
import { gql } from 'graphql-request'
import { mutate } from 'swr'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { AuthPayload } from '@/auth/use-auth'

export async function setStateMutation(
  auth: React.RefObject<AuthPayload>,
  id: number,
  unread: boolean
) {
  const input = {
    query: gql`
      mutation setState($input: NotificationSetStateInput!) {
        notification {
          setState(input: $input) {
            success
          }
        }
      }
    `,
    variables: {
      input: {
        id,
        unread,
      },
    },
  }
  const result = await createAuthAwareGraphqlFetch(auth)(JSON.stringify(input))
  console.log(result)
}

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

// export async function setThreadArchived(id: number, unread: boolean) {
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

// export async function setCommentState(id: number, unread: boolean) {
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

export async function createThreadMutation(
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

  const response = (await createAuthAwareGraphqlFetch(auth)(
    JSON.stringify(args)
  )) as {
    thread: ThreadMutation
  }

  if (response.thread.createThread?.success) {
    return !!(await mutate(`comments::${input.objectId}`))
  } else {
    //TODO: display error notice
    console.log(response)
    return false
  }
}

export async function createCommentMutation(
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

  const response = (await createAuthAwareGraphqlFetch(auth)(
    JSON.stringify(args)
  )) as { thread: ThreadMutation }

  if (response.thread.createComment?.success) {
    return !!(await mutate(`comments::${entityId}`))
  } else {
    //TODO: display error notice
    console.log(response)
    return false
  }
}
