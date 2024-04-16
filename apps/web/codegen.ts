import { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()
const schema = process.env.PRODUCTION
  ? 'https://api.serlo.org/graphql'
  : 'https://api.serlo-staging.dev/graphql'

const config: CodegenConfig = {
  overwrite: true,
  emitLegacyCommonJSImports: false,
  schema,
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/helper/mutations/**/*.ts'],
  generates: {
    'src/fetcher/graphql-types/operations.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        {
          add: {
            content: [
              '/* eslint-disable */\n/* THIS FILE IS GENERATED – run `yarn codegen` to update */',
            ],
          },
        },
      ],
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
