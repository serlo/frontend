/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: string;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AbstractEntity = {
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  subject?: Maybe<Subject>;
  trashed: Scalars['Boolean'];
};


export type AbstractEntityEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AbstractEntityConnection = {
  __typename?: 'AbstractEntityConnection';
  edges: Array<AbstractEntityCursor>;
  nodes: Array<AbstractEntity>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AbstractEntityCursor = {
  __typename?: 'AbstractEntityCursor';
  cursor: Scalars['String'];
  node: AbstractEntity;
};

export type AbstractEntityRevision = {
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
};


export type AbstractEntityRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AbstractExercise = {
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<AbstractExerciseRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  solution?: Maybe<Solution>;
  trashed: Scalars['Boolean'];
};


export type AbstractExerciseEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AbstractExerciseRevision = {
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
};


export type AbstractExerciseRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AbstractNavigationChild = {
  navigation?: Maybe<Navigation>;
};

export type AbstractNotificationEvent = {
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
};

export type AbstractNotificationEventConnection = {
  __typename?: 'AbstractNotificationEventConnection';
  edges: Array<AbstractNotificationEventEdge>;
  nodes: Array<AbstractNotificationEvent>;
  pageInfo: HasNextPageInfo;
};

export type AbstractNotificationEventEdge = {
  __typename?: 'AbstractNotificationEventEdge';
  cursor: Scalars['String'];
  node: AbstractNotificationEvent;
};

export type AbstractRepository = {
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type AbstractRepositoryEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AbstractRepositoryThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type AbstractRevision = {
  alias?: Maybe<Scalars['String']>;
  author: User;
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type AbstractRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AbstractRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type AbstractTaxonomyTermChild = {
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  taxonomyTerms: TaxonomyTermConnection;
  trashed: Scalars['Boolean'];
};


export type AbstractTaxonomyTermChildEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AbstractTaxonomyTermChildTaxonomyTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AbstractUuid = {
  alias?: Maybe<Scalars['String']>;
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
};


export type AbstractUuidEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AbstractUuidConnection = {
  __typename?: 'AbstractUuidConnection';
  edges: Array<AbstractUuidCursor>;
  nodes: Array<AbstractUuid>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AbstractUuidCursor = {
  __typename?: 'AbstractUuidCursor';
  cursor: Scalars['String'];
  node: AbstractUuid;
};

export type AddAppletRevisionInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId: Scalars['Int'];
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type AddArticleRevisionInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId: Scalars['Int'];
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
};

export type AddCoursePageRevisionInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
};

export type AddCourseRevisionInput = {
  changes: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  entityId: Scalars['Int'];
  metaDescription?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
};

export type AddEventRevisionInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId: Scalars['Int'];
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
};

export type AddExerciseGroupRevisionInput = {
  changes: Scalars['String'];
  cohesive: Scalars['Boolean'];
  content: Scalars['String'];
  entityId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
};

export type AddGenericRevisionInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
};

export type AddRevisionResponse = {
  __typename?: 'AddRevisionResponse';
  query: Query;
  revisionId?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type AddVideoRevisionInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type AliasInput = {
  instance: Instance;
  path: Scalars['String'];
};

export type AllThreadsConnection = {
  __typename?: 'AllThreadsConnection';
  edges: Array<ThreadsCursor>;
  nodes: Array<Thread>;
  pageInfo: HasNextPageInfo;
  totalCount: Scalars['Int'];
};

export type Applet = AbstractEntity & AbstractRepository & AbstractTaxonomyTermChild & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'Applet';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<AppletRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: AppletRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type AppletEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AppletRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type AppletTaxonomyTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AppletThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type AppletRevision = AbstractEntityRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'AppletRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  metaDescription: Scalars['String'];
  metaTitle: Scalars['String'];
  repository: Applet;
  threads: ThreadsConnection;
  title: Scalars['String'];
  trashed: Scalars['Boolean'];
  url: Scalars['String'];
};


export type AppletRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AppletRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type AppletRevisionConnection = {
  __typename?: 'AppletRevisionConnection';
  edges: Array<AppletRevisionCursor>;
  nodes: Array<AppletRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AppletRevisionCursor = {
  __typename?: 'AppletRevisionCursor';
  cursor: Scalars['String'];
  node: AppletRevision;
};

export type Article = AbstractEntity & AbstractRepository & AbstractTaxonomyTermChild & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'Article';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<ArticleRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: ArticleRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type ArticleEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ArticleRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type ArticleTaxonomyTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ArticleThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type ArticleRevision = AbstractEntityRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'ArticleRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  metaDescription: Scalars['String'];
  metaTitle: Scalars['String'];
  repository: Article;
  threads: ThreadsConnection;
  title: Scalars['String'];
  trashed: Scalars['Boolean'];
};


export type ArticleRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ArticleRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type ArticleRevisionConnection = {
  __typename?: 'ArticleRevisionConnection';
  edges: Array<ArticleRevisionCursor>;
  nodes: Array<ArticleRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ArticleRevisionCursor = {
  __typename?: 'ArticleRevisionCursor';
  cursor: Scalars['String'];
  node: ArticleRevision;
};

export type CacheRemoveInput = {
  key: Scalars['String'];
};

export type CacheRemoveResponse = {
  __typename?: 'CacheRemoveResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type CacheSetInput = {
  key: Scalars['String'];
  value: Scalars['JSON'];
};

export type CacheSetResponse = {
  __typename?: 'CacheSetResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type CacheUpdateInput = {
  keys: Array<Scalars['String']>;
};

export type CacheUpdateResponse = {
  __typename?: 'CacheUpdateResponse';
  success: Scalars['Boolean'];
};

export type CheckoutRevisionInput = {
  reason: Scalars['String'];
  revisionId: Scalars['Int'];
};

export type CheckoutRevisionNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CheckoutRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  reason: Scalars['String'];
  repository: AbstractRepository;
  revision: AbstractRevision;
};

export type CheckoutRevisionResponse = {
  __typename?: 'CheckoutRevisionResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type Comment = AbstractUuid & {
  __typename?: 'Comment';
  alias: Scalars['String'];
  archived: Scalars['Boolean'];
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  legacyObject: AbstractUuid;
  title: Scalars['String'];
  trashed: Scalars['Boolean'];
};


export type CommentEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges: Array<CommentEdge>;
  nodes: Array<Comment>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node: Comment;
};

export type Course = AbstractEntity & AbstractRepository & AbstractTaxonomyTermChild & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'Course';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<CourseRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  pages: Array<CoursePage>;
  revisions: CourseRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type CourseEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CoursePagesArgs = {
  hasCurrentRevision?: InputMaybe<Scalars['Boolean']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};


export type CourseRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type CourseTaxonomyTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CourseThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type CoursePage = AbstractEntity & AbstractRepository & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'CoursePage';
  alias?: Maybe<Scalars['String']>;
  course: Course;
  currentRevision?: Maybe<CoursePageRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: CoursePageRevisionConnection;
  subject?: Maybe<Subject>;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type CoursePageEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CoursePageRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type CoursePageThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type CoursePageRevision = AbstractEntityRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'CoursePageRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  repository: CoursePage;
  threads: ThreadsConnection;
  title: Scalars['String'];
  trashed: Scalars['Boolean'];
};


export type CoursePageRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CoursePageRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type CoursePageRevisionConnection = {
  __typename?: 'CoursePageRevisionConnection';
  edges: Array<CoursePageRevisionCursor>;
  nodes: Array<CoursePageRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CoursePageRevisionCursor = {
  __typename?: 'CoursePageRevisionCursor';
  cursor: Scalars['String'];
  node: CoursePageRevision;
};

export type CourseRevision = AbstractEntityRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'CourseRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  metaDescription: Scalars['String'];
  repository: Course;
  threads: ThreadsConnection;
  title: Scalars['String'];
  trashed: Scalars['Boolean'];
};


export type CourseRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CourseRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type CourseRevisionConnection = {
  __typename?: 'CourseRevisionConnection';
  edges: Array<CourseRevisionCursor>;
  nodes: Array<CourseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CourseRevisionCursor = {
  __typename?: 'CourseRevisionCursor';
  cursor: Scalars['String'];
  node: CourseRevision;
};

export type CreateAppletInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  taxonomyTermId: Scalars['Int'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type CreateArticleInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  taxonomyTermId: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateCommentNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateCommentNotificationEvent';
  actor: User;
  comment: Comment;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  thread: Thread;
};

export type CreateCourseInput = {
  changes: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  instance: Instance;
  licenseId: Scalars['Int'];
  metaDescription?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  taxonomyTermId: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateCoursePageInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  parentId: Scalars['Int'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
};

export type CreateEntityLinkNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateEntityLinkNotificationEvent';
  actor: User;
  child: AbstractEntity;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent: AbstractEntity;
};

export type CreateEntityNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateEntityNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  entity: AbstractEntity;
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
};

export type CreateEntityResponse = {
  __typename?: 'CreateEntityResponse';
  query: Query;
  record?: Maybe<AbstractEntity>;
  success: Scalars['Boolean'];
};

export type CreateEntityRevisionNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateEntityRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  entity: AbstractRepository;
  entityRevision: AbstractRevision;
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
};

export type CreateEventInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  taxonomyTermId: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateExerciseGroupInput = {
  changes: Scalars['String'];
  cohesive: Scalars['Boolean'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  taxonomyTermId: Scalars['Int'];
};

export type CreateExerciseInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  taxonomyTermId: Scalars['Int'];
};

export type CreateGroupedExerciseInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  parentId: Scalars['Int'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
};

export type CreatePageInput = {
  content: Scalars['String'];
  discussionsEnabled: Scalars['Boolean'];
  forumId?: InputMaybe<Scalars['Int']>;
  instance: Instance;
  licenseId: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateSolutionInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  parentId: Scalars['Int'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
};

export type CreateTaxonomyLinkNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateTaxonomyLinkNotificationEvent';
  actor: User;
  child: AbstractUuid;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent: TaxonomyTerm;
};

export type CreateTaxonomyTermNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateTaxonomyTermNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  taxonomyTerm: TaxonomyTerm;
};

export type CreateThreadNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateThreadNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  object: AbstractUuid;
  objectId: Scalars['Int'];
  thread: Thread;
};

