import type { FetcherParams } from '@graphiql/toolkit'
import type { GraphiQLProps } from 'graphiql/esm/components/GraphiQL'
import { ExecutionResult, GraphQLError } from 'graphql'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// eslint-disable-next-line import/no-internal-modules, import/no-unassigned-import
import 'graphiql/graphiql.css'

import { endpoint } from '@/api/endpoint'
import { AuthProvider } from '@/auth/auth-provider'
import { useAuthentication } from '@/auth/use-authentication'

const GraphiQL = dynamic<GraphiQLProps>(() => import('graphiql'), {
  ssr: false,
})

const GraphQLPage: NextPage = () => {
  return (
    <AuthProvider>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <GraphiQLWithCustomFetcher />
    </AuthProvider>
  )
}

function GraphiQLWithCustomFetcher() {
  const auth = useAuthentication()

  const fetcher = async function fetcher(params: FetcherParams) {
    const usedToken = auth.current?.token
    const data = await executeQuery()
    const error = data.errors?.[0] as
      | (GraphQLError & {
          extensions: {
            code: 'INVALID_TOKEN'
          }
        })
      | undefined
    if (error?.extensions.code === 'INVALID_TOKEN' && auth.current !== null) {
      await auth.current.refreshToken(usedToken!)
      return await executeQuery()
    }
    return data

    async function executeQuery() {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(auth.current
            ? {
                Authorization: `Bearer ${auth.current.token}`,
              }
            : {}),
        },
        body: JSON.stringify(params),
        credentials: 'same-origin',
      })
      return (await response.json()) as ExecutionResult
    }
  }

  return (
    <>
      <GraphiQL fetcher={fetcher} />
      <style jsx global>
        {`
          .graphiql-container {
            height: 100vh;
          }
        `}
      </style>
    </>
  )
}

export default GraphQLPage
