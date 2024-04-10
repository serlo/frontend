import type {
  RevisionsQuery,
  MainUuidQuery,
  UserByUsernameQuery,
} from './graphql-types/operations'

// some helpers for our codegen types

export type MainUuidType = NonNullable<MainUuidQuery['uuid']>

export type User = Extract<
  UserByUsernameQuery['user']['userByUsername'],
  { username: any }
>

export type Revisions = Extract<RevisionsQuery['uuid'], { revisions: any }>

export type Revision = Revisions['revisions']['nodes'][number]
