/* eslint-disable */
/* THIS FILE IS GENERATED – run `yarn codegen` to update */
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/esm/types.js';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
}

export interface AbstractEntity {
  alias: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  subject?: Maybe<Subject>;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractEntityEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface AbstractEntityConnection {
  __typename?: 'AbstractEntityConnection';
  edges: Array<AbstractEntityCursor>;
  nodes: Array<AbstractEntity>;
  pageInfo: HasNextPageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface AbstractEntityCursor {
  __typename?: 'AbstractEntityCursor';
  cursor: Scalars['String']['output'];
  node: AbstractEntity;
}

export interface AbstractEntityRevision {
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractEntityRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface AbstractExercise {
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<AbstractExerciseRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  solution?: Maybe<Solution>;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractExerciseEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface AbstractExerciseRevision {
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractExerciseRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface AbstractNavigationChild {
  navigation?: Maybe<Navigation>;
}

export interface AbstractNotificationEvent {
  actor: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
}

export interface AbstractNotificationEventConnection {
  __typename?: 'AbstractNotificationEventConnection';
  edges: Array<AbstractNotificationEventEdge>;
  nodes: Array<AbstractNotificationEvent>;
  pageInfo: HasNextPageInfo;
}

export interface AbstractNotificationEventEdge {
  __typename?: 'AbstractNotificationEventEdge';
  cursor: Scalars['String']['output'];
  node: AbstractNotificationEvent;
}

export interface AbstractRepository {
  alias: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractRepositoryEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface AbstractRepositoryThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AbstractRevision {
  alias: Scalars['String']['output'];
  author: User;
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface AbstractRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AbstractTaxonomyTermChild {
  alias: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  taxonomyTerms: TaxonomyTermConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractTaxonomyTermChildEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface AbstractTaxonomyTermChildTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface AbstractUuid {
  alias: Scalars['String']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractUuidEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface AbstractUuidConnection {
  __typename?: 'AbstractUuidConnection';
  edges: Array<AbstractUuidCursor>;
  nodes: Array<AbstractUuid>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface AbstractUuidCursor {
  __typename?: 'AbstractUuidCursor';
  cursor: Scalars['String']['output'];
  node: AbstractUuid;
}

export interface AddRevisionResponse {
  __typename?: 'AddRevisionResponse';
  query: Query;
  revisionId?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
}

export interface AliasInput {
  instance: Instance;
  path: Scalars['String']['input'];
}

export interface AllThreadsConnection {
  __typename?: 'AllThreadsConnection';
  edges: Array<ThreadsCursor>;
  nodes: Array<Thread>;
  pageInfo: HasNextPageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface Applet extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Applet';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<AppletRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: AppletRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AppletEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface AppletRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface AppletTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface AppletThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AppletRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'AppletRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  repository: Applet;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
}


export interface AppletRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface AppletRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AppletRevisionConnection {
  __typename?: 'AppletRevisionConnection';
  edges: Array<AppletRevisionCursor>;
  nodes: Array<AppletRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface AppletRevisionCursor {
  __typename?: 'AppletRevisionCursor';
  cursor: Scalars['String']['output'];
  node: AppletRevision;
}

export interface Article extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Article';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<ArticleRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: ArticleRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ArticleEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ArticleRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface ArticleTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ArticleThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ArticleRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'ArticleRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  repository: Article;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ArticleRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ArticleRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ArticleRevisionConnection {
  __typename?: 'ArticleRevisionConnection';
  edges: Array<ArticleRevisionCursor>;
  nodes: Array<ArticleRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ArticleRevisionCursor {
  __typename?: 'ArticleRevisionCursor';
  cursor: Scalars['String']['output'];
  node: ArticleRevision;
}

export interface CacheRemoveInput {
  keys: Array<Scalars['String']['input']>;
}

export interface CacheRemoveResponse {
  __typename?: 'CacheRemoveResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface CacheSetInput {
  key: Scalars['String']['input'];
  value: Scalars['JSON']['input'];
}

export interface CacheSetResponse {
  __typename?: 'CacheSetResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface CacheUpdateInput {
  keys: Array<Scalars['String']['input']>;
}

export interface CacheUpdateResponse {
  __typename?: 'CacheUpdateResponse';
  success: Scalars['Boolean']['output'];
}

export interface CheckoutRevisionInput {
  reason: Scalars['String']['input'];
  revisionId: Scalars['Int']['input'];
}

export interface CheckoutRevisionNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CheckoutRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  reason: Scalars['String']['output'];
  repository: AbstractRepository;
  revision: AbstractRevision;
}

export interface CheckoutRevisionResponse {
  __typename?: 'CheckoutRevisionResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface Comment extends AbstractUuid {
  __typename?: 'Comment';
  alias: Scalars['String']['output'];
  archived: Scalars['Boolean']['output'];
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  legacyObject: AbstractUuid;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface CommentEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface CommentConnection {
  __typename?: 'CommentConnection';
  edges: Array<CommentEdge>;
  nodes: Array<Comment>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface CommentEdge {
  __typename?: 'CommentEdge';
  cursor: Scalars['String']['output'];
  node: Comment;
}

export interface Course extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Course';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<CourseRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  pages: Array<CoursePage>;
  revisions: CourseRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface CourseEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface CoursePagesArgs {
  hasCurrentRevision?: InputMaybe<Scalars['Boolean']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface CourseRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface CourseTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface CourseThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface CoursePage extends AbstractEntity, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'CoursePage';
  alias: Scalars['String']['output'];
  course: Course;
  currentRevision?: Maybe<CoursePageRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: CoursePageRevisionConnection;
  subject?: Maybe<Subject>;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface CoursePageEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface CoursePageRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface CoursePageThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface CoursePageRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'CoursePageRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  repository: CoursePage;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface CoursePageRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface CoursePageRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface CoursePageRevisionConnection {
  __typename?: 'CoursePageRevisionConnection';
  edges: Array<CoursePageRevisionCursor>;
  nodes: Array<CoursePageRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface CoursePageRevisionCursor {
  __typename?: 'CoursePageRevisionCursor';
  cursor: Scalars['String']['output'];
  node: CoursePageRevision;
}

export interface CourseRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'CourseRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  metaDescription: Scalars['String']['output'];
  repository: Course;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface CourseRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface CourseRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface CourseRevisionConnection {
  __typename?: 'CourseRevisionConnection';
  edges: Array<CourseRevisionCursor>;
  nodes: Array<CourseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface CourseRevisionCursor {
  __typename?: 'CourseRevisionCursor';
  cursor: Scalars['String']['output'];
  node: CourseRevision;
}

export interface CreateCommentNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateCommentNotificationEvent';
  actor: User;
  comment: Comment;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  thread: Thread;
}

export interface CreateEntityLinkNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateEntityLinkNotificationEvent';
  actor: User;
  child: AbstractEntity;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  parent: AbstractEntity;
}

export interface CreateEntityNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateEntityNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  entity: AbstractEntity;
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
}

export interface CreateEntityRevisionNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateEntityRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  entity: AbstractRepository;
  entityRevision: AbstractRevision;
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
}

export interface CreatePageInput {
  content: Scalars['String']['input'];
  discussionsEnabled: Scalars['Boolean']['input'];
  forumId?: InputMaybe<Scalars['Int']['input']>;
  instance: Instance;
  licenseId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}

export interface CreateTaxonomyLinkNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateTaxonomyLinkNotificationEvent';
  actor: User;
  child: AbstractUuid;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  parent: TaxonomyTerm;
}

export interface CreateTaxonomyTermNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateTaxonomyTermNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  taxonomyTerm: TaxonomyTerm;
}

export interface CreateThreadNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateThreadNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  object: AbstractUuid;
  objectId: Scalars['Int']['output'];
  thread: Thread;
}

export interface DeletedEntitiesConnection {
  __typename?: 'DeletedEntitiesConnection';
  edges: Array<DeletedEntityCursor>;
  nodes: Array<DeletedEntity>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface DeletedEntity {
  __typename?: 'DeletedEntity';
  dateOfDeletion?: Maybe<Scalars['String']['output']>;
  entity?: Maybe<AbstractEntity>;
}

export interface DeletedEntityCursor {
  __typename?: 'DeletedEntityCursor';
  cursor: Scalars['String']['output'];
  node: DeletedEntity;
}

export interface EntityMetadataConnection {
  __typename?: 'EntityMetadataConnection';
  edges: Array<EntityMetadataCursor>;
  nodes: Array<Scalars['JSONObject']['output']>;
  pageInfo: HasNextPageInfo;
}

export interface EntityMetadataCursor {
  __typename?: 'EntityMetadataCursor';
  cursor: Scalars['String']['output'];
  node: Scalars['JSONObject']['output'];
}

export interface EntityMutation {
  __typename?: 'EntityMutation';
  checkoutRevision: CheckoutRevisionResponse;
  rejectRevision: RejectRevisionResponse;
  setApplet: SetEntityResponse;
  setArticle: SetEntityResponse;
  setCourse: SetEntityResponse;
  setCoursePage: SetEntityResponse;
  setEvent: SetEntityResponse;
  setExercise: SetEntityResponse;
  setExerciseGroup: SetEntityResponse;
  setGroupedExercise: SetEntityResponse;
  setSolution: SetEntityResponse;
  setVideo: SetEntityResponse;
  sort: EntitySortResponse;
  updateLicense: EntityUpdateLicenseResponse;
}


export interface EntityMutationCheckoutRevisionArgs {
  input: CheckoutRevisionInput;
}


export interface EntityMutationRejectRevisionArgs {
  input: RejectRevisionInput;
}


export interface EntityMutationSetAppletArgs {
  input: SetAppletInput;
}


export interface EntityMutationSetArticleArgs {
  input: SetArticleInput;
}


export interface EntityMutationSetCourseArgs {
  input: SetCourseInput;
}


export interface EntityMutationSetCoursePageArgs {
  input: SetCoursePageInput;
}


export interface EntityMutationSetEventArgs {
  input: SetEventInput;
}


export interface EntityMutationSetExerciseArgs {
  input: SetGenericEntityInput;
}


export interface EntityMutationSetExerciseGroupArgs {
  input: SetExerciseGroupInput;
}


export interface EntityMutationSetGroupedExerciseArgs {
  input: SetGenericEntityInput;
}


export interface EntityMutationSetSolutionArgs {
  input: SetGenericEntityInput;
}


export interface EntityMutationSetVideoArgs {
  input: SetVideoInput;
}


export interface EntityMutationSortArgs {
  input: EntitySortInput;
}


export interface EntityMutationUpdateLicenseArgs {
  input: EntityUpdateLicenseInput;
}

export interface EntityQuery {
  __typename?: 'EntityQuery';
  deletedEntities: DeletedEntitiesConnection;
}


export interface EntityQueryDeletedEntitiesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
}

export interface EntitySortInput {
  childrenIds: Array<Scalars['Int']['input']>;
  entityId: Scalars['Int']['input'];
}

export interface EntitySortResponse {
  __typename?: 'EntitySortResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface EntityUpdateLicenseInput {
  entityId: Scalars['Int']['input'];
  licenseId: Scalars['Int']['input'];
}

export interface EntityUpdateLicenseResponse {
  __typename?: 'EntityUpdateLicenseResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface Event extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Event';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<EventRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: EventRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface EventEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface EventRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface EventTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface EventThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface EventRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'EventRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  repository: Event;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface EventRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface EventRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface EventRevisionConnection {
  __typename?: 'EventRevisionConnection';
  edges: Array<EventRevisionCursor>;
  nodes: Array<EventRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface EventRevisionCursor {
  __typename?: 'EventRevisionCursor';
  cursor: Scalars['String']['output'];
  node: EventRevision;
}

export interface Exercise extends AbstractEntity, AbstractExercise, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Exercise';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<ExerciseRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: ExerciseRevisionConnection;
  solution?: Maybe<Solution>;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ExerciseEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ExerciseRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface ExerciseTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ExerciseThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ExerciseGroup extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'ExerciseGroup';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<ExerciseGroupRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  exercises: Array<GroupedExercise>;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: ExerciseGroupRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ExerciseGroupEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ExerciseGroupRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface ExerciseGroupTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ExerciseGroupThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ExerciseGroupRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'ExerciseGroupRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  cohesive: Scalars['Boolean']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  repository: ExerciseGroup;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ExerciseGroupRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ExerciseGroupRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ExerciseGroupRevisionConnection {
  __typename?: 'ExerciseGroupRevisionConnection';
  edges: Array<ExerciseGroupRevisionCursor>;
  nodes: Array<ExerciseGroupRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ExerciseGroupRevisionCursor {
  __typename?: 'ExerciseGroupRevisionCursor';
  cursor: Scalars['String']['output'];
  node: ExerciseGroupRevision;
}

export interface ExerciseRevision extends AbstractEntityRevision, AbstractExerciseRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'ExerciseRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  repository: Exercise;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ExerciseRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface ExerciseRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ExerciseRevisionConnection {
  __typename?: 'ExerciseRevisionConnection';
  edges: Array<ExerciseRevisionCursor>;
  nodes: Array<ExerciseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ExerciseRevisionCursor {
  __typename?: 'ExerciseRevisionCursor';
  cursor: Scalars['String']['output'];
  node: ExerciseRevision;
}

export interface GroupedExercise extends AbstractEntity, AbstractExercise, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'GroupedExercise';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<GroupedExerciseRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  exerciseGroup: ExerciseGroup;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: GroupedExerciseRevisionConnection;
  solution?: Maybe<Solution>;
  subject?: Maybe<Subject>;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface GroupedExerciseEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface GroupedExerciseRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface GroupedExerciseThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface GroupedExerciseRevision extends AbstractEntityRevision, AbstractExerciseRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'GroupedExerciseRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  repository: GroupedExercise;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface GroupedExerciseRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface GroupedExerciseRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface GroupedExerciseRevisionConnection {
  __typename?: 'GroupedExerciseRevisionConnection';
  edges: Array<GroupedExerciseRevisionCursor>;
  nodes: Array<GroupedExerciseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface GroupedExerciseRevisionCursor {
  __typename?: 'GroupedExerciseRevisionCursor';
  cursor: Scalars['String']['output'];
  node: GroupedExerciseRevision;
}

export interface HasNextPageInfo {
  __typename?: 'HasNextPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
}

export enum Instance {
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Hi = 'hi',
  Ta = 'ta'
}

export interface InstanceAware {
  instance: Instance;
}

export interface License {
  __typename?: 'License';
  agreement: Scalars['String']['output'];
  content: Scalars['String']['output'];
  default: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  shortTitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
}

export interface LicenseQuery {
  __typename?: 'LicenseQuery';
  defaultLicense: License;
  license?: Maybe<License>;
  licenses: Array<License>;
}


export interface LicenseQueryDefaultLicenseArgs {
  instance: Instance;
}


export interface LicenseQueryLicenseArgs {
  id: Scalars['Int']['input'];
}


export interface LicenseQueryLicensesArgs {
  instance?: InputMaybe<Instance>;
}

export interface MediaQuery {
  __typename?: 'MediaQuery';
  newUpload: MediaUpload;
}


export interface MediaQueryNewUploadArgs {
  mediaType: MediaType;
}

export enum MediaType {
  ImageGif = 'IMAGE_GIF',
  ImageJpeg = 'IMAGE_JPEG',
  ImagePng = 'IMAGE_PNG',
  ImageSvgXml = 'IMAGE_SVG_XML',
  ImageWebp = 'IMAGE_WEBP'
}

export interface MediaUpload {
  __typename?: 'MediaUpload';
  uploadUrl: Scalars['String']['output'];
  urlAfterUpload: Scalars['String']['output'];
}

export interface MetadataQuery {
  __typename?: 'MetadataQuery';
  /** @deprecated Please use the `resources` field instead. This property will be deleted. */
  entities: EntityMetadataConnection;
  publisher: Scalars['JSONObject']['output'];
  resources: EntityMetadataConnection;
  version: Scalars['String']['output'];
}


export interface MetadataQueryEntitiesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  modifiedAfter?: InputMaybe<Scalars['String']['input']>;
}


export interface MetadataQueryResourcesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  modifiedAfter?: InputMaybe<Scalars['String']['input']>;
}

export interface Mutation {
  __typename?: 'Mutation';
  _cache: _CacheMutation;
  entity: EntityMutation;
  notification: NotificationMutation;
  oauth: OauthMutation;
  page: PageMutation;
  subscription: SubscriptionMutation;
  taxonomyTerm: TaxonomyTermMutation;
  thread: ThreadMutation;
  user: UserMutation;
  uuid: UuidMutation;
}

export interface Navigation {
  __typename?: 'Navigation';
  path: NavigationNodeConnection;
}


export interface NavigationPathArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface NavigationNode {
  __typename?: 'NavigationNode';
  id?: Maybe<Scalars['Int']['output']>;
  label: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
}

export interface NavigationNodeConnection {
  __typename?: 'NavigationNodeConnection';
  edges?: Maybe<Array<Maybe<NavigationNodeEdge>>>;
  nodes: Array<NavigationNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface NavigationNodeEdge {
  __typename?: 'NavigationNodeEdge';
  cursor: Scalars['String']['output'];
  node: NavigationNode;
}

export interface Notification {
  __typename?: 'Notification';
  email: Scalars['Boolean']['output'];
  emailSent: Scalars['Boolean']['output'];
  event: AbstractNotificationEvent;
  id: Scalars['Int']['output'];
  unread: Scalars['Boolean']['output'];
}

export interface NotificationConnection {
  __typename?: 'NotificationConnection';
  edges: Array<NotificationEdge>;
  nodes: Array<Notification>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface NotificationEdge {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String']['output'];
  node: Notification;
}

export interface NotificationMutation {
  __typename?: 'NotificationMutation';
  setState?: Maybe<NotificationSetStateResponse>;
}


export interface NotificationMutationSetStateArgs {
  input: NotificationSetStateInput;
}

export interface NotificationSetStateInput {
  id: Array<Scalars['Int']['input']>;
  unread: Scalars['Boolean']['input'];
}

export interface NotificationSetStateResponse {
  __typename?: 'NotificationSetStateResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface OauthAcceptInput {
  challenge: Scalars['String']['input'];
  session: Scalars['JSON']['input'];
}

export interface OauthAcceptResponse {
  __typename?: 'OauthAcceptResponse';
  redirectUri: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
}

export interface OauthMutation {
  __typename?: 'OauthMutation';
  acceptConsent: OauthAcceptResponse;
  acceptLogin: OauthAcceptResponse;
  acceptLogout: OauthAcceptResponse;
}


export interface OauthMutationAcceptConsentArgs {
  input: OauthAcceptInput;
}


export interface OauthMutationAcceptLoginArgs {
  input: OauthAcceptInput;
}


export interface OauthMutationAcceptLogoutArgs {
  challenge: Scalars['String']['input'];
}

export interface Page extends AbstractNavigationChild, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Page';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<PageRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  navigation?: Maybe<Navigation>;
  revisions: PageRevisionConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface PageEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface PageRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface PageThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface PageAddRevisionInput {
  content: Scalars['String']['input'];
  pageId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}

export interface PageCreateResponse {
  __typename?: 'PageCreateResponse';
  query: Query;
  record?: Maybe<Page>;
  success: Scalars['Boolean']['output'];
}

export interface PageInfo {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
}

export interface PageMutation {
  __typename?: 'PageMutation';
  addRevision: AddRevisionResponse;
  checkoutRevision: CheckoutRevisionResponse;
  create: PageCreateResponse;
  rejectRevision: RejectRevisionResponse;
}


export interface PageMutationAddRevisionArgs {
  input: PageAddRevisionInput;
}


export interface PageMutationCheckoutRevisionArgs {
  input: CheckoutRevisionInput;
}


export interface PageMutationCreateArgs {
  input: CreatePageInput;
}


export interface PageMutationRejectRevisionArgs {
  input: RejectRevisionInput;
}

export interface PageQuery {
  __typename?: 'PageQuery';
  pages: Array<Page>;
}


export interface PageQueryPagesArgs {
  instance?: InputMaybe<Instance>;
}

export interface PageRevision extends AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'PageRevision';
  alias: Scalars['String']['output'];
  author: User;
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  repository: Page;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface PageRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface PageRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface PageRevisionConnection {
  __typename?: 'PageRevisionConnection';
  edges: Array<PageRevisionCursor>;
  nodes: Array<PageRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface PageRevisionCursor {
  __typename?: 'PageRevisionCursor';
  cursor: Scalars['String']['output'];
  node: PageRevision;
}

export interface Query {
  __typename?: 'Query';
  activeAuthors: UserConnection;
  activeDonors: UserConnection;
  activeReviewers: UserConnection;
  authorization: Scalars['JSON']['output'];
  entity?: Maybe<EntityQuery>;
  events: AbstractNotificationEventConnection;
  license: LicenseQuery;
  media: MediaQuery;
  metadata: MetadataQuery;
  notificationEvent?: Maybe<AbstractNotificationEvent>;
  notifications: NotificationConnection;
  page: PageQuery;
  subject: SubjectQuery;
  subscription: SubscriptionQuery;
  thread: ThreadQuery;
  user: UserQuery;
  uuid?: Maybe<AbstractUuid>;
  version: Scalars['String']['output'];
}


export interface QueryActiveAuthorsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface QueryActiveDonorsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface QueryActiveReviewersArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface QueryEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
  objectId?: InputMaybe<Scalars['Int']['input']>;
}


export interface QueryNotificationEventArgs {
  id: Scalars['Int']['input'];
}


export interface QueryNotificationsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['Boolean']['input']>;
  emailSent?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unread?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}


export interface QueryUuidArgs {
  alias?: InputMaybe<AliasInput>;
  id?: InputMaybe<Scalars['Int']['input']>;
}

export interface RejectRevisionInput {
  reason: Scalars['String']['input'];
  revisionId: Scalars['Int']['input'];
}

export interface RejectRevisionNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'RejectRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  reason: Scalars['String']['output'];
  repository: AbstractRepository;
  revision: AbstractRevision;
}

export interface RejectRevisionResponse {
  __typename?: 'RejectRevisionResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface RemoveEntityLinkNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'RemoveEntityLinkNotificationEvent';
  actor: User;
  child: AbstractEntity;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  parent: AbstractEntity;
}

export interface RemoveTaxonomyLinkNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'RemoveTaxonomyLinkNotificationEvent';
  actor: User;
  child: AbstractUuid;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  parent: TaxonomyTerm;
}

export enum Role {
  Admin = 'admin',
  Architect = 'architect',
  Guest = 'guest',
  Login = 'login',
  Moderator = 'moderator',
  Reviewer = 'reviewer',
  StaticPagesBuilder = 'static_pages_builder',
  Sysadmin = 'sysadmin'
}

export enum Scope {
  Serlo = 'Serlo',
  SerloDe = 'Serlo_De',
  SerloEn = 'Serlo_En',
  SerloEs = 'Serlo_Es',
  SerloFr = 'Serlo_Fr',
  SerloHi = 'Serlo_Hi',
  SerloTa = 'Serlo_Ta'
}

export interface ScopedRole {
  __typename?: 'ScopedRole';
  role: Role;
  scope?: Maybe<Scalars['String']['output']>;
}

export interface ScopedRoleConnection {
  __typename?: 'ScopedRoleConnection';
  edges: Array<ScopedRoleCursor>;
  nodes: Array<ScopedRole>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ScopedRoleCursor {
  __typename?: 'ScopedRoleCursor';
  cursor: Scalars['String']['output'];
  node: ScopedRole;
}

export interface SetAppletInput {
  changes: Scalars['String']['input'];
  content: Scalars['String']['input'];
  entityId?: InputMaybe<Scalars['Int']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
}

export interface SetArticleInput {
  changes: Scalars['String']['input'];
  content: Scalars['String']['input'];
  entityId?: InputMaybe<Scalars['Int']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
}

export interface SetCourseInput {
  changes: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  entityId?: InputMaybe<Scalars['Int']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
}

export interface SetCoursePageInput {
  changes: Scalars['String']['input'];
  content: Scalars['String']['input'];
  entityId?: InputMaybe<Scalars['Int']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
}

export interface SetEntityResponse {
  __typename?: 'SetEntityResponse';
  query: Query;
  record?: Maybe<AbstractEntity>;
  success: Scalars['Boolean']['output'];
}

export interface SetEventInput {
  changes: Scalars['String']['input'];
  content: Scalars['String']['input'];
  entityId?: InputMaybe<Scalars['Int']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
}

export interface SetExerciseGroupInput {
  changes: Scalars['String']['input'];
  cohesive: Scalars['Boolean']['input'];
  content: Scalars['String']['input'];
  entityId?: InputMaybe<Scalars['Int']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
}

export interface SetGenericEntityInput {
  changes: Scalars['String']['input'];
  content: Scalars['String']['input'];
  entityId?: InputMaybe<Scalars['Int']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
}

export interface SetLicenseNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetLicenseNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  repository: AbstractRepository;
}

export interface SetTaxonomyParentNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetTaxonomyParentNotificationEvent';
  actor: User;
  child: TaxonomyTerm;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  parent?: Maybe<TaxonomyTerm>;
  previousParent?: Maybe<TaxonomyTerm>;
}

export interface SetTaxonomyTermNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetTaxonomyTermNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  taxonomyTerm: TaxonomyTerm;
}

export interface SetThreadStateNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetThreadStateNotificationEvent';
  actor: User;
  archived: Scalars['Boolean']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  objectId: Scalars['Int']['output'];
  thread: Thread;
}

export interface SetUuidStateNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetUuidStateNotificationEvent';
  actor: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  object: AbstractUuid;
  objectId: Scalars['Int']['output'];
  trashed: Scalars['Boolean']['output'];
}

export interface SetVideoInput {
  changes: Scalars['String']['input'];
  content: Scalars['String']['input'];
  entityId?: InputMaybe<Scalars['Int']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
}

export interface Solution extends AbstractEntity, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Solution';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<SolutionRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  exercise: AbstractExercise;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: SolutionRevisionConnection;
  subject?: Maybe<Subject>;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface SolutionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface SolutionRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface SolutionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface SolutionRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'SolutionRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  repository: Solution;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface SolutionRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface SolutionRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface SolutionRevisionConnection {
  __typename?: 'SolutionRevisionConnection';
  edges: Array<SolutionRevisionCursor>;
  nodes: Array<SolutionRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface SolutionRevisionCursor {
  __typename?: 'SolutionRevisionCursor';
  cursor: Scalars['String']['output'];
  node: SolutionRevision;
}

export interface Subject {
  __typename?: 'Subject';
  id: Scalars['String']['output'];
  taxonomyTerm: TaxonomyTerm;
  unrevisedEntities: AbstractEntityConnection;
}


export interface SubjectUnrevisedEntitiesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface SubjectQuery {
  __typename?: 'SubjectQuery';
  subject?: Maybe<Subject>;
  subjects: Array<Subject>;
}


export interface SubjectQuerySubjectArgs {
  id: Scalars['String']['input'];
}


export interface SubjectQuerySubjectsArgs {
  instance: Instance;
}

export interface SubscriptionConnection {
  __typename?: 'SubscriptionConnection';
  edges: Array<SubscriptionCursor>;
  nodes: Array<SubscriptionInfo>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface SubscriptionCursor {
  __typename?: 'SubscriptionCursor';
  cursor: Scalars['String']['output'];
  node: SubscriptionInfo;
}

export interface SubscriptionInfo {
  __typename?: 'SubscriptionInfo';
  object: AbstractUuid;
  sendEmail: Scalars['Boolean']['output'];
}

export interface SubscriptionMutation {
  __typename?: 'SubscriptionMutation';
  set?: Maybe<SubscriptionSetResponse>;
}


export interface SubscriptionMutationSetArgs {
  input: SubscriptionSetInput;
}

export interface SubscriptionQuery {
  __typename?: 'SubscriptionQuery';
  currentUserHasSubscribed: Scalars['Boolean']['output'];
  getSubscriptions: SubscriptionConnection;
}


export interface SubscriptionQueryCurrentUserHasSubscribedArgs {
  id: Scalars['Int']['input'];
}


export interface SubscriptionQueryGetSubscriptionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface SubscriptionSetInput {
  id: Array<Scalars['Int']['input']>;
  sendEmail: Scalars['Boolean']['input'];
  subscribe: Scalars['Boolean']['input'];
}

export interface SubscriptionSetResponse {
  __typename?: 'SubscriptionSetResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface TaxonomyEntityLinksInput {
  entityIds: Array<Scalars['Int']['input']>;
  taxonomyTermId: Scalars['Int']['input'];
}

export interface TaxonomyEntityLinksResponse {
  __typename?: 'TaxonomyEntityLinksResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface TaxonomyTerm extends AbstractNavigationChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'TaxonomyTerm';
  alias: Scalars['String']['output'];
  children: AbstractUuidConnection;
  description?: Maybe<Scalars['String']['output']>;
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  name: Scalars['String']['output'];
  navigation?: Maybe<Navigation>;
  parent?: Maybe<TaxonomyTerm>;
  taxonomyId: Scalars['Int']['output'];
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  type: TaxonomyTermType;
  weight: Scalars['Int']['output'];
}


export interface TaxonomyTermChildrenArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface TaxonomyTermEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface TaxonomyTermThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface TaxonomyTermConnection {
  __typename?: 'TaxonomyTermConnection';
  edges?: Maybe<Array<Maybe<TaxonomyTermEdge>>>;
  nodes: Array<TaxonomyTerm>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface TaxonomyTermCreateInput {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId: Scalars['Int']['input'];
  taxonomyType: TaxonomyTypeCreateOptions;
}

export interface TaxonomyTermCreateResponse {
  __typename?: 'TaxonomyTermCreateResponse';
  query: Query;
  record?: Maybe<TaxonomyTerm>;
  success: Scalars['Boolean']['output'];
}

export interface TaxonomyTermEdge {
  __typename?: 'TaxonomyTermEdge';
  cursor: Scalars['String']['output'];
  node: TaxonomyTerm;
}

export interface TaxonomyTermMutation {
  __typename?: 'TaxonomyTermMutation';
  create: TaxonomyTermCreateResponse;
  createEntityLinks: TaxonomyEntityLinksResponse;
  deleteEntityLinks: TaxonomyEntityLinksResponse;
  setNameAndDescription: TaxonomyTermSetNameAndDescriptionResponse;
  sort: TaxonomyTermSortResponse;
}


export interface TaxonomyTermMutationCreateArgs {
  input: TaxonomyTermCreateInput;
}


export interface TaxonomyTermMutationCreateEntityLinksArgs {
  input: TaxonomyEntityLinksInput;
}


export interface TaxonomyTermMutationDeleteEntityLinksArgs {
  input: TaxonomyEntityLinksInput;
}


export interface TaxonomyTermMutationSetNameAndDescriptionArgs {
  input: TaxonomyTermSetNameAndDescriptionInput;
}


export interface TaxonomyTermMutationSortArgs {
  input: TaxonomyTermSortInput;
}

export interface TaxonomyTermSetNameAndDescriptionInput {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
}

export interface TaxonomyTermSetNameAndDescriptionResponse {
  __typename?: 'TaxonomyTermSetNameAndDescriptionResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface TaxonomyTermSortInput {
  childrenIds: Array<Scalars['Int']['input']>;
  taxonomyTermId: Scalars['Int']['input'];
}

export interface TaxonomyTermSortResponse {
  __typename?: 'TaxonomyTermSortResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export enum TaxonomyTermType {
  ExerciseFolder = 'exerciseFolder',
  Root = 'root',
  Subject = 'subject',
  Topic = 'topic'
}

export enum TaxonomyTypeCreateOptions {
  ExerciseFolder = 'exerciseFolder',
  Topic = 'topic'
}

export interface Thread {
  __typename?: 'Thread';
  archived: Scalars['Boolean']['output'];
  comments: CommentConnection;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  object: AbstractUuid;
  title?: Maybe<Scalars['String']['output']>;
  trashed: Scalars['Boolean']['output'];
}


export interface ThreadCommentsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface ThreadAware {
  threads: ThreadsConnection;
}


export interface ThreadAwareThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ThreadCreateCommentInput {
  content: Scalars['String']['input'];
  sendEmail: Scalars['Boolean']['input'];
  subscribe: Scalars['Boolean']['input'];
  threadId: Scalars['String']['input'];
}

export interface ThreadCreateCommentResponse {
  __typename?: 'ThreadCreateCommentResponse';
  query: Query;
  record?: Maybe<Comment>;
  success: Scalars['Boolean']['output'];
}

export interface ThreadCreateThreadInput {
  content: Scalars['String']['input'];
  objectId: Scalars['Int']['input'];
  sendEmail: Scalars['Boolean']['input'];
  subscribe: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
}

export interface ThreadCreateThreadResponse {
  __typename?: 'ThreadCreateThreadResponse';
  query: Query;
  record?: Maybe<Thread>;
  success: Scalars['Boolean']['output'];
}

export interface ThreadEditCommentInput {
  commentId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}

export interface ThreadEditCommentResponse {
  __typename?: 'ThreadEditCommentResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface ThreadMutation {
  __typename?: 'ThreadMutation';
  createComment?: Maybe<ThreadCreateCommentResponse>;
  createThread?: Maybe<ThreadCreateThreadResponse>;
  editComment?: Maybe<ThreadEditCommentResponse>;
  setCommentState?: Maybe<ThreadSetCommentStateResponse>;
  setThreadArchived?: Maybe<ThreadSetThreadArchivedResponse>;
  setThreadState?: Maybe<ThreadSetThreadStateResponse>;
}


export interface ThreadMutationCreateCommentArgs {
  input: ThreadCreateCommentInput;
}


export interface ThreadMutationCreateThreadArgs {
  input: ThreadCreateThreadInput;
}


export interface ThreadMutationEditCommentArgs {
  input: ThreadEditCommentInput;
}


export interface ThreadMutationSetCommentStateArgs {
  input: ThreadSetCommentStateInput;
}


export interface ThreadMutationSetThreadArchivedArgs {
  input: ThreadSetThreadArchivedInput;
}


export interface ThreadMutationSetThreadStateArgs {
  input: ThreadSetThreadStateInput;
}

export interface ThreadQuery {
  __typename?: 'ThreadQuery';
  allThreads: AllThreadsConnection;
}


export interface ThreadQueryAllThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
}

export interface ThreadSetCommentStateInput {
  id: Array<Scalars['Int']['input']>;
  trashed: Scalars['Boolean']['input'];
}

export interface ThreadSetCommentStateResponse {
  __typename?: 'ThreadSetCommentStateResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface ThreadSetThreadArchivedInput {
  archived: Scalars['Boolean']['input'];
  id: Array<Scalars['String']['input']>;
}

export interface ThreadSetThreadArchivedResponse {
  __typename?: 'ThreadSetThreadArchivedResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface ThreadSetThreadStateInput {
  id: Array<Scalars['String']['input']>;
  trashed: Scalars['Boolean']['input'];
}

export interface ThreadSetThreadStateResponse {
  __typename?: 'ThreadSetThreadStateResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface ThreadsConnection {
  __typename?: 'ThreadsConnection';
  edges: Array<ThreadsCursor>;
  nodes: Array<Thread>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ThreadsCursor {
  __typename?: 'ThreadsCursor';
  cursor: Scalars['String']['output'];
  node: Thread;
}

export interface User extends AbstractUuid, ThreadAware {
  __typename?: 'User';
  activityByType: UserActivityByType;
  alias: Scalars['String']['output'];
  chatUrl?: Maybe<Scalars['String']['output']>;
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  events: AbstractNotificationEventConnection;
  eventsByUser: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  isActiveAuthor: Scalars['Boolean']['output'];
  isActiveDonor: Scalars['Boolean']['output'];
  isActiveReviewer: Scalars['Boolean']['output'];
  isNewAuthor: Scalars['Boolean']['output'];
  language?: Maybe<Instance>;
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  motivation?: Maybe<Scalars['String']['output']>;
  roles: ScopedRoleConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  unrevisedEntities: AbstractEntityConnection;
  username: Scalars['String']['output'];
}


export interface UserEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface UserEventsByUserArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
  objectId?: InputMaybe<Scalars['Int']['input']>;
}


export interface UserRolesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface UserThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface UserUnrevisedEntitiesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface UserActivityByType {
  __typename?: 'UserActivityByType';
  comments: Scalars['Int']['output'];
  edits: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
  taxonomy: Scalars['Int']['output'];
}

export interface UserConnection {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  nodes: Array<User>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface UserDeleteBotsInput {
  botIds: Array<Scalars['Int']['input']>;
}

export interface UserDeleteBotsResponse {
  __typename?: 'UserDeleteBotsResponse';
  success: Scalars['Boolean']['output'];
}

export interface UserDeleteRegularUsersInput {
  users: Array<UserDescriptionInput>;
}

export interface UserDeleteRegularUsersResponse {
  __typename?: 'UserDeleteRegularUsersResponse';
  reason?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  username?: Maybe<Scalars['String']['output']>;
}

export interface UserDescriptionInput {
  id: Scalars['Int']['input'];
  username: Scalars['String']['input'];
}

export interface UserEdge {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
}

export interface UserMutation {
  __typename?: 'UserMutation';
  addRole: UserRoleResponse;
  deleteBots: UserDeleteBotsResponse;
  deleteRegularUsers: Array<UserDeleteRegularUsersResponse>;
  removeRole: UserRoleResponse;
  setDescription: UserSetDescriptionResponse;
  setEmail: UserSetEmailResponse;
}


export interface UserMutationAddRoleArgs {
  input: UserRoleInput;
}


export interface UserMutationDeleteBotsArgs {
  input: UserDeleteBotsInput;
}


export interface UserMutationDeleteRegularUsersArgs {
  input: UserDeleteRegularUsersInput;
}


export interface UserMutationRemoveRoleArgs {
  input: UserRoleInput;
}


export interface UserMutationSetDescriptionArgs {
  input: UserSetDescriptionInput;
}


export interface UserMutationSetEmailArgs {
  input: UserSetEmailInput;
}

export interface UserQuery {
  __typename?: 'UserQuery';
  potentialSpamUsers: UserConnection;
  usersByRole: UserWithPermissionsConnection;
}


export interface UserQueryPotentialSpamUsersArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface UserQueryUsersByRoleArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  role: Role;
}

export interface UserRoleInput {
  instance?: InputMaybe<Instance>;
  role: Role;
  username: Scalars['String']['input'];
}

export interface UserRoleResponse {
  __typename?: 'UserRoleResponse';
  success: Scalars['Boolean']['output'];
}

export interface UserSetDescriptionInput {
  description: Scalars['String']['input'];
}

export interface UserSetDescriptionResponse {
  __typename?: 'UserSetDescriptionResponse';
  success: Scalars['Boolean']['output'];
}

export interface UserSetEmailInput {
  email: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
}

export interface UserSetEmailResponse {
  __typename?: 'UserSetEmailResponse';
  email: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
}

export interface UserWithPermissionsConnection {
  __typename?: 'UserWithPermissionsConnection';
  edges: Array<UserEdge>;
  inheritance?: Maybe<Array<Role>>;
  nodes: Array<User>;
  pageInfo: PageInfo;
  permissions: Array<Scalars['String']['output']>;
  totalCount: Scalars['Int']['output'];
}

export interface UuidMutation {
  __typename?: 'UuidMutation';
  setState?: Maybe<UuidSetStateResponse>;
}


export interface UuidMutationSetStateArgs {
  input: UuidSetStateInput;
}

export interface UuidSetStateInput {
  id: Array<Scalars['Int']['input']>;
  trashed: Scalars['Boolean']['input'];
}

export interface UuidSetStateResponse {
  __typename?: 'UuidSetStateResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface Video extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Video';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<VideoRevision>;
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  instance: Instance;
  license: License;
  revisions: VideoRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface VideoEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface VideoRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface VideoTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface VideoThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface VideoRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'VideoRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int']['output'];
  repository: Video;
  threads: ThreadsConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
}


export interface VideoRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface VideoRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface VideoRevisionConnection {
  __typename?: 'VideoRevisionConnection';
  edges: Array<VideoRevisionCursor>;
  nodes: Array<VideoRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface VideoRevisionCursor {
  __typename?: 'VideoRevisionCursor';
  cursor: Scalars['String']['output'];
  node: VideoRevision;
}

export interface _CacheMutation {
  __typename?: '_cacheMutation';
  remove: CacheRemoveResponse;
  set: CacheSetResponse;
  update: CacheUpdateResponse;
}


export interface _CacheMutationRemoveArgs {
  input: CacheRemoveInput;
}


export interface _CacheMutationSetArgs {
  input: CacheSetInput;
}


export interface _CacheMutationUpdateArgs {
  input: CacheUpdateInput;
}

export type OauthLoginMutationVariables = Exact<{
  input: OauthAcceptInput;
}>;


export type OauthLoginMutation = { __typename?: 'Mutation', oauth: { __typename?: 'OauthMutation', acceptLogin: { __typename?: 'OauthAcceptResponse', redirectUri: string } } };

export type OauthConsentMutationVariables = Exact<{
  input: OauthAcceptInput;
}>;


export type OauthConsentMutation = { __typename?: 'Mutation', oauth: { __typename?: 'OauthMutation', acceptConsent: { __typename?: 'OauthAcceptResponse', redirectUri: string } } };

export type OauthLogoutMutationVariables = Exact<{
  challenge: Scalars['String']['input'];
}>;


export type OauthLogoutMutation = { __typename?: 'Mutation', oauth: { __typename?: 'OauthMutation', acceptLogout: { __typename?: 'OauthAcceptResponse', redirectUri: string } } };

export type UuidSimpleQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UuidSimpleQuery = { __typename?: 'Query', uuid?: { __typename: 'Applet', id: number, title: string } | { __typename: 'AppletRevision', id: number, title: string } | { __typename: 'Article', id: number, title: string } | { __typename: 'ArticleRevision', id: number, title: string } | { __typename: 'Comment', id: number, title: string } | { __typename: 'Course', id: number, title: string } | { __typename: 'CoursePage', id: number, title: string, course: { __typename?: 'Course', id: number } } | { __typename: 'CoursePageRevision', id: number, title: string } | { __typename: 'CourseRevision', id: number, title: string } | { __typename: 'Event', id: number, title: string } | { __typename: 'EventRevision', id: number, title: string } | { __typename: 'Exercise', id: number, title: string } | { __typename: 'ExerciseGroup', id: number, title: string } | { __typename: 'ExerciseGroupRevision', id: number, title: string } | { __typename: 'ExerciseRevision', id: number, title: string } | { __typename: 'GroupedExercise', id: number, title: string } | { __typename: 'GroupedExerciseRevision', id: number, title: string } | { __typename: 'Page', id: number, title: string } | { __typename: 'PageRevision', id: number, title: string } | { __typename: 'Solution', id: number, title: string } | { __typename: 'SolutionRevision', id: number, title: string } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, id: number, title: string } | { __typename: 'User', id: number, title: string } | { __typename: 'Video', id: number, title: string } | { __typename: 'VideoRevision', id: number, title: string } | null };

export type UnreadNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnreadNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationConnection', totalCount: number } };

export type GetEventDataQueryVariables = Exact<{
  actorId?: InputMaybe<Scalars['Int']['input']>;
  objectId?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEventDataQuery = { __typename?: 'Query', events: { __typename?: 'AbstractNotificationEventConnection', pageInfo: { __typename?: 'HasNextPageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename: 'CheckoutRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, revision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'GroupedExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'SolutionRevision', id: number } | { __typename?: 'VideoRevision', id: number }, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateCommentNotificationEvent', date: string, id: number, objectId: number, comment: { __typename?: 'Comment', id: number, content: string }, thread: { __typename?: 'Thread', id: string, title?: string | null, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityNotificationEvent', date: string, id: number, objectId: number, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityRevisionNotificationEvent', date: string, id: number, objectId: number, entityRevision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'GroupedExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'SolutionRevision', id: number } | { __typename?: 'VideoRevision', id: number }, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateThreadNotificationEvent', date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, content: string }> } }, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RejectRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, revision: { __typename?: 'AppletRevision', id: number, alias: string } | { __typename?: 'ArticleRevision', id: number, alias: string } | { __typename?: 'CoursePageRevision', id: number, alias: string } | { __typename?: 'CourseRevision', id: number, alias: string } | { __typename?: 'EventRevision', id: number, alias: string } | { __typename?: 'ExerciseGroupRevision', id: number, alias: string } | { __typename?: 'ExerciseRevision', id: number, alias: string } | { __typename?: 'GroupedExerciseRevision', id: number, alias: string } | { __typename?: 'PageRevision', id: number, alias: string } | { __typename?: 'SolutionRevision', id: number, alias: string } | { __typename?: 'VideoRevision', id: number, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RemoveEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RemoveTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetLicenseNotificationEvent', date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetTaxonomyParentNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, previousParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, optionalParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetThreadStateNotificationEvent', archived: boolean, date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetUuidStateNotificationEvent', trashed: boolean, date: string, id: number, objectId: number, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } };

export type UserRevisionQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserRevisionQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'GroupedExercise' } | { __typename?: 'GroupedExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'Solution' } | { __typename?: 'SolutionRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User', unrevisedEntities: { __typename?: 'AbstractEntityConnection', totalCount: number, nodes: Array<{ __typename: 'Applet', id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', title: string, id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Article', id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', title: string, id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Course', id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', title: string, id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string, id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Event', id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', title: string, id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Exercise', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'GroupedExercise', id: number, alias: string, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number } | null, revisions: { __typename?: 'GroupedExerciseRevisionConnection', nodes: Array<{ __typename?: 'GroupedExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Solution', id: number, alias: string, currentRevision?: { __typename?: 'SolutionRevision', id: number } | null, solutionRevisions: { __typename?: 'SolutionRevisionConnection', nodes: Array<{ __typename?: 'SolutionRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Video', id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', title: string, id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } }>, pageInfo: { __typename?: 'HasNextPageInfo', hasNextPage: boolean, endCursor?: string | null } } } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type LicenseDetailsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type LicenseDetailsQuery = { __typename?: 'Query', license: { __typename?: 'LicenseQuery', license?: { __typename?: 'License', default: boolean, title: string, content: string } | null } };

export type ArticleRevisionFragment = { __typename?: 'ArticleRevision', id: number, title: string, content: string, metaTitle: string, metaDescription: string, date: string };

export type PageRevisionFragment = { __typename?: 'PageRevision', id: number, title: string, content: string };

export type VideoRevisionFragment = { __typename?: 'VideoRevision', id: number, title: string, url: string, content: string };

export type AppletRevisionFragment = { __typename?: 'AppletRevision', id: number, title: string, content: string, url: string, metaTitle: string, metaDescription: string, date: string };

export type CoursePageRevisionFragment = { __typename?: 'CoursePageRevision', id: number, alias: string, content: string, title: string, date: string };

export type ExerciseGroupRevisionFragment = { __typename?: 'ExerciseGroupRevision', id: number, content: string, cohesive: boolean, date: string };

export type EventRevisionFragment = { __typename?: 'EventRevision', id: number, title: string, content: string };

type EventData_CheckoutRevisionNotificationEvent_Fragment = { __typename: 'CheckoutRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, revision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'GroupedExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'SolutionRevision', id: number } | { __typename?: 'VideoRevision', id: number }, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateCommentNotificationEvent_Fragment = { __typename: 'CreateCommentNotificationEvent', date: string, id: number, objectId: number, comment: { __typename?: 'Comment', id: number, content: string }, thread: { __typename?: 'Thread', id: string, title?: string | null, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityLinkNotificationEvent_Fragment = { __typename: 'CreateEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityNotificationEvent_Fragment = { __typename: 'CreateEntityNotificationEvent', date: string, id: number, objectId: number, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityRevisionNotificationEvent_Fragment = { __typename: 'CreateEntityRevisionNotificationEvent', date: string, id: number, objectId: number, entityRevision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'GroupedExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'SolutionRevision', id: number } | { __typename?: 'VideoRevision', id: number }, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateTaxonomyLinkNotificationEvent_Fragment = { __typename: 'CreateTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateTaxonomyTermNotificationEvent_Fragment = { __typename: 'CreateTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateThreadNotificationEvent_Fragment = { __typename: 'CreateThreadNotificationEvent', date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, content: string }> } }, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RejectRevisionNotificationEvent_Fragment = { __typename: 'RejectRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, revision: { __typename?: 'AppletRevision', id: number, alias: string } | { __typename?: 'ArticleRevision', id: number, alias: string } | { __typename?: 'CoursePageRevision', id: number, alias: string } | { __typename?: 'CourseRevision', id: number, alias: string } | { __typename?: 'EventRevision', id: number, alias: string } | { __typename?: 'ExerciseGroupRevision', id: number, alias: string } | { __typename?: 'ExerciseRevision', id: number, alias: string } | { __typename?: 'GroupedExerciseRevision', id: number, alias: string } | { __typename?: 'PageRevision', id: number, alias: string } | { __typename?: 'SolutionRevision', id: number, alias: string } | { __typename?: 'VideoRevision', id: number, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RemoveEntityLinkNotificationEvent_Fragment = { __typename: 'RemoveEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RemoveTaxonomyLinkNotificationEvent_Fragment = { __typename: 'RemoveTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetLicenseNotificationEvent_Fragment = { __typename: 'SetLicenseNotificationEvent', date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetTaxonomyParentNotificationEvent_Fragment = { __typename: 'SetTaxonomyParentNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, previousParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, optionalParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetTaxonomyTermNotificationEvent_Fragment = { __typename: 'SetTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetThreadStateNotificationEvent_Fragment = { __typename: 'SetThreadStateNotificationEvent', archived: boolean, date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetUuidStateNotificationEvent_Fragment = { __typename: 'SetUuidStateNotificationEvent', trashed: boolean, date: string, id: number, objectId: number, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

export type EventDataFragment = EventData_CheckoutRevisionNotificationEvent_Fragment | EventData_CreateCommentNotificationEvent_Fragment | EventData_CreateEntityLinkNotificationEvent_Fragment | EventData_CreateEntityNotificationEvent_Fragment | EventData_CreateEntityRevisionNotificationEvent_Fragment | EventData_CreateTaxonomyLinkNotificationEvent_Fragment | EventData_CreateTaxonomyTermNotificationEvent_Fragment | EventData_CreateThreadNotificationEvent_Fragment | EventData_RejectRevisionNotificationEvent_Fragment | EventData_RemoveEntityLinkNotificationEvent_Fragment | EventData_RemoveTaxonomyLinkNotificationEvent_Fragment | EventData_SetLicenseNotificationEvent_Fragment | EventData_SetTaxonomyParentNotificationEvent_Fragment | EventData_SetTaxonomyTermNotificationEvent_Fragment | EventData_SetThreadStateNotificationEvent_Fragment | EventData_SetUuidStateNotificationEvent_Fragment;

type EntityInfo_Applet_Fragment = { __typename: 'Applet', id: number, title: string, alias: string };

type EntityInfo_AppletRevision_Fragment = { __typename: 'AppletRevision', id: number, title: string, alias: string };

type EntityInfo_Article_Fragment = { __typename: 'Article', id: number, title: string, alias: string };

type EntityInfo_ArticleRevision_Fragment = { __typename: 'ArticleRevision', id: number, title: string, alias: string };

type EntityInfo_Comment_Fragment = { __typename: 'Comment', id: number, title: string, alias: string };

type EntityInfo_Course_Fragment = { __typename: 'Course', id: number, title: string, alias: string };

type EntityInfo_CoursePage_Fragment = { __typename: 'CoursePage', id: number, title: string, alias: string };

type EntityInfo_CoursePageRevision_Fragment = { __typename: 'CoursePageRevision', id: number, title: string, alias: string };

type EntityInfo_CourseRevision_Fragment = { __typename: 'CourseRevision', id: number, title: string, alias: string };

type EntityInfo_Event_Fragment = { __typename: 'Event', id: number, title: string, alias: string };

type EntityInfo_EventRevision_Fragment = { __typename: 'EventRevision', id: number, title: string, alias: string };

type EntityInfo_Exercise_Fragment = { __typename: 'Exercise', id: number, title: string, alias: string };

type EntityInfo_ExerciseGroup_Fragment = { __typename: 'ExerciseGroup', id: number, title: string, alias: string };

type EntityInfo_ExerciseGroupRevision_Fragment = { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string };

type EntityInfo_ExerciseRevision_Fragment = { __typename: 'ExerciseRevision', id: number, title: string, alias: string };

type EntityInfo_GroupedExercise_Fragment = { __typename: 'GroupedExercise', id: number, title: string, alias: string };

type EntityInfo_GroupedExerciseRevision_Fragment = { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string };

type EntityInfo_Page_Fragment = { __typename: 'Page', id: number, title: string, alias: string };

type EntityInfo_PageRevision_Fragment = { __typename: 'PageRevision', id: number, title: string, alias: string };

type EntityInfo_Solution_Fragment = { __typename: 'Solution', id: number, title: string, alias: string };

type EntityInfo_SolutionRevision_Fragment = { __typename: 'SolutionRevision', id: number, title: string, alias: string };

type EntityInfo_TaxonomyTerm_Fragment = { __typename: 'TaxonomyTerm', id: number, title: string, alias: string };

type EntityInfo_User_Fragment = { __typename: 'User', id: number, title: string, alias: string };

type EntityInfo_Video_Fragment = { __typename: 'Video', id: number, title: string, alias: string };

type EntityInfo_VideoRevision_Fragment = { __typename: 'VideoRevision', id: number, title: string, alias: string };

export type EntityInfoFragment = EntityInfo_Applet_Fragment | EntityInfo_AppletRevision_Fragment | EntityInfo_Article_Fragment | EntityInfo_ArticleRevision_Fragment | EntityInfo_Comment_Fragment | EntityInfo_Course_Fragment | EntityInfo_CoursePage_Fragment | EntityInfo_CoursePageRevision_Fragment | EntityInfo_CourseRevision_Fragment | EntityInfo_Event_Fragment | EntityInfo_EventRevision_Fragment | EntityInfo_Exercise_Fragment | EntityInfo_ExerciseGroup_Fragment | EntityInfo_ExerciseGroupRevision_Fragment | EntityInfo_ExerciseRevision_Fragment | EntityInfo_GroupedExercise_Fragment | EntityInfo_GroupedExerciseRevision_Fragment | EntityInfo_Page_Fragment | EntityInfo_PageRevision_Fragment | EntityInfo_Solution_Fragment | EntityInfo_SolutionRevision_Fragment | EntityInfo_TaxonomyTerm_Fragment | EntityInfo_User_Fragment | EntityInfo_Video_Fragment | EntityInfo_VideoRevision_Fragment;

type WithTaxonomyTerms_Applet_Fragment = { __typename?: 'Applet' };

type WithTaxonomyTerms_AppletRevision_Fragment = { __typename?: 'AppletRevision' };

type WithTaxonomyTerms_Article_Fragment = { __typename?: 'Article' };

type WithTaxonomyTerms_ArticleRevision_Fragment = { __typename?: 'ArticleRevision' };

type WithTaxonomyTerms_Comment_Fragment = { __typename?: 'Comment' };

type WithTaxonomyTerms_Course_Fragment = { __typename?: 'Course' };

type WithTaxonomyTerms_CoursePage_Fragment = { __typename?: 'CoursePage' };

type WithTaxonomyTerms_CoursePageRevision_Fragment = { __typename?: 'CoursePageRevision' };

type WithTaxonomyTerms_CourseRevision_Fragment = { __typename?: 'CourseRevision' };

type WithTaxonomyTerms_Event_Fragment = { __typename?: 'Event' };

type WithTaxonomyTerms_EventRevision_Fragment = { __typename?: 'EventRevision' };

type WithTaxonomyTerms_Exercise_Fragment = { __typename?: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } };

type WithTaxonomyTerms_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } };

type WithTaxonomyTerms_ExerciseGroupRevision_Fragment = { __typename?: 'ExerciseGroupRevision' };

type WithTaxonomyTerms_ExerciseRevision_Fragment = { __typename?: 'ExerciseRevision' };

type WithTaxonomyTerms_GroupedExercise_Fragment = { __typename?: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } };

type WithTaxonomyTerms_GroupedExerciseRevision_Fragment = { __typename?: 'GroupedExerciseRevision' };

type WithTaxonomyTerms_Page_Fragment = { __typename?: 'Page' };

type WithTaxonomyTerms_PageRevision_Fragment = { __typename?: 'PageRevision' };

type WithTaxonomyTerms_Solution_Fragment = { __typename?: 'Solution', exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } };

