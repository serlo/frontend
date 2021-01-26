import { ThreadCreateCommentInput, ThreadCreateThreadInput } from '@serlo/api'
import { gql } from 'graphql-request'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { AuthPayload } from '@/auth/use-auth'

export async function setStateMutation(id: number, unread: boolean) {
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

export async function setThreadState(id: number, unread: boolean) {
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

export async function setThreadArchived(id: number, unread: boolean) {
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

export async function setCommentState(id: number, unread: boolean) {
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

export async function createThreadMutation(
  auth: React.RefObject<AuthPayload>,
  input: ThreadCreateThreadInput
) {
  const args = {
    query: gql`
      mutation createThread(
        $input: ThreadCreateThreadInput!)
      ) {
          thread{
              createThread(input: $input)
              success
          }
      }
    `,
    variables: { input },
  }

  return (await createAuthAwareGraphqlFetch(auth)(
    JSON.stringify(args)
  )) as object // TODO: real type
}

export async function createCommentMutation(
  auth: React.RefObject<AuthPayload>,
  input: ThreadCreateCommentInput
) {
  const args = {
    query: gql`
      mutation createComment(
        $input: ThreadCreateCommentInput!)
      ) {
          thread{
              createComment(input: $input)
              success
          }
      }
    `,
    variables: { input },
  }

  return (await createAuthAwareGraphqlFetch(auth)(
    JSON.stringify(args)
  )) as object // TODO: real type
}
