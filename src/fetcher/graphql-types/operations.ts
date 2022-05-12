/* eslint-disable */
/* THIS FILE IS GENERATED – run `yarn codegen` to update */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
}

export interface AbstractEntity {
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  subject?: Maybe<Subject>;
  trashed: Scalars['Boolean'];
}


export interface AbstractEntityEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface AbstractEntityConnection {
  __typename?: 'AbstractEntityConnection';
  edges: Array<AbstractEntityCursor>;
  nodes: Array<AbstractEntity>;
  pageInfo: HasNextPageInfo;
  totalCount: Scalars['Int'];
}

export interface AbstractEntityCursor {
  __typename?: 'AbstractEntityCursor';
  cursor: Scalars['String'];
  node: AbstractEntity;
}

export interface AbstractEntityRevision {
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
}


export interface AbstractEntityRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface AbstractExercise {
  alias?: Maybe<Scalars['String']>;
  currentRevision?: Maybe<AbstractExerciseRevision>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  solution?: Maybe<Solution>;
  trashed: Scalars['Boolean'];
}


export interface AbstractExerciseEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface AbstractExerciseRevision {
  alias?: Maybe<Scalars['String']>;
  author: User;
  changes: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
}


export interface AbstractExerciseRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface AbstractNavigationChild {
  navigation?: Maybe<Navigation>;
}

export interface AbstractNotificationEvent {
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
}

export interface AbstractNotificationEventConnection {
  __typename?: 'AbstractNotificationEventConnection';
  edges: Array<AbstractNotificationEventEdge>;
  nodes: Array<AbstractNotificationEvent>;
  pageInfo: HasNextPageInfo;
}

export interface AbstractNotificationEventEdge {
  __typename?: 'AbstractNotificationEventEdge';
  cursor: Scalars['String'];
  node: AbstractNotificationEvent;
}

export interface AbstractRepository {
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
}


export interface AbstractRepositoryEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface AbstractRepositoryThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface AbstractRevision {
  alias?: Maybe<Scalars['String']>;
  author: User;
  content: Scalars['String'];
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  threads: ThreadsConnection;
  trashed: Scalars['Boolean'];
}


export interface AbstractRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface AbstractRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface AbstractTaxonomyTermChild {
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  instance: Instance;
  license: License;
  taxonomyTerms: TaxonomyTermConnection;
  trashed: Scalars['Boolean'];
}


export interface AbstractTaxonomyTermChildEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface AbstractTaxonomyTermChildTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface AbstractUuid {
  alias?: Maybe<Scalars['String']>;
  events: AbstractNotificationEventConnection;
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
}


export interface AbstractUuidEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface AbstractUuidConnection {
  __typename?: 'AbstractUuidConnection';
  edges: Array<AbstractUuidCursor>;
  nodes: Array<AbstractUuid>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface AbstractUuidCursor {
  __typename?: 'AbstractUuidCursor';
  cursor: Scalars['String'];
  node: AbstractUuid;
}

export interface AddRevisionResponse {
  __typename?: 'AddRevisionResponse';
  query: Query;
  revisionId?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
}

export interface AliasInput {
  instance: Instance;
  path: Scalars['String'];
}

export interface AllThreadsConnection {
  __typename?: 'AllThreadsConnection';
  edges: Array<ThreadsCursor>;
  nodes: Array<Thread>;
  pageInfo: HasNextPageInfo;
  totalCount: Scalars['Int'];
}

export interface Applet extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface AppletEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface AppletRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface AppletTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface AppletThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface AppletRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface AppletRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface AppletRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface AppletRevisionConnection {
  __typename?: 'AppletRevisionConnection';
  edges: Array<AppletRevisionCursor>;
  nodes: Array<AppletRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface AppletRevisionCursor {
  __typename?: 'AppletRevisionCursor';
  cursor: Scalars['String'];
  node: AppletRevision;
}

export interface Article extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface ArticleEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ArticleRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface ArticleTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ArticleThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface ArticleRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface ArticleRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ArticleRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface ArticleRevisionConnection {
  __typename?: 'ArticleRevisionConnection';
  edges: Array<ArticleRevisionCursor>;
  nodes: Array<ArticleRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface ArticleRevisionCursor {
  __typename?: 'ArticleRevisionCursor';
  cursor: Scalars['String'];
  node: ArticleRevision;
}

export interface CacheRemoveInput {
  key: Scalars['String'];
}

export interface CacheRemoveResponse {
  __typename?: 'CacheRemoveResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface CacheSetInput {
  key: Scalars['String'];
  value: Scalars['JSON'];
}

export interface CacheSetResponse {
  __typename?: 'CacheSetResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface CacheUpdateInput {
  keys: Array<Scalars['String']>;
}

export interface CacheUpdateResponse {
  __typename?: 'CacheUpdateResponse';
  success: Scalars['Boolean'];
}

export interface CheckoutRevisionInput {
  reason: Scalars['String'];
  revisionId: Scalars['Int'];
}

export interface CheckoutRevisionNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CheckoutRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  reason: Scalars['String'];
  repository: AbstractRepository;
  revision: AbstractRevision;
}

export interface CheckoutRevisionResponse {
  __typename?: 'CheckoutRevisionResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface Comment extends AbstractUuid {
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
}


export interface CommentEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface CommentConnection {
  __typename?: 'CommentConnection';
  edges: Array<CommentEdge>;
  nodes: Array<Comment>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface CommentEdge {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node: Comment;
}

export interface Course extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface CourseEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface CoursePagesArgs {
  hasCurrentRevision?: InputMaybe<Scalars['Boolean']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}


export interface CourseRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface CourseTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface CourseThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface CoursePage extends AbstractEntity, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface CoursePageEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface CoursePageRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface CoursePageThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface CoursePageRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface CoursePageRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface CoursePageRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface CoursePageRevisionConnection {
  __typename?: 'CoursePageRevisionConnection';
  edges: Array<CoursePageRevisionCursor>;
  nodes: Array<CoursePageRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface CoursePageRevisionCursor {
  __typename?: 'CoursePageRevisionCursor';
  cursor: Scalars['String'];
  node: CoursePageRevision;
}

export interface CourseRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface CourseRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface CourseRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface CourseRevisionConnection {
  __typename?: 'CourseRevisionConnection';
  edges: Array<CourseRevisionCursor>;
  nodes: Array<CourseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface CourseRevisionCursor {
  __typename?: 'CourseRevisionCursor';
  cursor: Scalars['String'];
  node: CourseRevision;
}

export interface CreateCommentNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateCommentNotificationEvent';
  actor: User;
  comment: Comment;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  thread: Thread;
}

export interface CreateEntityLinkNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateEntityLinkNotificationEvent';
  actor: User;
  child: AbstractEntity;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent: AbstractEntity;
}

export interface CreateEntityNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateEntityNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  entity: AbstractEntity;
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
}

export interface CreateEntityRevisionNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateEntityRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  entity: AbstractRepository;
  entityRevision: AbstractRevision;
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
}

export interface CreatePageInput {
  content: Scalars['String'];
  discussionsEnabled: Scalars['Boolean'];
  forumId?: InputMaybe<Scalars['Int']>;
  instance: Instance;
  licenseId: Scalars['Int'];
  title: Scalars['String'];
}

export interface CreateTaxonomyLinkNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateTaxonomyLinkNotificationEvent';
  actor: User;
  child: AbstractUuid;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent: TaxonomyTerm;
}