export type CreateVideoInput = {
  changes: Scalars['String'];
  content: Scalars['String'];
  instance: Instance;
  licenseId: Scalars['Int'];
  needsReview: Scalars['Boolean'];
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  taxonomyTermId: Scalars['Int'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type EntityMetadataConnection = {
  __typename?: 'EntityMetadataConnection';
  edges: Array<EntityMetadataCursor>;
  nodes: Array<Scalars['JSONObject']>;
  pageInfo: HasNextPageInfo;
};

export type EntityMetadataCursor = {
  __typename?: 'EntityMetadataCursor';
  cursor: Scalars['String'];
  node: Scalars['JSONObject'];
};

export type EntityMutation = {
  __typename?: 'EntityMutation';
  addAppletRevision: AddRevisionResponse;
  addArticleRevision: AddRevisionResponse;
  addCoursePageRevision: AddRevisionResponse;
  addCourseRevision: AddRevisionResponse;
  addEventRevision: AddRevisionResponse;
  addExerciseGroupRevision: AddRevisionResponse;
  addExerciseRevision: AddRevisionResponse;
  addGroupedExerciseRevision: AddRevisionResponse;
  addSolutionRevision: AddRevisionResponse;
  addVideoRevision: AddRevisionResponse;
  checkoutRevision: CheckoutRevisionResponse;
  createApplet: CreateEntityResponse;
  createArticle: CreateEntityResponse;
  createCourse: CreateEntityResponse;
  createCoursePage: CreateEntityResponse;
  createEvent: CreateEntityResponse;
  createExercise: CreateEntityResponse;
  createExerciseGroup: CreateEntityResponse;
  createGroupedExercise: CreateEntityResponse;
  createSolution: CreateEntityResponse;
  createVideo: CreateEntityResponse;
  rejectRevision: RejectRevisionResponse;
};


export type EntityMutationAddAppletRevisionArgs = {
  input: AddAppletRevisionInput;
};


export type EntityMutationAddArticleRevisionArgs = {
  input: AddArticleRevisionInput;
};


export type EntityMutationAddCoursePageRevisionArgs = {
  input: AddCoursePageRevisionInput;
};


export type EntityMutationAddCourseRevisionArgs = {
  input: AddCourseRevisionInput;
};


export type EntityMutationAddEventRevisionArgs = {
  input: AddEventRevisionInput;
};


export type EntityMutationAddExerciseGroupRevisionArgs = {
  input: AddExerciseGroupRevisionInput;
};


export type EntityMutationAddExerciseRevisionArgs = {
  input: AddGenericRevisionInput;
};


export type EntityMutationAddGroupedExerciseRevisionArgs = {
  input: AddGenericRevisionInput;
};


export type EntityMutationAddSolutionRevisionArgs = {
  input: AddGenericRevisionInput;
};


export type EntityMutationAddVideoRevisionArgs = {
  input: AddVideoRevisionInput;
};


export type EntityMutationCheckoutRevisionArgs = {
  input: CheckoutRevisionInput;
};


export type EntityMutationCreateAppletArgs = {
  input: CreateAppletInput;
};


export type EntityMutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type EntityMutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type EntityMutationCreateCoursePageArgs = {
  input: CreateCoursePageInput;
};


export type EntityMutationCreateEventArgs = {
  input: CreateEventInput;
};


export type EntityMutationCreateExerciseArgs = {
  input: CreateExerciseInput;
};


export type EntityMutationCreateExerciseGroupArgs = {
  input: CreateExerciseGroupInput;
};


export type EntityMutationCreateGroupedExerciseArgs = {
  input: CreateGroupedExerciseInput;
};


export type EntityMutationCreateSolutionArgs = {
  input: CreateSolutionInput;
};


export type EntityMutationCreateVideoArgs = {
  input: CreateVideoInput;
};


export type EntityMutationRejectRevisionArgs = {
  input: RejectRevisionInput;
};

export type Event = AbstractEntity & AbstractRepository & AbstractTaxonomyTermChild & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'Event';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<EventRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: EventRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type EventEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type EventRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type EventTaxonomyTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type EventThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type EventRevision = AbstractEntityRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'EventRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  metaDescription: Scalars['String'];
  metaTitle: Scalars['String'];
  repository: Event;
  threads: ThreadsConnection;
  title: Scalars['String'];
  trashed: Scalars['Boolean'];
};


export type EventRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type EventRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type EventRevisionConnection = {
  __typename?: 'EventRevisionConnection';
  edges: Array<EventRevisionCursor>;
  nodes: Array<EventRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type EventRevisionCursor = {
  __typename?: 'EventRevisionCursor';
  cursor: Scalars['String'];
  node: EventRevision;
};

export type Exercise = AbstractEntity & AbstractExercise & AbstractRepository & AbstractTaxonomyTermChild & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'Exercise';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<ExerciseRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: ExerciseRevisionConnection;
  solution?: Maybe<Solution>;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type ExerciseEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ExerciseRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type ExerciseTaxonomyTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ExerciseThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type ExerciseGroup = AbstractEntity & AbstractRepository & AbstractTaxonomyTermChild & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'ExerciseGroup';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<ExerciseGroupRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  exercises: Array<GroupedExercise>;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: ExerciseGroupRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type ExerciseGroupEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ExerciseGroupRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type ExerciseGroupTaxonomyTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ExerciseGroupThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type ExerciseGroupRevision = AbstractEntityRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'ExerciseGroupRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  cohesive: Scalars['Boolean'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  repository: ExerciseGroup;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type ExerciseGroupRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ExerciseGroupRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type ExerciseGroupRevisionConnection = {
  __typename?: 'ExerciseGroupRevisionConnection';
  edges: Array<ExerciseGroupRevisionCursor>;
  nodes: Array<ExerciseGroupRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ExerciseGroupRevisionCursor = {
  __typename?: 'ExerciseGroupRevisionCursor';
  cursor: Scalars['String'];
  node: ExerciseGroupRevision;
};

export type ExerciseRevision = AbstractEntityRevision & AbstractExerciseRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'ExerciseRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  repository: Exercise;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type ExerciseRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ExerciseRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type ExerciseRevisionConnection = {
  __typename?: 'ExerciseRevisionConnection';
  edges: Array<ExerciseRevisionCursor>;
  nodes: Array<ExerciseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ExerciseRevisionCursor = {
  __typename?: 'ExerciseRevisionCursor';
  cursor: Scalars['String'];
  node: ExerciseRevision;
};

export type GroupedExercise = AbstractEntity & AbstractExercise & AbstractRepository & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'GroupedExercise';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<GroupedExerciseRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  exerciseGroup: ExerciseGroup;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: GroupedExerciseRevisionConnection;
  solution?: Maybe<Solution>;
  subject?: Maybe<Subject>;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type GroupedExerciseEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type GroupedExerciseRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type GroupedExerciseThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type GroupedExerciseRevision = AbstractEntityRevision & AbstractExerciseRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'GroupedExerciseRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  repository: GroupedExercise;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type GroupedExerciseRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type GroupedExerciseRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type GroupedExerciseRevisionConnection = {
  __typename?: 'GroupedExerciseRevisionConnection';
  edges: Array<GroupedExerciseRevisionCursor>;
  nodes: Array<GroupedExerciseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GroupedExerciseRevisionCursor = {
  __typename?: 'GroupedExerciseRevisionCursor';
  cursor: Scalars['String'];
  node: GroupedExerciseRevision;
};

export type HasNextPageInfo = {
  __typename?: 'HasNextPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
};

export enum Instance {
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Hi = 'hi',
  Ta = 'ta'
}

export type InstanceAware = {
  instance: Instance;
};

export type License = {
  __typename?: 'License';
  agreement: Scalars['String'];
  content: Scalars['String'];
  default: Scalars['Boolean'];
  iconHref: Scalars['String'];
  id: Scalars['Int'];
  instance: Instance;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type MetadataQuery = {
  __typename?: 'MetadataQuery';
  entities: EntityMetadataConnection;
  publisher: Scalars['JSONObject'];
};


export type MetadataQueryEntitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  modifiedAfter?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _cache: _CacheMutation;
  entity: EntityMutation;
  notification: NotificationMutation;
  page: PageMutation;
  subscription: SubscriptionMutation;
  taxonomyTerm: TaxonomyTermMutation;
  thread: ThreadMutation;
  user: UserMutation;
  uuid: UuidMutation;
};

export type Navigation = {
  __typename?: 'Navigation';
  data: Scalars['JSON'];
  path: NavigationNodeConnection;
};


export type NavigationPathArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type NavigationNode = {
  __typename?: 'NavigationNode';
  id?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type NavigationNodeConnection = {
  __typename?: 'NavigationNodeConnection';
  edges?: Maybe<Array<Maybe<NavigationNodeEdge>>>;
  nodes: Array<NavigationNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NavigationNodeEdge = {
  __typename?: 'NavigationNodeEdge';
  cursor: Scalars['String'];
  node: NavigationNode;
};

export type Notification = {
  __typename?: 'Notification';
  event: AbstractNotificationEvent;
  id: Scalars['Int'];
  unread: Scalars['Boolean'];
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  edges: Array<NotificationEdge>;
  nodes: Array<Notification>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String'];
  node: Notification;
};

export type NotificationMutation = {
  __typename?: 'NotificationMutation';
  setState?: Maybe<NotificationSetStateResponse>;
};


export type NotificationMutationSetStateArgs = {
  input: NotificationSetStateInput;
};

export type NotificationSetStateInput = {
  id: Array<Scalars['Int']>;
  unread: Scalars['Boolean'];
};

export type NotificationSetStateResponse = {
  __typename?: 'NotificationSetStateResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type Page = AbstractNavigationChild & AbstractRepository & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'Page';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<PageRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  navigation?: Maybe<Navigation>;
  revisions: PageRevisionConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type PageEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PageRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type PageThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type PageAddRevisionInput = {
  content: Scalars['String'];
  pageId: Scalars['Int'];
  title: Scalars['String'];
};

export type PageCreateResponse = {
  __typename?: 'PageCreateResponse';
  query: Query;
  record?: Maybe<Page>;
  success: Scalars['Boolean'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PageMutation = {
  __typename?: 'PageMutation';
  addRevision: AddRevisionResponse;
  checkoutRevision: CheckoutRevisionResponse;
  create: PageCreateResponse;
  rejectRevision: RejectRevisionResponse;
};


export type PageMutationAddRevisionArgs = {
  input: PageAddRevisionInput;
};


export type PageMutationCheckoutRevisionArgs = {
  input: CheckoutRevisionInput;
};


export type PageMutationCreateArgs = {
  input: CreatePageInput;
};


export type PageMutationRejectRevisionArgs = {
  input: RejectRevisionInput;
};

export type PageRevision = AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'PageRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  repository: Page;
  threads: ThreadsConnection;
  title: Scalars['String'];
  trashed: Scalars['Boolean'];
};


export type PageRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PageRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type PageRevisionConnection = {
  __typename?: 'PageRevisionConnection';
  edges: Array<PageRevisionCursor>;
  nodes: Array<PageRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PageRevisionCursor = {
  __typename?: 'PageRevisionCursor';
  cursor: Scalars['String'];
  node: PageRevision;
};

export type Query = {
  __typename?: 'Query';
  activeAuthors: UserConnection;
  activeDonors: UserConnection;
  activeReviewers: UserConnection;
  authorization: Scalars['JSON'];
  events: AbstractNotificationEventConnection;
  license?: Maybe<License>;
  metadata: MetadataQuery;
  notificationEvent?: Maybe<AbstractNotificationEvent>;
  notifications: NotificationConnection;
  subject: SubjectQuery;
  subscription: SubscriptionQuery;
  thread: ThreadQuery;
  user: UserQuery;
  uuid?: Maybe<AbstractUuid>;
};


export type QueryActiveAuthorsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryActiveDonorsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryActiveReviewersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
  objectId?: InputMaybe<Scalars['Int']>;
};


export type QueryLicenseArgs = {
  id: Scalars['Int'];
};


export type QueryNotificationEventArgs = {
  id: Scalars['Int'];
};


export type QueryNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unread?: InputMaybe<Scalars['Boolean']>;
};


export type QueryUuidArgs = {
  alias?: InputMaybe<AliasInput>;
  id?: InputMaybe<Scalars['Int']>;
};

export type RejectRevisionInput = {
  reason: Scalars['String'];
  revisionId: Scalars['Int'];
};

export type RejectRevisionNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'RejectRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  reason: Scalars['String'];
  repository: AbstractRepository;
  revision: AbstractRevision;
};

export type RejectRevisionResponse = {
  __typename?: 'RejectRevisionResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type RemoveEntityLinkNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'RemoveEntityLinkNotificationEvent';
  actor: User;
  child: AbstractEntity;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent: AbstractEntity;
};

export type RemoveTaxonomyLinkNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'RemoveTaxonomyLinkNotificationEvent';
  actor: User;
  child: AbstractUuid;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent: TaxonomyTerm;
};

export enum Role {
  Admin = 'admin',
  Architect = 'architect',
  Guest = 'guest',
  Login = 'login',
  Moderator = 'moderator',
  Reviewer = 'reviewer',
  StaticPagesBuilder = 'staticPagesBuilder',
  Sysadmin = 'sysadmin'
}

export type ScopedRole = {
  __typename?: 'ScopedRole';
  role: Role;
  scope?: Maybe<Scalars['String']>;
};

export type ScopedRoleConnection = {
  __typename?: 'ScopedRoleConnection';
  edges: Array<ScopedRoleCursor>;
  nodes: Array<ScopedRole>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ScopedRoleCursor = {
  __typename?: 'ScopedRoleCursor';
  cursor: Scalars['String'];
  node: ScopedRole;
};

export type SetLicenseNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetLicenseNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  repository: AbstractRepository;
};

export type SetTaxonomyParentNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetTaxonomyParentNotificationEvent';
  actor: User;
  child: TaxonomyTerm;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent?: Maybe<TaxonomyTerm>;
  previousParent?: Maybe<TaxonomyTerm>;
};

export type SetTaxonomyTermNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetTaxonomyTermNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  taxonomyTerm: TaxonomyTerm;
};

export type SetThreadStateNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetThreadStateNotificationEvent';
  actor: User;
  archived: Scalars['Boolean'];
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  thread: Thread;
};

