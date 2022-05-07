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

export interface AliasInput {
  instance: Instance;
  path: Scalars['String'];
}

export interface CacheRemoveInput {
  key: Scalars['String'];
}

export interface CacheSetInput {
  key: Scalars['String'];
  value: Scalars['JSON'];
}

export interface CacheUpdateInput {
  keys: Array<Scalars['String']>;
}

export interface CheckoutRevisionInput {
  reason: Scalars['String'];
  revisionId: Scalars['Int'];
}

export interface CreatePageInput {
  content: Scalars['String'];
  discussionsEnabled: Scalars['Boolean'];
  forumId?: InputMaybe<Scalars['Int']>;
  instance: Instance;
  licenseId: Scalars['Int'];
  title: Scalars['String'];
}

export enum Instance {
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Hi = 'hi',
  Ta = 'ta'
}

export interface NotificationSetStateInput {
  id: Array<Scalars['Int']>;
  unread: Scalars['Boolean'];
}

export interface PageAddRevisionInput {
  content: Scalars['String'];
  pageId: Scalars['Int'];
  title: Scalars['String'];
}

export interface RejectRevisionInput {
  reason: Scalars['String'];
  revisionId: Scalars['Int'];
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

export interface SubscriptionSetInput {
  id: Array<Scalars['Int']>;
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
}

export interface TaxonomyEntityLinksInput {
  entityIds: Array<Scalars['Int']>;
  taxonomyTermId: Scalars['Int'];
}

export interface TaxonomyTermCreateInput {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parentId: Scalars['Int'];
  taxonomyType: TaxonomyTypeCreateOptions;
}

export interface TaxonomyTermMoveInput {
  childrenIds: Array<Scalars['Int']>;
  destination: Scalars['Int'];
}

export interface TaxonomyTermSetNameAndDescriptionInput {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
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

export interface ThreadCreateCommentInput {
  content: Scalars['String'];
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
  threadId: Scalars['String'];
}

export interface ThreadCreateThreadInput {
  content: Scalars['String'];
  objectId: Scalars['Int'];
  sendEmail: Scalars['Boolean'];
  subscribe: Scalars['Boolean'];
  title: Scalars['String'];
}

export interface ThreadSetCommentStateInput {
  id: Array<Scalars['Int']>;
  trashed: Scalars['Boolean'];
}

export interface ThreadSetThreadArchivedInput {
  archived: Scalars['Boolean'];
  id: Array<Scalars['String']>;
}

export interface ThreadSetThreadStateInput {
  id: Array<Scalars['String']>;
  trashed: Scalars['Boolean'];
}

export interface UserDeleteBotsInput {
  botIds: Array<Scalars['Int']>;
}

export interface UserDeleteRegularUsersInput {
  userIds: Array<Scalars['Int']>;
}

export interface UserSetDescriptionInput {
  description: Scalars['String'];
}

export interface UserSetEmailInput {
  email: Scalars['String'];
  userId: Scalars['Int'];
}

export interface UuidSetStateInput {
  id: Array<Scalars['Int']>;
  trashed: Scalars['Boolean'];
}

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


export type GetAllThreadsQuery = { __typename?: 'Query', thread: { __typename?: 'ThreadQuery', allThreads: { __typename?: 'AllThreadsConnection', pageInfo: { __typename?: 'HasNextPageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'Thread', id: string, archived: boolean, object: { __typename: 'Applet', id: number, alias?: string | null } | { __typename: 'AppletRevision', id: number, alias?: string | null } | { __typename: 'Article', id: number, alias?: string | null } | { __typename: 'ArticleRevision', id: number, alias?: string | null } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias?: string | null } | { __typename: 'CoursePage', id: number, alias?: string | null } | { __typename: 'CoursePageRevision', id: number, alias?: string | null } | { __typename: 'CourseRevision', id: number, alias?: string | null } | { __typename: 'Event', id: number, alias?: string | null } | { __typename: 'EventRevision', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null } | { __typename: 'ExerciseGroup', id: number, alias?: string | null } | { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null } | { __typename: 'PageRevision', id: number, alias?: string | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'SolutionRevision', id: number, alias?: string | null } | { __typename: 'TaxonomyTerm', id: number, alias?: string | null } | { __typename: 'User', id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null } | { __typename: 'VideoRevision', id: number, alias?: string | null }, comments: { __typename?: 'CommentConnection', nodes: Array<{ __typename?: 'Comment', id: number, trashed: boolean, content: string, archived: boolean, createdAt: string, author: { __typename?: 'User', username: string, alias?: string | null, id: number, isActiveAuthor: boolean, isActiveDonor: boolean, isActiveReviewer: boolean } }> } }> } } };

export type GetSubscriptionsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', subscription: { __typename?: 'SubscriptionQuery', getSubscriptions: { __typename?: 'SubscriptionConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'SubscriptionInfo', sendEmail: boolean, object: { __typename: 'Applet', id: number, alias?: string | null, currentRevision?: { __typename?: 'AppletRevision', title: string } | null } | { __typename: 'AppletRevision', id: number, alias?: string | null } | { __typename: 'Article', id: number, alias?: string | null, currentRevision?: { __typename?: 'ArticleRevision', title: string } | null } | { __typename: 'ArticleRevision', id: number, alias?: string | null } | { __typename: 'Comment', id: number, alias: string } | { __typename: 'Course', id: number, alias?: string | null, currentRevision?: { __typename?: 'CourseRevision', title: string } | null } | { __typename: 'CoursePage', id: number, alias?: string | null, currentRevision?: { __typename?: 'CoursePageRevision', title: string } | null } | { __typename: 'CoursePageRevision', id: number, alias?: string | null } | { __typename: 'CourseRevision', id: number, alias?: string | null } | { __typename: 'Event', id: number, alias?: string | null, currentRevision?: { __typename?: 'EventRevision', title: string } | null } | { __typename: 'EventRevision', id: number, alias?: string | null } | { __typename: 'Exercise', id: number, alias?: string | null, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string }> } } | null }> } } | { __typename: 'ExerciseGroup', id: number, alias?: string | null, taxonomyTerms: { __typename?: 'TaxonomyTermConnection', nodes: Array<{ __typename?: 'TaxonomyTerm', navigation?: { __typename?: 'Navigation', path: { __typename?: 'NavigationNodeConnection', nodes: Array<{ __typename?: 'NavigationNode', label: string }> } } | null }> } } | { __typename: 'ExerciseGroupRevision', id: number, alias?: string | null } | { __typename: 'ExerciseRevision', id: number, alias?: string | null } | { __typename: 'GroupedExercise', id: number, alias?: string | null } | { __typename: 'GroupedExerciseRevision', id: number, alias?: string | null } | { __typename: 'Page', id: number, alias?: string | null, currentRevision?: { __typename?: 'PageRevision', title: string } | null } | { __typename: 'PageRevision', id: number, alias?: string | null } | { __typename: 'Solution', id: number, alias?: string | null } | { __typename: 'SolutionRevision', id: number, alias?: string | null } | { __typename: 'TaxonomyTerm', type: TaxonomyTermType, name: string, id: number, alias?: string | null } | { __typename: 'User', username: string, id: number, alias?: string | null } | { __typename: 'Video', id: number, alias?: string | null, currentRevision?: { __typename?: 'VideoRevision', title: string } | null } | { __typename: 'VideoRevision', id: number, alias?: string | null } }> } } };