export interface CreateTaxonomyTermNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateTaxonomyTermNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  taxonomyTerm: TaxonomyTerm;
}

export interface CreateThreadNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'CreateThreadNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  object: AbstractUuid;
  objectId: Scalars['Int'];
  thread: Thread;
}

export interface DeletedEntitiesConnection {
  __typename?: 'DeletedEntitiesConnection';
  edges: Array<DeletedEntityCursor>;
  nodes: Array<DeletedEntity>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface DeletedEntity {
  __typename?: 'DeletedEntity';
  dateOfDeletion?: Maybe<Scalars['String']>;
  entity?: Maybe<AbstractEntity>;
}

export interface DeletedEntityCursor {
  __typename?: 'DeletedEntityCursor';
  cursor: Scalars['String'];
  node: DeletedEntity;
}

export interface EntityMetadataConnection {
  __typename?: 'EntityMetadataConnection';
  edges: Array<EntityMetadataCursor>;
  nodes: Array<Scalars['JSONObject']>;
  pageInfo: HasNextPageInfo;
}

export interface EntityMetadataCursor {
  __typename?: 'EntityMetadataCursor';
  cursor: Scalars['String'];
  node: Scalars['JSONObject'];
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

export interface EntityQuery {
  __typename?: 'EntityQuery';
  deletedEntities: DeletedEntitiesConnection;
}


export interface EntityQueryDeletedEntitiesArgs {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
}

export interface Event extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface EventEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface EventRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface EventTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface EventThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface EventRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface EventRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface EventRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface EventRevisionConnection {
  __typename?: 'EventRevisionConnection';
  edges: Array<EventRevisionCursor>;
  nodes: Array<EventRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface EventRevisionCursor {
  __typename?: 'EventRevisionCursor';
  cursor: Scalars['String'];
  node: EventRevision;
}

export interface Exercise extends AbstractEntity, AbstractExercise, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface ExerciseEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ExerciseRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface ExerciseTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ExerciseThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface ExerciseGroup extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface ExerciseGroupEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ExerciseGroupRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface ExerciseGroupTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ExerciseGroupThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface ExerciseGroupRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface ExerciseGroupRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ExerciseGroupRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface ExerciseGroupRevisionConnection {
  __typename?: 'ExerciseGroupRevisionConnection';
  edges: Array<ExerciseGroupRevisionCursor>;
  nodes: Array<ExerciseGroupRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface ExerciseGroupRevisionCursor {
  __typename?: 'ExerciseGroupRevisionCursor';
  cursor: Scalars['String'];
  node: ExerciseGroupRevision;
}

export interface ExerciseRevision extends AbstractEntityRevision, AbstractExerciseRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface ExerciseRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface ExerciseRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface ExerciseRevisionConnection {
  __typename?: 'ExerciseRevisionConnection';
  edges: Array<ExerciseRevisionCursor>;
  nodes: Array<ExerciseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface ExerciseRevisionCursor {
  __typename?: 'ExerciseRevisionCursor';
  cursor: Scalars['String'];
  node: ExerciseRevision;
}

export interface GroupedExercise extends AbstractEntity, AbstractExercise, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface GroupedExerciseEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface GroupedExerciseRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface GroupedExerciseThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface GroupedExerciseRevision extends AbstractEntityRevision, AbstractExerciseRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface GroupedExerciseRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface GroupedExerciseRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface GroupedExerciseRevisionConnection {
  __typename?: 'GroupedExerciseRevisionConnection';
  edges: Array<GroupedExerciseRevisionCursor>;
  nodes: Array<GroupedExerciseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface GroupedExerciseRevisionCursor {
  __typename?: 'GroupedExerciseRevisionCursor';
  cursor: Scalars['String'];
  node: GroupedExerciseRevision;
}

export interface HasNextPageInfo {
  __typename?: 'HasNextPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
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
  agreement: Scalars['String'];
  content: Scalars['String'];
  default: Scalars['Boolean'];
  iconHref: Scalars['String'];
  id: Scalars['Int'];
  instance: Instance;
  title: Scalars['String'];
  url: Scalars['String'];
}

export interface LicenseQuery {
  __typename?: 'LicenseQuery';
  license?: Maybe<License>;
  licenses: Array<License>;
}


export interface LicenseQueryLicenseArgs {
  id: Scalars['Int'];
}


export interface LicenseQueryLicensesArgs {
  instance?: InputMaybe<Instance>;
}

export interface MetadataQuery {
  __typename?: 'MetadataQuery';
  entities: EntityMetadataConnection;
  publisher: Scalars['JSONObject'];
}


export interface MetadataQueryEntitiesArgs {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  modifiedAfter?: InputMaybe<Scalars['String']>;
}

export interface Mutation {
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
}

export interface Navigation {
  __typename?: 'Navigation';
  data: Scalars['JSON'];
  path: NavigationNodeConnection;
}


export interface NavigationPathArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface NavigationNode {
  __typename?: 'NavigationNode';
  id?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  url?: Maybe<Scalars['String']>;
}

export interface NavigationNodeConnection {
  __typename?: 'NavigationNodeConnection';
  edges?: Maybe<Array<Maybe<NavigationNodeEdge>>>;
  nodes: Array<NavigationNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface NavigationNodeEdge {
  __typename?: 'NavigationNodeEdge';
  cursor: Scalars['String'];
  node: NavigationNode;
}

export interface Notification {
  __typename?: 'Notification';
  event: AbstractNotificationEvent;
  id: Scalars['Int'];
  unread: Scalars['Boolean'];
}

export interface NotificationConnection {
  __typename?: 'NotificationConnection';
  edges: Array<NotificationEdge>;
  nodes: Array<Notification>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface NotificationEdge {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String'];
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
  id: Array<Scalars['Int']>;
  unread: Scalars['Boolean'];
}

export interface NotificationSetStateResponse {
  __typename?: 'NotificationSetStateResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface Page extends AbstractNavigationChild, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface PageEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface PageRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface PageThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface PageAddRevisionInput {
  content: Scalars['String'];
  pageId: Scalars['Int'];
  title: Scalars['String'];
}

export interface PageCreateResponse {
  __typename?: 'PageCreateResponse';
  query: Query;
  record?: Maybe<Page>;
  success: Scalars['Boolean'];
}

export interface PageInfo {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
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

export interface PageRevision extends AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface PageRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface PageRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface PageRevisionConnection {
  __typename?: 'PageRevisionConnection';
  edges: Array<PageRevisionCursor>;
  nodes: Array<PageRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface PageRevisionCursor {
  __typename?: 'PageRevisionCursor';
  cursor: Scalars['String'];
  node: PageRevision;
}

export interface Query {
  __typename?: 'Query';
  activeAuthors: UserConnection;
  activeDonors: UserConnection;
  activeReviewers: UserConnection;
  authorization: Scalars['JSON'];
  entity?: Maybe<EntityQuery>;
  events: AbstractNotificationEventConnection;
  license: LicenseQuery;
  metadata: MetadataQuery;
  notificationEvent?: Maybe<AbstractNotificationEvent>;
  notifications: NotificationConnection;
  subject: SubjectQuery;
  subscription: SubscriptionQuery;
  thread: ThreadQuery;
  user: UserQuery;
  uuid?: Maybe<AbstractUuid>;
}


export interface QueryActiveAuthorsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface QueryActiveDonorsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface QueryActiveReviewersArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface QueryEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
  objectId?: InputMaybe<Scalars['Int']>;
}


export interface QueryNotificationEventArgs {
  id: Scalars['Int'];
}


export interface QueryNotificationsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unread?: InputMaybe<Scalars['Boolean']>;
}


export interface QueryUuidArgs {
  alias?: InputMaybe<AliasInput>;
  id?: InputMaybe<Scalars['Int']>;
}

export interface RejectRevisionInput {
  reason: Scalars['String'];
  revisionId: Scalars['Int'];
}

export interface RejectRevisionNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'RejectRevisionNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  reason: Scalars['String'];
  repository: AbstractRepository;
  revision: AbstractRevision;
}

export interface RejectRevisionResponse {
  __typename?: 'RejectRevisionResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface RemoveEntityLinkNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'RemoveEntityLinkNotificationEvent';
  actor: User;
  child: AbstractEntity;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent: AbstractEntity;
}

export interface RemoveTaxonomyLinkNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'RemoveTaxonomyLinkNotificationEvent';
  actor: User;
  child: AbstractUuid;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent: TaxonomyTerm;
}

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

export interface ScopedRole {
  __typename?: 'ScopedRole';
  role: Role;
  scope?: Maybe<Scalars['String']>;
}

export interface ScopedRoleConnection {
  __typename?: 'ScopedRoleConnection';
  edges: Array<ScopedRoleCursor>;
  nodes: Array<ScopedRole>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface ScopedRoleCursor {
  __typename?: 'ScopedRoleCursor';
  cursor: Scalars['String'];
  node: ScopedRole;
}

export interface SetAppletInput {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId?: InputMaybe<Scalars['Int']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  parentId?: InputMaybe<Scalars['Int']>;
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
  url: Scalars['String'];
}

export interface SetArticleInput {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId?: InputMaybe<Scalars['Int']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  parentId?: InputMaybe<Scalars['Int']>;
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
}

export interface SetCourseInput {
  changes: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  entityId?: InputMaybe<Scalars['Int']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  parentId?: InputMaybe<Scalars['Int']>;
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
}

export interface SetCoursePageInput {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId?: InputMaybe<Scalars['Int']>;
  needsReview: Scalars['Boolean'];
  parentId?: InputMaybe<Scalars['Int']>;
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
}

export interface SetEntityResponse {
  __typename?: 'SetEntityResponse';
  query: Query;
  record?: Maybe<AbstractEntity>;
  success: Scalars['Boolean'];
}

export interface SetEventInput {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId?: InputMaybe<Scalars['Int']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  needsReview: Scalars['Boolean'];
  parentId?: InputMaybe<Scalars['Int']>;
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
}

export interface SetExerciseGroupInput {
  changes: Scalars['String'];
  cohesive: Scalars['Boolean'];
  content: Scalars['String'];
  entityId?: InputMaybe<Scalars['Int']>;
  needsReview: Scalars['Boolean'];
  parentId?: InputMaybe<Scalars['Int']>;
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
}

export interface SetGenericEntityInput {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId?: InputMaybe<Scalars['Int']>;
  needsReview: Scalars['Boolean'];
  parentId?: InputMaybe<Scalars['Int']>;
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
}

export interface SetLicenseNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetLicenseNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  repository: AbstractRepository;
}

export interface SetTaxonomyParentNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetTaxonomyParentNotificationEvent';
  actor: User;
  child: TaxonomyTerm;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  parent?: Maybe<TaxonomyTerm>;
  previousParent?: Maybe<TaxonomyTerm>;
}

export interface SetTaxonomyTermNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetTaxonomyTermNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  taxonomyTerm: TaxonomyTerm;
}

export interface SetThreadStateNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetThreadStateNotificationEvent';
  actor: User;
  archived: Scalars['Boolean'];
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  objectId: Scalars['Int'];
  thread: Thread;
}

export interface SetUuidStateNotificationEvent extends AbstractNotificationEvent, InstanceAware {
  __typename?: 'SetUuidStateNotificationEvent';
  actor: User;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  instance: Instance;
  object: AbstractUuid;
  objectId: Scalars['Int'];
  trashed: Scalars['Boolean'];
}

export interface SetVideoInput {
  changes: Scalars['String'];
  content: Scalars['String'];
  entityId?: InputMaybe<Scalars['Int']>;
  needsReview: Scalars['Boolean'];
  parentId?: InputMaybe<Scalars['Int']>;
  subscribeThis: Scalars['Boolean'];
  subscribeThisByEmail: Scalars['Boolean'];
  title: Scalars['String'];
  url: Scalars['String'];
}

export interface Solution extends AbstractEntity, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface SolutionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface SolutionRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface SolutionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface SolutionRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface SolutionRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface SolutionRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface SolutionRevisionConnection {
  __typename?: 'SolutionRevisionConnection';
  edges: Array<SolutionRevisionCursor>;
  nodes: Array<SolutionRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface SolutionRevisionCursor {
  __typename?: 'SolutionRevisionCursor';
  cursor: Scalars['String'];
  node: SolutionRevision;
}

export interface Subject {
  __typename?: 'Subject';
  id: Scalars['String'];
  taxonomyTerm: TaxonomyTerm;
  unrevisedEntities: AbstractEntityConnection;
}


export interface SubjectUnrevisedEntitiesArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface SubjectQuery {
  __typename?: 'SubjectQuery';
  subject?: Maybe<Subject>;
  subjects: Array<Subject>;
}


export interface SubjectQuerySubjectArgs {
  id: Scalars['String'];
}


export interface SubjectQuerySubjectsArgs {
  instance: Instance;
}

export interface SubscriptionConnection {
  __typename?: 'SubscriptionConnection';
  edges: Array<SubscriptionCursor>;
  nodes: Array<SubscriptionInfo>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface SubscriptionCursor {
  __typename?: 'SubscriptionCursor';
  cursor: Scalars['String'];
  node: SubscriptionInfo;
}

export interface SubscriptionInfo {
  __typename?: 'SubscriptionInfo';
  object: AbstractUuid;
  sendEmail: Scalars['Boolean'];
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
  currentUserHasSubscribed: Scalars['Boolean'];
  getSubscriptions: SubscriptionConnection;
}


export interface SubscriptionQueryCurrentUserHasSubscribedArgs {
  id: Scalars['Int'];
}


export interface SubscriptionQueryGetSubscriptionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface SubscriptionSetInput {
  id: Array<Scalars['Int']>;
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
}

export interface SubscriptionSetResponse {
  __typename?: 'SubscriptionSetResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface TaxonomyEntityLinksInput {
  entityIds: Array<Scalars['Int']>;
  taxonomyTermId: Scalars['Int'];
}

export interface TaxonomyEntityLinksResponse {
  __typename?: 'TaxonomyEntityLinksResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface TaxonomyTerm extends AbstractNavigationChild, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface TaxonomyTermChildrenArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface TaxonomyTermEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface TaxonomyTermThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface TaxonomyTermConnection {
  __typename?: 'TaxonomyTermConnection';
  edges?: Maybe<Array<Maybe<TaxonomyTermEdge>>>;
  nodes: Array<TaxonomyTerm>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface TaxonomyTermCreateInput {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parentId: Scalars['Int'];
  taxonomyType: TaxonomyTypeCreateOptions;
}

export interface TaxonomyTermCreateResponse {
  __typename?: 'TaxonomyTermCreateResponse';
  query: Query;
  record?: Maybe<TaxonomyTerm>;
  success: Scalars['Boolean'];
}

export interface TaxonomyTermEdge {
  __typename?: 'TaxonomyTermEdge';
  cursor: Scalars['String'];
  node: TaxonomyTerm;
}

export interface TaxonomyTermMoveInput {
  childrenIds: Array<Scalars['Int']>;
  destination: Scalars['Int'];
}

export interface TaxonomyTermMoveResponse {
  __typename?: 'TaxonomyTermMoveResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface TaxonomyTermMutation {
  __typename?: 'TaxonomyTermMutation';
  create: TaxonomyTermCreateResponse;
  createEntityLinks: TaxonomyEntityLinksResponse;
  deleteEntityLinks: TaxonomyEntityLinksResponse;
  move: TaxonomyTermMoveResponse;
  setNameAndDescription: TaxonomyTermSetNameAndDescriptionResponse;
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


export interface TaxonomyTermMutationMoveArgs {
  input: TaxonomyTermMoveInput;
}


export interface TaxonomyTermMutationSetNameAndDescriptionArgs {
  input: TaxonomyTermSetNameAndDescriptionInput;
}

export interface TaxonomyTermSetNameAndDescriptionInput {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
}

export interface TaxonomyTermSetNameAndDescriptionResponse {
  __typename?: 'TaxonomyTermSetNameAndDescriptionResponse';
  query: Query;
  success: Scalars['Boolean'];
}

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

export enum TaxonomyTypeCreateOptions {
  Topic = 'topic',
  TopicFolder = 'topicFolder'
}

export interface Thread {
  __typename?: 'Thread';
  archived: Scalars['Boolean'];
  comments: CommentConnection;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  object: AbstractUuid;
  title?: Maybe<Scalars['String']>;
  trashed: Scalars['Boolean'];
}


export interface ThreadCommentsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface ThreadAware {
  threads: ThreadsConnection;
}


export interface ThreadAwareThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface ThreadCreateCommentInput {
  content: Scalars['String'];
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
  threadId: Scalars['String'];
}

export interface ThreadCreateCommentResponse {
  __typename?: 'ThreadCreateCommentResponse';
  query: Query;
  record?: Maybe<Comment>;
  success: Scalars['Boolean'];
}

export interface ThreadCreateThreadInput {
  content: Scalars['String'];
  objectId: Scalars['Int'];
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
  title: Scalars['String'];
}

export interface ThreadCreateThreadResponse {
  __typename?: 'ThreadCreateThreadResponse';
  query: Query;
  record?: Maybe<Thread>;
  success: Scalars['Boolean'];
}

export interface ThreadMutation {
  __typename?: 'ThreadMutation';
  createComment?: Maybe<ThreadCreateCommentResponse>;
  createThread?: Maybe<ThreadCreateThreadResponse>;
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
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}

export interface ThreadSetCommentStateInput {
  id: Array<Scalars['Int']>;
  trashed: Scalars['Boolean'];
}

export interface ThreadSetCommentStateResponse {
  __typename?: 'ThreadSetCommentStateResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface ThreadSetThreadArchivedInput {
  archived: Scalars['Boolean'];
  id: Array<Scalars['String']>;
}

export interface ThreadSetThreadArchivedResponse {
  __typename?: 'ThreadSetThreadArchivedResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface ThreadSetThreadStateInput {
  id: Array<Scalars['String']>;
  trashed: Scalars['Boolean'];
}

export interface ThreadSetThreadStateResponse {
  __typename?: 'ThreadSetThreadStateResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface ThreadsConnection {
  __typename?: 'ThreadsConnection';
  edges: Array<ThreadsCursor>;
  nodes: Array<Thread>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface ThreadsCursor {
  __typename?: 'ThreadsCursor';
  cursor: Scalars['String'];
  node: Thread;
}

export interface User extends AbstractUuid, ThreadAware {
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
}


export interface UserEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface UserEventsByUserArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
  objectId?: InputMaybe<Scalars['Int']>;
}


export interface UserRolesArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface UserThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}


export interface UserUnrevisedEntitiesArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}

export interface UserActivityByType {
  __typename?: 'UserActivityByType';
  comments: Scalars['Int'];
  edits: Scalars['Int'];
  reviews: Scalars['Int'];
  taxonomy: Scalars['Int'];
}

export interface UserConnection {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  nodes: Array<User>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface UserDeleteBotsInput {
  botIds: Array<Scalars['Int']>;
}

export interface UserDeleteBotsResponse {
  __typename?: 'UserDeleteBotsResponse';
  success: Scalars['Boolean'];
}

export interface UserDeleteRegularUsersInput {
  userIds: Array<Scalars['Int']>;
}

export interface UserDeleteRegularUsersResponse {
  __typename?: 'UserDeleteRegularUsersResponse';
  reason?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  username?: Maybe<Scalars['String']>;
}

export interface UserEdge {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
}

export interface UserMutation {
  __typename?: 'UserMutation';
  deleteBots: UserDeleteBotsResponse;
  deleteRegularUsers: Array<UserDeleteRegularUsersResponse>;
  setDescription: UserSetDescriptionResponse;
  setEmail: UserSetEmailResponse;
}


export interface UserMutationDeleteBotsArgs {
  input: UserDeleteBotsInput;
}


export interface UserMutationDeleteRegularUsersArgs {
  input: UserDeleteRegularUsersInput;
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
}


export interface UserQueryPotentialSpamUsersArgs {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}

export interface UserSetDescriptionInput {
  description: Scalars['String'];
}

export interface UserSetDescriptionResponse {
  __typename?: 'UserSetDescriptionResponse';
  success: Scalars['Boolean'];
}

export interface UserSetEmailInput {
  email: Scalars['String'];
  userId: Scalars['Int'];
}

export interface UserSetEmailResponse {
  __typename?: 'UserSetEmailResponse';
  email: Scalars['String'];
  success: Scalars['Boolean'];
  username: Scalars['String'];
}

export interface UuidMutation {
  __typename?: 'UuidMutation';
  setState?: Maybe<UuidSetStateResponse>;
}


export interface UuidMutationSetStateArgs {
  input: UuidSetStateInput;
}

export interface UuidSetStateInput {
  id: Array<Scalars['Int']>;
  trashed: Scalars['Boolean'];
}

export interface UuidSetStateResponse {
  __typename?: 'UuidSetStateResponse';
  query: Query;
  success: Scalars['Boolean'];
}

export interface Video extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
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
}


export interface VideoEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface VideoRevisionsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  unrevised?: InputMaybe<Scalars['Boolean']>;
}


export interface VideoTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface VideoThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface VideoRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
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
}


export interface VideoRevisionEventsArgs {
  actorId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instance?: InputMaybe<Instance>;
  last?: InputMaybe<Scalars['Int']>;
}


export interface VideoRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
}

export interface VideoRevisionConnection {
  __typename?: 'VideoRevisionConnection';
  edges: Array<VideoRevisionCursor>;
  nodes: Array<VideoRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}

export interface VideoRevisionCursor {
  __typename?: 'VideoRevisionCursor';
  cursor: Scalars['String'];
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

export type LicenseDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LicenseDetailsQuery = { __typename?: 'Query', license: { __typename?: 'LicenseQuery', license?: { __typename?: 'License', title: string, content: string, iconHref: string } | null } };

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

export type MainUuidQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  alias?: InputMaybe<AliasInput>;
}>;


export type MainUuidQuery = { __typename?: 'Query', authorization: any, uuid?: { __typename: 'Applet', instance: Instance, date: string, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', id: number, title: string, content: string, url: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'AppletRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Article', instance: Instance, date: string, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', id: number, title: string, content: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'ArticleRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Comment', id: number, trashed: boolean, alias: string } | { __typename: 'Course', instance: Instance, id: number, trashed: boolean, alias?: string | null, pages: Array<{ __typename?: 'CoursePage', alias?: string | null, id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number, title: string, content: string } | null }>, currentRevision?: { __typename?: 'CourseRevision', title: string, content: string, metaDescription: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'CoursePage', instance: Instance, date: string, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', id: number, content: string, title: string, date: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', title: string }> }, course: { __typename?: 'Course', id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, pages: Array<{ __typename?: 'CoursePage', alias?: string | null, id: number, currentRevision?: { __typename?: 'CoursePageRevision', title: string, trashed: boolean } | null }>, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | { __typename: 'CoursePageRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'CourseRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Event', instance: Instance, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'EventRevision', id: number, title: string, content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'EventRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Exercise', instance: Instance, id: number, trashed: boolean, alias?: string | null, date: string, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> }, currentRevision?: { __typename?: 'ExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null } | { __typename: 'ExerciseGroup', instance: Instance, date: string, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number, content: string, cohesive: boolean, date: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number }, exercises: Array<{ __typename?: 'GroupedExercise', id: number, alias?: string | null, instance: Instance, trashed: boolean, date: string, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, currentRevision?: { __typename?: 'GroupedExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } }>, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'ExerciseGroupRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'GroupedExercise', instance: Instance, id: number, trashed: boolean, alias?: string | null, date: string, exerciseGroup: { __typename?: 'ExerciseGroup', alias?: string | null }, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, currentRevision?: { __typename?: 'GroupedExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null } | { __typename: 'GroupedExerciseRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Page', instance: Instance, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', id: number, title: string, content: string } | null, navigation?: { __typename?: 'Navigation', data: any, path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | { __typename: 'PageRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'Solution', instance: Instance, id: number, trashed: boolean, alias?: string | null, exercise: { __typename?: 'Exercise', id: number } | { __typename?: 'GroupedExercise', id: number }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null } | { __typename: 'SolutionRevision', id: number, trashed: boolean, alias?: string | null } | { __typename: 'TaxonomyTerm', alias?: string | null, instance: Instance, type: TaxonomyTermType, name: string, description?: string | null, weight: number, taxonomyId: number, trashed: boolean, id: number, parent?: { __typename?: 'TaxonomyTerm', id: number } | null, navigation?: { __typename?: 'Navigation', data: any, path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string }> } } | { __typename: 'AppletRevision', trashed: boolean } | { __typename: 'Article', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string }> } } | { __typename: 'ArticleRevision', trashed: boolean } | { __typename: 'Comment', trashed: boolean } | { __typename: 'Course', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }> } | { __typename: 'CoursePage', trashed: boolean } | { __typename: 'CoursePageRevision', trashed: boolean } | { __typename: 'CourseRevision', trashed: boolean } | { __typename: 'Event', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string }> } } | { __typename: 'EventRevision', trashed: boolean } | { __typename: 'Exercise', trashed: boolean, id: number, alias?: string | null, instance: Instance, date: string, currentRevision?: { __typename?: 'ExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | { __typename: 'ExerciseGroup', id: number, alias?: string | null, instance: Instance, trashed: boolean, currentRevision?: { __typename?: 'ExerciseGroupRevision', content: string, id: number, date: string, cohesive: boolean } | null, exercises: Array<{ __typename?: 'GroupedExercise', id: number, alias?: string | null, instance: Instance, trashed: boolean, date: string, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, currentRevision?: { __typename?: 'GroupedExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } }>, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | { __typename: 'ExerciseGroupRevision', trashed: boolean } | { __typename: 'ExerciseRevision', trashed: boolean } | { __typename: 'GroupedExercise', trashed: boolean } | { __typename: 'GroupedExerciseRevision', trashed: boolean } | { __typename: 'Page', trashed: boolean } | { __typename: 'PageRevision', trashed: boolean } | { __typename: 'Solution', trashed: boolean } | { __typename: 'SolutionRevision', trashed: boolean } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, name: string, alias?: string | null, id: number, description?: string | null, trashed: boolean, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string }> } } | { __typename: 'AppletRevision', trashed: boolean } | { __typename: 'Article', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string }> } } | { __typename: 'ArticleRevision', trashed: boolean } | { __typename: 'Comment', trashed: boolean } | { __typename: 'Course', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }> } | { __typename: 'CoursePage', trashed: boolean } | { __typename: 'CoursePageRevision', trashed: boolean } | { __typename: 'CourseRevision', trashed: boolean } | { __typename: 'Event', trashed: boolean, alias?: string | null, id: number, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string }> } } | { __typename: 'EventRevision', trashed: boolean } | { __typename: 'Exercise', trashed: boolean } | { __typename: 'ExerciseGroup', trashed: boolean } | { __typename: 'ExerciseGroupRevision', trashed: boolean } | { __typename: 'ExerciseRevision', trashed: boolean } | { __typename: 'GroupedExercise', trashed: boolean } | { __typename: 'GroupedExerciseRevision', trashed: boolean } | { __typename: 'Page', trashed: boolean } | { __typename: 'PageRevision', trashed: boolean } | { __typename: 'Solution', trashed: boolean } | { __typename: 'SolutionRevision', trashed: boolean } | { __typename: 'TaxonomyTerm', id: number, alias?: string | null, type: TaxonomyTermType, name: string, trashed: boolean } | { __typename: 'User', trashed: boolean } | { __typename: 'Video', trashed: boolean, alias?: string | null, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string }> } } | { __typename: 'VideoRevision', trashed: boolean }> } } | { __typename: 'User', trashed: boolean } | { __typename: 'Video', trashed: boolean, alias?: string | null, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string }> } } | { __typename: 'VideoRevision', trashed: boolean }> } } | { __typename: 'User', username: string, id: number, trashed: boolean, alias?: string | null } | { __typename: 'Video', instance: Instance, id: number, trashed: boolean, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', id: number, title: string, url: string, content: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', title: string }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } } | { __typename: 'VideoRevision', id: number, trashed: boolean, alias?: string | null } | null };

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


export type RevisionUuidQuery = { __typename?: 'Query', authorization: any, uuid?: { __typename?: 'Applet' } | { __typename: 'AppletRevision', id: number, trashed: boolean, date: string, changes: string, title: string, content: string, url: string, metaTitle: string, metaDescription: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Applet', trashed: boolean, instance: Instance, id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', id: number, title: string, content: string, url: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', id: number, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | { __typename?: 'Article' } | { __typename: 'ArticleRevision', id: number, trashed: boolean, date: string, changes: string, title: string, content: string, metaTitle: string, metaDescription: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Article', trashed: boolean, instance: Instance, id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', id: number, title: string, content: string, metaTitle: string, metaDescription: string, date: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', id: number, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename: 'CoursePageRevision', id: number, trashed: boolean, date: string, changes: string, content: string, title: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'CoursePage', trashed: boolean, instance: Instance, id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', id: number, content: string, title: string, date: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', id: number, trashed: boolean }> }, course: { __typename?: 'Course', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> } }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | { __typename: 'CourseRevision', id: number, trashed: boolean, date: string, changes: string, content: string, title: string, metaDescription: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Course', trashed: boolean, instance: Instance, id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', id: number, content: string, title: string, metaDescription: string } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', id: number, trashed: boolean }> }, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', title: string, content: string } | null }>, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | { __typename?: 'Event' } | { __typename: 'EventRevision', id: number, trashed: boolean, date: string, changes: string, title: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Event', trashed: boolean, instance: Instance, id: number, alias?: string | null, currentRevision?: { __typename?: 'EventRevision', id: number, title: string, content: string } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', id: number, trashed: boolean }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename: 'ExerciseGroupRevision', id: number, trashed: boolean, date: string, changes: string, cohesive: boolean, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'ExerciseGroup', trashed: boolean, instance: Instance, id: number, alias?: string | null, license: { __typename?: 'License', id: number, default: boolean, title: string, url: string, agreement: string, iconHref: string }, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number, content: string, cohesive: boolean, date: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, trashed: boolean }> }, exercises: Array<{ __typename?: 'GroupedExercise', id: number, alias?: string | null, instance: Instance, trashed: boolean, date: string, revisions: { __typename?: 'GroupedExerciseRevisionConnection', totalCount: number }, currentRevision?: { __typename?: 'GroupedExerciseRevision', content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, trashed: boolean, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } | null, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } }> } } | { __typename: 'ExerciseRevision', id: number, trashed: boolean, date: string, content: string, changes: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Exercise', trashed: boolean, instance: Instance, id: number, alias?: string | null, currentRevision?: { __typename?: 'ExerciseRevision', id: number, content: string, date: string } | null, solution?: { __typename?: 'Solution', id: number, currentRevision?: { __typename?: 'SolutionRevision', content: string } | null } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', id: number, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | { __typename?: 'GroupedExercise' } | { __typename: 'GroupedExerciseRevision', id: number, trashed: boolean, date: string, content: string, changes: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'GroupedExercise', trashed: boolean, instance: Instance, id: number, alias?: string | null, exerciseGroup: { __typename?: 'ExerciseGroup', id: number, exercises: Array<{ __typename?: 'GroupedExercise', id: number }> }, license: { __typename?: 'License', id: number, default: boolean, title: string, url: string, agreement: string, iconHref: string }, currentRevision?: { __typename?: 'GroupedExerciseRevision', id: number, content: string, date: string } | null, revisions: { __typename?: 'GroupedExerciseRevisionConnection', nodes: Array<{ __typename?: 'GroupedExerciseRevision', id: number, trashed: boolean }> } } } | { __typename?: 'Page' } | { __typename: 'PageRevision', id: number, trashed: boolean, date: string, title: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Page', trashed: boolean, instance: Instance, id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', id: number, title: string, content: string } | null, revisions: { __typename?: 'PageRevisionConnection', nodes: Array<{ __typename?: 'PageRevision', id: number, trashed: boolean }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | { __typename?: 'Solution' } | { __typename: 'SolutionRevision', id: number, trashed: boolean, date: string, content: string, changes: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Solution', trashed: boolean, instance: Instance, id: number, alias?: string | null, exercise: { __typename: 'Exercise', id: number } | { __typename: 'GroupedExercise', id: number, exerciseGroup: { __typename?: 'ExerciseGroup', id: number, exercises: Array<{ __typename?: 'GroupedExercise', id: number }> } }, currentRevision?: { __typename?: 'SolutionRevision', id: number, content: string } | null, revisions: { __typename?: 'SolutionRevisionConnection', nodes: Array<{ __typename?: 'SolutionRevision', id: number, trashed: boolean }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename: 'VideoRevision', id: number, trashed: boolean, date: string, changes: string, title: string, url: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Video', trashed: boolean, instance: Instance, id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', id: number, title: string, url: string, content: string } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', id: number, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string, url?: string | null, id?: number | null }> } } | null }> }, license: { __typename?: 'License', id: number, url: string, title: string, default: boolean, agreement: string, iconHref: string } } } | null };