export type SetUuidStateNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetUuidStateNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  object: AbstractUuid;
  objectId: Scalars['Int'];
  trashed: Scalars['Boolean'];
};

export type Solution = AbstractEntity & AbstractRepository & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'Solution';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<SolutionRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  exercise: AbstractExercise;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: SolutionRevisionConnection;
  subject?: Maybe<Subject>;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type SolutionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SolutionRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type SolutionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type SolutionRevision = AbstractEntityRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'SolutionRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  repository: Solution;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type SolutionRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SolutionRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type SolutionRevisionConnection = {
  __typename?: 'SolutionRevisionConnection';
  edges: Array<SolutionRevisionCursor>;
  nodes: Array<SolutionRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SolutionRevisionCursor = {
  __typename?: 'SolutionRevisionCursor';
  cursor: Scalars['String'];
  node: SolutionRevision;
};

export type Subject = {
  __typename?: 'Subject';
  id: Scalars['String'];
  taxonomyTerm: TaxonomyTerm;
  unrevisedEntities: AbstractEntityConnection;
};


export type SubjectUnrevisedEntitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type SubjectQuery = {
  __typename?: 'SubjectQuery';
  subject?: Maybe<Subject>;
  subjects: Array<Subject>;
};


export type SubjectQuerySubjectArgs = {
  id: Scalars['String'];
};


export type SubjectQuerySubjectsArgs = {
  instance: Instance;
};