type WithTaxonomyTerms_SolutionRevision_Fragment = { __typename?: 'SolutionRevision' };

type WithTaxonomyTerms_TaxonomyTerm_Fragment = { __typename?: 'TaxonomyTerm' };

type WithTaxonomyTerms_User_Fragment = { __typename?: 'User' };

type WithTaxonomyTerms_Video_Fragment = { __typename?: 'Video' };

type WithTaxonomyTerms_VideoRevision_Fragment = { __typename?: 'VideoRevision' };

export type WithTaxonomyTermsFragment = WithTaxonomyTerms_Applet_Fragment | WithTaxonomyTerms_AppletRevision_Fragment | WithTaxonomyTerms_Article_Fragment | WithTaxonomyTerms_ArticleRevision_Fragment | WithTaxonomyTerms_Comment_Fragment | WithTaxonomyTerms_Course_Fragment | WithTaxonomyTerms_CoursePage_Fragment | WithTaxonomyTerms_CoursePageRevision_Fragment | WithTaxonomyTerms_CourseRevision_Fragment | WithTaxonomyTerms_Event_Fragment | WithTaxonomyTerms_EventRevision_Fragment | WithTaxonomyTerms_Exercise_Fragment | WithTaxonomyTerms_ExerciseGroup_Fragment | WithTaxonomyTerms_ExerciseGroupRevision_Fragment | WithTaxonomyTerms_ExerciseRevision_Fragment | WithTaxonomyTerms_GroupedExercise_Fragment | WithTaxonomyTerms_GroupedExerciseRevision_Fragment | WithTaxonomyTerms_Page_Fragment | WithTaxonomyTerms_PageRevision_Fragment | WithTaxonomyTerms_Solution_Fragment | WithTaxonomyTerms_SolutionRevision_Fragment | WithTaxonomyTerms_TaxonomyTerm_Fragment | WithTaxonomyTerms_User_Fragment | WithTaxonomyTerms_Video_Fragment | WithTaxonomyTerms_VideoRevision_Fragment;

