import * as GraphQL from '@serlo/api'

import type { MainUuidQuery } from './graphql-types/operations'

// some helpers for our codegen types

export type MainUuidType = NonNullable<MainUuidQuery['uuid']>

export type License = Extract<MainUuidType, { license: any }>['license']

// User profiles (todo: use generated types where suitable)
export interface User extends GraphQL.User {
  __typename: 'User'
}
