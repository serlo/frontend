import type { FetcherParams } from '@graphiql/toolkit'
import type { GraphiQLProps } from 'graphiql/esm/components/GraphiQL'
import { ExecutionResult } from 'graphql'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// eslint-disable-next-line import/no-internal-modules, import/no-unassigned-import
import 'graphiql/graphiql.css'

import { AuthProvider } from '@/auth/auth-provider'

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
  const fetcher = async function fetcher(params: FetcherParams) {
    const data = await executeQuery()
    return data

    async function executeQuery() {
      const response = await fetch('/api/frontend/localhost-graphql-fetch', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        credentials: 'same-origin',
      })
      return (await response.json()) as ExecutionResult
    }
  }

  return (
    <div className="[&_.graphiql-container]:h-screen">
      <GraphiQL fetcher={fetcher} />
    </div>
  )
}

export default GraphQLPage