type Exercise_Exercise_Fragment = { __typename?: 'Exercise', id: number, alias: string, instance: Instance, trashed: boolean, date: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type Exercise_GroupedExercise_Fragment = { __typename?: 'GroupedExercise', id: number, alias: string, instance: Instance, trashed: boolean, date: string, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

export type ExerciseFragment = Exercise_Exercise_Fragment | Exercise_GroupedExercise_Fragment;

export type SolutionFragment = { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_Applet_Fragment = { __typename?: 'Applet', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_Article_Fragment = { __typename?: 'Article', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_Course_Fragment = { __typename?: 'Course', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_CoursePage_Fragment = { __typename?: 'CoursePage', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_Event_Fragment = { __typename?: 'Event', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_Exercise_Fragment = { __typename?: 'Exercise', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_GroupedExercise_Fragment = { __typename?: 'GroupedExercise', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_Page_Fragment = { __typename?: 'Page', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_Solution_Fragment = { __typename?: 'Solution', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

type License_Video_Fragment = { __typename?: 'Video', license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } };

export type LicenseFragment = License_Applet_Fragment | License_Article_Fragment | License_Course_Fragment | License_CoursePage_Fragment | License_Event_Fragment | License_Exercise_Fragment | License_ExerciseGroup_Fragment | License_GroupedExercise_Fragment | License_Page_Fragment | License_Solution_Fragment | License_Video_Fragment;

export type PathFragment = { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } };

export type PathToRootFragment = { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null };

export type MainUuidQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  alias?: InputMaybe<AliasInput>;
}>;


export type MainUuidQuery = { __typename?: 'Query', authorization: any, uuid?: { __typename: 'Applet', instance: Instance, date: string, id: number, trashed: boolean, alias: string, currentRevision?: { __typename?: 'AppletRevision', id: number, title: string, content: string, url: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename: 'AppletRevision', id: number, trashed: boolean, alias: string } | { __typename: 'Article', instance: Instance, date: string, id: number, trashed: boolean, alias: string, currentRevision?: { __typename?: 'ArticleRevision', id: number, title: string, content: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename: 'ArticleRevision', id: number, trashed: boolean, alias: string } | { __typename: 'Comment', id: number, trashed: boolean, alias: string } | { __typename: 'Course', instance: Instance, id: number, trashed: boolean, alias: string, pages: Array<{ __typename?: 'CoursePage', alias: string, id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number, title: string, content: string } | null }>, currentRevision?: { __typename?: 'CourseRevision', title: string, content: string, metaDescription: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename: 'CoursePage', instance: Instance, date: string, id: number, trashed: boolean, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', id: number, alias: string, content: string, title: string, date: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', title: string }> }, course: { __typename?: 'Course', id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, pages: Array<{ __typename?: 'CoursePage', alias: string, id: number, currentRevision?: { __typename?: 'CoursePageRevision', title: string, trashed: boolean } | null }>, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | { __typename: 'CoursePageRevision', id: number, trashed: boolean, alias: string } | { __typename: 'CourseRevision', id: number, trashed: boolean, alias: string } | { __typename: 'Event', instance: Instance, id: number, trashed: boolean, alias: string, currentRevision?: { __typename?: 'EventRevision', id: number, title: string, content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename: 'EventRevision', id: number, trashed: boolean, alias: string } | { __typename: 'Exercise', instance: Instance, id: number, trashed: boolean, alias: string, date: string, subject?: { __typename?: 'Subject', taxonomyTerm: { __typename?: 'TaxonomyTerm', name: string } } | null, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> }, currentRevision?: { __typename?: 'ExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | null } | { __typename: 'ExerciseGroup', instance: Instance, date: string, id: number, trashed: boolean, alias: string, subject?: { __typename?: 'Subject', taxonomyTerm: { __typename?: 'TaxonomyTerm', name: string } } | null, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number, content: string, cohesive: boolean, date: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number }, exercises: Array<{ __typename?: 'GroupedExercise', id: number, alias: string, instance: Instance, trashed: boolean, date: string, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } }>, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename: 'ExerciseGroupRevision', id: number, trashed: boolean, alias: string } | { __typename: 'ExerciseRevision', id: number, trashed: boolean, alias: string } | { __typename: 'GroupedExercise', instance: Instance, id: number, trashed: boolean, alias: string, date: string, exerciseGroup: { __typename?: 'ExerciseGroup', alias: string }, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | null } | { __typename: 'GroupedExerciseRevision', id: number, trashed: boolean, alias: string } | { __typename: 'Page', instance: Instance, id: number, trashed: boolean, alias: string, currentRevision?: { __typename?: 'PageRevision', id: number, title: string, content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | { __typename: 'PageRevision', id: number, trashed: boolean, alias: string } | { __typename: 'Solution', instance: Instance, id: number, trashed: boolean, alias: string, exercise: { __typename?: 'Exercise', id: number } | { __typename?: 'GroupedExercise', id: number }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null } | { __typename: 'SolutionRevision', id: number, trashed: boolean, alias: string } | { __typename: 'TaxonomyTerm', alias: string, instance: Instance, type: TaxonomyTermType, name: string, description?: string | null, weight: number, taxonomyId: number, trashed: boolean, id: number, title: string, parent?: { __typename?: 'TaxonomyTerm', id: number, title: string, alias: string, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', trashed: boolean, alias: string, id: number, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string }> } } | { __typename: 'AppletRevision', trashed: boolean } | { __typename: 'Article', trashed: boolean, alias: string, id: number, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string }> } } | { __typename: 'ArticleRevision', trashed: boolean } | { __typename: 'Comment', trashed: boolean } | { __typename: 'Course', trashed: boolean, alias: string, id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }> } | { __typename: 'CoursePage', trashed: boolean } | { __typename: 'CoursePageRevision', trashed: boolean } | { __typename: 'CourseRevision', trashed: boolean } | { __typename: 'Event', trashed: boolean, alias: string, id: number, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string }> } } | { __typename: 'EventRevision', trashed: boolean } | { __typename: 'Exercise', trashed: boolean, id: number, alias: string, instance: Instance, date: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | { __typename: 'ExerciseGroup', id: number, alias: string, instance: Instance, trashed: boolean, currentRevision?: { __typename?: 'ExerciseGroupRevision', content: string, id: number, date: string, cohesive: boolean } | null, exercises: Array<{ __typename?: 'GroupedExercise', id: number, alias: string, instance: Instance, trashed: boolean, date: string, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } }>, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | { __typename: 'ExerciseGroupRevision', trashed: boolean } | { __typename: 'ExerciseRevision', trashed: boolean } | { __typename: 'GroupedExercise', trashed: boolean } | { __typename: 'GroupedExerciseRevision', trashed: boolean } | { __typename: 'Page', trashed: boolean } | { __typename: 'PageRevision', trashed: boolean } | { __typename: 'Solution', trashed: boolean } | { __typename: 'SolutionRevision', trashed: boolean } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, name: string, alias: string, id: number, description?: string | null, trashed: boolean, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', trashed: boolean, alias: string, id: number, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string }> } } | { __typename: 'AppletRevision', trashed: boolean } | { __typename: 'Article', trashed: boolean, alias: string, id: number, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string }> } } | { __typename: 'ArticleRevision', trashed: boolean } | { __typename: 'Comment', trashed: boolean } | { __typename: 'Course', trashed: boolean, alias: string, id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }> } | { __typename: 'CoursePage', trashed: boolean } | { __typename: 'CoursePageRevision', trashed: boolean } | { __typename: 'CourseRevision', trashed: boolean } | { __typename: 'Event', trashed: boolean, alias: string, id: number, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string }> } } | { __typename: 'EventRevision', trashed: boolean } | { __typename: 'Exercise', trashed: boolean } | { __typename: 'ExerciseGroup', trashed: boolean } | { __typename: 'ExerciseGroupRevision', trashed: boolean } | { __typename: 'ExerciseRevision', trashed: boolean } | { __typename: 'GroupedExercise', trashed: boolean } | { __typename: 'GroupedExerciseRevision', trashed: boolean } | { __typename: 'Page', trashed: boolean } | { __typename: 'PageRevision', trashed: boolean } | { __typename: 'Solution', trashed: boolean } | { __typename: 'SolutionRevision', trashed: boolean } | { __typename: 'TaxonomyTerm', id: number, alias: string, type: TaxonomyTermType, name: string, trashed: boolean } | { __typename: 'User', trashed: boolean } | { __typename: 'Video', trashed: boolean, alias: string, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string }> } } | { __typename: 'VideoRevision', trashed: boolean }> } } | { __typename: 'User', trashed: boolean } | { __typename: 'Video', trashed: boolean, alias: string, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string }> } } | { __typename: 'VideoRevision', trashed: boolean }> } } | { __typename: 'User', username: string, id: number, trashed: boolean, alias: string } | { __typename: 'Video', instance: Instance, id: number, trashed: boolean, alias: string, currentRevision?: { __typename?: 'VideoRevision', id: number, title: string, url: string, content: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename: 'VideoRevision', id: number, trashed: boolean, alias: string } | null };

type TaxonomyTermsV2_Applet_Fragment = { __typename?: 'Applet', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } };

type TaxonomyTermsV2_Article_Fragment = { __typename?: 'Article', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } };

type TaxonomyTermsV2_Course_Fragment = { __typename?: 'Course', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } };

type TaxonomyTermsV2_Event_Fragment = { __typename?: 'Event', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } };

type TaxonomyTermsV2_Exercise_Fragment = { __typename?: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } };

type TaxonomyTermsV2_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } };

