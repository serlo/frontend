import request, { gql } from 'graphql-request'

const endpoint = 'https://api.serlo-staging.dev/graphql'

export async function fetchUpdatedIds() {
  //fetch recently changed from metadata api
  const metadataResponse = (await request(
    endpoint,
    metadataQuery
  )) as unknown as {
    metadata: {
      entities: {
        pageInfo: { hasNextPage: boolean }
        nodes: { type: string[]; identifier: { value: number } }[]
      }
    }
  }

  const updatedIds = metadataResponse.metadata.entities.nodes
    .filter(
      (entity) =>
        !entity.type.includes('Quiz') &&
        !entity.type.includes('Video') &&
        !entity.type.includes('Applet')
    )
    .map((entry) => entry.identifier.value)

  return updatedIds
}

const today = new Date()
const isoYesterday = new Date(today.setDate(today.getDate() - 3)).toISOString() // TODO: set to 1
const metadataQuery = gql`
{
  metadata {
    entities(
      instance: de
      modifiedAfter: "${isoYesterday}"
      first: 500
    ) {
      pageInfo {
        hasNextPage
      }
      nodes
    }
  }
}
`