export type CourseRevisionFragment = { __typename?: 'CourseRevision', content: string, title: string, metaDescription: string };

export type GetAllThreadsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetAllThreadsQuery = { __typename?: 'Query', thread: { __typename?: 'ThreadQuery', allThreads: { __typename?: 'AllThreadsConnection', pageInfo: { __typename?: 'HasNextPageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, trashed: boolean, object: { __typename: 'Applet', id: number, alias?: string | null } | { __typename: 'AppletRevision', id: number, alias?: string | null } | { __typename: 'Article', id: number, alias?: string | null } | { __typename: 'ArticleRevision', id: number, alias?: string | null } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias?: string | null } | { __typename: 'CoursePage', id: number, alias?: string | null } | { __typename: 'CoursePageRevision', id: number, alias?: string | null } | { __typename: 'CourseRevision', id: number, alias?: string | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'EventRevision', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null } | { __typename: 'PageRevision', id: number, alias?: string | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'SolutionRevision', id: number, alias?: string | null } | { __typename: 'TaxonomyTerm', id: number, alias?: string | null } | { __typename: 'User', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null } | { __typename: 'VideoRevision', id: number, alias?: string | null }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } };

export type GetCommentsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Article', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Comment' } | { __typename?: 'Course', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePage', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Event', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'EventRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Exercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'GroupedExercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'GroupedExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Page', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'PageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Solution', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'SolutionRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'User', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Video', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | null };

type GetCommentsThreads_Applet_Fragment = { __typename?: 'Applet', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_AppletRevision_Fragment = { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Article_Fragment = { __typename?: 'Article', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ArticleRevision_Fragment = { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Course_Fragment = { __typename?: 'Course', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CoursePage_Fragment = { __typename?: 'CoursePage', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CoursePageRevision_Fragment = { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CourseRevision_Fragment = { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Event_Fragment = { __typename?: 'Event', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_EventRevision_Fragment = { __typename?: 'EventRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Exercise_Fragment = { __typename?: 'Exercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseGroupRevision_Fragment = { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseRevision_Fragment = { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_GroupedExercise_Fragment = { __typename?: 'GroupedExercise', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_GroupedExerciseRevision_Fragment = { __typename?: 'GroupedExerciseRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Page_Fragment = { __typename?: 'Page', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_PageRevision_Fragment = { __typename?: 'PageRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Solution_Fragment = { __typename?: 'Solution', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_SolutionRevision_Fragment = { __typename?: 'SolutionRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_TaxonomyTerm_Fragment = { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_User_Fragment = { __typename?: 'User', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Video_Fragment = { __typename?: 'Video', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_VideoRevision_Fragment = { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadsConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

export type GetCommentsThreadsFragment = GetCommentsThreads_Applet_Fragment | GetCommentsThreads_AppletRevision_Fragment | GetCommentsThreads_Article_Fragment | GetCommentsThreads_ArticleRevision_Fragment | GetCommentsThreads_Course_Fragment | GetCommentsThreads_CoursePage_Fragment | GetCommentsThreads_CoursePageRevision_Fragment | GetCommentsThreads_CourseRevision_Fragment | GetCommentsThreads_Event_Fragment | GetCommentsThreads_EventRevision_Fragment | GetCommentsThreads_Exercise_Fragment | GetCommentsThreads_ExerciseGroup_Fragment | GetCommentsThreads_ExerciseGroupRevision_Fragment | GetCommentsThreads_ExerciseRevision_Fragment | GetCommentsThreads_GroupedExercise_Fragment | GetCommentsThreads_GroupedExerciseRevision_Fragment | GetCommentsThreads_Page_Fragment | GetCommentsThreads_PageRevision_Fragment | GetCommentsThreads_Solution_Fragment | GetCommentsThreads_SolutionRevision_Fragment | GetCommentsThreads_TaxonomyTerm_Fragment | GetCommentsThreads_User_Fragment | GetCommentsThreads_Video_Fragment | GetCommentsThreads_VideoRevision_Fragment;

export type GetSubscriptionsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', subscription: { __typename?: 'SubscriptionQuery', getSubscriptions: { __typename?: 'SubscriptionConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'SubscriptionInfo', sendEmail: boolean, object: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'AppletRevision', id: number, alias?: string | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, alias?: string | null } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'CoursePageRevision', id: number, alias?: string | null } | { __typename: 'CourseRevision', id: number, alias?: string | null } | { __typename: 'Event', id: number, alias?: string | null, currentRevision?: { __typename?: 'EventRevision', title: string } | null } | { __typename: 'EventRevision', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string }> } } | null }> } } | { __typename: 'ExerciseGroup', id: number, alias?: string | null, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string }> } } | null }> } } | { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'PageRevision', id: number, alias?: string | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'SolutionRevision', id: number, alias?: string | null } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, name: string, id: number, alias?: string | null } | { __typename: 'User', username: string, id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, alias?: string | null } }> } } };