export type SubscriptionConnection = {
  __typename?: 'SubscriptionConnection';
  edges: Array<SubscriptionCursor>;
  nodes: Array<SubscriptionInfo>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubscriptionCursor = {
  __typename?: 'SubscriptionCursor';
  cursor: Scalars['String'];
  node: SubscriptionInfo;
};

export type SubscriptionInfo = {
  __typename?: 'SubscriptionInfo';
  object: AbstractUuid;
  sendEmail: Scalars['Boolean'];
};

export type SubscriptionMutation = {
  __typename?: 'SubscriptionMutation';
  set?: Maybe<SubscriptionSetResponse>;
};


export type SubscriptionMutationSetArgs = {
  input: SubscriptionSetInput;
};

export type SubscriptionQuery = {
  __typename?: 'SubscriptionQuery';
  currentUserHasSubscribed: Scalars['Boolean'];
  getSubscriptions: SubscriptionConnection;
};


export type SubscriptionQueryCurrentUserHasSubscribedArgs = {
  id: Scalars['Int'];
};


export type SubscriptionQueryGetSubscriptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type SubscriptionSetInput = {
  id: Array<Scalars['Int']>;
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
};

export type SubscriptionSetResponse = {
  __typename?: 'SubscriptionSetResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type TaxonomyTerm = AbstractNavigationChild & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'TaxonomyTerm';
  alias?: Maybe<Scalars['String']>;
  children: AbstractUuidConnection;
  description?: Maybe<Scalars['String']>;
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  name: Scalars['String'];
  navigation?: Maybe<Navigation>;
  parent?: Maybe<TaxonomyTerm>;
  taxonomyId: Scalars['Int'];
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
  type: TaxonomyTermType;
  weight: Scalars['Int'];
};


export type TaxonomyTermChildrenArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type TaxonomyTermEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type TaxonomyTermThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type TaxonomyTermConnection = {
  __typename?: 'TaxonomyTermConnection';
  edges?: Maybe<Array<Maybe<TaxonomyTermEdge>>>;
  nodes: Array<TaxonomyTerm>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TaxonomyTermEdge = {
  __typename?: 'TaxonomyTermEdge';
  cursor: Scalars['String'];
  node: TaxonomyTerm;
};

export type TaxonomyTermMutation = {
  __typename?: 'TaxonomyTermMutation';
  setNameAndDescription: TaxonomyTermSetNameAndDescriptionResponse;
};


export type TaxonomyTermMutationSetNameAndDescriptionArgs = {
  input: TaxonomyTermSetNameAndDescriptionInput;
};

export type TaxonomyTermSetNameAndDescriptionInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type TaxonomyTermSetNameAndDescriptionResponse = {
  __typename?: 'TaxonomyTermSetNameAndDescriptionResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export enum TaxonomyTermType {
  Blog = 'blog',
  Curriculum = 'curriculum',
  CurriculumTopic = 'curriculumTopic',
  CurriculumTopicFolder = 'curriculumTopicFolder',
  Forum = 'forum',
  ForumCategory = 'forumCategory',
  Locale = 'locale',
  Root = 'root',
  Subject = 'subject',
  Topic = 'topic',
  TopicFolder = 'topicFolder'
}

export type Thread = {
  __typename?: 'Thread';
  archived: Scalars['Boolean'];
  comments: CommentConnection;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  object: AbstractUuid;
  title?: Maybe<Scalars['String']>;
  trashed: Scalars['Boolean'];
};


export type ThreadCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ThreadAware = {
  threads: ThreadsConnection;
};


export type ThreadAwareThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type ThreadCreateCommentInput = {
  content: Scalars['String'];
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
  threadId: Scalars['String'];
};

export type ThreadCreateCommentResponse = {
  __typename?: 'ThreadCreateCommentResponse';
  query: Query;
  record?: Maybe<Comment>;
  success: Scalars['Boolean'];
};

export type ThreadCreateThreadInput = {
  content: Scalars['String'];
  objectId: Scalars['Int'];
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
  title: Scalars['String'];
};

export type ThreadCreateThreadResponse = {
  __typename?: 'ThreadCreateThreadResponse';
  query: Query;
  record?: Maybe<Thread>;
  success: Scalars['Boolean'];
};

export type ThreadMutation = {
  __typename?: 'ThreadMutation';
  createComment?: Maybe<ThreadCreateCommentResponse>;
  createThread?: Maybe<ThreadCreateThreadResponse>;
  setCommentState?: Maybe<ThreadSetCommentStateResponse>;
  setThreadArchived?: Maybe<ThreadSetThreadArchivedResponse>;
  setThreadState?: Maybe<ThreadSetThreadStateResponse>;
};


export type ThreadMutationCreateCommentArgs = {
  input: ThreadCreateCommentInput;
};


export type ThreadMutationCreateThreadArgs = {
  input: ThreadCreateThreadInput;
};


export type ThreadMutationSetCommentStateArgs = {
  input: ThreadSetCommentStateInput;
};


export type ThreadMutationSetThreadArchivedArgs = {
  input: ThreadSetThreadArchivedInput;
};


export type ThreadMutationSetThreadStateArgs = {
  input: ThreadSetThreadStateInput;
};

export type ThreadQuery = {
  __typename?: 'ThreadQuery';
  allThreads: AllThreadsConnection;
};


export type ThreadQueryAllThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type ThreadSetCommentStateInput = {
  id: Array<Scalars['Int']>;
  trashed: Scalars['Boolean'];
};

export type ThreadSetCommentStateResponse = {
  __typename?: 'ThreadSetCommentStateResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type ThreadSetThreadArchivedInput = {
  archived: Scalars['Boolean'];
  id: Array<Scalars['String']>;
};

export type ThreadSetThreadArchivedResponse = {
  __typename?: 'ThreadSetThreadArchivedResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type ThreadSetThreadStateInput = {
  id: Array<Scalars['String']>;
  trashed: Scalars['Boolean'];
};

export type ThreadSetThreadStateResponse = {
  __typename?: 'ThreadSetThreadStateResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type ThreadsConnection = {
  __typename?: 'ThreadsConnection';
  edges: Array<ThreadsCursor>;
  nodes: Array<Thread>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ThreadsCursor = {
  __typename?: 'ThreadsCursor';
  cursor: Scalars['String'];
  node: Thread;
};

export type User = AbstractUuid & ThreadAware & {
  __typename?: 'User';
  activityByType: UserActivityByType;
  alias?: Maybe<Scalars['String']>;
  chatUrl?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  events: AbstractNotificationEventConnection;
  eventsByUser: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  isActiveAuthor: Scalars['Boolean'];
  isActiveDonor: Scalars['Boolean'];
  isActiveReviewer: Scalars['Boolean'];
  isNewAuthor: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  motivation?: Maybe<Scalars['String']>;
  roles: ScopedRoleConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
  unrevisedEntities: AbstractEntityConnection;
  username: Scalars['String'];
};


export type UserEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserEventsByUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
  objectId?: InputMaybe<Scalars['Int']>;
};


export type UserRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};


export type UserUnrevisedEntitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserActivityByType = {
  __typename?: 'UserActivityByType';
  comments: Scalars['Int'];
  edits: Scalars['Int'];
  reviews: Scalars['Int'];
  taxonomy: Scalars['Int'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  nodes: Array<User>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserDeleteBotsInput = {
  botIds: Array<Scalars['Int']>;
};

export type UserDeleteBotsResponse = {
  __typename?: 'UserDeleteBotsResponse';
  success: Scalars['Boolean'];
};

export type UserDeleteRegularUsersInput = {
  userIds: Array<Scalars['Int']>;
};

export type UserDeleteRegularUsersResponse = {
  __typename?: 'UserDeleteRegularUsersResponse';
  reason?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  username?: Maybe<Scalars['String']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserMutation = {
  __typename?: 'UserMutation';
  deleteBots: UserDeleteBotsResponse;
  deleteRegularUsers: Array<UserDeleteRegularUsersResponse>;
  setDescription: UserSetDescriptionResponse;
  setEmail: UserSetEmailResponse;
};


export type UserMutationDeleteBotsArgs = {
  input: UserDeleteBotsInput;
};


export type UserMutationDeleteRegularUsersArgs = {
  input: UserDeleteRegularUsersInput;
};


export type UserMutationSetDescriptionArgs = {
  input: UserSetDescriptionInput;
};


export type UserMutationSetEmailArgs = {
  input: UserSetEmailInput;
};

export type UserQuery = {
  __typename?: 'UserQuery';
  potentialSpamUsers: UserConnection;
};


export type UserQueryPotentialSpamUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type UserSetDescriptionInput = {
  description: Scalars['String'];
};

export type UserSetDescriptionResponse = {
  __typename?: 'UserSetDescriptionResponse';
  success: Scalars['Boolean'];
};

export type UserSetEmailInput = {
  email: Scalars['String'];
  userId: Scalars['Int'];
};

export type UserSetEmailResponse = {
  __typename?: 'UserSetEmailResponse';
  email: Scalars['String'];
  success: Scalars['Boolean'];
  username: Scalars['String'];
};

export type UuidMutation = {
  __typename?: 'UuidMutation';
  setState?: Maybe<UuidSetStateResponse>;
};


export type UuidMutationSetStateArgs = {
  input: UuidSetStateInput;
};

export type UuidSetStateInput = {
  id: Array<Scalars['Int']>;
  trashed: Scalars['Boolean'];
};

export type UuidSetStateResponse = {
  __typename?: 'UuidSetStateResponse';
  query: Query;
  success: Scalars['Boolean'];
};

export type Video = AbstractEntity & AbstractRepository & AbstractTaxonomyTermChild & AbstractUuid & InstanceAware & ThreadAware & {
  __typename?: 'Video';
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<VideoRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  revisions: VideoRevisionConnection;
  subject?: Maybe<Subject>;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
};


export type VideoEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type VideoRevisionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
};


export type VideoTaxonomyTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type VideoThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type VideoRevision = AbstractEntityRevision & AbstractRevision & AbstractUuid & ThreadAware & {
  __typename?: 'VideoRevision';
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  repository: Video;
  threads: ThreadsConnection;
  title: Scalars['String'];
  trashed: Scalars['Boolean'];
  url: Scalars['String'];
};


export type VideoRevisionEventsArgs = {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
};


export type VideoRevisionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type VideoRevisionConnection = {
  __typename?: 'VideoRevisionConnection';
  edges: Array<VideoRevisionCursor>;
  nodes: Array<VideoRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VideoRevisionCursor = {
  __typename?: 'VideoRevisionCursor';
  cursor: Scalars['String'];
  node: VideoRevision;
};

export type _CacheMutation = {
  __typename?: '_cacheMutation';
  remove: CacheRemoveResponse;
  set: CacheSetResponse;
  update: CacheUpdateResponse;
};


export type _CacheMutationRemoveArgs = {
  input: CacheRemoveInput;
};


export type _CacheMutationSetArgs = {
  input: CacheSetInput;
};


export type _CacheMutationUpdateArgs = {
  input: CacheUpdateInput;
};

export type ArticleRevisionFragment = { __typename?: 'ArticleRevision', id: number, title: string, content: string, metaTitle: string, metaDescription: string, date: string };

export type PageRevisionFragment = { __typename?: 'PageRevision', id: number, title: string, content: string };

export type VideoRevisionFragment = { __typename?: 'VideoRevision', id: number, title: string, url: string, content: string };

export type AppletRevisionFragment = { __typename?: 'AppletRevision', id: number, title: string, content: string, url: string, metaTitle: string, metaDescription: string, date: string };

export type CoursePageRevisionFragment = { __typename?: 'CoursePageRevision', id: number, content: string, title: string, date: string };

export type ExerciseGroupRevisionFragment = { __typename?: 'ExerciseGroupRevision', id: number, content: string, cohesive: boolean, date: string };

export type EventRevisionFragment = { __typename?: 'EventRevision', id: number, title: string, content: string };

type EventData_CheckoutRevisionNotificationEvent_Fragment = { __typename: 'CheckoutRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, revision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'GroupedExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'SolutionRevision', id: number } | { __typename?: 'VideoRevision', id: number }, repository: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateCommentNotificationEvent_Fragment = { __typename: 'CreateCommentNotificationEvent', date: string, id: number, objectId: number, comment: { __typename?: 'Comment', id: number }, thread: { __typename?: 'Thread', id: string, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityLinkNotificationEvent_Fragment = { __typename: 'CreateEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename?: 'Applet', id: number, alias?: string | null } | { __typename?: 'Article', id: number, alias?: string | null } | { __typename?: 'Course', id: number, alias?: string | null } | { __typename?: 'CoursePage', id: number, alias?: string | null } | { __typename?: 'Event', id: number, alias?: string | null } | { __typename?: 'Exercise', id: number, alias?: string | null } | { __typename?: 'ExerciseGroup', id: number, alias?: string | null } | { __typename?: 'GroupedExercise', id: number, alias?: string | null } | { __typename?: 'Solution', id: number, alias?: string | null } | { __typename?: 'Video', id: number, alias?: string | null }, child: { __typename?: 'Applet', id: number, alias?: string | null } | { __typename?: 'Article', id: number, alias?: string | null } | { __typename?: 'Course', id: number, alias?: string | null } | { __typename?: 'CoursePage', id: number, alias?: string | null } | { __typename?: 'Event', id: number, alias?: string | null } | { __typename?: 'Exercise', id: number, alias?: string | null } | { __typename?: 'ExerciseGroup', id: number, alias?: string | null } | { __typename?: 'GroupedExercise', id: number, alias?: string | null } | { __typename?: 'Solution', id: number, alias?: string | null } | { __typename?: 'Video', id: number, alias?: string | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityNotificationEvent_Fragment = { __typename: 'CreateEntityNotificationEvent', date: string, id: number, objectId: number, entity: { __typename?: 'Applet', id: number, alias?: string | null } | { __typename?: 'Article', id: number, alias?: string | null } | { __typename?: 'Course', id: number, alias?: string | null } | { __typename?: 'CoursePage', id: number, alias?: string | null } | { __typename?: 'Event', id: number, alias?: string | null } | { __typename?: 'Exercise', id: number, alias?: string | null } | { __typename?: 'ExerciseGroup', id: number, alias?: string | null } | { __typename?: 'GroupedExercise', id: number, alias?: string | null } | { __typename?: 'Solution', id: number, alias?: string | null } | { __typename?: 'Video', id: number, alias?: string | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityRevisionNotificationEvent_Fragment = { __typename: 'CreateEntityRevisionNotificationEvent', date: string, id: number, objectId: number, entityRevision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'GroupedExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'SolutionRevision', id: number } | { __typename?: 'VideoRevision', id: number }, entity: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateTaxonomyLinkNotificationEvent_Fragment = { __typename: 'CreateTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'AppletRevision', id: number, alias?: string | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, alias?: string | null } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'CoursePageRevision', id: number, alias?: string | null } | { __typename: 'CourseRevision', id: number, alias?: string | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'EventRevision', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'PageRevision', id: number, alias?: string | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'SolutionRevision', id: number, alias?: string | null } | { __typename: 'TaxonomyTerm', id: number, alias?: string | null } | { __typename: 'User', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, alias?: string | null }, parent: { __typename?: 'TaxonomyTerm', id: number, alias?: string | null, name: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateTaxonomyTermNotificationEvent_Fragment = { __typename: 'CreateTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename?: 'TaxonomyTerm', id: number, name: string, alias?: string | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateThreadNotificationEvent_Fragment = { __typename: 'CreateThreadNotificationEvent', date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, content: string }> } }, object: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'AppletRevision', id: number, alias?: string | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, alias?: string | null } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'CoursePageRevision', id: number, alias?: string | null } | { __typename: 'CourseRevision', id: number, alias?: string | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'EventRevision', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'PageRevision', id: number, alias?: string | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'SolutionRevision', id: number, alias?: string | null } | { __typename: 'TaxonomyTerm', id: number, alias?: string | null } | { __typename: 'User', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, alias?: string | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RejectRevisionNotificationEvent_Fragment = { __typename: 'RejectRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, repository: { __typename?: 'Applet', id: number, alias?: string | null } | { __typename?: 'Article', id: number, alias?: string | null } | { __typename?: 'Course', id: number, alias?: string | null } | { __typename?: 'CoursePage', id: number, alias?: string | null } | { __typename?: 'Event', id: number, alias?: string | null } | { __typename?: 'Exercise', id: number, alias?: string | null } | { __typename?: 'ExerciseGroup', id: number, alias?: string | null } | { __typename?: 'GroupedExercise', id: number, alias?: string | null } | { __typename?: 'Page', id: number, alias?: string | null } | { __typename?: 'Solution', id: number, alias?: string | null } | { __typename?: 'Video', id: number, alias?: string | null }, revision: { __typename?: 'AppletRevision', id: number, alias?: string | null } | { __typename?: 'ArticleRevision', id: number, alias?: string | null } | { __typename?: 'CoursePageRevision', id: number, alias?: string | null } | { __typename?: 'CourseRevision', id: number, alias?: string | null } | { __typename?: 'EventRevision', id: number, alias?: string | null } | { __typename?: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename?: 'ExerciseRevision', id: number, alias?: string | null } | { __typename?: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename?: 'PageRevision', id: number, alias?: string | null } | { __typename?: 'SolutionRevision', id: number, alias?: string | null } | { __typename?: 'VideoRevision', id: number, alias?: string | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RemoveEntityLinkNotificationEvent_Fragment = { __typename: 'RemoveEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename?: 'Applet', id: number, alias?: string | null } | { __typename?: 'Article', id: number, alias?: string | null } | { __typename?: 'Course', id: number, alias?: string | null } | { __typename?: 'CoursePage', id: number, alias?: string | null } | { __typename?: 'Event', id: number, alias?: string | null } | { __typename?: 'Exercise', id: number, alias?: string | null } | { __typename?: 'ExerciseGroup', id: number, alias?: string | null } | { __typename?: 'GroupedExercise', id: number, alias?: string | null } | { __typename?: 'Solution', id: number, alias?: string | null } | { __typename?: 'Video', id: number, alias?: string | null }, child: { __typename?: 'Applet', id: number, alias?: string | null } | { __typename?: 'Article', id: number, alias?: string | null } | { __typename?: 'Course', id: number, alias?: string | null } | { __typename?: 'CoursePage', id: number, alias?: string | null } | { __typename?: 'Event', id: number, alias?: string | null } | { __typename?: 'Exercise', id: number, alias?: string | null } | { __typename?: 'ExerciseGroup', id: number, alias?: string | null } | { __typename?: 'GroupedExercise', id: number, alias?: string | null } | { __typename?: 'Solution', id: number, alias?: string | null } | { __typename?: 'Video', id: number, alias?: string | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RemoveTaxonomyLinkNotificationEvent_Fragment = { __typename: 'RemoveTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'AppletRevision', id: number, alias?: string | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, alias?: string | null } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'CoursePageRevision', id: number, alias?: string | null } | { __typename: 'CourseRevision', id: number, alias?: string | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'EventRevision', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'PageRevision', id: number, alias?: string | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'SolutionRevision', id: number, alias?: string | null } | { __typename: 'TaxonomyTerm', id: number, alias?: string | null } | { __typename: 'User', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, alias?: string | null }, parent: { __typename?: 'TaxonomyTerm', id: number, alias?: string | null, name: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetLicenseNotificationEvent_Fragment = { __typename: 'SetLicenseNotificationEvent', date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetTaxonomyParentNotificationEvent_Fragment = { __typename: 'SetTaxonomyParentNotificationEvent', date: string, id: number, objectId: number, child: { __typename?: 'TaxonomyTerm', id: number, alias?: string | null }, previousParent?: { __typename?: 'TaxonomyTerm', id: number, alias?: string | null } | null, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetTaxonomyTermNotificationEvent_Fragment = { __typename: 'SetTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename?: 'TaxonomyTerm', id: number, alias?: string | null, name: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetThreadStateNotificationEvent_Fragment = { __typename: 'SetThreadStateNotificationEvent', archived: boolean, date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetUuidStateNotificationEvent_Fragment = { __typename: 'SetUuidStateNotificationEvent', trashed: boolean, date: string, id: number, objectId: number, object: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'AppletRevision', id: number, alias?: string | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, alias?: string | null } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'CoursePageRevision', id: number, alias?: string | null } | { __typename: 'CourseRevision', id: number, alias?: string | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'EventRevision', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'PageRevision', id: number, alias?: string | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'SolutionRevision', id: number, alias?: string | null } | { __typename: 'TaxonomyTerm', id: number, alias?: string | null } | { __typename: 'User', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, alias?: string | null }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

export type EventDataFragment = EventData_CheckoutRevisionNotificationEvent_Fragment | EventData_CreateCommentNotificationEvent_Fragment | EventData_CreateEntityLinkNotificationEvent_Fragment | EventData_CreateEntityNotificationEvent_Fragment | EventData_CreateEntityRevisionNotificationEvent_Fragment | EventData_CreateTaxonomyLinkNotificationEvent_Fragment | EventData_CreateTaxonomyTermNotificationEvent_Fragment | EventData_CreateThreadNotificationEvent_Fragment | EventData_RejectRevisionNotificationEvent_Fragment | EventData_RemoveEntityLinkNotificationEvent_Fragment | EventData_RemoveTaxonomyLinkNotificationEvent_Fragment | EventData_SetLicenseNotificationEvent_Fragment | EventData_SetTaxonomyParentNotificationEvent_Fragment | EventData_SetTaxonomyTermNotificationEvent_Fragment | EventData_SetThreadStateNotificationEvent_Fragment | EventData_SetUuidStateNotificationEvent_Fragment;

type WithTitle_Applet_Fragment = { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null };

type WithTitle_AppletRevision_Fragment = { __typename: 'AppletRevision', id: number, alias?: string | null };

type WithTitle_Article_Fragment = { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null };

type WithTitle_ArticleRevision_Fragment = { __typename: 'ArticleRevision', id: number, alias?: string | null };

type WithTitle_Comment_Fragment = { __typename: 'Comment', id: number, alias: string };

type WithTitle_Course_Fragment = { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null };

type WithTitle_CoursePage_Fragment = { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null };

type WithTitle_CoursePageRevision_Fragment = { __typename: 'CoursePageRevision', id: number, alias?: string | null };

type WithTitle_CourseRevision_Fragment = { __typename: 'CourseRevision', id: number, alias?: string | null };

type WithTitle_Event_Fragment = { __typename: 'Event', id: number, alias?: string | null };

type WithTitle_EventRevision_Fragment = { __typename: 'EventRevision', id: number, alias?: string | null };

type WithTitle_Exercise_Fragment = { __typename: 'Exercise', id: number, alias?: string | null };

type WithTitle_ExerciseGroup_Fragment = { __typename: 'ExerciseGroup', id: number, alias?: string | null };

type WithTitle_ExerciseGroupRevision_Fragment = { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null };

type WithTitle_ExerciseRevision_Fragment = { __typename: 'ExerciseRevision', id: number, alias?: string | null };

type WithTitle_GroupedExercise_Fragment = { __typename: 'GroupedExercise', id: number, alias?: string | null };

type WithTitle_GroupedExerciseRevision_Fragment = { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null };

type WithTitle_Page_Fragment = { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null };

type WithTitle_PageRevision_Fragment = { __typename: 'PageRevision', id: number, alias?: string | null };

type WithTitle_Solution_Fragment = { __typename: 'Solution', id: number, alias?: string | null };

type WithTitle_SolutionRevision_Fragment = { __typename: 'SolutionRevision', id: number, alias?: string | null };

type WithTitle_TaxonomyTerm_Fragment = { __typename: 'TaxonomyTerm', id: number, alias?: string | null };

type WithTitle_User_Fragment = { __typename: 'User', id: number, alias?: string | null };

type WithTitle_Video_Fragment = { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null };

type WithTitle_VideoRevision_Fragment = { __typename: 'VideoRevision', id: number, alias?: string | null };

export type WithTitleFragment = WithTitle_Applet_Fragment | WithTitle_AppletRevision_Fragment | WithTitle_Article_Fragment | WithTitle_ArticleRevision_Fragment | WithTitle_Comment_Fragment | WithTitle_Course_Fragment | WithTitle_CoursePage_Fragment | WithTitle_CoursePageRevision_Fragment | WithTitle_CourseRevision_Fragment | WithTitle_Event_Fragment | WithTitle_EventRevision_Fragment | WithTitle_Exercise_Fragment | WithTitle_ExerciseGroup_Fragment | WithTitle_ExerciseGroupRevision_Fragment | WithTitle_ExerciseRevision_Fragment | WithTitle_GroupedExercise_Fragment | WithTitle_GroupedExerciseRevision_Fragment | WithTitle_Page_Fragment | WithTitle_PageRevision_Fragment | WithTitle_Solution_Fragment | WithTitle_SolutionRevision_Fragment | WithTitle_TaxonomyTerm_Fragment | WithTitle_User_Fragment | WithTitle_Video_Fragment | WithTitle_VideoRevision_Fragment;

type Exercise_Exercise_Fragment = { __typename?: 'Exercise', id: number, alias?: string | null, instance: Instance, trashed: boolean, date: string, currentRevision?: { __typename?: 'ExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type Exercise_GroupedExercise_Fragment = { __typename?: 'GroupedExercise', id: number, alias?: string | null, instance: Instance, trashed: boolean, date: string, currentRevision?: { __typename?: 'GroupedExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

export type ExerciseFragment = Exercise_Exercise_Fragment | Exercise_GroupedExercise_Fragment;

export type SolutionFragment = { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_Applet_Fragment = { __typename?: 'Applet', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_Article_Fragment = { __typename?: 'Article', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_Course_Fragment = { __typename?: 'Course', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_CoursePage_Fragment = { __typename?: 'CoursePage', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_Event_Fragment = { __typename?: 'Event', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_Exercise_Fragment = { __typename?: 'Exercise', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_GroupedExercise_Fragment = { __typename?: 'GroupedExercise', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_Page_Fragment = { __typename?: 'Page', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_Solution_Fragment = { __typename?: 'Solution', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

type License_Video_Fragment = { __typename?: 'Video', license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } };

export type LicenseFragment = License_Applet_Fragment | License_Article_Fragment | License_Course_Fragment | License_CoursePage_Fragment | License_Event_Fragment | License_Exercise_Fragment | License_ExerciseGroup_Fragment | License_GroupedExercise_Fragment | License_Page_Fragment | License_Solution_Fragment | License_Video_Fragment;

export type PathFragment = { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } };

export type UuidQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  alias?: InputMaybe<AliasInput>;
}>;


export type UuidQuery = { __typename?: 'Query', authorization: string, uuid?: { __typename: 'Applet', instance: Instance, date: string, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', id: number, title: string, content: string, url: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'AppletRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Article', instance: Instance, date: string, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', id: number, title: string, content: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'ArticleRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Comment', id: number, trashed: boolean, alias: string } | { __typename: 'Course', instance: Instance, id: number, trashed: boolean, alias?: string | null, pages: Array<{ __typename?: 'CoursePage', alias?: string | null, id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number, title: string, content: string } | null }>, currentRevision?: { __typename?: 'CourseRevision', title: string, content: string, metaDescription: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'CoursePage', instance: Instance, date: string, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', id: number, content: string, title: string, date: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', title: string }> }, course: { __typename?: 'Course', id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, pages: Array<{ __typename?: 'CoursePage', alias?: string | null, id: number, currentRevision?: { __typename?: 'CoursePageRevision', title: string, trashed: boolean } | null }>, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | { __typename: 'CoursePageRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'CourseRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Event', instance: Instance, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'EventRevision', id: number, title: string, content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'EventRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Exercise', instance: Instance, id: number, trashed: boolean, alias?: string | null, date: string, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> }, currentRevision?: { __typename?: 'ExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null } | { __typename: 'ExerciseGroup', instance: Instance, date: string, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number, content: string, cohesive: boolean, date: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number }, exercises: Array<{ __typename?: 'GroupedExercise', id: number, alias?: string | null, instance: Instance, trashed: boolean, date: string, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, currentRevision?: { __typename?: 'GroupedExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } }>, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'ExerciseGroupRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'GroupedExercise', instance: Instance, id: number, trashed: boolean, alias?: string | null, date: string, exerciseGroup: { __typename?: 'ExerciseGroup', alias?: string | null }, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, currentRevision?: { __typename?: 'GroupedExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null } | { __typename: 'GroupedExerciseRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Page', instance: Instance, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', id: number, title: string, content: string } | null, navigation?: { __typename?: 'Navigation', data: string, path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | { __typename: 'PageRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Solution', instance: Instance, id: number, trashed: boolean, alias?: string | null, exercise: { __typename?: 'Exercise', id: number } | { __typename?: 'GroupedExercise', id: number }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null } | { __typename: 'SolutionRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'TaxonomyTerm', alias?: string | null, instance: Instance, type: TaxonomyTermType, name: string, description?: string | null, weight: number, taxonomyId: number, trashed: boolean, id: number, parent?: { __typename?: 'TaxonomyTerm', id: number } | null, navigation?: { __typename?: 'Navigation', data: string, path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string }> } } | { __typename: 'AppletRevision', trashed: boolean } | { __typename: 'Article', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string }> } } | { __typename: 'ArticleRevision', trashed: boolean } | { __typename: 'Comment', trashed: boolean } | { __typename: 'Course', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }> } | { __typename: 'CoursePage', trashed: boolean } | { __typename: 'CoursePageRevision', trashed: boolean } | { __typename: 'CourseRevision', trashed: boolean } | { __typename: 'Event', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string }> } } | { __typename: 'EventRevision', trashed: boolean } | { __typename: 'Exercise', trashed: boolean, id: number, alias?: string | null, instance: Instance, date: string, currentRevision?: { __typename?: 'ExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | { __typename: 'ExerciseGroup', id: number, alias?: string | null, instance: Instance, trashed: boolean, currentRevision?: { __typename?: 'ExerciseGroupRevision', content: string } | null, exercises: Array<{ __typename?: 'GroupedExercise', id: number, alias?: string | null, instance: Instance, trashed: boolean, date: string, currentRevision?: { __typename?: 'GroupedExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } }>, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | { __typename: 'ExerciseGroupRevision', trashed: boolean } | { __typename: 'ExerciseRevision', trashed: boolean } | { __typename: 'GroupedExercise', trashed: boolean } | { __typename: 'GroupedExerciseRevision', trashed: boolean } | { __typename: 'Page', trashed: boolean } | { __typename: 'PageRevision', trashed: boolean } | { __typename: 'Solution', trashed: boolean } | { __typename: 'SolutionRevision', trashed: boolean } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, name: string, alias?: string | null, id: number, description?: string | null, trashed: boolean, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string }> } } | { __typename: 'AppletRevision', trashed: boolean } | { __typename: 'Article', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string }> } } | { __typename: 'ArticleRevision', trashed: boolean } | { __typename: 'Comment', trashed: boolean } | { __typename: 'Course', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }> } | { __typename: 'CoursePage', trashed: boolean } | { __typename: 'CoursePageRevision', trashed: boolean } | { __typename: 'CourseRevision', trashed: boolean } | { __typename: 'Event', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string }> } } | { __typename: 'EventRevision', trashed: boolean } | { __typename: 'Exercise', trashed: boolean } | { __typename: 'ExerciseGroup', trashed: boolean } | { __typename: 'ExerciseGroupRevision', trashed: boolean } | { __typename: 'ExerciseRevision', trashed: boolean } | { __typename: 'GroupedExercise', trashed: boolean } | { __typename: 'GroupedExerciseRevision', trashed: boolean } | { __typename: 'Page', trashed: boolean } | { __typename: 'PageRevision', trashed: boolean } | { __typename: 'Solution', trashed: boolean } | { __typename: 'SolutionRevision', trashed: boolean } | { __typename: 'TaxonomyTerm', id: number, alias?: string | null, type: TaxonomyTermType, name: string, trashed: boolean } | { __typename: 'User', trashed: boolean } | { __typename: 'Video', trashed: boolean, alias?: string | null, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string }> } } | { __typename: 'VideoRevision', trashed: boolean }> } } | { __typename: 'User', trashed: boolean } | { __typename: 'Video', trashed: boolean, alias?: string | null, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string }> } } | { __typename: 'VideoRevision', trashed: boolean }> } } | { __typename: 'User', username: string, id: number, trashed: boolean, alias?: string | null } | { __typename: 'Video', instance: Instance, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', id: number, title: string, url: string, content: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'VideoRevision', id: number, trashed: boolean, alias?: string | null } | null };

type TaxonomyTerms_Applet_Fragment = { __typename?: 'Applet', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } };

type TaxonomyTerms_Article_Fragment = { __typename?: 'Article', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } };

type TaxonomyTerms_Course_Fragment = { __typename?: 'Course', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } };

type TaxonomyTerms_Event_Fragment = { __typename?: 'Event', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } };

type TaxonomyTerms_Exercise_Fragment = { __typename?: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } };

type TaxonomyTerms_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } };

type TaxonomyTerms_Video_Fragment = { __typename?: 'Video', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } };

export type TaxonomyTermsFragment = TaxonomyTerms_Applet_Fragment | TaxonomyTerms_Article_Fragment | TaxonomyTerms_Course_Fragment | TaxonomyTerms_Event_Fragment | TaxonomyTerms_Exercise_Fragment | TaxonomyTerms_ExerciseGroup_Fragment | TaxonomyTerms_Video_Fragment;

type TaxonomyTermChild_Applet_Fragment = { __typename?: 'Applet', alias?: string | null, id: number, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string }> } };

type TaxonomyTermChild_Article_Fragment = { __typename?: 'Article', alias?: string | null, id: number, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string }> } };

type TaxonomyTermChild_Course_Fragment = { __typename?: 'Course', alias?: string | null, id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }> };

type TaxonomyTermChild_CoursePage_Fragment = { __typename?: 'CoursePage' };

type TaxonomyTermChild_Event_Fragment = { __typename?: 'Event', alias?: string | null, id: number, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string }> } };

type TaxonomyTermChild_Exercise_Fragment = { __typename?: 'Exercise' };

type TaxonomyTermChild_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup' };

type TaxonomyTermChild_GroupedExercise_Fragment = { __typename?: 'GroupedExercise' };

type TaxonomyTermChild_Page_Fragment = { __typename?: 'Page' };

type TaxonomyTermChild_Solution_Fragment = { __typename?: 'Solution' };

type TaxonomyTermChild_Video_Fragment = { __typename?: 'Video', alias?: string | null, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string }> } };

export type TaxonomyTermChildFragment = TaxonomyTermChild_Applet_Fragment | TaxonomyTermChild_Article_Fragment | TaxonomyTermChild_Course_Fragment | TaxonomyTermChild_CoursePage_Fragment | TaxonomyTermChild_Event_Fragment | TaxonomyTermChild_Exercise_Fragment | TaxonomyTermChild_ExerciseGroup_Fragment | TaxonomyTermChild_GroupedExercise_Fragment | TaxonomyTermChild_Page_Fragment | TaxonomyTermChild_Solution_Fragment | TaxonomyTermChild_Video_Fragment;

export type RevisionUuidQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type RevisionUuidQuery = { __typename?: 'Query', authorization: string, uuid?: { __typename: 'Applet', id: number, trashed: boolean } | { __typename: 'AppletRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'Article', id: number, trashed: boolean } | { __typename: 'ArticleRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'Comment', id: number, trashed: boolean } | { __typename: 'Course', id: number, trashed: boolean } | { __typename: 'CoursePage', id: number, trashed: boolean } | { __typename: 'CoursePageRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CourseRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'Event', id: number, trashed: boolean } | { __typename: 'EventRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'Exercise', id: number, trashed: boolean } | { __typename: 'ExerciseGroup', id: number, trashed: boolean } | { __typename: 'ExerciseGroupRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'ExerciseRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'GroupedExercise', id: number, trashed: boolean } | { __typename: 'GroupedExerciseRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'Page', id: number, trashed: boolean } | { __typename: 'PageRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'Solution', id: number, trashed: boolean } | { __typename: 'SolutionRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'TaxonomyTerm', id: number, trashed: boolean } | { __typename: 'User', id: number, trashed: boolean } | { __typename: 'Video', id: number, trashed: boolean } | { __typename: 'VideoRevision', date: string, id: number, trashed: boolean, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | null };

export type CourseRevisionFragment = { __typename?: 'CourseRevision', content: string, title: string, metaDescription: string };

export type UnrevisedEntitiesDataFragment = { __typename?: 'AbstractEntityConnection', totalCount: number, nodes: Array<{ __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string, id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string, id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string, id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string, id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Event', id: number, alias?: string | null, currentRevision?: { __typename?: 'EventRevision', title: string, id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Exercise', id: number, alias?: string | null, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias?: string | null, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'GroupedExercise', id: number, alias?: string | null, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number } | null, revisions: { __typename?: 'GroupedExerciseRevisionConnection', nodes: Array<{ __typename?: 'GroupedExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Solution', id: number, alias?: string | null, currentRevision?: { __typename?: 'SolutionRevision', id: number } | null, solutionRevisions: { __typename?: 'SolutionRevisionConnection', nodes: Array<{ __typename?: 'SolutionRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string, id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } };

export type AuthorDataFragment = { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean };

export type UnrevisedRevisionsQueryVariables = Exact<{
  instance: Instance;
}>;


export type UnrevisedRevisionsQuery = { __typename?: 'Query', authorization: string, subject: { __typename?: 'SubjectQuery', subjects: Array<{ __typename?: 'Subject', id: string, taxonomyTerm: { __typename?: 'TaxonomyTerm', name: string }, unrevisedEntities: { __typename?: 'AbstractEntityConnection', totalCount: number, nodes: Array<{ __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string, id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string, id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string, id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string, id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Event', id: number, alias?: string | null, currentRevision?: { __typename?: 'EventRevision', title: string, id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Exercise', id: number, alias?: string | null, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias?: string | null, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'GroupedExercise', id: number, alias?: string | null, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number } | null, revisions: { __typename?: 'GroupedExerciseRevisionConnection', nodes: Array<{ __typename?: 'GroupedExerciseRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Solution', id: number, alias?: string | null, currentRevision?: { __typename?: 'SolutionRevision', id: number } | null, solutionRevisions: { __typename?: 'SolutionRevisionConnection', nodes: Array<{ __typename?: 'SolutionRevision', id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string, id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } }> } };

export type UserDataFragment = { __typename?: 'User', username: string, date: string, lastLogin?: string | null, description?: string | null, isActiveReviewer: boolean, isActiveAuthor: boolean, isActiveDonor: boolean, chatUrl?: string | null, imageUrl: string, motivation?: string | null, roles: { __typename?: 'ScopedRoleConnection', nodes: Array<{ __typename?: 'ScopedRole', scope?: string | null, role: Role }> }, activityByType: { __typename?: 'UserActivityByType', edits: number, comments: number, reviews: number, taxonomy: number } };

export type UserUuidQueryVariables = Exact<{
  path: Scalars['String'];
  instance: Instance;
}>;


export type UserUuidQuery = { __typename?: 'Query', authorization: string, uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'GroupedExercise' } | { __typename?: 'GroupedExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'Solution' } | { __typename?: 'SolutionRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename: 'User', id: number, trashed: boolean, username: string, date: string, lastLogin?: string | null, description?: string | null, isActiveReviewer: boolean, isActiveAuthor: boolean, isActiveDonor: boolean, chatUrl?: string | null, imageUrl: string, motivation?: string | null, roles: { __typename?: 'ScopedRoleConnection', nodes: Array<{ __typename?: 'ScopedRole', scope?: string | null, role: Role }> }, activityByType: { __typename?: 'UserActivityByType', edits: number, comments: number, reviews: number, taxonomy: number } } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type NotificationSetStateMutationVariables = Exact<{
  input: NotificationSetStateInput;
}>;


export type NotificationSetStateMutation = { __typename?: 'Mutation', notification: { __typename?: 'NotificationMutation', setState?: { __typename?: 'NotificationSetStateResponse', success: boolean } | null } };

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

export type AddAppletRevisionMutationVariables = Exact<{
  input: AddAppletRevisionInput;
}>;


export type AddAppletRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addAppletRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddArticleRevisionMutationVariables = Exact<{
  input: AddArticleRevisionInput;
}>;


export type AddArticleRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addArticleRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddCourseRevisionMutationVariables = Exact<{
  input: AddCourseRevisionInput;
}>;


export type AddCourseRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addCourseRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddCoursePageRevisionMutationVariables = Exact<{
  input: AddCoursePageRevisionInput;
}>;


export type AddCoursePageRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addCoursePageRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddEventRevisionMutationVariables = Exact<{
  input: AddEventRevisionInput;
}>;


export type AddEventRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addEventRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddExerciseRevisionMutationVariables = Exact<{
  input: AddGenericRevisionInput;
}>;


export type AddExerciseRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addExerciseRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddExerciseGroupRevisionMutationVariables = Exact<{
  input: AddExerciseGroupRevisionInput;
}>;


export type AddExerciseGroupRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addExerciseGroupRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddGroupedExerciseRevisionMutationVariables = Exact<{
  input: AddGenericRevisionInput;
}>;


export type AddGroupedExerciseRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addGroupedExerciseRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddSolutionRevisionMutationVariables = Exact<{
  input: AddGenericRevisionInput;
}>;


export type AddSolutionRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addSolutionRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type AddVideoRevisionMutationVariables = Exact<{
  input: AddVideoRevisionInput;
}>;


export type AddVideoRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', addVideoRevision: { __typename?: 'AddRevisionResponse', success: boolean } } };

export type SubscriptionSetMutationVariables = Exact<{
  input: SubscriptionSetInput;
}>;


export type SubscriptionSetMutation = { __typename?: 'Mutation', subscription: { __typename?: 'SubscriptionMutation', set?: { __typename?: 'SubscriptionSetResponse', success: boolean } | null } };

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

export type SetDescriptionMutationVariables = Exact<{
  input: UserSetDescriptionInput;
}>;


export type SetDescriptionMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', setDescription: { __typename?: 'UserSetDescriptionResponse', success: boolean } } };

export type SetUuidStateMutationVariables = Exact<{
  input: UuidSetStateInput;
}>;


export type SetUuidStateMutation = { __typename?: 'Mutation', uuid: { __typename?: 'UuidMutation', setState?: { __typename?: 'UuidSetStateResponse', success: boolean } | null } };

export type GetCommentsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Article', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Comment' } | { __typename?: 'Course', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePage', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Event', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'EventRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Exercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'GroupedExercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'GroupedExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Page', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'PageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Solution', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'SolutionRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'User', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Video', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | null };

export type HasSubscribedQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type HasSubscribedQuery = { __typename?: 'Query', subscription: { __typename?: 'SubscriptionQuery', currentUserHasSubscribed: boolean } };

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
export const WithTitleFragmentDoc = gql`
    fragment withTitle on AbstractUuid {
  __typename
  id
  alias
  ... on Applet {
    currentRevision {
      title
    }
  }
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
  ... on CoursePage {
    currentRevision {
      title
    }
  }
  ... on Video {
    currentRevision {
      title
    }
  }
  ... on Page {
    currentRevision {
      title
    }
  }
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
      ...withTitle
    }
    reason
  }
  ... on CreateCommentNotificationEvent {
    comment {
      id
    }
    thread {
      id
      comments(first: 1) {
        nodes {
          id
        }
      }
    }
  }
  ... on CreateEntityNotificationEvent {
    entity {
      id
      alias
    }
  }
  ... on CreateEntityLinkNotificationEvent {
    parent {
      id
      alias
    }
    child {
      id
      alias
    }
  }
  ... on CreateEntityRevisionNotificationEvent {
    entityRevision {
      id
    }
    entity {
      ...withTitle
    }
  }
  ... on CreateTaxonomyTermNotificationEvent {
    taxonomyTerm {
      id
      name
      alias
    }
  }
  ... on CreateTaxonomyLinkNotificationEvent {
    child {
      ...withTitle
    }
    parent {
      id
      alias
      name
    }
  }
  ... on CreateThreadNotificationEvent {
    thread {
      id
      comments(first: 1) {
        nodes {
          id
          content
        }
      }
    }
    object {
      ...withTitle
    }
  }
  ... on RejectRevisionNotificationEvent {
    repository {
      id
      alias
    }
    revision {
      id
      alias
    }
    reason
  }
  ... on RemoveEntityLinkNotificationEvent {
    parent {
      id
      alias
    }
    child {
      id
      alias
    }
  }
  ... on RemoveTaxonomyLinkNotificationEvent {
    child {
      ...withTitle
    }
    parent {
      id
      alias
      name
    }
  }
  ... on SetLicenseNotificationEvent {
    repository {
      ...withTitle
    }
  }
  ... on SetTaxonomyParentNotificationEvent {
    child {
      id
      alias
    }
    previousParent {
      id
      alias
    }
  }
  ... on SetTaxonomyTermNotificationEvent {
    taxonomyTerm {
      id
      alias
      name
    }
  }
  ... on SetThreadStateNotificationEvent {
    archived
    thread {
      id
      comments(first: 1) {
        nodes {
          id
        }
      }
    }
  }
  ... on SetUuidStateNotificationEvent {
    object {
      ...withTitle
    }
    trashed
  }
}
    ${WithTitleFragmentDoc}`;
export const LicenseFragmentDoc = gql`
    fragment license on AbstractRepository {
  license {
    id
    url
    title
    default
    agreement
    iconHref
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
export const TaxonomyTermsFragmentDoc = gql`
    fragment taxonomyTerms on AbstractTaxonomyTermChild {
  taxonomyTerms {
    nodes {
      navigation {
        ...path
      }
    }
  }
}
    ${PathFragmentDoc}`;
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
  content
  title
  metaDescription
}
    `;
export const AuthorDataFragmentDoc = gql`
    fragment authorData on User {
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
            ...authorData
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
            ...authorData
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
            ...authorData
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
            ...authorData
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
            ...authorData
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
            ...authorData
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
            ...authorData
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
            ...authorData
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
            ...authorData
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
            ...authorData
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
    ${AuthorDataFragmentDoc}`;
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
export const UuidDocument = gql`
    query uuid($id: Int, $alias: AliasInput) {
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
      ...taxonomyTerms
    }
    ... on Page {
      currentRevision {
        ...pageRevision
      }
      navigation {
        data
        ...path
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
        ...taxonomyTerms
        revisions(unrevised: true) {
          totalCount
        }
      }
    }
    ... on Exercise {
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
      navigation {
        data
        ...path
      }
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
            }
            exercises {
              ...exercise
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
${TaxonomyTermsFragmentDoc}
${PageRevisionFragmentDoc}
${PathFragmentDoc}
${ArticleRevisionFragmentDoc}
${VideoRevisionFragmentDoc}
${AppletRevisionFragmentDoc}
${CoursePageRevisionFragmentDoc}
${ExerciseFragmentDoc}
${ExerciseGroupRevisionFragmentDoc}
${SolutionFragmentDoc}
${EventRevisionFragmentDoc}
${TaxonomyTermChildFragmentDoc}`;
export const RevisionUuidDocument = gql`
    query revisionUuid($id: Int) {
  authorization
  uuid(id: $id) {
    __typename
    id
    trashed
    ... on AbstractRevision {
      date
      author {
        id
        username
        isActiveAuthor
        isActiveDonor
        isActiveReviewer
      }
      ... on ArticleRevision {
        ...articleRevision
        changes
        repository {
          ...taxonomyTerms
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
            nodes {
              id
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
          ...taxonomyTerms
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
            nodes {
              id
              trashed
            }
          }
        }
      }
      ... on CourseRevision {
        ...courseRevision
        changes
        repository {
          ...taxonomyTerms
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
            id
            currentRevision {
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
            nodes {
              id
              trashed
            }
          }
          course {
            ...taxonomyTerms
          }
        }
      }
      ... on EventRevision {
        ...eventRevision
        changes
        repository {
          ...license
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
          ...taxonomyTerms
          ...license
          trashed
          instance
          id
          alias
          currentRevision {
            id
            content
          }
          license {
            id
            default
            title
          }
          solution {
            id
            currentRevision {
              content
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
          }
          revisions(unrevised: false) {
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
          ...taxonomyTerms
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
            nodes {
              id
              trashed
            }
          }
        }
      }
    }
  }
}
    ${ArticleRevisionFragmentDoc}
${TaxonomyTermsFragmentDoc}
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
export const UserUuidDocument = gql`
    query userUuid($path: String!, $instance: Instance!) {
  authorization
  uuid(alias: {path: $path, instance: $instance}) {
    ... on User {
      __typename
      id
      trashed
      ...userData
    }
  }
}
    ${UserDataFragmentDoc}`;
export const NotificationSetStateDocument = gql`
    mutation notificationSetState($input: NotificationSetStateInput!) {
  notification {
    setState(input: $input) {
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
export const AddAppletRevisionDocument = gql`
    mutation addAppletRevision($input: AddAppletRevisionInput!) {
  entity {
    addAppletRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddArticleRevisionDocument = gql`
    mutation addArticleRevision($input: AddArticleRevisionInput!) {
  entity {
    addArticleRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddCourseRevisionDocument = gql`
    mutation addCourseRevision($input: AddCourseRevisionInput!) {
  entity {
    addCourseRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddCoursePageRevisionDocument = gql`
    mutation addCoursePageRevision($input: AddCoursePageRevisionInput!) {
  entity {
    addCoursePageRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddEventRevisionDocument = gql`
    mutation addEventRevision($input: AddEventRevisionInput!) {
  entity {
    addEventRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddExerciseRevisionDocument = gql`
    mutation addExerciseRevision($input: AddGenericRevisionInput!) {
  entity {
    addExerciseRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddExerciseGroupRevisionDocument = gql`
    mutation addExerciseGroupRevision($input: AddExerciseGroupRevisionInput!) {
  entity {
    addExerciseGroupRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddGroupedExerciseRevisionDocument = gql`
    mutation addGroupedExerciseRevision($input: AddGenericRevisionInput!) {
  entity {
    addGroupedExerciseRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddSolutionRevisionDocument = gql`
    mutation addSolutionRevision($input: AddGenericRevisionInput!) {
  entity {
    addSolutionRevision(input: $input) {
      success
    }
  }
}
    `;
export const AddVideoRevisionDocument = gql`
    mutation addVideoRevision($input: AddVideoRevisionInput!) {
  entity {
    addVideoRevision(input: $input) {
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
export const SetDescriptionDocument = gql`
    mutation setDescription($input: UserSetDescriptionInput!) {
  user {
    setDescription(input: $input) {
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
export const GetCommentsDocument = gql`
    query getComments($id: Int!) {
  uuid(id: $id) {
    ... on ThreadAware {
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
  }
}
    `;
export const HasSubscribedDocument = gql`
    query hasSubscribed($id: Int!) {
  subscription {
    currentUserHasSubscribed(id: $id)
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    uuid(variables?: UuidQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UuidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UuidQuery>(UuidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'uuid', 'query');
    },
    revisionUuid(variables?: RevisionUuidQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RevisionUuidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RevisionUuidQuery>(RevisionUuidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'revisionUuid', 'query');
    },
    unrevisedRevisions(variables: UnrevisedRevisionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnrevisedRevisionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnrevisedRevisionsQuery>(UnrevisedRevisionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unrevisedRevisions', 'query');
    },
    userUuid(variables: UserUuidQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserUuidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserUuidQuery>(UserUuidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userUuid', 'query');
    },
    notificationSetState(variables: NotificationSetStateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NotificationSetStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NotificationSetStateMutation>(NotificationSetStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'notificationSetState', 'mutation');
    },
    rejectRevision(variables: RejectRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RejectRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RejectRevisionMutation>(RejectRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'rejectRevision', 'mutation');
    },
    checkoutRevision(variables: CheckoutRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CheckoutRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckoutRevisionMutation>(CheckoutRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkoutRevision', 'mutation');
    },
    checkoutPageRevision(variables: CheckoutPageRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CheckoutPageRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckoutPageRevisionMutation>(CheckoutPageRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkoutPageRevision', 'mutation');
    },
    addAppletRevision(variables: AddAppletRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddAppletRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddAppletRevisionMutation>(AddAppletRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addAppletRevision', 'mutation');
    },
    addArticleRevision(variables: AddArticleRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddArticleRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddArticleRevisionMutation>(AddArticleRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addArticleRevision', 'mutation');
    },
    addCourseRevision(variables: AddCourseRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddCourseRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddCourseRevisionMutation>(AddCourseRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addCourseRevision', 'mutation');
    },
    addCoursePageRevision(variables: AddCoursePageRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddCoursePageRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddCoursePageRevisionMutation>(AddCoursePageRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addCoursePageRevision', 'mutation');
    },
    addEventRevision(variables: AddEventRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddEventRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddEventRevisionMutation>(AddEventRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addEventRevision', 'mutation');
    },
    addExerciseRevision(variables: AddExerciseRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddExerciseRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExerciseRevisionMutation>(AddExerciseRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addExerciseRevision', 'mutation');
    },
    addExerciseGroupRevision(variables: AddExerciseGroupRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddExerciseGroupRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExerciseGroupRevisionMutation>(AddExerciseGroupRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addExerciseGroupRevision', 'mutation');
    },
    addGroupedExerciseRevision(variables: AddGroupedExerciseRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddGroupedExerciseRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddGroupedExerciseRevisionMutation>(AddGroupedExerciseRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addGroupedExerciseRevision', 'mutation');
    },
    addSolutionRevision(variables: AddSolutionRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddSolutionRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddSolutionRevisionMutation>(AddSolutionRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addSolutionRevision', 'mutation');
    },
    addVideoRevision(variables: AddVideoRevisionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddVideoRevisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddVideoRevisionMutation>(AddVideoRevisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addVideoRevision', 'mutation');
    },
    subscriptionSet(variables: SubscriptionSetMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubscriptionSetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubscriptionSetMutation>(SubscriptionSetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'subscriptionSet', 'mutation');
    },
    threadSetArchived(variables: ThreadSetArchivedMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ThreadSetArchivedMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ThreadSetArchivedMutation>(ThreadSetArchivedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'threadSetArchived', 'mutation');
    },
    threadSetState(variables: ThreadSetStateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ThreadSetStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ThreadSetStateMutation>(ThreadSetStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'threadSetState', 'mutation');
    },
    threadSetCommentState(variables: ThreadSetCommentStateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ThreadSetCommentStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ThreadSetCommentStateMutation>(ThreadSetCommentStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'threadSetCommentState', 'mutation');
    },
    createThread(variables: CreateThreadMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateThreadMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateThreadMutation>(CreateThreadDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createThread', 'mutation');
    },
    createComment(variables: CreateCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCommentMutation>(CreateCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createComment', 'mutation');
    },
    setDescription(variables: SetDescriptionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetDescriptionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetDescriptionMutation>(SetDescriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setDescription', 'mutation');
    },
    setUuidState(variables: SetUuidStateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetUuidStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetUuidStateMutation>(SetUuidStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setUuidState', 'mutation');
    },
    getComments(variables: GetCommentsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCommentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCommentsQuery>(GetCommentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getComments', 'query');
    },
    hasSubscribed(variables: HasSubscribedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HasSubscribedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HasSubscribedQuery>(HasSubscribedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'hasSubscribed', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;