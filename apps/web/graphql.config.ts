import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: 'graphql.schema.json',
  extensions: {
    endpoints: {
      staging: {
        url: 'https://api.serlo-staging.dev/graphql',
        headers: {
          'user-agent': 'JS GraphQL',
        },
        introspect: true,
      },
    },
  },
}

// eslint-disable-next-line import/no-default-export
export default config
