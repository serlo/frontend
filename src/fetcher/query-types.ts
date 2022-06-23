import type { MainUuidQuery, UserUuidQuery } from './graphql-types/operations'

// some helpers for our codegen types

export type MainUuidType = NonNullable<MainUuidQuery['uuid']>

export type License = Extract<MainUuidType, { license: any }>['license']

// User profiles (todo: use generated types where suitable)
export type User = Extract<UserUuidQuery['uuid'], { __typename: 'User' }>
