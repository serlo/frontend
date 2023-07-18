import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  emitLegacyCommonJSImports: false,
  schema: 'https://api.serlo-staging.dev/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/helper/mutations/**/*.ts'],
  generates: {
    'src/fetcher/graphql-types/operations.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        {
          add: {
            content: [
              '/* eslint-disable */\n/* THIS FILE IS GENERATED – run `yarn codegen` to update */',
            ],
          },
        },
      ],
      config: {
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-graphql-request#gqlimport
        gqlImport: 'graphql-request#gql',
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },

  config: {
    // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#declarationkind
    declarationKind: 'interface',
    // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars
    scalars: { DateTime: 'string' },
  },
}

// eslint-disable-next-line import/no-default-export
export default config
