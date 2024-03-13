import type {
  RevisionsQuery,
  MainUuidQuery,
  UserUuidQuery,
} from './graphql-types/operations'

// some helpers for our codegen types

export type MainUuidType = NonNullable<MainUuidQuery['uuid']>

export type User = Extract<UserUuidQuery['uuid'], { __typename: 'User' }>

export type Revisions = Extract<RevisionsQuery['uuid'], { revisions: any }>

export type Revision = Revisions['revisions']['nodes'][number]