type TaxonomyTermsV2_Video_Fragment = { __typename?: 'Video', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } };

export type TaxonomyTermsV2Fragment = TaxonomyTermsV2_Applet_Fragment | TaxonomyTermsV2_Article_Fragment | TaxonomyTermsV2_Course_Fragment | TaxonomyTermsV2_Event_Fragment | TaxonomyTermsV2_Exercise_Fragment | TaxonomyTermsV2_ExerciseGroup_Fragment | TaxonomyTermsV2_Video_Fragment;

type TaxonomyTermChild_Applet_Fragment = { __typename?: 'Applet', alias: string, id: number, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string }> } };

type TaxonomyTermChild_Article_Fragment = { __typename?: 'Article', alias: string, id: number, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string }> } };

type TaxonomyTermChild_Course_Fragment = { __typename?: 'Course', alias: string, id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }> };

type TaxonomyTermChild_CoursePage_Fragment = { __typename?: 'CoursePage' };

type TaxonomyTermChild_Event_Fragment = { __typename?: 'Event', alias: string, id: number, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string }> } };

type TaxonomyTermChild_Exercise_Fragment = { __typename?: 'Exercise' };

type TaxonomyTermChild_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup' };

type TaxonomyTermChild_GroupedExercise_Fragment = { __typename?: 'GroupedExercise' };

type TaxonomyTermChild_Page_Fragment = { __typename?: 'Page' };

type TaxonomyTermChild_Solution_Fragment = { __typename?: 'Solution' };

type TaxonomyTermChild_Video_Fragment = { __typename?: 'Video', alias: string, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string }> } };

export type TaxonomyTermChildFragment = TaxonomyTermChild_Applet_Fragment | TaxonomyTermChild_Article_Fragment | TaxonomyTermChild_Course_Fragment | TaxonomyTermChild_CoursePage_Fragment | TaxonomyTermChild_Event_Fragment | TaxonomyTermChild_Exercise_Fragment | TaxonomyTermChild_ExerciseGroup_Fragment | TaxonomyTermChild_GroupedExercise_Fragment | TaxonomyTermChild_Page_Fragment | TaxonomyTermChild_Solution_Fragment | TaxonomyTermChild_Video_Fragment;

