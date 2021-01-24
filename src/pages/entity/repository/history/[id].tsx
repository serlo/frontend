import { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import styled from 'styled-components'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { RevisionHistory } from '@/components/pages/revision-history'
import { useInstanceData } from '@/contexts/instance-context'
import { makeLightButton } from '@/helper/css'

export interface HistoryRevisionData {
  author: {
    username: string
  }
  changes: string
  date: string
  id: number
}

export interface HistoryRevisionsData {
  id: number
  currentRevision: {
    id: number
    title: string
  }
  revisions: {
    nodes: HistoryRevisionData[]
  }
}

export default function Page({ id }: { id: number }) {
  const response = useFetch(id)

  return (
    <FrontendClientBase>
      <Breadcrumbs
        data={[
          {
            label: response.data?.uuid.currentRevision.title ?? '…',
            url: 'url',
          },
        ]}
        asBackButton
      />
      <Title />
      <Guard {...response}>
        <RevisionHistory data={response.data?.uuid} />
      </Guard>
    </FrontendClientBase>
  )
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const id = parseInt(context.params?.id as string)
  return {
    props: {
      id,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.revisionHistory} headTitle />
}

function useFetch(id: number) {
  return useGraphqlSwrWithAuth<{ uuid: HistoryRevisionsData }>({
    query,
    variables: { id },
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
  })
}

const query = gql`
  query getRevisions($id: Int!) {
    uuid(id: $id) {
      id
      ... on Article {
        currentRevision {
          title
          id
        }
        revisions {
          nodes {
            id
            author {
              username
            }
            changes
            date
          }
        }
      }
    }
  }
`
