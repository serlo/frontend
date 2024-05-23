import { gql } from 'graphql-request'

import { endpoint } from '@/api/endpoint'
import { AliasByUuidQuery } from '@/fetcher/graphql-types/operations'

export async function revalidatePath(path: string): Promise<boolean> {
  try {
    const encodedPath = encodeURIComponent(path)
    const responsePath = await fetch(
      `/api/frontend/revalidate-path?path=${encodedPath}`
    )
    if (!responsePath.ok) {
      // eslint-disable-next-line no-console
      console.error(
        'Fetch failed',
        responsePath.status,
        responsePath.statusText
      )
      return false
    }
    // eslint-disable-next-line no-console
    console.log('revalidatePath ran:', path)

    const serloId = encodedPath.match(/\/([1-9]?[0-9]+)\//)?.[1]
    if (serloId) {
      const responseId = await fetch(
        `/api/frontend/revalidate-path?path=${serloId}`
      )
      if (!responseId.ok) {
        // eslint-disable-next-line no-console
        console.error('Fetch failed', responseId.status, responseId.statusText)
        return false
      }
      // eslint-disable-next-line no-console
      console.log('revalidatePath ran:', path)
    }

    // delay for 500ms to allow the cache to update
    await new Promise((resolve) => setTimeout(resolve, 500))
    return true
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return false
  }
}

export async function getAliasById(id: number): Promise<string | null> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',

      body: JSON.stringify({
        query: aliasByUuidQuery,
        variables: { id },
      }),
    })
    const data = (await response.json()) as { data: AliasByUuidQuery }
    if (!data.data.uuid) return null
    const { uuid } = data.data
    const revisionAlias = Object.hasOwn(uuid, 'repository')
      ? uuid.repository.alias
      : null
    if (revisionAlias) return revisionAlias
    return uuid.alias ?? null
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return null
  }
}

const aliasByUuidQuery = gql`
  query aliasByUuid($id: Int!) {
    uuid(id: $id) {
      alias
      ... on AbstractEntityRevision {
        repository {
          alias
        }
      }
    }
  }
`