export type RevisionUuidQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RevisionUuidQuery = { __typename?: 'Query', authorization: any, uuid?: { __typename?: 'Applet' } | { __typename: 'AppletRevision', id: number, alias: string, trashed: boolean, date: string, changes: string, title: string, content: string, url: string, metaTitle: string, metaDescription: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Applet', trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', id: number, title: string, content: string, url: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } } | { __typename?: 'Article' } | { __typename: 'ArticleRevision', id: number, alias: string, trashed: boolean, date: string, changes: string, title: string, content: string, metaTitle: string, metaDescription: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Article', trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', id: number, title: string, content: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename: 'CoursePageRevision', id: number, alias: string, trashed: boolean, date: string, changes: string, content: string, title: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'CoursePage', trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', id: number, alias: string, content: string, title: string, date: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', id: number, title: string, trashed: boolean }> }, course: { __typename?: 'Course', id: number, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number }, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, pages: Array<{ __typename?: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string, trashed: boolean } | null }>, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } } | { __typename: 'CourseRevision', id: number, alias: string, trashed: boolean, date: string, changes: string, content: string, title: string, metaDescription: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Course', trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', id: number, alias: string, content: string, title: string, metaDescription: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', id: number, trashed: boolean }> }, pages: Array<{ __typename?: 'CoursePage', alias: string, id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number, title: string, content: string } | null }>, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } } | { __typename?: 'Event' } | { __typename: 'EventRevision', id: number, alias: string, trashed: boolean, date: string, changes: string, title: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Event', trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', id: number, title: string, content: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', id: number, trashed: boolean }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename: 'ExerciseGroupRevision', id: number, alias: string, trashed: boolean, date: string, changes: string, cohesive: boolean, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'ExerciseGroup', trashed: boolean, instance: Instance, id: number, alias: string, license: { __typename?: 'License', id: number, default: boolean, title: string, url: string, shortTitle: string, agreement: string }, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number, content: string, cohesive: boolean, date: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, trashed: boolean }> }, exercises: Array<{ __typename?: 'GroupedExercise', id: number, alias: string, instance: Instance, trashed: boolean, date: string, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } }>, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } } | { __typename: 'ExerciseRevision', id: number, alias: string, trashed: boolean, date: string, content: string, changes: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Exercise', trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null } | null, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseRevision', id: number, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } } | { __typename?: 'GroupedExercise' } | { __typename: 'GroupedExerciseRevision', id: number, alias: string, trashed: boolean, date: string, content: string, changes: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'GroupedExercise', trashed: boolean, instance: Instance, id: number, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', id: number, alias: string, exercises: Array<{ __typename?: 'GroupedExercise', id: number }> }, license: { __typename?: 'License', id: number, default: boolean, title: string, url: string, shortTitle: string, agreement: string }, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number, content: string, date: string } | null, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'GroupedExerciseRevision', id: number, trashed: boolean }> } } } | { __typename?: 'Page' } | { __typename: 'PageRevision', id: number, alias: string, trashed: boolean, date: string, title: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Page', trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'PageRevision', id: number, title: string, content: string } | null, revisions: { __typename?: 'PageRevisionConnection', nodes: Array<{ __typename?: 'PageRevision', id: number, trashed: boolean }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } } | { __typename?: 'Solution' } | { __typename: 'SolutionRevision', id: number, alias: string, trashed: boolean, date: string, content: string, changes: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Solution', trashed: boolean, instance: Instance, id: number, alias: string, exercise: { __typename: 'Exercise', id: number } | { __typename: 'GroupedExercise', id: number, exerciseGroup: { __typename?: 'ExerciseGroup', id: number, exercises: Array<{ __typename?: 'GroupedExercise', id: number }> } }, currentRevision?: { __typename?: 'SolutionRevision', id: number, content: string } | null, revisions: { __typename?: 'SolutionRevisionConnection', nodes: Array<{ __typename?: 'SolutionRevision', id: number, trashed: boolean }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename: 'VideoRevision', id: number, alias: string, trashed: boolean, date: string, changes: string, title: string, url: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Video', trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', id: number, title: string, url: string, content: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, shortTitle: string, default: boolean, agreement: string } } } | null };

export type CourseRevisionFragment = { __typename?: 'CourseRevision', alias: string, content: string, title: string, metaDescription: string };

export type UnrevisedEntitiesDataFragment = { __typename?: 'AbstractEntityConnection', totalCount: number, nodes: Array<{ __typename: 'Applet', id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', title: string, id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Article', id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', title: string, id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Course', id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', title: string, id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string, id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Event', id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', title: string, id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Exercise', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'GroupedExercise', id: number, alias: string, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number } | null, revisions: { __typename?: 'GroupedExerciseRevisionConnection', nodes: Array<{ __typename?: 'GroupedExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Solution', id: number, alias: string, currentRevision?: { __typename?: 'SolutionRevision', id: number } | null, solutionRevisions: { __typename?: 'SolutionRevisionConnection', nodes: Array<{ __typename?: 'SolutionRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Video', id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', title: string, id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } }>, pageInfo: { __typename?: 'HasNextPageInfo', hasNextPage: boolean, endCursor?: string | null } };

export type UnrevisedRevisionsQueryVariables = Exact<{
  instance: Instance;
}>;


export type UnrevisedRevisionsQuery = { __typename?: 'Query', authorization: any, subject: { __typename?: 'SubjectQuery', subjects: Array<{ __typename?: 'Subject', id: string, taxonomyTerm: { __typename?: 'TaxonomyTerm', name: string }, unrevisedEntities: { __typename?: 'AbstractEntityConnection', totalCount: number, nodes: Array<{ __typename: 'Applet', id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', title: string, id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Article', id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', title: string, id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Course', id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', title: string, id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string, id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Event', id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', title: string, id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Exercise', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'GroupedExercise', id: number, alias: string, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number } | null, revisions: { __typename?: 'GroupedExerciseRevisionConnection', nodes: Array<{ __typename?: 'GroupedExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Solution', id: number, alias: string, currentRevision?: { __typename?: 'SolutionRevision', id: number } | null, solutionRevisions: { __typename?: 'SolutionRevisionConnection', nodes: Array<{ __typename?: 'SolutionRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Video', id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', title: string, id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } }>, pageInfo: { __typename?: 'HasNextPageInfo', hasNextPage: boolean, endCursor?: string | null } } }> } };

export type GetAllThreadsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  instance?: InputMaybe<Instance>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllThreadsQuery = { __typename?: 'Query', thread: { __typename?: 'ThreadQuery', allThreads: { __typename?: 'AllThreadsConnection', pageInfo: { __typename?: 'HasNextPageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, trashed: boolean, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'GroupedExercise', id: number, alias: string } | { __typename: 'GroupedExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'Solution', id: number, alias: string } | { __typename: 'SolutionRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } };

export type GetCommentsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Article', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Comment' } | { __typename?: 'Course', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePage', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Event', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'EventRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Exercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'GroupedExercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'GroupedExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Page', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'PageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Solution', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'SolutionRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'User', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Video', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | null };

type GetCommentsThreads_Applet_Fragment = { __typename?: 'Applet', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_AppletRevision_Fragment = { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Article_Fragment = { __typename?: 'Article', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ArticleRevision_Fragment = { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Course_Fragment = { __typename?: 'Course', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CoursePage_Fragment = { __typename?: 'CoursePage', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CoursePageRevision_Fragment = { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CourseRevision_Fragment = { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Event_Fragment = { __typename?: 'Event', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_EventRevision_Fragment = { __typename?: 'EventRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Exercise_Fragment = { __typename?: 'Exercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseGroupRevision_Fragment = { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseRevision_Fragment = { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_GroupedExercise_Fragment = { __typename?: 'GroupedExercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_GroupedExerciseRevision_Fragment = { __typename?: 'GroupedExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Page_Fragment = { __typename?: 'Page', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_PageRevision_Fragment = { __typename?: 'PageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Solution_Fragment = { __typename?: 'Solution', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_SolutionRevision_Fragment = { __typename?: 'SolutionRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_TaxonomyTerm_Fragment = { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_User_Fragment = { __typename?: 'User', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Video_Fragment = { __typename?: 'Video', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_VideoRevision_Fragment = { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

export type GetCommentsThreadsFragment = GetCommentsThreads_Applet_Fragment | GetCommentsThreads_AppletRevision_Fragment | GetCommentsThreads_Article_Fragment | GetCommentsThreads_ArticleRevision_Fragment | GetCommentsThreads_Course_Fragment | GetCommentsThreads_CoursePage_Fragment | GetCommentsThreads_CoursePageRevision_Fragment | GetCommentsThreads_CourseRevision_Fragment | GetCommentsThreads_Event_Fragment | GetCommentsThreads_EventRevision_Fragment | GetCommentsThreads_Exercise_Fragment | GetCommentsThreads_ExerciseGroup_Fragment | GetCommentsThreads_ExerciseGroupRevision_Fragment | GetCommentsThreads_ExerciseRevision_Fragment | GetCommentsThreads_GroupedExercise_Fragment | GetCommentsThreads_GroupedExerciseRevision_Fragment | GetCommentsThreads_Page_Fragment | GetCommentsThreads_PageRevision_Fragment | GetCommentsThreads_Solution_Fragment | GetCommentsThreads_SolutionRevision_Fragment | GetCommentsThreads_TaxonomyTerm_Fragment | GetCommentsThreads_User_Fragment | GetCommentsThreads_Video_Fragment | GetCommentsThreads_VideoRevision_Fragment;

export type UserDataFragment = { __typename?: 'User', username: string, date: string, lastLogin?: string | null, description?: string | null, isActiveReviewer: boolean, isActiveAuthor: boolean, isActiveDonor: boolean, chatUrl?: string | null, imageUrl: string, motivation?: string | null, roles: { __typename?: 'ScopedRoleConnection', nodes: Array<{ __typename?: 'ScopedRole', scope?: string | null, role: Role }> }, activityByType: { __typename?: 'UserActivityByType', edits: number, comments: number, reviews: number, taxonomy: number } };

export type BasicUserDataFragment = { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean };

export type UserUuidQueryVariables = Exact<{
  path: Scalars['String']['input'];
  instance: Instance;
}>;


export type UserUuidQuery = { __typename?: 'Query', authorization: any, uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'GroupedExercise' } | { __typename?: 'GroupedExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'Solution' } | { __typename?: 'SolutionRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename: 'User', id: number, trashed: boolean, username: string, date: string, lastLogin?: string | null, description?: string | null, isActiveReviewer: boolean, isActiveAuthor: boolean, isActiveDonor: boolean, chatUrl?: string | null, imageUrl: string, motivation?: string | null, roles: { __typename?: 'ScopedRoleConnection', nodes: Array<{ __typename?: 'ScopedRole', scope?: string | null, role: Role }> }, activityByType: { __typename?: 'UserActivityByType', edits: number, comments: number, reviews: number, taxonomy: number } } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type IsSubscribedQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type IsSubscribedQuery = { __typename?: 'Query', subscription: { __typename?: 'SubscriptionQuery', currentUserHasSubscribed: boolean } };

export type TaxonomyTermCreateEntityLinkMutationVariables = Exact<{
  input: TaxonomyEntityLinksInput;
}>;


export type TaxonomyTermCreateEntityLinkMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', createEntityLinks: { __typename?: 'TaxonomyEntityLinksResponse', success: boolean } } };

export type TaxonomyTermDeleteEntityLinkMutationVariables = Exact<{
  input: TaxonomyEntityLinksInput;
}>;


export type TaxonomyTermDeleteEntityLinkMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', deleteEntityLinks: { __typename?: 'TaxonomyEntityLinksResponse', success: boolean } } };

export type TaxonomyTermSortMutationVariables = Exact<{
  input: TaxonomyTermSortInput;
}>;


export type TaxonomyTermSortMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', sort: { __typename?: 'TaxonomyTermSortResponse', success: boolean } } };

export type ThreadSetArchivedMutationVariables = Exact<{
  input: ThreadSetThreadArchivedInput;
}>;


export type ThreadSetArchivedMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', setThreadArchived?: { __typename?: 'ThreadSetThreadArchivedResponse', success: boolean } | null } };

export type ThreadSetStateMutationVariables = Exact<{
  input: ThreadSetThreadStateInput;
}>;


export type ThreadSetStateMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', setThreadState?: { __typename?: 'ThreadSetThreadStateResponse', success: boolean } | null } };

export type ThreadSetCommentStateMutationVariables = Exact<{
  input: ThreadSetCommentStateInput;
}>;


export type ThreadSetCommentStateMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', setCommentState?: { __typename?: 'ThreadSetCommentStateResponse', success: boolean } | null } };

export type CreateThreadMutationVariables = Exact<{
  input: ThreadCreateThreadInput;
}>;


export type CreateThreadMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', createThread?: { __typename?: 'ThreadCreateThreadResponse', success: boolean } | null } };

export type CreateCommentMutationVariables = Exact<{
  input: ThreadCreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', createComment?: { __typename?: 'ThreadCreateCommentResponse', success: boolean } | null } };

export type EditCommentMutationVariables = Exact<{
  input: ThreadEditCommentInput;
}>;


export type EditCommentMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', editComment?: { __typename?: 'ThreadEditCommentResponse', success: boolean } | null } };

export type AddPageRevisionMutationVariables = Exact<{
  input: PageAddRevisionInput;
}>;


export type AddPageRevisionMutation = { __typename?: 'Mutation', page: { __typename?: 'PageMutation', addRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type CreatePageMutationVariables = Exact<{
  input: CreatePageInput;
}>;


export type CreatePageMutation = { __typename?: 'Mutation', page: { __typename?: 'PageMutation', create: { __typename?: 'PageCreateResponse', success: boolean } } };

export type SortMutationVariables = Exact<{
  input: EntitySortInput;
}>;


export type SortMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', sort: { __typename?: 'EntitySortResponse', success: boolean } } };

export type UpdateLicenseMutationVariables = Exact<{
  input: EntityUpdateLicenseInput;
}>;


export type UpdateLicenseMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', updateLicense: { __typename?: 'EntityUpdateLicenseResponse', success: boolean } } };

export type RejectRevisionMutationVariables = Exact<{
  input: RejectRevisionInput;
}>;


export type RejectRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', rejectRevision: { __typename?: 'RejectRevisionResponse', success: boolean } } };

export type CheckoutRevisionMutationVariables = Exact<{
  input: CheckoutRevisionInput;
}>;


export type CheckoutRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', checkoutRevision: { __typename?: 'CheckoutRevisionResponse', success: boolean } } };

export type CheckoutPageRevisionMutationVariables = Exact<{
  input: CheckoutRevisionInput;
}>;


export type CheckoutPageRevisionMutation = { __typename?: 'Mutation', page: { __typename?: 'PageMutation', checkoutRevision: { __typename?: 'CheckoutRevisionResponse', success: boolean } } };

export type SetAppletMutationVariables = Exact<{
  input: SetAppletInput;
}>;


export type SetAppletMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setApplet: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetArticleMutationVariables = Exact<{
  input: SetArticleInput;
}>;


export type SetArticleMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setArticle: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetCourseMutationVariables = Exact<{
  input: SetCourseInput;
}>;


export type SetCourseMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setCourse: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetCoursePageMutationVariables = Exact<{
  input: SetCoursePageInput;
}>;


export type SetCoursePageMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setCoursePage: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetEventMutationVariables = Exact<{
  input: SetEventInput;
}>;


export type SetEventMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setEvent: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetExerciseMutationVariables = Exact<{
  input: SetGenericEntityInput;
}>;


export type SetExerciseMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setExercise: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetExerciseGroupMutationVariables = Exact<{
  input: SetExerciseGroupInput;
}>;


export type SetExerciseGroupMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setExerciseGroup: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetGroupedExerciseMutationVariables = Exact<{
  input: SetGenericEntityInput;
}>;


export type SetGroupedExerciseMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setGroupedExercise: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetSolutionMutationVariables = Exact<{
  input: SetGenericEntityInput;
}>;


export type SetSolutionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setSolution: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type SetVideoMutationVariables = Exact<{
  input: SetVideoInput;
}>;


export type SetVideoMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setVideo: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number } | { __typename?: 'Article', id: number } | { __typename?: 'Course', id: number } | { __typename?: 'CoursePage', id: number } | { __typename?: 'Event', id: number } | { __typename?: 'Exercise', id: number } | { __typename?: 'ExerciseGroup', id: number } | { __typename?: 'GroupedExercise', id: number } | { __typename?: 'Solution', id: number } | { __typename?: 'Video', id: number } | null } } };

export type NotificationSetStateMutationVariables = Exact<{
  input: NotificationSetStateInput;
}>;


export type NotificationSetStateMutation = { __typename?: 'Mutation', notification: { __typename?: 'NotificationMutation', setState?: { __typename?: 'NotificationSetStateResponse', success: boolean } | null } };

export type SetUuidStateMutationVariables = Exact<{
  input: UuidSetStateInput;
}>;


export type SetUuidStateMutation = { __typename?: 'Mutation', uuid: { __typename?: 'UuidMutation', setState?: { __typename?: 'UuidSetStateResponse', success: boolean } | null } };

export type SubscriptionSetMutationVariables = Exact<{
  input: SubscriptionSetInput;
}>;


export type SubscriptionSetMutation = { __typename?: 'Mutation', subscription: { __typename?: 'SubscriptionMutation', set?: { __typename?: 'SubscriptionSetResponse', success: boolean } | null } };

export type TaxonomyTermSetNameAndDescriptionMutationVariables = Exact<{
  input: TaxonomyTermSetNameAndDescriptionInput;
}>;


export type TaxonomyTermSetNameAndDescriptionMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', setNameAndDescription: { __typename?: 'TaxonomyTermSetNameAndDescriptionResponse', success: boolean } } };

export type TaxonomyCreateMutationVariables = Exact<{
  input: TaxonomyTermCreateInput;
}>;


export type TaxonomyCreateMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', create: { __typename?: 'TaxonomyTermCreateResponse', success: boolean } } };

export type AddRoleMutationVariables = Exact<{
  input: UserRoleInput;
}>;


export type AddRoleMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', addRole: { __typename?: 'UserRoleResponse', success: boolean } } };

export type RemoveRoleMutationVariables = Exact<{
  input: UserRoleInput;
}>;


export type RemoveRoleMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', removeRole: { __typename?: 'UserRoleResponse', success: boolean } } };

export type SetDescriptionMutationVariables = Exact<{
  input: UserSetDescriptionInput;
}>;


export type SetDescriptionMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', setDescription: { __typename?: 'UserSetDescriptionResponse', success: boolean } } };

export type DeleteBotsMutationVariables = Exact<{
  input: UserDeleteBotsInput;
}>;


export type DeleteBotsMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', deleteBots: { __typename?: 'UserDeleteBotsResponse', success: boolean } } };

export type PotentialSpamUsersQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type PotentialSpamUsersQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', potentialSpamUsers: { __typename?: 'UserConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'User', id: number, username: string, date: string, lastLogin?: string | null, description?: string | null, isActiveReviewer: boolean, isActiveAuthor: boolean, isActiveDonor: boolean, chatUrl?: string | null, imageUrl: string, motivation?: string | null, roles: { __typename?: 'ScopedRoleConnection', nodes: Array<{ __typename?: 'ScopedRole', scope?: string | null, role: Role }> }, activityByType: { __typename?: 'UserActivityByType', edits: number, comments: number, reviews: number, taxonomy: number } }> } } };

export type UsersByRoleQueryVariables = Exact<{
  role: Role;
  instance: Instance;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type UsersByRoleQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', usersByRole: { __typename?: 'UserWithPermissionsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'User', username: string, alias: string }> } } };

export type GetTaxonomyTypeQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetTaxonomyTypeQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'GroupedExercise' } | { __typename?: 'GroupedExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'Solution' } | { __typename?: 'SolutionRevision' } | { __typename?: 'TaxonomyTerm', id: number, alias: string, title: string, instance: Instance, type: TaxonomyTermType, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type LicensesForInstaceQueryVariables = Exact<{
  instance: Instance;
}>;


export type LicensesForInstaceQuery = { __typename?: 'Query', license: { __typename?: 'LicenseQuery', licenses: Array<{ __typename?: 'License', id: number, default: boolean, title: string }> } };

export type RevisionsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RevisionsQuery = { __typename?: 'Query', uuid?: { __typename: 'Applet', id: number, alias: string, title: string, currentRevision?: { __typename?: 'AppletRevision', id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'AppletRevision', id: number, alias: string, title: string } | { __typename: 'Article', id: number, alias: string, title: string, currentRevision?: { __typename?: 'ArticleRevision', id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ArticleRevision', id: number, alias: string, title: string } | { __typename: 'Comment', id: number, alias: string, title: string } | { __typename: 'Course', id: number, alias: string, title: string, currentRevision?: { __typename?: 'CourseRevision', id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias: string, title: string, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePageRevision', id: number, alias: string, title: string } | { __typename: 'CourseRevision', id: number, alias: string, title: string } | { __typename: 'Event', id: number, alias: string, title: string, currentRevision?: { __typename?: 'EventRevision', id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'EventRevision', id: number, alias: string, title: string } | { __typename: 'Exercise', id: number, alias: string, title: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, title: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroupRevision', id: number, alias: string, title: string } | { __typename: 'ExerciseRevision', id: number, alias: string, title: string } | { __typename: 'GroupedExercise', id: number, alias: string, title: string, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number } | null, revisions: { __typename?: 'GroupedExerciseRevisionConnection', nodes: Array<{ __typename?: 'GroupedExerciseRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'GroupedExerciseRevision', id: number, alias: string, title: string } | { __typename: 'Page', id: number, alias: string, title: string, currentRevision?: { __typename?: 'PageRevision', id: number } | null, revisions: { __typename?: 'PageRevisionConnection', nodes: Array<{ __typename?: 'PageRevision', id: number, trashed: boolean, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'PageRevision', id: number, alias: string, title: string } | { __typename: 'Solution', id: number, alias: string, title: string, currentRevision?: { __typename?: 'SolutionRevision', id: number } | null, revisions: { __typename?: 'SolutionRevisionConnection', nodes: Array<{ __typename?: 'SolutionRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'SolutionRevision', id: number, alias: string, title: string } | { __typename: 'TaxonomyTerm', id: number, alias: string, title: string } | { __typename: 'User', id: number, alias: string, title: string } | { __typename: 'Video', id: number, alias: string, title: string, currentRevision?: { __typename?: 'VideoRevision', id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'VideoRevision', id: number, alias: string, title: string } | null };

export type GetUuidPathsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUuidPathsQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename?: 'AppletRevision' } | { __typename?: 'Article', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'GroupedExercise' } | { __typename?: 'GroupedExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'Solution' } | { __typename?: 'SolutionRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, parent?: { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } } | { __typename?: 'VideoRevision' } | null };

export type PagesQueryVariables = Exact<{
  instance: Instance;
}>;


export type PagesQuery = { __typename?: 'Query', page: { __typename?: 'PageQuery', pages: Array<{ __typename?: 'Page', id: number, alias: string, trashed: boolean, currentRevision?: { __typename?: 'PageRevision', title: string } | null }> } };

export type GetSubscriptionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', subscription: { __typename?: 'SubscriptionQuery', getSubscriptions: { __typename?: 'SubscriptionConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'SubscriptionInfo', sendEmail: boolean, object: { __typename: 'Applet', id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', title: string } | null } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string, subject?: { __typename?: 'Subject', taxonomyTerm: { __typename?: 'TaxonomyTerm', name: string } } | null } | { __typename: 'ExerciseGroup', id: number, alias: string, subject?: { __typename?: 'Subject', taxonomyTerm: { __typename?: 'TaxonomyTerm', name: string } } | null } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'GroupedExercise', id: number, alias: string } | { __typename: 'GroupedExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'Solution', id: number, alias: string } | { __typename: 'SolutionRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, name: string, id: number, alias: string } | { __typename: 'User', username: string, id: number, alias: string } | { __typename: 'Video', id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, alias: string } }> } } };

export type GetNotificationsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  unread?: InputMaybe<Scalars['Boolean']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'Notification', id: number, unread: boolean, event: { __typename: 'CheckoutRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, revision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'GroupedExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'SolutionRevision', id: number } | { __typename?: 'VideoRevision', id: number }, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateCommentNotificationEvent', date: string, id: number, objectId: number, comment: { __typename?: 'Comment', id: number, content: string }, thread: { __typename?: 'Thread', id: string, title?: string | null, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityNotificationEvent', date: string, id: number, objectId: number, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityRevisionNotificationEvent', date: string, id: number, objectId: number, entityRevision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'GroupedExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'SolutionRevision', id: number } | { __typename?: 'VideoRevision', id: number }, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateThreadNotificationEvent', date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, content: string }> } }, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RejectRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, revision: { __typename?: 'AppletRevision', id: number, alias: string } | { __typename?: 'ArticleRevision', id: number, alias: string } | { __typename?: 'CoursePageRevision', id: number, alias: string } | { __typename?: 'CourseRevision', id: number, alias: string } | { __typename?: 'EventRevision', id: number, alias: string } | { __typename?: 'ExerciseGroupRevision', id: number, alias: string } | { __typename?: 'ExerciseRevision', id: number, alias: string } | { __typename?: 'GroupedExerciseRevision', id: number, alias: string } | { __typename?: 'PageRevision', id: number, alias: string } | { __typename?: 'SolutionRevision', id: number, alias: string } | { __typename?: 'VideoRevision', id: number, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RemoveEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RemoveTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetLicenseNotificationEvent', date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetTaxonomyParentNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, previousParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, optionalParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetThreadStateNotificationEvent', archived: boolean, date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetUuidStateNotificationEvent', trashed: boolean, date: string, id: number, objectId: number, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'GroupedExercise', id: number, title: string, alias: string, exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } | { __typename: 'GroupedExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'Solution', id: number, title: string, alias: string, exercise: { __typename: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'GroupedExercise', exerciseGroup: { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } } } | { __typename: 'SolutionRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } }> } };

export type GetTrashedEntitiesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  instance?: InputMaybe<Instance>;
}>;


export type GetTrashedEntitiesQuery = { __typename?: 'Query', entity?: { __typename?: 'EntityQuery', deletedEntities: { __typename?: 'DeletedEntitiesConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'DeletedEntity', dateOfDeletion?: string | null, entity?: { __typename: 'Applet', id: number, alias: string, title: string } | { __typename: 'Article', id: number, alias: string, title: string } | { __typename: 'Course', id: number, alias: string, title: string } | { __typename: 'CoursePage', id: number, alias: string, title: string } | { __typename: 'Event', id: number, alias: string, title: string } | { __typename: 'Exercise', id: number, alias: string, title: string } | { __typename: 'ExerciseGroup', id: number, alias: string, title: string } | { __typename: 'GroupedExercise', id: number, alias: string, title: string } | { __typename: 'Solution', id: number, alias: string, title: string } | { __typename: 'Video', id: number, alias: string, title: string } | null }> } } | null };

export type DefaultLicenseAgreementQueryVariables = Exact<{
  instance: Instance;
}>;


export type DefaultLicenseAgreementQuery = { __typename?: 'Query', license: { __typename?: 'LicenseQuery', defaultLicense: { __typename?: 'License', agreement: string } } };

export type FetchExerciseFolderQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FetchExerciseFolderQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'GroupedExercise' } | { __typename?: 'GroupedExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'Solution' } | { __typename?: 'SolutionRevision' } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename: 'Exercise', id: number, trashed: boolean, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null } | { __typename: 'ExerciseGroup', id: number, trashed: boolean, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'GroupedExercise' } | { __typename?: 'GroupedExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'Solution' } | { __typename?: 'SolutionRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' }> } } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type FetchParentQueryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FetchParentQueryQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', id: number, type: TaxonomyTermType, name: string, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', id: number, trashed: boolean } | { __typename: 'AppletRevision', id: number, trashed: boolean } | { __typename: 'Article', id: number, trashed: boolean, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, trashed: boolean } | { __typename: 'Comment', id: number, trashed: boolean } | { __typename: 'Course', id: number, trashed: boolean, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, trashed: boolean } | { __typename: 'CoursePageRevision', id: number, trashed: boolean } | { __typename: 'CourseRevision', id: number, trashed: boolean } | { __typename: 'Event', id: number, trashed: boolean } | { __typename: 'EventRevision', id: number, trashed: boolean } | { __typename: 'Exercise', id: number, trashed: boolean, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null } | { __typename: 'ExerciseGroup', id: number, trashed: boolean } | { __typename: 'ExerciseGroupRevision', id: number, trashed: boolean } | { __typename: 'ExerciseRevision', id: number, trashed: boolean } | { __typename: 'GroupedExercise', id: number, trashed: boolean } | { __typename: 'GroupedExerciseRevision', id: number, trashed: boolean } | { __typename: 'Page', id: number, trashed: boolean } | { __typename: 'PageRevision', id: number, trashed: boolean } | { __typename: 'Solution', id: number, trashed: boolean } | { __typename: 'SolutionRevision', id: number, trashed: boolean } | { __typename: 'TaxonomyTerm', name: string, type: TaxonomyTermType, id: number, trashed: boolean } | { __typename: 'User', id: number, trashed: boolean } | { __typename: 'Video', id: number, trashed: boolean, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, trashed: boolean }> } }> } } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'GroupedExercise' } | { __typename?: 'GroupedExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'Solution' } | { __typename?: 'SolutionRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type TaxonomyTermFragment = { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', id: number, type: TaxonomyTermType, name: string, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', id: number, trashed: boolean } | { __typename: 'AppletRevision', id: number, trashed: boolean } | { __typename: 'Article', id: number, trashed: boolean, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, trashed: boolean } | { __typename: 'Comment', id: number, trashed: boolean } | { __typename: 'Course', id: number, trashed: boolean, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, trashed: boolean } | { __typename: 'CoursePageRevision', id: number, trashed: boolean } | { __typename: 'CourseRevision', id: number, trashed: boolean } | { __typename: 'Event', id: number, trashed: boolean } | { __typename: 'EventRevision', id: number, trashed: boolean } | { __typename: 'Exercise', id: number, trashed: boolean, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null } | { __typename: 'ExerciseGroup', id: number, trashed: boolean } | { __typename: 'ExerciseGroupRevision', id: number, trashed: boolean } | { __typename: 'ExerciseRevision', id: number, trashed: boolean } | { __typename: 'GroupedExercise', id: number, trashed: boolean } | { __typename: 'GroupedExerciseRevision', id: number, trashed: boolean } | { __typename: 'Page', id: number, trashed: boolean } | { __typename: 'PageRevision', id: number, trashed: boolean } | { __typename: 'Solution', id: number, trashed: boolean } | { __typename: 'SolutionRevision', id: number, trashed: boolean } | { __typename: 'TaxonomyTerm', name: string, type: TaxonomyTermType, id: number, trashed: boolean } | { __typename: 'User', id: number, trashed: boolean } | { __typename: 'Video', id: number, trashed: boolean, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, trashed: boolean }> } }> };

export type MediaUploadQueryVariables = Exact<{
  mediaType: MediaType;
}>;


export type MediaUploadQuery = { __typename?: 'Query', media: { __typename?: 'MediaQuery', newUpload: { __typename?: 'MediaUpload', uploadUrl: string, urlAfterUpload: string } } };

export const ArticleRevisionFragmentDoc = gql`
    fragment articleRevision on ArticleRevision {
  id
  title
  content
  metaTitle
  metaDescription
  date
}
    `;
export const PageRevisionFragmentDoc = gql`
    fragment pageRevision on PageRevision {
  id
  title
  content
}
    `;
export const VideoRevisionFragmentDoc = gql`
    fragment videoRevision on VideoRevision {
  id
  title
  url
  content
}
    `;
export const AppletRevisionFragmentDoc = gql`
    fragment appletRevision on AppletRevision {
  id
  title
  content
  url
  metaTitle
  metaDescription
  date
}
    `;
export const CoursePageRevisionFragmentDoc = gql`
    fragment coursePageRevision on CoursePageRevision {
  id
  alias
  content
  title
  date
}
    `;
export const ExerciseGroupRevisionFragmentDoc = gql`
    fragment exerciseGroupRevision on ExerciseGroupRevision {
  id
  content
  cohesive
  date
}
    `;
export const EventRevisionFragmentDoc = gql`
    fragment eventRevision on EventRevision {
  id
  title
  content
}
    `;
export const WithTaxonomyTermsFragmentDoc = gql`
    fragment withTaxonomyTerms on AbstractUuid {
  ... on Exercise {
    taxonomyTerms {
      nodes {
        type
      }
    }
  }
  ... on ExerciseGroup {
    taxonomyTerms {
      nodes {
        type
      }
    }
  }
  ... on GroupedExercise {
    exerciseGroup {
      taxonomyTerms {
        nodes {
          type
        }
      }
    }
  }
  ... on Solution {
    exercise {
      ... on Exercise {
        __typename
        taxonomyTerms {
          nodes {
            type
          }
        }
      }
      ... on GroupedExercise {
        __typename
        exerciseGroup {
          taxonomyTerms {
            nodes {
              type
            }
          }
        }
      }
    }
  }
}
    `;
export const EntityInfoFragmentDoc = gql`
    fragment entityInfo on AbstractUuid {
  __typename
  id
  title
  alias
}
    `;
export const EventDataFragmentDoc = gql`
    fragment eventData on AbstractNotificationEvent {
  date
  id
  __typename
  actor {
    id
    username
    isActiveAuthor
    isActiveDonor
    isActiveReviewer
  }
  objectId
  ... on CheckoutRevisionNotificationEvent {
    revision {
      id
    }
    repository {
      ...withTaxonomyTerms
      ...entityInfo
    }
    reason
  }
  ... on CreateCommentNotificationEvent {
    comment {
      id
      content
    }
    thread {
      id
      title
      thread: comments(first: 1) {
        nodes {
          id
        }
      }
    }
  }
  ... on CreateEntityNotificationEvent {
    entity {
      ...withTaxonomyTerms
      ...entityInfo
    }
  }
  ... on CreateEntityLinkNotificationEvent {
    parent {
      ...withTaxonomyTerms
      ...entityInfo
    }
    child {
      ...withTaxonomyTerms
      ...entityInfo
    }
  }
  ... on CreateEntityRevisionNotificationEvent {
    entityRevision {
      id
    }
    entity {
      ...withTaxonomyTerms
      ...entityInfo
    }
  }
  ... on CreateTaxonomyTermNotificationEvent {
    taxonomyTerm {
      ...entityInfo
    }
  }
  ... on CreateTaxonomyLinkNotificationEvent {
    child {
      ...withTaxonomyTerms
      ...entityInfo
    }
    parent {
      ...entityInfo
    }
  }
  ... on CreateThreadNotificationEvent {
    thread {
      id
      thread: comments(first: 1) {
        nodes {
          id
          content
        }
      }
    }
    object {
      ...entityInfo
    }
  }
  ... on RejectRevisionNotificationEvent {
    repository {
      ...withTaxonomyTerms
      ...entityInfo
    }
    revision {
      id
      alias
    }
    reason
  }
  ... on RemoveEntityLinkNotificationEvent {
    parent {
      ...withTaxonomyTerms
      ...entityInfo
    }
    child {
      ...withTaxonomyTerms
      ...entityInfo
    }
  }
  ... on RemoveTaxonomyLinkNotificationEvent {
    child {
      ...withTaxonomyTerms
      ...entityInfo
    }
    parent {
      ...entityInfo
    }
  }
  ... on SetLicenseNotificationEvent {
    repository {
      ...withTaxonomyTerms
      ...entityInfo
    }
  }
  ... on SetTaxonomyParentNotificationEvent {
    child {
      ...entityInfo
    }
    previousParent {
      ...entityInfo
    }
    optionalParent: parent {
      ...entityInfo
    }
  }
  ... on SetTaxonomyTermNotificationEvent {
    taxonomyTerm {
      ...entityInfo
    }
  }
  ... on SetThreadStateNotificationEvent {
    archived
    thread {
      id
      thread: comments(first: 1) {
        nodes {
          id
        }
      }
    }
  }
  ... on SetUuidStateNotificationEvent {
    object {
      ...entityInfo
      ...withTaxonomyTerms
    }
    trashed
  }
}
    ${WithTaxonomyTermsFragmentDoc}
${EntityInfoFragmentDoc}`;
export const LicenseFragmentDoc = gql`
    fragment license on AbstractRepository {
  license {
    id
    url
    title
    shortTitle
    default
    agreement
  }
}
    `;
export const SolutionFragmentDoc = gql`
    fragment solution on Solution {
  id
  currentRevision {
    content
  }
  trashed
  ...license
}
    ${LicenseFragmentDoc}`;
export const ExerciseFragmentDoc = gql`
    fragment exercise on AbstractExercise {
  id
  alias
  instance
  trashed
  date
  currentRevision {
    id
    content
    date
  }
  solution {
    ...solution
  }
  ...license
}
    ${SolutionFragmentDoc}
${LicenseFragmentDoc}`;
export const PathFragmentDoc = gql`
    fragment path on Navigation {
  path {
    nodes {
      label
      url
      id
    }
  }
}
    `;
export const PathToRootFragmentDoc = gql`
    fragment pathToRoot on TaxonomyTerm {
  title
  alias
  id
  parent {
    title
    alias
    id
    parent {
      title
      alias
      id
      parent {
        title
        alias
        id
        parent {
          title
          alias
          id
          parent {
            title
            alias
            id
            parent {
              title
              alias
              id
              parent {
                title
                alias
                id
                parent {
                  title
                  alias
                  id
                  parent {
                    title
                    alias
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const TaxonomyTermsV2FragmentDoc = gql`
    fragment taxonomyTermsV2 on AbstractTaxonomyTermChild {
  taxonomyTerms {
    nodes {
      ...pathToRoot
    }
  }
}
    ${PathToRootFragmentDoc}`;
export const TaxonomyTermChildFragmentDoc = gql`
    fragment taxonomyTermChild on AbstractRepository {
  ... on Article {
    alias
    id
    currentRevision {
      title
    }
    revisions(first: 1, unrevised: true) {
      nodes {
        title
      }
    }
  }
  ... on Video {
    alias
    id
    date
    currentRevision {
      title
      date
    }
    revisions(first: 1, unrevised: true) {
      nodes {
        title
      }
    }
  }
  ... on Applet {
    alias
    id
    currentRevision {
      title
    }
    revisions(first: 1, unrevised: true) {
      nodes {
        title
      }
    }
  }
  ... on Course {
    alias
    id
    currentRevision {
      title
    }
    revisions(first: 1, unrevised: true) {
      nodes {
        title
      }
    }
    pages {
      id
      currentRevision {
        id
      }
    }
  }
  ... on Event {
    alias
    id
    currentRevision {
      title
    }
    revisions(first: 1, unrevised: true) {
      nodes {
        title
      }
    }
  }
}
    `;
export const CourseRevisionFragmentDoc = gql`
    fragment courseRevision on CourseRevision {
  alias
  content
  title
  metaDescription
}
    `;
export const BasicUserDataFragmentDoc = gql`
    fragment basicUserData on User {
  id
  username
  isActiveAuthor
  isActiveDonor
  isActiveReviewer
  isNewAuthor
}
    `;
export const UnrevisedEntitiesDataFragmentDoc = gql`
    fragment unrevisedEntitiesData on AbstractEntityConnection {
  nodes {
    __typename
    id
    alias
    ... on Applet {
      currentRevision {
        title
        id
      }
      revisions(unrevised: true) {
        nodes {
          title
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Article {
      currentRevision {
        title
        id
      }
      revisions(unrevised: true) {
        nodes {
          title
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Course {
      currentRevision {
        title
        id
      }
      revisions(unrevised: true) {
        nodes {
          title
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on CoursePage {
      currentRevision {
        title
        id
      }
      revisions(unrevised: true) {
        nodes {
          title
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Event {
      currentRevision {
        title
        id
      }
      revisions(unrevised: true) {
        nodes {
          title
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Exercise {
      currentRevision {
        id
      }
      revisions(unrevised: true) {
        nodes {
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on ExerciseGroup {
      currentRevision {
        id
      }
      revisions(unrevised: true) {
        nodes {
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on GroupedExercise {
      currentRevision {
        id
      }
      revisions(unrevised: true) {
        nodes {
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Video {
      currentRevision {
        title
        id
      }
      revisions(unrevised: true) {
        nodes {
          title
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Solution {
      currentRevision {
        id
      }
      solutionRevisions: revisions(unrevised: true) {
        nodes {
          id
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
  }
  totalCount
  pageInfo {
    hasNextPage
    endCursor
  }
}
    ${BasicUserDataFragmentDoc}`;
export const GetCommentsThreadsFragmentDoc = gql`
    fragment getCommentsThreads on ThreadAware {
  threads(trashed: false) {
    nodes {
      id
      archived
      comments {
        nodes {
          id
          trashed
          content
          archived
          createdAt
          author {
            username
            alias
            id
            isActiveAuthor
            isActiveDonor
            isActiveReviewer
          }
        }
      }
    }
  }
}
    `;
export const UserDataFragmentDoc = gql`
    fragment userData on User {
  username
  date
  lastLogin
  description
  isActiveReviewer
  isActiveAuthor
  isActiveDonor
  chatUrl
  imageUrl
  motivation
  roles {
    nodes {
      scope
      role
    }
  }
  activityByType {
    edits
    comments
    reviews
    taxonomy
  }
}
    `;
export const TaxonomyTermFragmentDoc = gql`
    fragment taxonomyTerm on TaxonomyTermConnection {
  nodes {
    id
    type
    name
    children {
      nodes {
        id
        __typename
        trashed
        ... on Article {
          currentRevision {
            title
          }
        }
        ... on Course {
          currentRevision {
            title
          }
        }
        ... on Video {
          currentRevision {
            title
          }
        }
        ... on TaxonomyTerm {
          name
          type
        }
        ... on Exercise {
          currentRevision {
            id
          }
        }
      }
    }
  }
}
    `;
export const OauthLoginDocument = gql`
    mutation oauthLogin($input: OauthAcceptInput!) {
  oauth {
    acceptLogin(input: $input) {
      redirectUri
    }
  }
}
    `;
export const OauthConsentDocument = gql`
    mutation oauthConsent($input: OauthAcceptInput!) {
  oauth {
    acceptConsent(input: $input) {
      redirectUri
    }
  }
}
    `;
export const OauthLogoutDocument = gql`
    mutation oauthLogout($challenge: String!) {
  oauth {
    acceptLogout(challenge: $challenge) {
      redirectUri
    }
  }
}
    `;
export const UuidSimpleDocument = gql`
    query uuidSimple($id: Int!) {
  uuid(id: $id) {
    id
    __typename
    title
    ... on CoursePage {
      course {
        id
      }
    }
    ... on TaxonomyTerm {
      type
    }
  }
}
    `;
export const UnreadNotificationsDocument = gql`
    query unreadNotifications {
  notifications(unread: true) {
    totalCount
  }
}
    `;
export const GetEventDataDocument = gql`
    query getEventData($actorId: Int, $objectId: Int, $instance: Instance, $first: Int, $last: Int, $after: String) {
  events(
    actorId: $actorId
    objectId: $objectId
    instance: $instance
    first: $first
    last: $last
    after: $after
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      ...eventData
    }
  }
}
    ${EventDataFragmentDoc}`;
export const UserRevisionDocument = gql`
    query userRevision($userId: Int) {
  uuid(id: $userId) {
    ... on User {
      unrevisedEntities {
        ...unrevisedEntitiesData
      }
    }
  }
}
    ${UnrevisedEntitiesDataFragmentDoc}`;
export const LicenseDetailsDocument = gql`
    query licenseDetails($id: Int!) {
  license {
    license(id: $id) {
      default
      title
      content
    }
  }
}
    `;
export const MainUuidDocument = gql`
    query mainUuid($id: Int, $alias: AliasInput) {
  authorization
  uuid(id: $id, alias: $alias) {
    __typename
    id
    trashed
    alias
    ... on AbstractRepository {
      instance
      ...license
    }
    ... on AbstractTaxonomyTermChild {
      ...taxonomyTermsV2
    }
    ... on Page {
      currentRevision {
        ...pageRevision
      }
    }
    ... on Article {
      date
      currentRevision {
        ...articleRevision
      }
      revisions(unrevised: true) {
        totalCount
        nodes {
          title
        }
      }
    }
    ... on User {
      username
    }
    ... on Video {
      currentRevision {
        ...videoRevision
      }
      revisions(unrevised: true) {
        totalCount
        nodes {
          title
        }
      }
    }
    ... on Applet {
      date
      currentRevision {
        ...appletRevision
      }
      revisions(unrevised: true) {
        totalCount
        nodes {
          title
        }
      }
    }
    ... on CoursePage {
      date
      currentRevision {
        ...coursePageRevision
      }
      revisions(unrevised: true) {
        totalCount
        nodes {
          title
        }
      }
      course {
        id
        currentRevision {
          title
        }
        pages(trashed: false, hasCurrentRevision: true) {
          alias
          id
          currentRevision {
            title
            trashed
          }
        }
        ...taxonomyTermsV2
        revisions(unrevised: true) {
          totalCount
        }
      }
    }
    ... on Exercise {
      subject {
        taxonomyTerm {
          name
        }
      }
      ...exercise
      revisions(unrevised: true) {
        totalCount
      }
    }
    ... on GroupedExercise {
      ...exercise
      exerciseGroup {
        alias
      }
      revisions(unrevised: true) {
        totalCount
      }
    }
    ... on ExerciseGroup {
      subject {
        taxonomyTerm {
          name
        }
      }
      date
      currentRevision {
        ...exerciseGroupRevision
      }
      revisions(unrevised: true) {
        totalCount
      }
      exercises {
        ...exercise
        revisions(unrevised: true) {
          totalCount
        }
      }
    }
    ... on Solution {
      ...solution
      exercise {
        ... on Exercise {
          id
        }
        ... on GroupedExercise {
          id
        }
      }
    }
    ... on Event {
      currentRevision {
        ...eventRevision
      }
    }
    ... on Course {
      pages(trashed: false) {
        alias
        id
        currentRevision {
          id
          title
          content
        }
      }
      currentRevision {
        title
        content
        metaDescription
      }
      ...taxonomyTermsV2
    }
    ... on TaxonomyTerm {
      alias
      instance
      type
      name
      description
      weight
      taxonomyId
      trashed
      parent {
        id
      }
      ...pathToRoot
      children {
        nodes {
          trashed
          __typename
          ...taxonomyTermChild
          ... on Exercise {
            ...exercise
          }
          ... on ExerciseGroup {
            id
            alias
            instance
            currentRevision {
              content
              id
              date
              cohesive
            }
            exercises {
              ...exercise
              revisions(unrevised: true) {
                totalCount
              }
            }
            revisions(unrevised: true) {
              totalCount
            }
            ...license
          }
          ... on TaxonomyTerm {
            type
            name
            alias
            id
            description
            children {
              nodes {
                trashed
                __typename
                ... on TaxonomyTerm {
                  id
                  alias
                  type
                  name
                }
                ...taxonomyTermChild
              }
            }
          }
        }
      }
    }
  }
}
    ${LicenseFragmentDoc}
${TaxonomyTermsV2FragmentDoc}
${PageRevisionFragmentDoc}
${ArticleRevisionFragmentDoc}
${VideoRevisionFragmentDoc}
${AppletRevisionFragmentDoc}
${CoursePageRevisionFragmentDoc}
${ExerciseFragmentDoc}
${ExerciseGroupRevisionFragmentDoc}
${SolutionFragmentDoc}
${EventRevisionFragmentDoc}
${PathToRootFragmentDoc}
${TaxonomyTermChildFragmentDoc}`;
export const RevisionUuidDocument = gql`
    query RevisionUuid($id: Int) {
  authorization
  uuid(id: $id) {
    ... on AbstractRevision {
      __typename
      id
      alias
      trashed
      date
      author {
        id
        username
        isActiveAuthor
        isActiveDonor
        isActiveReviewer
      }
    }
    ... on ArticleRevision {
      ...articleRevision
      changes
      repository {
        ...taxonomyTermsV2
        ...license
        trashed
        instance
        id
        alias
        currentRevision {
          id
          ...articleRevision
        }
        revisions(unrevised: false) {
          totalCount
          nodes {
            id
            title
            trashed
          }
        }
      }
    }
    ... on PageRevision {
      ...pageRevision
      repository {
        ...license
        trashed
        instance
        id
        alias
        currentRevision {
          id
          ...pageRevision
        }
        revisions(unrevised: false) {
          nodes {
            id
            trashed
          }
        }
      }
    }
    ... on AppletRevision {
      ...appletRevision
      changes
      repository {
        ...taxonomyTermsV2
        ...license
        trashed
        instance
        id
        alias
        currentRevision {
          id
          ...appletRevision
        }
        revisions(unrevised: false) {
          totalCount
          nodes {
            id
            title
            trashed
          }
        }
      }
    }
    ... on CourseRevision {
      ...courseRevision
      changes
      repository {
        ...taxonomyTermsV2
        ...license
        trashed
        instance
        id
        alias
        currentRevision {
          id
          ...courseRevision
        }
        revisions(unrevised: false) {
          nodes {
            id
            trashed
          }
        }
        pages {
          alias
          id
          currentRevision {
            id
            title
            content
          }
        }
      }
    }
    ... on CoursePageRevision {
      ...coursePageRevision
      changes
      repository {
        ...license
        trashed
        instance
        id
        alias
        currentRevision {
          id
          ...coursePageRevision
        }
        revisions(unrevised: false) {
          totalCount
          nodes {
            id
            title
            trashed
          }
        }
        course {
          ...taxonomyTermsV2
          revisions(unrevised: true) {
            totalCount
          }
          id
          currentRevision {
            title
          }
          pages(trashed: false, hasCurrentRevision: true) {
            id
            alias
            currentRevision {
              title
              trashed
            }
          }
        }
      }
    }
    ... on EventRevision {
      ...eventRevision
      changes
      repository {
        ...license
        ...taxonomyTermsV2
        trashed
        instance
        id
        alias
        currentRevision {
          id
          ...eventRevision
        }
        revisions(unrevised: false) {
          nodes {
            id
            trashed
          }
        }
      }
    }
    ... on ExerciseRevision {
      content
      changes
      repository {
        ...taxonomyTermsV2
        ...license
        trashed
        instance
        id
        alias
        currentRevision {
          id
          content
          date
        }
        ...license
        solution {
          id
          currentRevision {
            content
          }
        }
        revisions(unrevised: false) {
          totalCount
          nodes {
            id
            trashed
          }
        }
      }
    }
    ... on GroupedExerciseRevision {
      content
      changes
      repository {
        ...license
        trashed
        instance
        id
        alias
        exerciseGroup {
          id
          alias
          exercises {
            id
          }
        }
        license {
          id
          default
          title
        }
        currentRevision {
          id
          content
          date
        }
        revisions(unrevised: false) {
          totalCount
          nodes {
            id
            trashed
          }
        }
      }
    }
    ... on ExerciseGroupRevision {
      ...exerciseGroupRevision
      changes
      cohesive
      repository {
        ...license
        ...taxonomyTermsV2
        trashed
        instance
        id
        alias
        license {
          id
          default
          title
        }
        currentRevision {
          id
          ...exerciseGroupRevision
        }
        revisions(unrevised: false) {
          totalCount
          nodes {
            id
            trashed
          }
        }
        exercises {
          ...exercise
          revisions(unrevised: true) {
            totalCount
          }
        }
      }
    }
    ... on SolutionRevision {
      content
      changes
      repository {
        ...license
        trashed
        instance
        id
        alias
        exercise {
          __typename
          ... on Exercise {
            id
          }
          ... on GroupedExercise {
            id
            exerciseGroup {
              id
              exercises {
                id
              }
            }
          }
        }
        currentRevision {
          id
          content
        }
        revisions(unrevised: false) {
          nodes {
            id
            trashed
          }
        }
      }
    }
    ... on VideoRevision {
      ...videoRevision
      changes
      repository {
        ...taxonomyTermsV2
        ...license
        trashed
        instance
        id
        alias
        currentRevision {
          id
          ...videoRevision
        }
        revisions(unrevised: false) {
          totalCount
          nodes {
            id
            title
            trashed
          }
        }
      }
    }
  }
}
    ${ArticleRevisionFragmentDoc}
${TaxonomyTermsV2FragmentDoc}
${LicenseFragmentDoc}
${PageRevisionFragmentDoc}
${AppletRevisionFragmentDoc}
${CourseRevisionFragmentDoc}
${CoursePageRevisionFragmentDoc}
${EventRevisionFragmentDoc}
${ExerciseGroupRevisionFragmentDoc}
${ExerciseFragmentDoc}
${VideoRevisionFragmentDoc}`;
export const UnrevisedRevisionsDocument = gql`
    query unrevisedRevisions($instance: Instance!) {
  authorization
  subject {
    subjects(instance: $instance) {
      id
      taxonomyTerm {
        name
      }
      unrevisedEntities {
        ...unrevisedEntitiesData
      }
    }
  }
}
    ${UnrevisedEntitiesDataFragmentDoc}`;
export const GetAllThreadsDocument = gql`
    query getAllThreads($first: Int!, $after: String, $instance: Instance, $subjectId: String) {
  thread {
    allThreads(
      instance: $instance
      first: $first
      after: $after
      subjectId: $subjectId
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        archived
        trashed
        object {
          __typename
          id
          alias
        }
        comments {
          nodes {
            id
            trashed
            content
            archived
            createdAt
            author {
              username
              alias
              id
              isActiveAuthor
              isActiveDonor
              isActiveReviewer
            }
          }
        }
      }
    }
  }
}
    `;
export const GetCommentsDocument = gql`
    query getComments($id: Int!) {
  uuid(id: $id) {
    ... on ThreadAware {
      ...getCommentsThreads
    }
  }
}
    ${GetCommentsThreadsFragmentDoc}`;
export const UserUuidDocument = gql`
    query userUuid($path: String!, $instance: Instance!) {
  authorization
  uuid(alias: {path: $path, instance: $instance}) {
    ... on User {
      id
      __typename
      trashed
      ...userData
    }
  }
}
    ${UserDataFragmentDoc}`;
export const IsSubscribedDocument = gql`
    query isSubscribed($id: Int!) {
  subscription {
    currentUserHasSubscribed(id: $id)
  }
}
    `;
export const TaxonomyTermCreateEntityLinkDocument = gql`
    mutation taxonomyTermCreateEntityLink($input: TaxonomyEntityLinksInput!) {
  taxonomyTerm {
    createEntityLinks(input: $input) {
      success
    }
  }
}
    `;
export const TaxonomyTermDeleteEntityLinkDocument = gql`
    mutation taxonomyTermDeleteEntityLink($input: TaxonomyEntityLinksInput!) {
  taxonomyTerm {
    deleteEntityLinks(input: $input) {
      success
    }
  }
}
    `;
export const TaxonomyTermSortDocument = gql`
    mutation taxonomyTermSort($input: TaxonomyTermSortInput!) {
  taxonomyTerm {
    sort(input: $input) {
      success
    }
  }
}
    `;
export const ThreadSetArchivedDocument = gql`
    mutation threadSetArchived($input: ThreadSetThreadArchivedInput!) {
  thread {
    setThreadArchived(input: $input) {
      success
    }
  }
}
    `;
export const ThreadSetStateDocument = gql`
    mutation threadSetState($input: ThreadSetThreadStateInput!) {
  thread {
    setThreadState(input: $input) {
      success
    }
  }
}
    `;
export const ThreadSetCommentStateDocument = gql`
    mutation threadSetCommentState($input: ThreadSetCommentStateInput!) {
  thread {
    setCommentState(input: $input) {
      success
    }
  }
}
    `;
export const CreateThreadDocument = gql`
    mutation createThread($input: ThreadCreateThreadInput!) {
  thread {
    createThread(input: $input) {
      success
    }
  }
}
    `;
export const CreateCommentDocument = gql`
    mutation createComment($input: ThreadCreateCommentInput!) {
  thread {
    createComment(input: $input) {
      success
    }
  }
}
    `;
export const EditCommentDocument = gql`
    mutation editComment($input: ThreadEditCommentInput!) {
  thread {
    editComment(input: $input) {
      success
    }
  }
}
    `;
export const AddPageRevisionDocument = gql`
    mutation addPageRevision($input: PageAddRevisionInput!) {
  page {
    addRevision(input: $input) {
      success
    }
  }
}
    `;
export const CreatePageDocument = gql`
    mutation createPage($input: CreatePageInput!) {
  page {
    create(input: $input) {
      success
    }
  }
}
    `;
export const SortDocument = gql`
    mutation sort($input: EntitySortInput!) {
  entity {
    sort(input: $input) {
      success
    }
  }
}
    `;
export const UpdateLicenseDocument = gql`
    mutation updateLicense($input: EntityUpdateLicenseInput!) {
  entity {
    updateLicense(input: $input) {
      success
    }
  }
}
    `;
export const RejectRevisionDocument = gql`
    mutation rejectRevision($input: RejectRevisionInput!) {
  entity {
    rejectRevision(input: $input) {
      success
    }
  }
}
    `;
export const CheckoutRevisionDocument = gql`
    mutation checkoutRevision($input: CheckoutRevisionInput!) {
  entity {
    checkoutRevision(input: $input) {
      success
    }
  }
}
    `;
export const CheckoutPageRevisionDocument = gql`
    mutation checkoutPageRevision($input: CheckoutRevisionInput!) {
  page {
    checkoutRevision(input: $input) {
      success
    }
  }
}
    `;
export const SetAppletDocument = gql`
    mutation setApplet($input: SetAppletInput!) {
  entity {
    setApplet(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetArticleDocument = gql`
    mutation setArticle($input: SetArticleInput!) {
  entity {
    setArticle(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetCourseDocument = gql`
    mutation setCourse($input: SetCourseInput!) {
  entity {
    setCourse(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetCoursePageDocument = gql`
    mutation setCoursePage($input: SetCoursePageInput!) {
  entity {
    setCoursePage(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetEventDocument = gql`
    mutation setEvent($input: SetEventInput!) {
  entity {
    setEvent(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetExerciseDocument = gql`
    mutation setExercise($input: SetGenericEntityInput!) {
  entity {
    setExercise(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetExerciseGroupDocument = gql`
    mutation setExerciseGroup($input: SetExerciseGroupInput!) {
  entity {
    setExerciseGroup(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetGroupedExerciseDocument = gql`
    mutation setGroupedExercise($input: SetGenericEntityInput!) {
  entity {
    setGroupedExercise(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetSolutionDocument = gql`
    mutation setSolution($input: SetGenericEntityInput!) {
  entity {
    setSolution(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const SetVideoDocument = gql`
    mutation setVideo($input: SetVideoInput!) {
  entity {
    setVideo(input: $input) {
      __typename
      success
      record {
        id
      }
    }
  }
}
    `;
export const NotificationSetStateDocument = gql`
    mutation notificationSetState($input: NotificationSetStateInput!) {
  notification {
    setState(input: $input) {
      success
    }
  }
}
    `;
export const SetUuidStateDocument = gql`
    mutation setUuidState($input: UuidSetStateInput!) {
  uuid {
    setState(input: $input) {
      success
    }
  }
}
    `;
export const SubscriptionSetDocument = gql`
    mutation subscriptionSet($input: SubscriptionSetInput!) {
  subscription {
    set(input: $input) {
      success
    }
  }
}
    `;
export const TaxonomyTermSetNameAndDescriptionDocument = gql`
    mutation taxonomyTermSetNameAndDescription($input: TaxonomyTermSetNameAndDescriptionInput!) {
  taxonomyTerm {
    setNameAndDescription(input: $input) {
      success
    }
  }
}
    `;
export const TaxonomyCreateDocument = gql`
    mutation taxonomyCreate($input: TaxonomyTermCreateInput!) {
  taxonomyTerm {
    create(input: $input) {
      success
    }
  }
}
    `;
export const AddRoleDocument = gql`
    mutation addRole($input: UserRoleInput!) {
  user {
    addRole(input: $input) {
      success
    }
  }
}
    `;
export const RemoveRoleDocument = gql`
    mutation removeRole($input: UserRoleInput!) {
  user {
    removeRole(input: $input) {
      success
    }
  }
}
    `;
export const SetDescriptionDocument = gql`
    mutation setDescription($input: UserSetDescriptionInput!) {
  user {
    setDescription(input: $input) {
      success
    }
  }
}
    `;
export const DeleteBotsDocument = gql`
    mutation deleteBots($input: UserDeleteBotsInput!) {
  user {
    deleteBots(input: $input) {
      success
    }
  }
}
    `;
export const PotentialSpamUsersDocument = gql`
    query potentialSpamUsers($first: Int!, $after: String) {
  user {
    potentialSpamUsers(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        ...userData
      }
    }
  }
}
    ${UserDataFragmentDoc}`;
export const UsersByRoleDocument = gql`
    query usersByRole($role: Role!, $instance: Instance!, $first: Int, $after: String) {
  user {
    usersByRole(role: $role, instance: $instance, first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        username
        alias
      }
    }
  }
}
    `;
export const GetTaxonomyTypeDocument = gql`
    query getTaxonomyType($id: Int!) {
  uuid(id: $id) {
    ... on TaxonomyTerm {
      id
      alias
      title
      instance
      type
      ...pathToRoot
    }
  }
}
    ${PathToRootFragmentDoc}`;
export const LicensesForInstaceDocument = gql`
    query licensesForInstace($instance: Instance!) {
  license {
    licenses(instance: $instance) {
      id
      default
      title
    }
  }
}
    `;
export const RevisionsDocument = gql`
    query revisions($id: Int!) {
  uuid(id: $id) {
    id
    alias
    __typename
    title
    ... on Applet {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Article {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Course {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on CoursePage {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Event {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Exercise {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on ExerciseGroup {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on GroupedExercise {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Page {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          date
        }
      }
    }
    ... on Video {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
    ... on Solution {
      currentRevision {
        id
      }
      revisions {
        nodes {
          id
          trashed
          author {
            ...basicUserData
          }
          changes
          date
        }
      }
    }
  }
}
    ${BasicUserDataFragmentDoc}`;
export const GetUuidPathsDocument = gql`
    query getUuidPaths($id: Int!) {
  uuid(id: $id) {
    ... on AbstractTaxonomyTermChild {
      taxonomyTerms {
        nodes {
          name
          alias
          id
          instance
          ...pathToRoot
        }
      }
    }
  }
}
    ${PathToRootFragmentDoc}`;
export const PagesDocument = gql`
    query pages($instance: Instance!) {
  page {
    pages(instance: $instance) {
      id
      alias
      trashed
      currentRevision {
        title
      }
    }
  }
}
    `;
export const GetSubscriptionsDocument = gql`
    query getSubscriptions($first: Int!, $after: String) {
  subscription {
    getSubscriptions(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        sendEmail
        object {
          __typename
          id
          alias
          ... on User {
            username
          }
          ... on TaxonomyTerm {
            type
            name
          }
          ... on Exercise {
            subject {
              taxonomyTerm {
                name
              }
            }
          }
          ... on ExerciseGroup {
            subject {
              taxonomyTerm {
                name
              }
            }
          }
          ... on Page {
            currentRevision {
              title
            }
          }
          ... on Article {
            currentRevision {
              title
            }
          }
          ... on Video {
            currentRevision {
              title
            }
          }
          ... on Applet {
            currentRevision {
              title
            }
          }
          ... on CoursePage {
            currentRevision {
              title
            }
          }
          ... on Course {
            currentRevision {
              title
            }
          }
          ... on Event {
            currentRevision {
              title
            }
          }
        }
      }
    }
  }
}
    `;
export const GetNotificationsDocument = gql`
    query getNotifications($first: Int!, $unread: Boolean, $after: String) {
  notifications(first: $first, unread: $unread, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      unread
      event {
        ...eventData
      }
    }
  }
}
    ${EventDataFragmentDoc}`;
export const GetTrashedEntitiesDocument = gql`
    query getTrashedEntities($first: Int!, $after: String, $instance: Instance) {
  entity {
    deletedEntities(first: $first, after: $after, instance: $instance) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        dateOfDeletion
        entity {
          id
          alias
          title
          __typename
        }
      }
    }
  }
}
    `;
export const DefaultLicenseAgreementDocument = gql`
    query defaultLicenseAgreement($instance: Instance!) {
  license {
    defaultLicense(instance: $instance) {
      agreement
    }
  }
}
    `;
export const FetchExerciseFolderDocument = gql`
    query fetchExerciseFolder($id: Int!) {
  uuid(id: $id) {
    ... on TaxonomyTerm {
      __typename
      type
      children {
        nodes {
          ... on Exercise {
            id
            trashed
            __typename
            currentRevision {
              id
            }
          }
          ... on ExerciseGroup {
            id
            trashed
            __typename
            currentRevision {
              id
            }
          }
        }
      }
    }
  }
}
    `;
export const FetchParentQueryDocument = gql`
    query fetchParentQuery($id: Int!) {
  uuid(id: $id) {
    ... on Article {
      taxonomyTerms {
        ...taxonomyTerm
      }
    }
  }
}
    ${TaxonomyTermFragmentDoc}`;
export const MediaUploadDocument = gql`
    query mediaUpload($mediaType: MediaType!) {
  media {
    newUpload(mediaType: $mediaType) {
      uploadUrl
      urlAfterUpload
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    oauthLogin(variables: OauthLoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OauthLoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<OauthLoginMutation>(OauthLoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'oauthLogin', 'mutation');
    },
    oauthConsent(variables: OauthConsentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OauthConsentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<OauthConsentMutation>(OauthConsentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'oauthConsent', 'mutation');
    },
    oauthLogout(variables: OauthLogoutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OauthLogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<OauthLogoutMutation>(OauthLogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'oauthLogout', 'mutation');
    },
    uuidSimple(variables: UuidSimpleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UuidSimpleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UuidSimpleQuery>(UuidSimpleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'uuidSimple', 'query');
    },
    unreadNotifications(variables?: UnreadNotificationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UnreadNotificationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnreadNotificationsQuery>(UnreadNotificationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unreadNotifications', 'query');
    },
    getEventData(variables?: GetEventDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetEventDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventDataQuery>(GetEventDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEventData', 'query');
    },
    userRevision(variables?: UserRevisionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserRevisionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserRevisionQuery>(UserRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userRevision', 'query');
    },
    licenseDetails(variables: LicenseDetailsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LicenseDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LicenseDetailsQuery>(LicenseDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'licenseDetails', 'query');
    },
    mainUuid(variables?: MainUuidQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MainUuidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MainUuidQuery>(MainUuidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'mainUuid', 'query');
    },
    RevisionUuid(variables?: RevisionUuidQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RevisionUuidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RevisionUuidQuery>(RevisionUuidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RevisionUuid', 'query');
    },
    unrevisedRevisions(variables: UnrevisedRevisionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UnrevisedRevisionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnrevisedRevisionsQuery>(UnrevisedRevisionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unrevisedRevisions', 'query');
    },
    getAllThreads(variables: GetAllThreadsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllThreadsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllThreadsQuery>(GetAllThreadsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllThreads', 'query');
    },
    getComments(variables: GetCommentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCommentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCommentsQuery>(GetCommentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getComments', 'query');
    },
    userUuid(variables: UserUuidQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserUuidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserUuidQuery>(UserUuidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userUuid', 'query');
    },
    isSubscribed(variables: IsSubscribedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<IsSubscribedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IsSubscribedQuery>(IsSubscribedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'isSubscribed', 'query');
    },
    taxonomyTermCreateEntityLink(variables: TaxonomyTermCreateEntityLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TaxonomyTermCreateEntityLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TaxonomyTermCreateEntityLinkMutation>(TaxonomyTermCreateEntityLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'taxonomyTermCreateEntityLink', 'mutation');
    },
    taxonomyTermDeleteEntityLink(variables: TaxonomyTermDeleteEntityLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TaxonomyTermDeleteEntityLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TaxonomyTermDeleteEntityLinkMutation>(TaxonomyTermDeleteEntityLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'taxonomyTermDeleteEntityLink', 'mutation');
    },
    taxonomyTermSort(variables: TaxonomyTermSortMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TaxonomyTermSortMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TaxonomyTermSortMutation>(TaxonomyTermSortDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'taxonomyTermSort', 'mutation');
    },
    threadSetArchived(variables: ThreadSetArchivedMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ThreadSetArchivedMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ThreadSetArchivedMutation>(ThreadSetArchivedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'threadSetArchived', 'mutation');
    },
    threadSetState(variables: ThreadSetStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ThreadSetStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ThreadSetStateMutation>(ThreadSetStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'threadSetState', 'mutation');
    },
    threadSetCommentState(variables: ThreadSetCommentStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ThreadSetCommentStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ThreadSetCommentStateMutation>(ThreadSetCommentStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'threadSetCommentState', 'mutation');
    },
    createThread(variables: CreateThreadMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateThreadMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateThreadMutation>(CreateThreadDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createThread', 'mutation');
    },
    createComment(variables: CreateCommentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCommentMutation>(CreateCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createComment', 'mutation');
    },
    editComment(variables: EditCommentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EditCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditCommentMutation>(EditCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editComment', 'mutation');
    },
    addPageRevision(variables: AddPageRevisionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddPageRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddPageRevisionMutation>(AddPageRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addPageRevision', 'mutation');
    },
    createPage(variables: CreatePageMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePageMutation>(CreatePageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPage', 'mutation');
    },
    sort(variables: SortMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SortMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SortMutation>(SortDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sort', 'mutation');
    },
    updateLicense(variables: UpdateLicenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateLicenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateLicenseMutation>(UpdateLicenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateLicense', 'mutation');
    },
    rejectRevision(variables: RejectRevisionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RejectRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RejectRevisionMutation>(RejectRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'rejectRevision', 'mutation');
    },
    checkoutRevision(variables: CheckoutRevisionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CheckoutRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckoutRevisionMutation>(CheckoutRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkoutRevision', 'mutation');
    },
    checkoutPageRevision(variables: CheckoutPageRevisionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CheckoutPageRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckoutPageRevisionMutation>(CheckoutPageRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkoutPageRevision', 'mutation');
    },
    setApplet(variables: SetAppletMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetAppletMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetAppletMutation>(SetAppletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setApplet', 'mutation');
    },
    setArticle(variables: SetArticleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetArticleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetArticleMutation>(SetArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setArticle', 'mutation');
    },
    setCourse(variables: SetCourseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetCourseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetCourseMutation>(SetCourseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setCourse', 'mutation');
    },
    setCoursePage(variables: SetCoursePageMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetCoursePageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetCoursePageMutation>(SetCoursePageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setCoursePage', 'mutation');
    },
    setEvent(variables: SetEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetEventMutation>(SetEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setEvent', 'mutation');
    },
    setExercise(variables: SetExerciseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetExerciseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetExerciseMutation>(SetExerciseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setExercise', 'mutation');
    },
    setExerciseGroup(variables: SetExerciseGroupMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetExerciseGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetExerciseGroupMutation>(SetExerciseGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setExerciseGroup', 'mutation');
    },
    setGroupedExercise(variables: SetGroupedExerciseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetGroupedExerciseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetGroupedExerciseMutation>(SetGroupedExerciseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setGroupedExercise', 'mutation');
    },
    setSolution(variables: SetSolutionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetSolutionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetSolutionMutation>(SetSolutionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setSolution', 'mutation');
    },
    setVideo(variables: SetVideoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetVideoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetVideoMutation>(SetVideoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setVideo', 'mutation');
    },
    notificationSetState(variables: NotificationSetStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<NotificationSetStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NotificationSetStateMutation>(NotificationSetStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'notificationSetState', 'mutation');
    },
    setUuidState(variables: SetUuidStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetUuidStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetUuidStateMutation>(SetUuidStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setUuidState', 'mutation');
    },
    subscriptionSet(variables: SubscriptionSetMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SubscriptionSetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubscriptionSetMutation>(SubscriptionSetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'subscriptionSet', 'mutation');
    },
    taxonomyTermSetNameAndDescription(variables: TaxonomyTermSetNameAndDescriptionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TaxonomyTermSetNameAndDescriptionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TaxonomyTermSetNameAndDescriptionMutation>(TaxonomyTermSetNameAndDescriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'taxonomyTermSetNameAndDescription', 'mutation');
    },
    taxonomyCreate(variables: TaxonomyCreateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TaxonomyCreateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TaxonomyCreateMutation>(TaxonomyCreateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'taxonomyCreate', 'mutation');
    },
    addRole(variables: AddRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddRoleMutation>(AddRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addRole', 'mutation');
    },
    removeRole(variables: RemoveRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RemoveRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveRoleMutation>(RemoveRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeRole', 'mutation');
    },
    setDescription(variables: SetDescriptionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetDescriptionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetDescriptionMutation>(SetDescriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setDescription', 'mutation');
    },
    deleteBots(variables: DeleteBotsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteBotsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteBotsMutation>(DeleteBotsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteBots', 'mutation');
    },
    potentialSpamUsers(variables: PotentialSpamUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PotentialSpamUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PotentialSpamUsersQuery>(PotentialSpamUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'potentialSpamUsers', 'query');
    },
    usersByRole(variables: UsersByRoleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UsersByRoleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersByRoleQuery>(UsersByRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'usersByRole', 'query');
    },
    getTaxonomyType(variables: GetTaxonomyTypeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTaxonomyTypeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTaxonomyTypeQuery>(GetTaxonomyTypeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTaxonomyType', 'query');
    },
    licensesForInstace(variables: LicensesForInstaceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LicensesForInstaceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LicensesForInstaceQuery>(LicensesForInstaceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'licensesForInstace', 'query');
    },
    revisions(variables: RevisionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RevisionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RevisionsQuery>(RevisionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'revisions', 'query');
    },
    getUuidPaths(variables: GetUuidPathsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUuidPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUuidPathsQuery>(GetUuidPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUuidPaths', 'query');
    },
    pages(variables: PagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesQuery>(PagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pages', 'query');
    },
    getSubscriptions(variables: GetSubscriptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSubscriptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSubscriptionsQuery>(GetSubscriptionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSubscriptions', 'query');
    },
    getNotifications(variables: GetNotificationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetNotificationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNotificationsQuery>(GetNotificationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNotifications', 'query');
    },
    getTrashedEntities(variables: GetTrashedEntitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTrashedEntitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTrashedEntitiesQuery>(GetTrashedEntitiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTrashedEntities', 'query');
    },
    defaultLicenseAgreement(variables: DefaultLicenseAgreementQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DefaultLicenseAgreementQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DefaultLicenseAgreementQuery>(DefaultLicenseAgreementDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'defaultLicenseAgreement', 'query');
    },
    fetchExerciseFolder(variables: FetchExerciseFolderQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FetchExerciseFolderQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FetchExerciseFolderQuery>(FetchExerciseFolderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchExerciseFolder', 'query');
    },
    fetchParentQuery(variables: FetchParentQueryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FetchParentQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FetchParentQueryQuery>(FetchParentQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchParentQuery', 'query');
    },
    mediaUpload(variables: MediaUploadQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MediaUploadQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MediaUploadQuery>(MediaUploadDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'mediaUpload', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;