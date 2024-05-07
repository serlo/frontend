/* eslint-disable */
/* THIS FILE IS GENERATED – run `yarn codegen` to update */
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
  currentRevision?: Maybe<AbstractEntityRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: AbstractEntityRevisionConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractEntityRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AbstractEntityConnection {
  __typename?: 'AbstractEntityConnection';
  nodes: Array<AbstractEntity>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface AbstractEntityRevision {
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  repository: AbstractEntity;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
}

export interface AbstractEntityRevisionConnection {
  nodes: Array<AbstractEntityRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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
  nodes: Array<AbstractNotificationEvent>;
  pageInfo: PageInfo;
}

export interface AbstractRepository {
  alias: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractRepositoryThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AbstractRevision {
  alias: Scalars['String']['output'];
  author: User;
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AbstractTaxonomyTermChild {
  alias: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  taxonomyTerms: TaxonomyTermConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AbstractTaxonomyTermChildTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}

export interface AbstractUuid {
  alias: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}

export interface AbstractUuidConnection {
  __typename?: 'AbstractUuidConnection';
  nodes: Array<AbstractUuid>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface AiQuery {
  __typename?: 'AiQuery';
  executePrompt: ExecutePromptResponse;
}


export interface AiQueryExecutePromptArgs {
  messages: Array<ChatCompletionMessageParam>;
}

export interface AliasInput {
  instance: Instance;
  path: Scalars['String']['input'];
}

export interface Applet extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Applet';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<AppletRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: AppletRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface AppletRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface AppletTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface AppletThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AppletRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'AppletRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  repository: Applet;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
}


export interface AppletRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface AppletRevisionConnection extends AbstractEntityRevisionConnection {
  __typename?: 'AppletRevisionConnection';
  nodes: Array<AppletRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface Article extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Article';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<ArticleRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: ArticleRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ArticleRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface ArticleTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface ArticleThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ArticleRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'ArticleRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  repository: Article;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
}


export interface ArticleRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ArticleRevisionConnection extends AbstractEntityRevisionConnection {
  __typename?: 'ArticleRevisionConnection';
  nodes: Array<ArticleRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface CacheRemoveInput {
  keys: Array<Scalars['String']['input']>;
}

export interface ChatCompletionMessageParam {
  content: Scalars['String']['input'];
  role: Scalars['String']['input'];
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
  actorUsername?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
}

export interface CommentConnection {
  __typename?: 'CommentConnection';
  nodes: Array<Comment>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export enum CommentStatus {
  Done = 'done',
  NoStatus = 'noStatus',
  Open = 'open'
}

export interface Course extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Course';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<CourseRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  pages: Array<CoursePage>;
  revisions: CourseRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface CoursePagesArgs {
  hasCurrentRevision?: InputMaybe<Scalars['Boolean']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface CourseRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface CourseTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface CourseThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface CoursePage extends AbstractEntity, AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'CoursePage';
  alias: Scalars['String']['output'];
  course: Course;
  currentRevision?: Maybe<CoursePageRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: CoursePageRevisionConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface CoursePageRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface CoursePageThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface CoursePageRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'CoursePageRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  repository: CoursePage;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
}


export interface CoursePageRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface CoursePageRevisionConnection extends AbstractEntityRevisionConnection {
  __typename?: 'CoursePageRevisionConnection';
  nodes: Array<CoursePageRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface CourseRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'CourseRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle?: Maybe<Scalars['String']['output']>;
  repository: Course;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
}


export interface CourseRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface CourseRevisionConnection extends AbstractEntityRevisionConnection {
  __typename?: 'CourseRevisionConnection';
  nodes: Array<CourseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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

export interface DefaultResponse {
  __typename?: 'DefaultResponse';
  query: Query;
  success: Scalars['Boolean']['output'];
}

export interface DeletedEntity {
  __typename?: 'DeletedEntity';
  dateOfDeletion?: Maybe<Scalars['String']['output']>;
  entity?: Maybe<AbstractEntity>;
}

export interface DeletedEntityConnection {
  __typename?: 'DeletedEntityConnection';
  nodes: Array<DeletedEntity>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface EntityMutation {
  __typename?: 'EntityMutation';
  checkoutRevision: DefaultResponse;
  rejectRevision: DefaultResponse;
  setAbstractEntity: SetEntityResponse;
  sort: DefaultResponse;
  updateLicense: DefaultResponse;
}


export interface EntityMutationCheckoutRevisionArgs {
  input: CheckoutRevisionInput;
}


export interface EntityMutationRejectRevisionArgs {
  input: RejectRevisionInput;
}


export interface EntityMutationSetAbstractEntityArgs {
  input: SetAbstractEntityInput;
}


export interface EntityMutationSortArgs {
  input: EntitySortInput;
}


export interface EntityMutationUpdateLicenseArgs {
  input: EntityUpdateLicenseInput;
}

export interface EntityQuery {
  __typename?: 'EntityQuery';
  deletedEntities: DeletedEntityConnection;
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

export interface EntityUpdateLicenseInput {
  entityId: Scalars['Int']['input'];
  licenseId: Scalars['Int']['input'];
}

export interface Event extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Event';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<EventRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: EventRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface EventRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface EventTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface EventThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface EventRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'EventRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  repository: Event;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
}


export interface EventRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface EventRevisionConnection extends AbstractEntityRevisionConnection {
  __typename?: 'EventRevisionConnection';
  nodes: Array<EventRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ExecutePromptResponse {
  __typename?: 'ExecutePromptResponse';
  record: Scalars['JSONObject']['output'];
  success: Scalars['Boolean']['output'];
}

export interface Exercise extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Exercise';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<ExerciseRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: ExerciseRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ExerciseRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface ExerciseTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface ExerciseThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ExerciseGroup extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'ExerciseGroup';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<ExerciseGroupRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: ExerciseGroupRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface ExerciseGroupRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface ExerciseGroupTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface ExerciseGroupThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ExerciseGroupRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'ExerciseGroupRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  repository: ExerciseGroup;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
}


export interface ExerciseGroupRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ExerciseGroupRevisionConnection extends AbstractEntityRevisionConnection {
  __typename?: 'ExerciseGroupRevisionConnection';
  nodes: Array<ExerciseGroupRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ExerciseRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'ExerciseRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  repository: Exercise;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
}


export interface ExerciseRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ExerciseRevisionConnection extends AbstractEntityRevisionConnection {
  __typename?: 'ExerciseRevisionConnection';
  nodes: Array<ExerciseRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ExerciseSubmissionInput {
  entityId: Scalars['Int']['input'];
  path: Scalars['String']['input'];
  result: Scalars['String']['input'];
  revisionId: Scalars['Int']['input'];
  sessionId: Scalars['String']['input'];
  type: Scalars['String']['input'];
}

export interface ExperimentMutation {
  __typename?: 'ExperimentMutation';
  createExerciseSubmission: DefaultResponse;
}


export interface ExperimentMutationCreateExerciseSubmissionArgs {
  input: ExerciseSubmissionInput;
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
  publisher: Scalars['JSONObject']['output'];
  resources: ResourceMetadataConnection;
  version: Scalars['String']['output'];
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
  experiment: ExperimentMutation;
  notification: NotificationMutation;
  oauth: OauthMutation;
  page: PageMutation;
  subscription: SubscriptionMutation;
  taxonomyTerm: TaxonomyTermMutation;
  thread: ThreadMutation;
  user: UserMutation;
  uuid: UuidMutation;
}

export interface Notification {
  __typename?: 'Notification';
  email: Scalars['Boolean']['output'];
  emailSent: Scalars['Boolean']['output'];
  event?: Maybe<AbstractNotificationEvent>;
  id: Scalars['Int']['output'];
  unread: Scalars['Boolean']['output'];
}

export interface NotificationConnection {
  __typename?: 'NotificationConnection';
  nodes: Array<Notification>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface NotificationMutation {
  __typename?: 'NotificationMutation';
  setState?: Maybe<DefaultResponse>;
}


export interface NotificationMutationSetStateArgs {
  input: NotificationSetStateInput;
}

export interface NotificationSetStateInput {
  id: Array<Scalars['Int']['input']>;
  unread: Scalars['Boolean']['input'];
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

export interface Page extends AbstractRepository, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Page';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<PageRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: PageRevisionConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface PageRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface PageThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface PageAddRevisionInput {
  content: Scalars['String']['input'];
  pageId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}

export interface PageInfo {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
}

export interface PageMutation {
  __typename?: 'PageMutation';
  addRevision: DefaultResponse;
  checkoutRevision: DefaultResponse;
  create: DefaultResponse;
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
  id: Scalars['Int']['output'];
  repository: Page;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface PageRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface PageRevisionConnection {
  __typename?: 'PageRevisionConnection';
  nodes: Array<PageRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface Query {
  __typename?: 'Query';
  ai: AiQuery;
  authorization: Scalars['JSON']['output'];
  entity?: Maybe<EntityQuery>;
  events: AbstractNotificationEventConnection;
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


export interface QueryEventsArgs {
  actorId?: InputMaybe<Scalars['Int']['input']>;
  actorUsername?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
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
  email?: InputMaybe<Scalars['Boolean']['input']>;
  emailSent?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
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

export interface ResourceMetadataConnection {
  __typename?: 'ResourceMetadataConnection';
  nodes: Array<Scalars['JSONObject']['output']>;
  pageInfo: PageInfo;
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
  nodes: Array<ScopedRole>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface SetAbstractEntityInput {
  changes: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  entityId?: InputMaybe<Scalars['Int']['input']>;
  entityType: Scalars['String']['input'];
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  needsReview: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  subscribeThis: Scalars['Boolean']['input'];
  subscribeThisByEmail: Scalars['Boolean']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
}

export interface SetEntityResponse {
  __typename?: 'SetEntityResponse';
  query: Query;
  record?: Maybe<AbstractEntity>;
  success: Scalars['Boolean']['output'];
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

export interface Subject {
  __typename?: 'Subject';
  id: Scalars['String']['output'];
  taxonomyTerm: TaxonomyTerm;
  unrevisedEntities: AbstractEntityConnection;
}


export interface SubjectUnrevisedEntitiesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}

export interface SubjectQuery {
  __typename?: 'SubjectQuery';
  subjects: Array<Subject>;
}


export interface SubjectQuerySubjectsArgs {
  instance: Instance;
}

export interface SubscriptionInfo {
  __typename?: 'SubscriptionInfo';
  object: AbstractUuid;
  sendEmail: Scalars['Boolean']['output'];
}

export interface SubscriptionInfoConnection {
  __typename?: 'SubscriptionInfoConnection';
  nodes: Array<SubscriptionInfo>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface SubscriptionMutation {
  __typename?: 'SubscriptionMutation';
  set: DefaultResponse;
}


export interface SubscriptionMutationSetArgs {
  input: SubscriptionSetInput;
}

export interface SubscriptionQuery {
  __typename?: 'SubscriptionQuery';
  currentUserHasSubscribed: Scalars['Boolean']['output'];
  getSubscriptions: SubscriptionInfoConnection;
}


export interface SubscriptionQueryCurrentUserHasSubscribedArgs {
  id: Scalars['Int']['input'];
}


export interface SubscriptionQueryGetSubscriptionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}

export interface SubscriptionSetInput {
  id: Array<Scalars['Int']['input']>;
  sendEmail: Scalars['Boolean']['input'];
  subscribe: Scalars['Boolean']['input'];
}

export interface TaxonomyEntityLinksInput {
  entityIds: Array<Scalars['Int']['input']>;
  taxonomyTermId: Scalars['Int']['input'];
}

export interface TaxonomyTerm extends AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'TaxonomyTerm';
  alias: Scalars['String']['output'];
  children: AbstractUuidConnection;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  instance: Instance;
  name: Scalars['String']['output'];
  parent?: Maybe<TaxonomyTerm>;
  path: Array<Maybe<TaxonomyTerm>>;
  taxonomyId: Scalars['Int']['output'];
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  type: TaxonomyTermType;
  weight: Scalars['Int']['output'];
}


export interface TaxonomyTermChildrenArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface TaxonomyTermThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface TaxonomyTermConnection {
  __typename?: 'TaxonomyTermConnection';
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

export interface TaxonomyTermMutation {
  __typename?: 'TaxonomyTermMutation';
  create: TaxonomyTermCreateResponse;
  createEntityLinks: DefaultResponse;
  deleteEntityLinks: DefaultResponse;
  setNameAndDescription: DefaultResponse;
  sort: DefaultResponse;
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

export interface TaxonomyTermSortInput {
  childrenIds: Array<Scalars['Int']['input']>;
  taxonomyTermId: Scalars['Int']['input'];
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
  status: CommentStatus;
  title?: Maybe<Scalars['String']['output']>;
  trashed: Scalars['Boolean']['output'];
}


export interface ThreadCommentsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}

export interface ThreadAware {
  threads: ThreadConnection;
}


export interface ThreadAwareThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ThreadConnection {
  __typename?: 'ThreadConnection';
  nodes: Array<Thread>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface ThreadCreateCommentInput {
  content: Scalars['String']['input'];
  sendEmail: Scalars['Boolean']['input'];
  subscribe: Scalars['Boolean']['input'];
  threadId: Scalars['String']['input'];
}

export interface ThreadCreateThreadInput {
  content: Scalars['String']['input'];
  objectId: Scalars['Int']['input'];
  sendEmail: Scalars['Boolean']['input'];
  subscribe: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
}

export interface ThreadEditCommentInput {
  commentId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}

export interface ThreadMutation {
  __typename?: 'ThreadMutation';
  createComment: DefaultResponse;
  createThread: DefaultResponse;
  editComment: DefaultResponse;
  setCommentState: DefaultResponse;
  setThreadArchived: DefaultResponse;
  setThreadState: DefaultResponse;
  setThreadStatus: DefaultResponse;
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


export interface ThreadMutationSetThreadStatusArgs {
  input: ThreadSetThreadStatusInput;
}

export interface ThreadQuery {
  __typename?: 'ThreadQuery';
  allThreads: ThreadConnection;
}


export interface ThreadQueryAllThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  status?: InputMaybe<CommentStatus>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
}

export interface ThreadSetCommentStateInput {
  id: Array<Scalars['Int']['input']>;
  trashed: Scalars['Boolean']['input'];
}

export interface ThreadSetThreadArchivedInput {
  archived: Scalars['Boolean']['input'];
  id: Array<Scalars['String']['input']>;
}

export interface ThreadSetThreadStateInput {
  id: Array<Scalars['String']['input']>;
  trashed: Scalars['Boolean']['input'];
}

export interface ThreadSetThreadStatusInput {
  id: Array<Scalars['String']['input']>;
  status: CommentStatus;
}

export interface User extends AbstractUuid, ThreadAware {
  __typename?: 'User';
  activityByType: UserActivityByType;
  alias: Scalars['String']['output'];
  chatUrl?: Maybe<Scalars['String']['output']>;
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
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
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  unrevisedEntities: AbstractEntityConnection;
  username: Scalars['String']['output'];
}


export interface UserRolesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface UserThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface UserUnrevisedEntitiesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  nodes: Array<User>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface UserDeleteBotsInput {
  botIds: Array<Scalars['Int']['input']>;
}

export interface UserDeleteRegularUsersInput {
  id: Scalars['Int']['input'];
  username: Scalars['String']['input'];
}

export interface UserDeleteRegularUsersResponse {
  __typename?: 'UserDeleteRegularUsersResponse';
  reason?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  username?: Maybe<Scalars['String']['output']>;
}

export interface UserMutation {
  __typename?: 'UserMutation';
  addRole: DefaultResponse;
  deleteBots: DefaultResponse;
  deleteRegularUser: DefaultResponse;
  removeRole: DefaultResponse;
  setDescription: DefaultResponse;
  setEmail: DefaultResponse;
}


export interface UserMutationAddRoleArgs {
  input: UserRoleInput;
}


export interface UserMutationDeleteBotsArgs {
  input: UserDeleteBotsInput;
}


export interface UserMutationDeleteRegularUserArgs {
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
  userByUsername?: Maybe<User>;
  usersByRole: UserConnection;
}


export interface UserQueryPotentialSpamUsersArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface UserQueryUserByUsernameArgs {
  username: Scalars['String']['input'];
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

export interface UserSetDescriptionInput {
  description: Scalars['String']['input'];
}

export interface UserSetEmailInput {
  email: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
}

export interface UuidMutation {
  __typename?: 'UuidMutation';
  setState: DefaultResponse;
}


export interface UuidMutationSetStateArgs {
  input: UuidSetStateInput;
}

export interface UuidSetStateInput {
  id: Array<Scalars['Int']['input']>;
  trashed: Scalars['Boolean']['input'];
}

export interface Video extends AbstractEntity, AbstractRepository, AbstractTaxonomyTermChild, AbstractUuid, InstanceAware, ThreadAware {
  __typename?: 'Video';
  alias: Scalars['String']['output'];
  currentRevision?: Maybe<VideoRevision>;
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instance: Instance;
  licenseId: Scalars['Int']['output'];
  revisions: VideoRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
}


export interface VideoRevisionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  unrevised?: InputMaybe<Scalars['Boolean']['input']>;
}


export interface VideoTaxonomyTermsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}


export interface VideoThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface VideoRevision extends AbstractEntityRevision, AbstractRevision, AbstractUuid, ThreadAware {
  __typename?: 'VideoRevision';
  alias: Scalars['String']['output'];
  author: User;
  changes: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  repository: Video;
  threads: ThreadConnection;
  title: Scalars['String']['output'];
  trashed: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
}


export interface VideoRevisionThreadsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface VideoRevisionConnection extends AbstractEntityRevisionConnection {
  __typename?: 'VideoRevisionConnection';
  nodes: Array<VideoRevision>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
}

export interface _CacheMutation {
  __typename?: '_cacheMutation';
  remove: DefaultResponse;
}


export interface _CacheMutationRemoveArgs {
  input: CacheRemoveInput;
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


export type UuidSimpleQuery = { __typename?: 'Query', uuid?: { __typename: 'Applet', id: number, title: string } | { __typename: 'AppletRevision', id: number, title: string } | { __typename: 'Article', id: number, title: string } | { __typename: 'ArticleRevision', id: number, title: string } | { __typename: 'Comment', id: number, title: string } | { __typename: 'Course', id: number, title: string } | { __typename: 'CoursePage', id: number, title: string, course: { __typename?: 'Course', id: number } } | { __typename: 'CoursePageRevision', id: number, title: string } | { __typename: 'CourseRevision', id: number, title: string } | { __typename: 'Event', id: number, title: string } | { __typename: 'EventRevision', id: number, title: string } | { __typename: 'Exercise', id: number, title: string } | { __typename: 'ExerciseGroup', id: number, title: string } | { __typename: 'ExerciseGroupRevision', id: number, title: string } | { __typename: 'ExerciseRevision', id: number, title: string } | { __typename: 'Page', id: number, title: string } | { __typename: 'PageRevision', id: number, title: string } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, id: number, title: string } | { __typename: 'User', id: number, title: string } | { __typename: 'Video', id: number, title: string } | { __typename: 'VideoRevision', id: number, title: string } | null };

export type UnreadNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnreadNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationConnection', totalCount: number } };

export type GetEventDataQueryVariables = Exact<{
  actorUsername?: InputMaybe<Scalars['String']['input']>;
  objectId?: InputMaybe<Scalars['Int']['input']>;
  instance?: InputMaybe<Instance>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEventDataQuery = { __typename?: 'Query', events: { __typename?: 'AbstractNotificationEventConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename: 'CheckoutRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, revision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'VideoRevision', id: number }, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateCommentNotificationEvent', date: string, id: number, objectId: number, comment: { __typename?: 'Comment', id: number, content: string }, thread: { __typename?: 'Thread', id: string, title?: string | null, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityNotificationEvent', date: string, id: number, objectId: number, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityRevisionNotificationEvent', date: string, id: number, objectId: number, entityRevision: { __typename?: 'AppletRevision', changes: string, id: number } | { __typename?: 'ArticleRevision', changes: string, id: number } | { __typename?: 'CoursePageRevision', changes: string, id: number } | { __typename?: 'CourseRevision', changes: string, id: number } | { __typename?: 'EventRevision', changes: string, id: number } | { __typename?: 'ExerciseGroupRevision', changes: string, id: number } | { __typename?: 'ExerciseRevision', changes: string, id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'VideoRevision', changes: string, id: number }, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateThreadNotificationEvent', date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, content: string }> } }, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RejectRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, revision: { __typename?: 'AppletRevision', id: number, alias: string } | { __typename?: 'ArticleRevision', id: number, alias: string } | { __typename?: 'CoursePageRevision', id: number, alias: string } | { __typename?: 'CourseRevision', id: number, alias: string } | { __typename?: 'EventRevision', id: number, alias: string } | { __typename?: 'ExerciseGroupRevision', id: number, alias: string } | { __typename?: 'ExerciseRevision', id: number, alias: string } | { __typename?: 'PageRevision', id: number, alias: string } | { __typename?: 'VideoRevision', id: number, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RemoveEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RemoveTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetLicenseNotificationEvent', date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetTaxonomyParentNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, previousParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, optionalParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetThreadStateNotificationEvent', archived: boolean, date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetUuidStateNotificationEvent', trashed: boolean, date: string, id: number, objectId: number, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } };

export type UsersRevisionsQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UsersRevisionsQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', userByUsername?: { __typename?: 'User', unrevisedEntities: { __typename?: 'AbstractEntityConnection', totalCount: number, nodes: Array<{ __typename: 'Applet', id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', title: string, id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Article', id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', title: string, id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Course', id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', title: string, id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string, id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Event', id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', title: string, id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Exercise', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', title: string, id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', title: string, id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Video', id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', title: string, id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } } | null } };

type AbstractRevision_AppletRevision_Fragment = { __typename?: 'AppletRevision', id: number, alias: string, title: string, content: string, date: string };

type AbstractRevision_ArticleRevision_Fragment = { __typename?: 'ArticleRevision', id: number, alias: string, title: string, content: string, date: string };

type AbstractRevision_CoursePageRevision_Fragment = { __typename?: 'CoursePageRevision', id: number, alias: string, title: string, content: string, date: string };

type AbstractRevision_CourseRevision_Fragment = { __typename?: 'CourseRevision', id: number, alias: string, title: string, content: string, date: string };

type AbstractRevision_EventRevision_Fragment = { __typename?: 'EventRevision', id: number, alias: string, title: string, content: string, date: string };

type AbstractRevision_ExerciseGroupRevision_Fragment = { __typename?: 'ExerciseGroupRevision', id: number, alias: string, title: string, content: string, date: string };

type AbstractRevision_ExerciseRevision_Fragment = { __typename?: 'ExerciseRevision', id: number, alias: string, title: string, content: string, date: string };

type AbstractRevision_PageRevision_Fragment = { __typename?: 'PageRevision', id: number, alias: string, title: string, content: string, date: string };

type AbstractRevision_VideoRevision_Fragment = { __typename?: 'VideoRevision', id: number, alias: string, title: string, content: string, date: string };

export type AbstractRevisionFragment = AbstractRevision_AppletRevision_Fragment | AbstractRevision_ArticleRevision_Fragment | AbstractRevision_CoursePageRevision_Fragment | AbstractRevision_CourseRevision_Fragment | AbstractRevision_EventRevision_Fragment | AbstractRevision_ExerciseGroupRevision_Fragment | AbstractRevision_ExerciseRevision_Fragment | AbstractRevision_PageRevision_Fragment | AbstractRevision_VideoRevision_Fragment;

type AbstractEntityRevision_AppletRevision_Fragment = { __typename?: 'AppletRevision', metaTitle: string, metaDescription: string, url: string, id: number, alias: string, title: string, content: string, date: string };

type AbstractEntityRevision_ArticleRevision_Fragment = { __typename?: 'ArticleRevision', metaTitle: string, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string };

type AbstractEntityRevision_CoursePageRevision_Fragment = { __typename?: 'CoursePageRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string };

type AbstractEntityRevision_CourseRevision_Fragment = { __typename?: 'CourseRevision', metaTitle?: string | null, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string };

type AbstractEntityRevision_EventRevision_Fragment = { __typename?: 'EventRevision', metaTitle: string, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string };

type AbstractEntityRevision_ExerciseGroupRevision_Fragment = { __typename?: 'ExerciseGroupRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string };

type AbstractEntityRevision_ExerciseRevision_Fragment = { __typename?: 'ExerciseRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string };

type AbstractEntityRevision_VideoRevision_Fragment = { __typename?: 'VideoRevision', metaTitle?: string | null, metaDescription?: string | null, url: string, id: number, alias: string, title: string, content: string, date: string };

export type AbstractEntityRevisionFragment = AbstractEntityRevision_AppletRevision_Fragment | AbstractEntityRevision_ArticleRevision_Fragment | AbstractEntityRevision_CoursePageRevision_Fragment | AbstractEntityRevision_CourseRevision_Fragment | AbstractEntityRevision_EventRevision_Fragment | AbstractEntityRevision_ExerciseGroupRevision_Fragment | AbstractEntityRevision_ExerciseRevision_Fragment | AbstractEntityRevision_VideoRevision_Fragment;

type EventData_CheckoutRevisionNotificationEvent_Fragment = { __typename: 'CheckoutRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, revision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'VideoRevision', id: number }, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateCommentNotificationEvent_Fragment = { __typename: 'CreateCommentNotificationEvent', date: string, id: number, objectId: number, comment: { __typename?: 'Comment', id: number, content: string }, thread: { __typename?: 'Thread', id: string, title?: string | null, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityLinkNotificationEvent_Fragment = { __typename: 'CreateEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityNotificationEvent_Fragment = { __typename: 'CreateEntityNotificationEvent', date: string, id: number, objectId: number, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateEntityRevisionNotificationEvent_Fragment = { __typename: 'CreateEntityRevisionNotificationEvent', date: string, id: number, objectId: number, entityRevision: { __typename?: 'AppletRevision', changes: string, id: number } | { __typename?: 'ArticleRevision', changes: string, id: number } | { __typename?: 'CoursePageRevision', changes: string, id: number } | { __typename?: 'CourseRevision', changes: string, id: number } | { __typename?: 'EventRevision', changes: string, id: number } | { __typename?: 'ExerciseGroupRevision', changes: string, id: number } | { __typename?: 'ExerciseRevision', changes: string, id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'VideoRevision', changes: string, id: number }, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateTaxonomyLinkNotificationEvent_Fragment = { __typename: 'CreateTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateTaxonomyTermNotificationEvent_Fragment = { __typename: 'CreateTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_CreateThreadNotificationEvent_Fragment = { __typename: 'CreateThreadNotificationEvent', date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, content: string }> } }, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RejectRevisionNotificationEvent_Fragment = { __typename: 'RejectRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, revision: { __typename?: 'AppletRevision', id: number, alias: string } | { __typename?: 'ArticleRevision', id: number, alias: string } | { __typename?: 'CoursePageRevision', id: number, alias: string } | { __typename?: 'CourseRevision', id: number, alias: string } | { __typename?: 'EventRevision', id: number, alias: string } | { __typename?: 'ExerciseGroupRevision', id: number, alias: string } | { __typename?: 'ExerciseRevision', id: number, alias: string } | { __typename?: 'PageRevision', id: number, alias: string } | { __typename?: 'VideoRevision', id: number, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RemoveEntityLinkNotificationEvent_Fragment = { __typename: 'RemoveEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_RemoveTaxonomyLinkNotificationEvent_Fragment = { __typename: 'RemoveTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetLicenseNotificationEvent_Fragment = { __typename: 'SetLicenseNotificationEvent', date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetTaxonomyParentNotificationEvent_Fragment = { __typename: 'SetTaxonomyParentNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, previousParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, optionalParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetTaxonomyTermNotificationEvent_Fragment = { __typename: 'SetTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetThreadStateNotificationEvent_Fragment = { __typename: 'SetThreadStateNotificationEvent', archived: boolean, date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

type EventData_SetUuidStateNotificationEvent_Fragment = { __typename: 'SetUuidStateNotificationEvent', trashed: boolean, date: string, id: number, objectId: number, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } };

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

type EntityInfo_Page_Fragment = { __typename: 'Page', id: number, title: string, alias: string };

type EntityInfo_PageRevision_Fragment = { __typename: 'PageRevision', id: number, title: string, alias: string };

type EntityInfo_TaxonomyTerm_Fragment = { __typename: 'TaxonomyTerm', id: number, title: string, alias: string };

type EntityInfo_User_Fragment = { __typename: 'User', id: number, title: string, alias: string };

type EntityInfo_Video_Fragment = { __typename: 'Video', id: number, title: string, alias: string };

type EntityInfo_VideoRevision_Fragment = { __typename: 'VideoRevision', id: number, title: string, alias: string };

export type EntityInfoFragment = EntityInfo_Applet_Fragment | EntityInfo_AppletRevision_Fragment | EntityInfo_Article_Fragment | EntityInfo_ArticleRevision_Fragment | EntityInfo_Comment_Fragment | EntityInfo_Course_Fragment | EntityInfo_CoursePage_Fragment | EntityInfo_CoursePageRevision_Fragment | EntityInfo_CourseRevision_Fragment | EntityInfo_Event_Fragment | EntityInfo_EventRevision_Fragment | EntityInfo_Exercise_Fragment | EntityInfo_ExerciseGroup_Fragment | EntityInfo_ExerciseGroupRevision_Fragment | EntityInfo_ExerciseRevision_Fragment | EntityInfo_Page_Fragment | EntityInfo_PageRevision_Fragment | EntityInfo_TaxonomyTerm_Fragment | EntityInfo_User_Fragment | EntityInfo_Video_Fragment | EntityInfo_VideoRevision_Fragment;

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

type WithTaxonomyTerms_Page_Fragment = { __typename?: 'Page' };

type WithTaxonomyTerms_PageRevision_Fragment = { __typename?: 'PageRevision' };

type WithTaxonomyTerms_TaxonomyTerm_Fragment = { __typename?: 'TaxonomyTerm' };

type WithTaxonomyTerms_User_Fragment = { __typename?: 'User' };

type WithTaxonomyTerms_Video_Fragment = { __typename?: 'Video' };

type WithTaxonomyTerms_VideoRevision_Fragment = { __typename?: 'VideoRevision' };

export type WithTaxonomyTermsFragment = WithTaxonomyTerms_Applet_Fragment | WithTaxonomyTerms_AppletRevision_Fragment | WithTaxonomyTerms_Article_Fragment | WithTaxonomyTerms_ArticleRevision_Fragment | WithTaxonomyTerms_Comment_Fragment | WithTaxonomyTerms_Course_Fragment | WithTaxonomyTerms_CoursePage_Fragment | WithTaxonomyTerms_CoursePageRevision_Fragment | WithTaxonomyTerms_CourseRevision_Fragment | WithTaxonomyTerms_Event_Fragment | WithTaxonomyTerms_EventRevision_Fragment | WithTaxonomyTerms_Exercise_Fragment | WithTaxonomyTerms_ExerciseGroup_Fragment | WithTaxonomyTerms_ExerciseGroupRevision_Fragment | WithTaxonomyTerms_ExerciseRevision_Fragment | WithTaxonomyTerms_Page_Fragment | WithTaxonomyTerms_PageRevision_Fragment | WithTaxonomyTerms_TaxonomyTerm_Fragment | WithTaxonomyTerms_User_Fragment | WithTaxonomyTerms_Video_Fragment | WithTaxonomyTerms_VideoRevision_Fragment;

export type ExerciseFragment = { __typename?: 'Exercise', id: number, alias: string, instance: Instance, trashed: boolean, date: string, licenseId: number, currentRevision?: { __typename?: 'ExerciseRevision', id: number, content: string, date: string } | null };

export type PathToRootFragment = { __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> };

export type MainUuidQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  alias?: InputMaybe<AliasInput>;
}>;


export type MainUuidQuery = { __typename?: 'Query', authorization: any, uuid?: { __typename: 'Applet', instance: Instance, licenseId: number, date: string, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'AppletRevision', metaTitle: string, metaDescription: string, url: string, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename: 'AppletRevision', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'Article', instance: Instance, licenseId: number, date: string, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'ArticleRevision', metaTitle: string, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename: 'ArticleRevision', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'Comment', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'Course', instance: Instance, licenseId: number, date: string, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'CourseRevision', metaTitle?: string | null, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseRevision', id: number, title: string, trashed: boolean }> }, pages: Array<{ __typename?: 'CoursePage', alias: string, id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number, title: string, content: string } | null }>, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename: 'CoursePage', instance: Instance, licenseId: number, date: string, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', id: number, title: string, trashed: boolean }> }, course: { __typename?: 'Course', id: number, licenseId: number, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseRevision', id: number, trashed: boolean, title: string }> }, pages: Array<{ __typename?: 'CoursePage', alias: string, id: number, currentRevision?: { __typename?: 'CoursePageRevision', title: string, trashed: boolean } | null }>, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } | { __typename: 'CoursePageRevision', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'CourseRevision', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'Event', instance: Instance, licenseId: number, date: string, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'EventRevision', metaTitle: string, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'EventRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'EventRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename: 'EventRevision', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'Exercise', instance: Instance, licenseId: number, date: string, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number, content: string, date: string, metaTitle?: string | null, metaDescription?: string | null, url?: string | null, alias: string, title: string } | null, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename: 'ExerciseGroup', instance: Instance, licenseId: number, date: string, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'Page', instance: Instance, licenseId: number, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'PageRevision', id: number, alias: string, title: string, content: string, date: string } | null } | { __typename: 'PageRevision', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'TaxonomyTerm', alias: string, title: string, instance: Instance, type: TaxonomyTermType, name: string, description?: string | null, weight: number, taxonomyId: number, trashed: boolean, id: number, parent?: { __typename?: 'TaxonomyTerm', id: number } | null, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'AppletRevision', trashed: boolean } | { __typename: 'Article', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'ArticleRevision', trashed: boolean } | { __typename: 'Comment', trashed: boolean } | { __typename: 'Course', trashed: boolean, alias: string, title: string, id: number, date: string, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }>, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'CoursePage', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'CoursePageRevision', trashed: boolean } | { __typename: 'CourseRevision', trashed: boolean } | { __typename: 'Event', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'EventRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'EventRevision', trashed: boolean } | { __typename: 'Exercise', trashed: boolean, id: number, alias: string, instance: Instance, date: string, licenseId: number, title: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number, content: string, date: string, title: string } | null, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, instance: Instance, licenseId: number, trashed: boolean, title: string, date: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', content: string, id: number, date: string, title: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseGroupRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'ExerciseGroupRevision', trashed: boolean } | { __typename: 'ExerciseRevision', trashed: boolean } | { __typename: 'Page', trashed: boolean } | { __typename: 'PageRevision', trashed: boolean } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, name: string, alias: string, id: number, description?: string | null, trashed: boolean, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'AppletRevision', trashed: boolean } | { __typename: 'Article', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'ArticleRevision', trashed: boolean } | { __typename: 'Comment', trashed: boolean } | { __typename: 'Course', trashed: boolean, alias: string, title: string, id: number, date: string, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }>, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'CoursePage', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'CoursePageRevision', trashed: boolean } | { __typename: 'CourseRevision', trashed: boolean } | { __typename: 'Event', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'EventRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'EventRevision', trashed: boolean } | { __typename: 'Exercise', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'ExerciseRevision', title: string } | null, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'ExerciseGroup', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', title: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseGroupRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'ExerciseGroupRevision', trashed: boolean } | { __typename: 'ExerciseRevision', trashed: boolean } | { __typename: 'Page', trashed: boolean } | { __typename: 'PageRevision', trashed: boolean } | { __typename: 'TaxonomyTerm', id: number, alias: string, type: TaxonomyTermType, name: string, trashed: boolean } | { __typename: 'User', trashed: boolean } | { __typename: 'Video', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'VideoRevision', trashed: boolean }> } } | { __typename: 'User', trashed: boolean } | { __typename: 'Video', trashed: boolean, alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', title: string, trashed: boolean, id: number }> } } | { __typename: 'VideoRevision', trashed: boolean }> }, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> } | { __typename: 'User', id: number, title: string, trashed: boolean, alias: string } | { __typename: 'Video', instance: Instance, licenseId: number, date: string, id: number, title: string, trashed: boolean, alias: string, currentRevision?: { __typename?: 'VideoRevision', metaTitle?: string | null, metaDescription?: string | null, url: string, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename: 'VideoRevision', id: number, title: string, trashed: boolean, alias: string } | null };

type TaxonomyTermsV2_Applet_Fragment = { __typename?: 'Applet', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } };

type TaxonomyTermsV2_Article_Fragment = { __typename?: 'Article', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } };

type TaxonomyTermsV2_Course_Fragment = { __typename?: 'Course', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } };

type TaxonomyTermsV2_Event_Fragment = { __typename?: 'Event', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } };

type TaxonomyTermsV2_Exercise_Fragment = { __typename?: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } };

type TaxonomyTermsV2_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } };

type TaxonomyTermsV2_Video_Fragment = { __typename?: 'Video', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } };

export type TaxonomyTermsV2Fragment = TaxonomyTermsV2_Applet_Fragment | TaxonomyTermsV2_Article_Fragment | TaxonomyTermsV2_Course_Fragment | TaxonomyTermsV2_Event_Fragment | TaxonomyTermsV2_Exercise_Fragment | TaxonomyTermsV2_ExerciseGroup_Fragment | TaxonomyTermsV2_Video_Fragment;

type TaxonomyTermChild_Applet_Fragment = { __typename?: 'Applet', alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'AppletRevision', title: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', title: string, trashed: boolean, id: number }> } };

type TaxonomyTermChild_Article_Fragment = { __typename?: 'Article', alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', title: string, trashed: boolean, id: number }> } };

type TaxonomyTermChild_Course_Fragment = { __typename?: 'Course', alias: string, title: string, id: number, date: string, pages: Array<{ __typename?: 'CoursePage', id: number, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null }>, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseRevision', title: string, trashed: boolean, id: number }> } };

type TaxonomyTermChild_CoursePage_Fragment = { __typename?: 'CoursePage', alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', title: string, trashed: boolean, id: number }> } };

type TaxonomyTermChild_Event_Fragment = { __typename?: 'Event', alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'EventRevision', title: string } | null, revisions: { __typename?: 'EventRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'EventRevision', title: string, trashed: boolean, id: number }> } };

type TaxonomyTermChild_Exercise_Fragment = { __typename?: 'Exercise', alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'ExerciseRevision', title: string } | null, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseRevision', title: string, trashed: boolean, id: number }> } };

type TaxonomyTermChild_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', title: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseGroupRevision', title: string, trashed: boolean, id: number }> } };

type TaxonomyTermChild_Video_Fragment = { __typename?: 'Video', alias: string, title: string, id: number, date: string, currentRevision?: { __typename?: 'VideoRevision', title: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', title: string, trashed: boolean, id: number }> } };

export type TaxonomyTermChildFragment = TaxonomyTermChild_Applet_Fragment | TaxonomyTermChild_Article_Fragment | TaxonomyTermChild_Course_Fragment | TaxonomyTermChild_CoursePage_Fragment | TaxonomyTermChild_Event_Fragment | TaxonomyTermChild_Exercise_Fragment | TaxonomyTermChild_ExerciseGroup_Fragment | TaxonomyTermChild_Video_Fragment;

export type RevisionUuidQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RevisionUuidQuery = { __typename?: 'Query', authorization: any, uuid?: { __typename?: 'Applet' } | { __typename: 'AppletRevision', title: string, id: number, alias: string, trashed: boolean, date: string, changes: string, metaTitle: string, metaDescription: string, url: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Applet', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', metaTitle: string, metaDescription: string, url: string, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'AppletRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'AppletRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } | { __typename?: 'Article' } | { __typename: 'ArticleRevision', title: string, id: number, alias: string, trashed: boolean, date: string, changes: string, metaTitle: string, metaDescription: string, url?: string | null, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Article', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', metaTitle: string, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'ArticleRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ArticleRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename: 'CoursePageRevision', title: string, id: number, alias: string, trashed: boolean, date: string, changes: string, metaTitle?: string | null, metaDescription?: string | null, url?: string | null, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'CoursePage', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'CoursePageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CoursePageRevision', id: number, title: string, trashed: boolean }> }, course: { __typename?: 'Course', licenseId: number, id: number, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseRevision', id: number, title: string, trashed: boolean }> }, currentRevision?: { __typename?: 'CourseRevision', title: string } | null, pages: Array<{ __typename?: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string, trashed: boolean } | null }>, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } } | { __typename: 'CourseRevision', title: string, id: number, alias: string, trashed: boolean, date: string, changes: string, metaTitle?: string | null, metaDescription: string, url?: string | null, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Course', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', metaTitle?: string | null, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'CourseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseRevision', id: number, title: string, trashed: boolean }> }, pages: Array<{ __typename?: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null }>, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } | { __typename?: 'Event' } | { __typename: 'EventRevision', title: string, id: number, alias: string, trashed: boolean, date: string, changes: string, metaTitle: string, metaDescription: string, url?: string | null, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Event', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', metaTitle: string, metaDescription: string, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'EventRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'EventRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename: 'ExerciseGroupRevision', title: string, id: number, alias: string, trashed: boolean, date: string, changes: string, metaTitle?: string | null, metaDescription?: string | null, url?: string | null, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'ExerciseGroup', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } | { __typename: 'ExerciseRevision', title: string, id: number, alias: string, trashed: boolean, date: string, changes: string, metaTitle?: string | null, metaDescription?: string | null, url?: string | null, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Exercise', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', metaTitle?: string | null, metaDescription?: string | null, url?: string | null, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'ExerciseRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'ExerciseRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } | { __typename?: 'Page' } | { __typename: 'PageRevision', title: string, id: number, alias: string, trashed: boolean, date: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Page', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'PageRevision', id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'PageRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'PageRevision', id: number, title: string, trashed: boolean }> } } } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename: 'VideoRevision', title: string, id: number, alias: string, trashed: boolean, date: string, changes: string, metaTitle?: string | null, metaDescription?: string | null, url: string, content: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean }, repository: { __typename?: 'Video', licenseId: number, trashed: boolean, instance: Instance, id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', metaTitle?: string | null, metaDescription?: string | null, url: string, id: number, alias: string, title: string, content: string, date: string } | null, revisions: { __typename?: 'VideoRevisionConnection', totalCount: number, nodes: Array<{ __typename?: 'VideoRevision', id: number, title: string, trashed: boolean }> }, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } } | null };

export type UnrevisedEntitiesDataFragment = { __typename?: 'AbstractEntityConnection', totalCount: number, nodes: Array<{ __typename: 'Applet', id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', title: string, id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Article', id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', title: string, id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Course', id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', title: string, id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string, id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Event', id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', title: string, id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Exercise', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', title: string, id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', title: string, id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Video', id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', title: string, id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } };

export type UnrevisedRevisionsQueryVariables = Exact<{
  instance: Instance;
}>;


export type UnrevisedRevisionsQuery = { __typename?: 'Query', authorization: any, subject: { __typename?: 'SubjectQuery', subjects: Array<{ __typename?: 'Subject', id: string, taxonomyTerm: { __typename?: 'TaxonomyTerm', name: string }, unrevisedEntities: { __typename?: 'AbstractEntityConnection', totalCount: number, nodes: Array<{ __typename: 'Applet', id: number, alias: string, currentRevision?: { __typename?: 'AppletRevision', title: string, id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Article', id: number, alias: string, currentRevision?: { __typename?: 'ArticleRevision', title: string, id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Course', id: number, alias: string, currentRevision?: { __typename?: 'CourseRevision', title: string, id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias: string, currentRevision?: { __typename?: 'CoursePageRevision', title: string, id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Event', id: number, alias: string, currentRevision?: { __typename?: 'EventRevision', title: string, id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Exercise', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseRevision', title: string, id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', title: string, id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'Video', id: number, alias: string, currentRevision?: { __typename?: 'VideoRevision', title: string, id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', title: string, id: number, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } }> } };

export type GetAllThreadsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  instance?: InputMaybe<Instance>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CommentStatus>;
}>;


export type GetAllThreadsQuery = { __typename?: 'Query', thread: { __typename?: 'ThreadQuery', allThreads: { __typename?: 'ThreadConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, trashed: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } };

export type GetCommentsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Article', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Comment' } | { __typename?: 'Course', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePage', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Event', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'EventRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Exercise', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Page', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'PageRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'User', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Video', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | null };

type GetCommentsThreads_Applet_Fragment = { __typename?: 'Applet', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_AppletRevision_Fragment = { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Article_Fragment = { __typename?: 'Article', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ArticleRevision_Fragment = { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Course_Fragment = { __typename?: 'Course', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CoursePage_Fragment = { __typename?: 'CoursePage', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CoursePageRevision_Fragment = { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_CourseRevision_Fragment = { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Event_Fragment = { __typename?: 'Event', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_EventRevision_Fragment = { __typename?: 'EventRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Exercise_Fragment = { __typename?: 'Exercise', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseGroupRevision_Fragment = { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_ExerciseRevision_Fragment = { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Page_Fragment = { __typename?: 'Page', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_PageRevision_Fragment = { __typename?: 'PageRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_TaxonomyTerm_Fragment = { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_User_Fragment = { __typename?: 'User', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_Video_Fragment = { __typename?: 'Video', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreads_VideoRevision_Fragment = { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

export type GetCommentsThreadsFragment = GetCommentsThreads_Applet_Fragment | GetCommentsThreads_AppletRevision_Fragment | GetCommentsThreads_Article_Fragment | GetCommentsThreads_ArticleRevision_Fragment | GetCommentsThreads_Course_Fragment | GetCommentsThreads_CoursePage_Fragment | GetCommentsThreads_CoursePageRevision_Fragment | GetCommentsThreads_CourseRevision_Fragment | GetCommentsThreads_Event_Fragment | GetCommentsThreads_EventRevision_Fragment | GetCommentsThreads_Exercise_Fragment | GetCommentsThreads_ExerciseGroup_Fragment | GetCommentsThreads_ExerciseGroupRevision_Fragment | GetCommentsThreads_ExerciseRevision_Fragment | GetCommentsThreads_Page_Fragment | GetCommentsThreads_PageRevision_Fragment | GetCommentsThreads_TaxonomyTerm_Fragment | GetCommentsThreads_User_Fragment | GetCommentsThreads_Video_Fragment | GetCommentsThreads_VideoRevision_Fragment;

export type UserDataFragment = { __typename?: 'User', username: string, date: string, lastLogin?: string | null, description?: string | null, isActiveReviewer: boolean, isActiveAuthor: boolean, isActiveDonor: boolean, chatUrl?: string | null, imageUrl: string, motivation?: string | null, roles: { __typename?: 'ScopedRoleConnection', nodes: Array<{ __typename?: 'ScopedRole', scope?: string | null, role: Role }> }, activityByType: { __typename?: 'UserActivityByType', edits: number, comments: number, reviews: number, taxonomy: number } };

export type BasicUserDataFragment = { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean };

export type UserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserByUsernameQuery = { __typename?: 'Query', authorization: any, user: { __typename?: 'UserQuery', userByUsername?: { __typename: 'User', id: number, trashed: boolean, username: string, date: string, lastLogin?: string | null, description?: string | null, isActiveReviewer: boolean, isActiveAuthor: boolean, isActiveDonor: boolean, chatUrl?: string | null, imageUrl: string, motivation?: string | null, roles: { __typename?: 'ScopedRoleConnection', nodes: Array<{ __typename?: 'ScopedRole', scope?: string | null, role: Role }> }, activityByType: { __typename?: 'UserActivityByType', edits: number, comments: number, reviews: number, taxonomy: number } } | null } };

export type IsSubscribedQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type IsSubscribedQuery = { __typename?: 'Query', subscription: { __typename?: 'SubscriptionQuery', currentUserHasSubscribed: boolean } };

export type TaxonomyTermCreateEntityLinkMutationVariables = Exact<{
  input: TaxonomyEntityLinksInput;
}>;


export type TaxonomyTermCreateEntityLinkMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', createEntityLinks: { __typename?: 'DefaultResponse', success: boolean } } };

export type TaxonomyTermDeleteEntityLinkMutationVariables = Exact<{
  input: TaxonomyEntityLinksInput;
}>;


export type TaxonomyTermDeleteEntityLinkMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', deleteEntityLinks: { __typename?: 'DefaultResponse', success: boolean } } };

export type TaxonomyTermSortMutationVariables = Exact<{
  input: TaxonomyTermSortInput;
}>;


export type TaxonomyTermSortMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', sort: { __typename?: 'DefaultResponse', success: boolean } } };

export type ThreadSetArchivedMutationVariables = Exact<{
  input: ThreadSetThreadArchivedInput;
}>;


export type ThreadSetArchivedMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', setThreadArchived: { __typename?: 'DefaultResponse', success: boolean } } };

export type ThreadSetStateMutationVariables = Exact<{
  input: ThreadSetThreadStateInput;
}>;


export type ThreadSetStateMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', setThreadState: { __typename?: 'DefaultResponse', success: boolean } } };

export type ThreadSetCommentStateMutationVariables = Exact<{
  input: ThreadSetCommentStateInput;
}>;


export type ThreadSetCommentStateMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', setCommentState: { __typename?: 'DefaultResponse', success: boolean } } };

export type CreateThreadMutationVariables = Exact<{
  input: ThreadCreateThreadInput;
}>;


export type CreateThreadMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', createThread: { __typename?: 'DefaultResponse', success: boolean } } };

export type CreateCommentMutationVariables = Exact<{
  input: ThreadCreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', createComment: { __typename?: 'DefaultResponse', success: boolean } } };

export type EditCommentMutationVariables = Exact<{
  input: ThreadEditCommentInput;
}>;


export type EditCommentMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', editComment: { __typename?: 'DefaultResponse', success: boolean } } };

export type SetThreadStatusMutationVariables = Exact<{
  input: ThreadSetThreadStatusInput;
}>;


export type SetThreadStatusMutation = { __typename?: 'Mutation', thread: { __typename?: 'ThreadMutation', setThreadStatus: { __typename?: 'DefaultResponse', success: boolean } } };

export type AddPageRevisionMutationVariables = Exact<{
  input: PageAddRevisionInput;
}>;


export type AddPageRevisionMutation = { __typename?: 'Mutation', page: { __typename?: 'PageMutation', addRevision: { __typename?: 'DefaultResponse', success: boolean } } };

export type CreatePageMutationVariables = Exact<{
  input: CreatePageInput;
}>;


export type CreatePageMutation = { __typename?: 'Mutation', page: { __typename?: 'PageMutation', create: { __typename?: 'DefaultResponse', success: boolean } } };

export type SortMutationVariables = Exact<{
  input: EntitySortInput;
}>;


export type SortMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', sort: { __typename?: 'DefaultResponse', success: boolean } } };

export type UpdateLicenseMutationVariables = Exact<{
  input: EntityUpdateLicenseInput;
}>;


export type UpdateLicenseMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', updateLicense: { __typename?: 'DefaultResponse', success: boolean } } };

export type CreateExerciseSubmissionMutationVariables = Exact<{
  input: ExerciseSubmissionInput;
}>;


export type CreateExerciseSubmissionMutation = { __typename?: 'Mutation', experiment: { __typename?: 'ExperimentMutation', createExerciseSubmission: { __typename?: 'DefaultResponse', success: boolean } } };

export type RejectRevisionMutationVariables = Exact<{
  input: RejectRevisionInput;
}>;


export type RejectRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', rejectRevision: { __typename?: 'DefaultResponse', success: boolean } } };

export type CheckoutRevisionMutationVariables = Exact<{
  input: CheckoutRevisionInput;
}>;


export type CheckoutRevisionMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', checkoutRevision: { __typename?: 'DefaultResponse', success: boolean } } };

export type CheckoutPageRevisionMutationVariables = Exact<{
  input: CheckoutRevisionInput;
}>;


export type CheckoutPageRevisionMutation = { __typename?: 'Mutation', page: { __typename?: 'PageMutation', checkoutRevision: { __typename?: 'DefaultResponse', success: boolean } } };

export type SetAbstractEntityMutationVariables = Exact<{
  input: SetAbstractEntityInput;
}>;


export type SetAbstractEntityMutation = { __typename?: 'Mutation', entity: { __typename?: 'EntityMutation', setAbstractEntity: { __typename: 'SetEntityResponse', success: boolean, record?: { __typename?: 'Applet', id: number, alias: string } | { __typename?: 'Article', id: number, alias: string } | { __typename?: 'Course', id: number, alias: string } | { __typename?: 'CoursePage', id: number, alias: string } | { __typename?: 'Event', id: number, alias: string } | { __typename?: 'Exercise', id: number, alias: string } | { __typename?: 'ExerciseGroup', id: number, alias: string } | { __typename?: 'Video', id: number, alias: string } | null } } };

export type NotificationSetStateMutationVariables = Exact<{
  input: NotificationSetStateInput;
}>;


export type NotificationSetStateMutation = { __typename?: 'Mutation', notification: { __typename?: 'NotificationMutation', setState?: { __typename?: 'DefaultResponse', success: boolean } | null } };

export type SetUuidStateMutationVariables = Exact<{
  input: UuidSetStateInput;
}>;


export type SetUuidStateMutation = { __typename?: 'Mutation', uuid: { __typename?: 'UuidMutation', setState: { __typename?: 'DefaultResponse', success: boolean } } };

export type SubscriptionSetMutationVariables = Exact<{
  input: SubscriptionSetInput;
}>;


export type SubscriptionSetMutation = { __typename?: 'Mutation', subscription: { __typename?: 'SubscriptionMutation', set: { __typename?: 'DefaultResponse', success: boolean } } };

export type TaxonomyTermSetNameAndDescriptionMutationVariables = Exact<{
  input: TaxonomyTermSetNameAndDescriptionInput;
}>;


export type TaxonomyTermSetNameAndDescriptionMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', setNameAndDescription: { __typename?: 'DefaultResponse', success: boolean } } };

export type TaxonomyCreateMutationVariables = Exact<{
  input: TaxonomyTermCreateInput;
}>;


export type TaxonomyCreateMutation = { __typename?: 'Mutation', taxonomyTerm: { __typename?: 'TaxonomyTermMutation', create: { __typename?: 'TaxonomyTermCreateResponse', success: boolean } } };

export type AddRoleMutationVariables = Exact<{
  input: UserRoleInput;
}>;


export type AddRoleMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', addRole: { __typename?: 'DefaultResponse', success: boolean } } };

export type RemoveRoleMutationVariables = Exact<{
  input: UserRoleInput;
}>;


export type RemoveRoleMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', removeRole: { __typename?: 'DefaultResponse', success: boolean } } };

export type SetDescriptionMutationVariables = Exact<{
  input: UserSetDescriptionInput;
}>;


export type SetDescriptionMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', setDescription: { __typename?: 'DefaultResponse', success: boolean } } };

export type DeleteBotsMutationVariables = Exact<{
  input: UserDeleteBotsInput;
}>;


export type DeleteBotsMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', deleteBots: { __typename?: 'DefaultResponse', success: boolean } } };

export type PotentialSpamUsersQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type PotentialSpamUsersQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', potentialSpamUsers: { __typename?: 'UserConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'User', id: number, username: string, date: string, lastLogin?: string | null, description?: string | null, isActiveReviewer: boolean, isActiveAuthor: boolean, isActiveDonor: boolean, chatUrl?: string | null, imageUrl: string, motivation?: string | null, roles: { __typename?: 'ScopedRoleConnection', nodes: Array<{ __typename?: 'ScopedRole', scope?: string | null, role: Role }> }, activityByType: { __typename?: 'UserActivityByType', edits: number, comments: number, reviews: number, taxonomy: number } }> } } };

export type GetCommentsForOldCommentsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCommentsForOldCommentsQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Article', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Comment' } | { __typename?: 'Course', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePage', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Event', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'EventRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Exercise', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Page', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'PageRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'User', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'Video', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } | null };

type GetCommentsThreadsOldComments_Applet_Fragment = { __typename?: 'Applet', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_AppletRevision_Fragment = { __typename?: 'AppletRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_Article_Fragment = { __typename?: 'Article', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_ArticleRevision_Fragment = { __typename?: 'ArticleRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_Course_Fragment = { __typename?: 'Course', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_CoursePage_Fragment = { __typename?: 'CoursePage', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_CoursePageRevision_Fragment = { __typename?: 'CoursePageRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_CourseRevision_Fragment = { __typename?: 'CourseRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_Event_Fragment = { __typename?: 'Event', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_EventRevision_Fragment = { __typename?: 'EventRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_Exercise_Fragment = { __typename?: 'Exercise', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_ExerciseGroup_Fragment = { __typename?: 'ExerciseGroup', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_ExerciseGroupRevision_Fragment = { __typename?: 'ExerciseGroupRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_ExerciseRevision_Fragment = { __typename?: 'ExerciseRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_Page_Fragment = { __typename?: 'Page', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_PageRevision_Fragment = { __typename?: 'PageRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_TaxonomyTerm_Fragment = { __typename?: 'TaxonomyTerm', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_User_Fragment = { __typename?: 'User', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_Video_Fragment = { __typename?: 'Video', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

type GetCommentsThreadsOldComments_VideoRevision_Fragment = { __typename?: 'VideoRevision', threads: { __typename?: 'ThreadConnection', nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, status: CommentStatus, object: { __typename: 'Applet', id: number, alias: string } | { __typename: 'AppletRevision', id: number, alias: string } | { __typename: 'Article', id: number, alias: string } | { __typename: 'ArticleRevision', id: number, alias: string } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias: string } | { __typename: 'CoursePage', id: number, alias: string } | { __typename: 'CoursePageRevision', id: number, alias: string } | { __typename: 'CourseRevision', id: number, alias: string } | { __typename: 'Event', id: number, alias: string } | { __typename: 'EventRevision', id: number, alias: string } | { __typename: 'Exercise', id: number, alias: string } | { __typename: 'ExerciseGroup', id: number, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string } | { __typename: 'ExerciseRevision', id: number, alias: string } | { __typename: 'Page', id: number, alias: string } | { __typename: 'PageRevision', id: number, alias: string } | { __typename: 'TaxonomyTerm', id: number, alias: string } | { __typename: 'User', id: number, alias: string } | { __typename: 'Video', id: number, alias: string } | { __typename: 'VideoRevision', id: number, alias: string }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias: string, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } };

export type GetCommentsThreadsOldCommentsFragment = GetCommentsThreadsOldComments_Applet_Fragment | GetCommentsThreadsOldComments_AppletRevision_Fragment | GetCommentsThreadsOldComments_Article_Fragment | GetCommentsThreadsOldComments_ArticleRevision_Fragment | GetCommentsThreadsOldComments_Course_Fragment | GetCommentsThreadsOldComments_CoursePage_Fragment | GetCommentsThreadsOldComments_CoursePageRevision_Fragment | GetCommentsThreadsOldComments_CourseRevision_Fragment | GetCommentsThreadsOldComments_Event_Fragment | GetCommentsThreadsOldComments_EventRevision_Fragment | GetCommentsThreadsOldComments_Exercise_Fragment | GetCommentsThreadsOldComments_ExerciseGroup_Fragment | GetCommentsThreadsOldComments_ExerciseGroupRevision_Fragment | GetCommentsThreadsOldComments_ExerciseRevision_Fragment | GetCommentsThreadsOldComments_Page_Fragment | GetCommentsThreadsOldComments_PageRevision_Fragment | GetCommentsThreadsOldComments_TaxonomyTerm_Fragment | GetCommentsThreadsOldComments_User_Fragment | GetCommentsThreadsOldComments_Video_Fragment | GetCommentsThreadsOldComments_VideoRevision_Fragment;

export type UsersByRoleQueryVariables = Exact<{
  role: Role;
  instance: Instance;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type UsersByRoleQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', usersByRole: { __typename?: 'UserConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'User', username: string, alias: string }> } } };

export type GetTaxonomyTypeQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetTaxonomyTypeQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'TaxonomyTerm', id: number, alias: string, title: string, instance: Instance, type: TaxonomyTermType, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type RevisionsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RevisionsQuery = { __typename?: 'Query', uuid?: { __typename: 'Applet', id: number, alias: string, title: string, currentRevision?: { __typename?: 'AppletRevision', id: number } | null, revisions: { __typename?: 'AppletRevisionConnection', nodes: Array<{ __typename?: 'AppletRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'AppletRevision', id: number, alias: string, title: string } | { __typename: 'Article', id: number, alias: string, title: string, currentRevision?: { __typename?: 'ArticleRevision', id: number } | null, revisions: { __typename?: 'ArticleRevisionConnection', nodes: Array<{ __typename?: 'ArticleRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ArticleRevision', id: number, alias: string, title: string } | { __typename: 'Comment', id: number, alias: string, title: string } | { __typename: 'Course', id: number, alias: string, title: string, currentRevision?: { __typename?: 'CourseRevision', id: number } | null, revisions: { __typename?: 'CourseRevisionConnection', nodes: Array<{ __typename?: 'CourseRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePage', id: number, alias: string, title: string, currentRevision?: { __typename?: 'CoursePageRevision', id: number } | null, revisions: { __typename?: 'CoursePageRevisionConnection', nodes: Array<{ __typename?: 'CoursePageRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'CoursePageRevision', id: number, alias: string, title: string } | { __typename: 'CourseRevision', id: number, alias: string, title: string } | { __typename: 'Event', id: number, alias: string, title: string, currentRevision?: { __typename?: 'EventRevision', id: number } | null, revisions: { __typename?: 'EventRevisionConnection', nodes: Array<{ __typename?: 'EventRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'EventRevision', id: number, alias: string, title: string } | { __typename: 'Exercise', id: number, alias: string, title: string, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null, revisions: { __typename?: 'ExerciseRevisionConnection', nodes: Array<{ __typename?: 'ExerciseRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroup', id: number, alias: string, title: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null, revisions: { __typename?: 'ExerciseGroupRevisionConnection', nodes: Array<{ __typename?: 'ExerciseGroupRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'ExerciseGroupRevision', id: number, alias: string, title: string } | { __typename: 'ExerciseRevision', id: number, alias: string, title: string } | { __typename: 'Page', id: number, alias: string, title: string, currentRevision?: { __typename?: 'PageRevision', id: number } | null, revisions: { __typename?: 'PageRevisionConnection', nodes: Array<{ __typename?: 'PageRevision', id: number, trashed: boolean, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'PageRevision', id: number, alias: string, title: string } | { __typename: 'TaxonomyTerm', id: number, alias: string, title: string } | { __typename: 'User', id: number, alias: string, title: string } | { __typename: 'Video', id: number, alias: string, title: string, currentRevision?: { __typename?: 'VideoRevision', id: number } | null, revisions: { __typename?: 'VideoRevisionConnection', nodes: Array<{ __typename?: 'VideoRevision', id: number, trashed: boolean, changes: string, date: string, author: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean, isNewAuthor: boolean } }> } } | { __typename: 'VideoRevision', id: number, alias: string, title: string } | null };

export type GetUuidPathsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUuidPathsQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename?: 'AppletRevision' } | { __typename?: 'Article', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename?: 'ExerciseGroup', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', name: string, alias: string, id: number, instance: Instance, title: string, path: Array<{ __typename?: 'TaxonomyTerm', title: string, alias: string, id: number } | null> }> } } | { __typename?: 'VideoRevision' } | null };

export type PagesQueryVariables = Exact<{
  instance: Instance;
}>;


export type PagesQuery = { __typename?: 'Query', page: { __typename?: 'PageQuery', pages: Array<{ __typename?: 'Page', id: number, alias: string, trashed: boolean, currentRevision?: { __typename?: 'PageRevision', title: string } | null }> } };

export type GetSubscriptionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', subscription: { __typename?: 'SubscriptionQuery', getSubscriptions: { __typename?: 'SubscriptionInfoConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'SubscriptionInfo', sendEmail: boolean, object: { __typename: 'Applet', id: number, alias: string, title: string } | { __typename: 'AppletRevision', id: number, alias: string, title: string } | { __typename: 'Article', id: number, alias: string, title: string } | { __typename: 'ArticleRevision', id: number, alias: string, title: string } | { __typename: 'Comment', id: number, alias: string, title: string } | { __typename: 'Course', id: number, alias: string, title: string } | { __typename: 'CoursePage', id: number, alias: string, title: string } | { __typename: 'CoursePageRevision', id: number, alias: string, title: string } | { __typename: 'CourseRevision', id: number, alias: string, title: string } | { __typename: 'Event', id: number, alias: string, title: string } | { __typename: 'EventRevision', id: number, alias: string, title: string } | { __typename: 'Exercise', id: number, alias: string, title: string } | { __typename: 'ExerciseGroup', id: number, alias: string, title: string } | { __typename: 'ExerciseGroupRevision', id: number, alias: string, title: string } | { __typename: 'ExerciseRevision', id: number, alias: string, title: string } | { __typename: 'Page', id: number, alias: string, title: string } | { __typename: 'PageRevision', id: number, alias: string, title: string } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, id: number, alias: string, title: string } | { __typename: 'User', id: number, alias: string, title: string } | { __typename: 'Video', id: number, alias: string, title: string } | { __typename: 'VideoRevision', id: number, alias: string, title: string } }> } } };

export type GetNotificationsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  unread?: InputMaybe<Scalars['Boolean']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'Notification', id: number, unread: boolean, event?: { __typename: 'CheckoutRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, revision: { __typename?: 'AppletRevision', id: number } | { __typename?: 'ArticleRevision', id: number } | { __typename?: 'CoursePageRevision', id: number } | { __typename?: 'CourseRevision', id: number } | { __typename?: 'EventRevision', id: number } | { __typename?: 'ExerciseGroupRevision', id: number } | { __typename?: 'ExerciseRevision', id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'VideoRevision', id: number }, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateCommentNotificationEvent', date: string, id: number, objectId: number, comment: { __typename?: 'Comment', id: number, content: string }, thread: { __typename?: 'Thread', id: string, title?: string | null, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityNotificationEvent', date: string, id: number, objectId: number, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateEntityRevisionNotificationEvent', date: string, id: number, objectId: number, entityRevision: { __typename?: 'AppletRevision', changes: string, id: number } | { __typename?: 'ArticleRevision', changes: string, id: number } | { __typename?: 'CoursePageRevision', changes: string, id: number } | { __typename?: 'CourseRevision', changes: string, id: number } | { __typename?: 'EventRevision', changes: string, id: number } | { __typename?: 'ExerciseGroupRevision', changes: string, id: number } | { __typename?: 'ExerciseRevision', changes: string, id: number } | { __typename?: 'PageRevision', id: number } | { __typename?: 'VideoRevision', changes: string, id: number }, entity: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'CreateThreadNotificationEvent', date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, content: string }> } }, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RejectRevisionNotificationEvent', reason: string, date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, revision: { __typename?: 'AppletRevision', id: number, alias: string } | { __typename?: 'ArticleRevision', id: number, alias: string } | { __typename?: 'CoursePageRevision', id: number, alias: string } | { __typename?: 'CourseRevision', id: number, alias: string } | { __typename?: 'EventRevision', id: number, alias: string } | { __typename?: 'ExerciseGroupRevision', id: number, alias: string } | { __typename?: 'ExerciseRevision', id: number, alias: string } | { __typename?: 'PageRevision', id: number, alias: string } | { __typename?: 'VideoRevision', id: number, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RemoveEntityLinkNotificationEvent', date: string, id: number, objectId: number, parent: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'RemoveTaxonomyLinkNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, parent: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetLicenseNotificationEvent', date: string, id: number, objectId: number, repository: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetTaxonomyParentNotificationEvent', date: string, id: number, objectId: number, child: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, previousParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, optionalParent?: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | null, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetTaxonomyTermNotificationEvent', date: string, id: number, objectId: number, taxonomyTerm: { __typename: 'TaxonomyTerm', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetThreadStateNotificationEvent', archived: boolean, date: string, id: number, objectId: number, thread: { __typename?: 'Thread', id: string, thread: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number }> } }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | { __typename: 'SetUuidStateNotificationEvent', trashed: boolean, date: string, id: number, objectId: number, object: { __typename: 'Applet', id: number, title: string, alias: string } | { __typename: 'AppletRevision', id: number, title: string, alias: string } | { __typename: 'Article', id: number, title: string, alias: string } | { __typename: 'ArticleRevision', id: number, title: string, alias: string } | { __typename: 'Comment', id: number, title: string, alias: string } | { __typename: 'Course', id: number, title: string, alias: string } | { __typename: 'CoursePage', id: number, title: string, alias: string } | { __typename: 'CoursePageRevision', id: number, title: string, alias: string } | { __typename: 'CourseRevision', id: number, title: string, alias: string } | { __typename: 'Event', id: number, title: string, alias: string } | { __typename: 'EventRevision', id: number, title: string, alias: string } | { __typename: 'Exercise', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroup', id: number, title: string, alias: string, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', type: TaxonomyTermType }> } } | { __typename: 'ExerciseGroupRevision', id: number, title: string, alias: string } | { __typename: 'ExerciseRevision', id: number, title: string, alias: string } | { __typename: 'Page', id: number, title: string, alias: string } | { __typename: 'PageRevision', id: number, title: string, alias: string } | { __typename: 'TaxonomyTerm', id: number, title: string, alias: string } | { __typename: 'User', id: number, title: string, alias: string } | { __typename: 'Video', id: number, title: string, alias: string } | { __typename: 'VideoRevision', id: number, title: string, alias: string }, actor: { __typename?: 'User', id: number, username: string, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } } | null }> } };

export type GetTrashedEntitiesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  instance?: InputMaybe<Instance>;
}>;


export type GetTrashedEntitiesQuery = { __typename?: 'Query', entity?: { __typename?: 'EntityQuery', deletedEntities: { __typename?: 'DeletedEntityConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'DeletedEntity', dateOfDeletion?: string | null, entity?: { __typename: 'Applet', id: number, alias: string, title: string } | { __typename: 'Article', id: number, alias: string, title: string } | { __typename: 'Course', id: number, alias: string, title: string } | { __typename: 'CoursePage', id: number, alias: string, title: string } | { __typename: 'Event', id: number, alias: string, title: string } | { __typename: 'Exercise', id: number, alias: string, title: string } | { __typename: 'ExerciseGroup', id: number, alias: string, title: string } | { __typename: 'Video', id: number, alias: string, title: string } | null }> } } | null };

export type FetchExerciseFolderQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FetchExerciseFolderQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article' } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename: 'Exercise', id: number, trashed: boolean, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null } | { __typename: 'ExerciseGroup', id: number, trashed: boolean, currentRevision?: { __typename?: 'ExerciseGroupRevision', id: number } | null } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' }> } } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type FetchParentQueryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FetchParentQueryQuery = { __typename?: 'Query', uuid?: { __typename?: 'Applet' } | { __typename?: 'AppletRevision' } | { __typename?: 'Article', taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', id: number, type: TaxonomyTermType, name: string, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', id: number, trashed: boolean } | { __typename: 'AppletRevision', id: number, trashed: boolean } | { __typename: 'Article', id: number, trashed: boolean, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, trashed: boolean } | { __typename: 'Comment', id: number, trashed: boolean } | { __typename: 'Course', id: number, trashed: boolean, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, trashed: boolean } | { __typename: 'CoursePageRevision', id: number, trashed: boolean } | { __typename: 'CourseRevision', id: number, trashed: boolean } | { __typename: 'Event', id: number, trashed: boolean } | { __typename: 'EventRevision', id: number, trashed: boolean } | { __typename: 'Exercise', id: number, trashed: boolean, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null } | { __typename: 'ExerciseGroup', id: number, trashed: boolean } | { __typename: 'ExerciseGroupRevision', id: number, trashed: boolean } | { __typename: 'ExerciseRevision', id: number, trashed: boolean } | { __typename: 'Page', id: number, trashed: boolean } | { __typename: 'PageRevision', id: number, trashed: boolean } | { __typename: 'TaxonomyTerm', name: string, type: TaxonomyTermType, id: number, trashed: boolean } | { __typename: 'User', id: number, trashed: boolean } | { __typename: 'Video', id: number, trashed: boolean, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, trashed: boolean }> } }> } } | { __typename?: 'ArticleRevision' } | { __typename?: 'Comment' } | { __typename?: 'Course' } | { __typename?: 'CoursePage' } | { __typename?: 'CoursePageRevision' } | { __typename?: 'CourseRevision' } | { __typename?: 'Event' } | { __typename?: 'EventRevision' } | { __typename?: 'Exercise' } | { __typename?: 'ExerciseGroup' } | { __typename?: 'ExerciseGroupRevision' } | { __typename?: 'ExerciseRevision' } | { __typename?: 'Page' } | { __typename?: 'PageRevision' } | { __typename?: 'TaxonomyTerm' } | { __typename?: 'User' } | { __typename?: 'Video' } | { __typename?: 'VideoRevision' } | null };

export type TaxonomyTermFragment = { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', id: number, type: TaxonomyTermType, name: string, children: { __typename?: 'AbstractUuidConnection', nodes: Array<{ __typename: 'Applet', id: number, trashed: boolean } | { __typename: 'AppletRevision', id: number, trashed: boolean } | { __typename: 'Article', id: number, trashed: boolean, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, trashed: boolean } | { __typename: 'Comment', id: number, trashed: boolean } | { __typename: 'Course', id: number, trashed: boolean, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, trashed: boolean } | { __typename: 'CoursePageRevision', id: number, trashed: boolean } | { __typename: 'CourseRevision', id: number, trashed: boolean } | { __typename: 'Event', id: number, trashed: boolean } | { __typename: 'EventRevision', id: number, trashed: boolean } | { __typename: 'Exercise', id: number, trashed: boolean, currentRevision?: { __typename?: 'ExerciseRevision', id: number } | null } | { __typename: 'ExerciseGroup', id: number, trashed: boolean } | { __typename: 'ExerciseGroupRevision', id: number, trashed: boolean } | { __typename: 'ExerciseRevision', id: number, trashed: boolean } | { __typename: 'Page', id: number, trashed: boolean } | { __typename: 'PageRevision', id: number, trashed: boolean } | { __typename: 'TaxonomyTerm', name: string, type: TaxonomyTermType, id: number, trashed: boolean } | { __typename: 'User', id: number, trashed: boolean } | { __typename: 'Video', id: number, trashed: boolean, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, trashed: boolean }> } }> };

export type MediaUploadQueryVariables = Exact<{
  mediaType: MediaType;
}>;


export type MediaUploadQuery = { __typename?: 'Query', media: { __typename?: 'MediaQuery', newUpload: { __typename?: 'MediaUpload', uploadUrl: string, urlAfterUpload: string } } };

export type InjectionOnlyContentQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type InjectionOnlyContentQuery = { __typename?: 'Query', uuid?: { __typename: 'Applet', id: number, licenseId: number, alias: string, title: string, currentRevision?: { __typename?: 'AppletRevision', content: string, url: string } | null } | { __typename: 'AppletRevision', alias: string, title: string } | { __typename: 'Article', id: number, licenseId: number, alias: string, title: string, currentRevision?: { __typename?: 'ArticleRevision', content: string } | null } | { __typename: 'ArticleRevision', alias: string, title: string } | { __typename: 'Comment', alias: string, title: string } | { __typename: 'Course', id: number, licenseId: number, alias: string, title: string, currentRevision?: { __typename?: 'CourseRevision', content: string } | null } | { __typename: 'CoursePage', id: number, licenseId: number, alias: string, title: string, currentRevision?: { __typename?: 'CoursePageRevision', content: string } | null } | { __typename: 'CoursePageRevision', alias: string, title: string } | { __typename: 'CourseRevision', alias: string, title: string } | { __typename: 'Event', id: number, licenseId: number, alias: string, title: string, currentRevision?: { __typename?: 'EventRevision', content: string } | null } | { __typename: 'EventRevision', alias: string, title: string } | { __typename: 'Exercise', id: number, licenseId: number, alias: string, title: string, currentRevision?: { __typename?: 'ExerciseRevision', content: string } | null } | { __typename: 'ExerciseGroup', id: number, licenseId: number, alias: string, title: string, currentRevision?: { __typename?: 'ExerciseGroupRevision', content: string } | null } | { __typename: 'ExerciseGroupRevision', alias: string, title: string } | { __typename: 'ExerciseRevision', alias: string, title: string } | { __typename: 'Page', alias: string, title: string } | { __typename: 'PageRevision', alias: string, title: string } | { __typename: 'TaxonomyTerm', alias: string, title: string } | { __typename: 'User', alias: string, title: string } | { __typename: 'Video', id: number, licenseId: number, alias: string, title: string, currentRevision?: { __typename?: 'VideoRevision', content: string, url: string } | null } | { __typename: 'VideoRevision', alias: string, title: string } | null };
