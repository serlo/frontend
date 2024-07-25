import type {
  AnyEditorDocument,
  EditorExerciseDocument,
  EditorExerciseGroupDocument,
  EditorRowsDocument,
} from '@editor/types/editor-plugins'
import { type AuthorizationPayload } from '@serlo/authorization'
import { type CSSProperties, type FunctionComponent } from 'react'

import {
  Instance,
  type UnrevisedRevisionsQuery,
} from './fetcher/graphql-types/operations'
import type { User } from './fetcher/query-types'
import type { instanceData, instanceLandingData, loggedInData } from '@/data/en'
import { Role, TaxonomyTermType } from '@/fetcher/graphql-types/operations'

// exact props of /[...slug] page
export interface SlugProps {
  pageData: Redirect | SingleEntityPage | TaxonomyPage
}

export interface RevisionProps {
  pageData: RevisionPage
}

export interface UserProps {
  pageData: UserPage
}

export interface LandingProps {
  pageData: LandingPage
}

export interface UnrevisedRevisionsProps {
  pageData: UnrevisedRevisionsPage
}

export interface EventHistoryProps {
  pageData: {
    id: number
    title: string
    alias: string
  }
}

// Instance data consists of the language, translation strings, header menu and footer menu.

// The frontend supports all languages that the backend supports.

// Instance data is not part of initial props anymore. Instead, it is added to the html directly.

export interface InstanceData {
  lang: Instance
  strings: (typeof instanceData)['strings'] //infer types from english language file
  headerData: HeaderData
  footerData: FooterData
  secondaryMenus: SecondaryMenuData[]
  licenses: LicenseData[]
}

// Menus are trees of title and urls, possibly with icons.

export type HeaderData = HeaderLinkData[]

export interface HeaderLinkData {
  title: string
  url: string
  icon?: HeaderIcon
  children?: HeaderLinkData[]
}

export type HeaderIcon =
  | 'subject'
  | 'about'
  | 'participate'
  | 'community'
  | 'donate'
  | 'user'
  | 'notifications'

export interface HeaderStrings {
  slogan: string
  search: string
  login: string
}

// The footer is split into different categories and has three separate links.

export interface FooterData {
  footerNavigation: FooterNavigation
  aboutHref: string
  participationHref: string
  donationHref: string
}

export type FooterNavigation = FooterCategory[]

export interface FooterCategory {
  title: string
  children: FooterLink[]
}

export interface FooterLink {
  title: string
  url: string
  icon?: FooterIcon
}

export enum FooterIcon {
  newsletter = 'newsletter',
  github = 'github',
  job = 'job',
}

// Menu shown on the left (desktop) or between header and content (mobile)
// Links can be active

export interface SecondaryMenuLink {
  title: string
  url?: string
  id?: number
  active?: boolean
}

export interface SecondaryMenuData {
  rootId?: number // the taxonomy root
  rootName?: string // alternative name for the root
  landingUrl?: string // url of the landing page
  entries: SecondaryMenuLink[]
}

// We have different types of pages, each with its own set of data:

export type RequestPageData =
  | PageNotFound
  | SingleEntityPage
  | TaxonomyPage
  | Redirect

export interface PageNotFound {
  kind: 'not-found'
}

// The landing page is custom built and takes i18n strings

export interface LandingPage {
  kind: 'landing'
  landingData: InstanceLandingData
}

// Landing pages have a different structure, because they should only load on the landing page

export interface InstanceLandingData {
  lang: string
  subjectsData: LandingSubjectsData
  strings: (typeof instanceLandingData)['strings']
}

export interface LandingSubjectsData {
  subjects: LandingSubjectLink[]
  additionalLinks: LandingSubjectLink[]
}

export interface LandingSubjectLink {
  title: string
  url: string
  icon?: LandingSubjectIcon
}

export type LandingSubjectIcon =
  | 'math'
  | 'abc'
  | 'biology'
  | 'sustainability'
  | 'chemistry'
  | 'informatics'
  | 'geography'
  | 'new'

// License detail page has some additional data and is not part of the PageData type

export interface LicenseDetailProps {
  pageData: {
    kind: 'license-detail'
    licenseData: LicenseDetailData
  }
}

export interface LicenseDetailData {
  id: number
  content: EditorRowsDocument
}

// For types that are supported through their own pages we return this helper in request-page

export interface Redirect {
  kind: 'redirect'
  type?: string
  target?: string
}

// There are several page elements that are common for entities:

export interface EntityPageBase {
  breadcrumbsData?: BreadcrumbsData
  secondaryMenuData?: SecondaryMenuData['entries']
  metaData?: HeadData
  horizonData?: HorizonData
  authorization: AuthorizationPayload
}

// Breadcrumb entries are shown nexts to each other, with possible ellipsis in between
// (Another example of discrimination data types ...)

export type BreadcrumbsData = BreadcrumbEntry[]

export type BreadcrumbEntry = BreadcrumbLinkEntry | BreadcrumbEllipsis

export interface BreadcrumbLinkEntry {
  label: string
  id?: number | null
  url?: string | null
  ellipsis?: boolean
}

export interface BreadcrumbEllipsis extends BreadcrumbLinkEntry {
  label: ''
  ellipsis: true
}

// Populate some head tags (e.g. open graph)

export interface HeadData {
  title: string
  canonicalUrl?: string
  contentType?: string
  metaDescription?: string
  metaImage?: string
  dateCreated?: string
  dateModified?: string
}

// The data that fills the horizon (desktop, below content)

export type HorizonData = HorizonEntry[]

export interface HorizonEntry {
  title: string
  imageUrl: string
  text: string
  url: string
}

// User data exept for profiles use this structure

export interface FrontendUserData {
  username: string
  id: number
  isActiveAuthor?: boolean
  isActiveDonor?: boolean
  isActiveReviewer?: boolean
}

// All entities (except taxonomy) have a shared data structure.

export interface SingleEntityPage extends EntityPageBase {
  kind: 'single-entity'
  entityData: EntityData
}

export interface EntityData {
  id: number
  alias: string
  typename: UuidType
  trashed?: boolean
  revisionId?: number
  title?: string
  schemaData?: SchemaData
  content?: AnyEditorDocument | AnyEditorDocument[]
  licenseId?: number
  unrevisedRevisions?: number
  isUnrevised: boolean
}

export interface RevisionPage extends EntityPageBase {
  kind: 'revision'
  revisionData: RevisionData
}

export interface RevisionData {
  typename: UuidRevType
  date: string
  user: FrontendUserData
  repository: {
    id: number
    alias: string
    parentId?: number
    previousRevisionId?: number
    positionInGroup?: number
  }
  thisRevision: {
    id: number
    trashed: boolean
    title?: string
    metaTitle?: string
    metaDescription?: string
    content?: AnyEditorDocument | AnyEditorDocument[]
    url?: string
  }
  currentRevision: {
    id?: number
    title?: string
    metaTitle?: string
    metaDescription?: string
    content?: AnyEditorDocument | AnyEditorDocument[]
    url?: string
  }
  changes?: string
}

export interface UnrevisedRevisionsPage extends EntityPageBase {
  kind: 'unrevisedRevisions'
  revisionsData: UnrevisedRevisionsData
}

export type UnrevisedRevisionsData = NonNullable<
  UnrevisedRevisionsQuery['subject']
>

export enum UuidRevType {
  Applet = 'AppletRevision',
  Article = 'ArticleRevision',
  Course = 'CourseRevision',
  CoursePage = 'CoursePageRevision',
  Event = 'EventRevision',
  Exercise = 'ExerciseRevision',
  ExerciseGroup = 'ExerciseGroupRevision',
  Page = 'PageRevision',
  Video = 'VideoRevision',
}

export enum UuidType {
  Comment = 'Comment',
  Thread = 'Thread', // Not a UUID type but used as typename in Events
  Applet = 'Applet',
  Article = 'Article',
  Course = 'Course',
  Event = 'Event',
  Exercise = 'Exercise',
  ExerciseGroup = 'ExerciseGroup',
  Page = 'Page',
  TaxonomyTerm = 'TaxonomyTerm',
  User = 'User',
  Video = 'Video',
}

export type UuidWithRevType = UuidRevType | UuidType

// special inline types for author tools

export enum ExerciseInlineType {
  ExerciseGroup = '_ExerciseGroupInline',
  Exercise = '_ExerciseInline',
}

// Entities can belong to a category that we use in the taxonomy

export enum TopicCategoryType {
  articles = 'articles',
  courses = 'courses',
  videos = 'videos',
  applets = 'applets',
  folders = 'folders',
  exercises = 'exercises',
  events = 'events',
}

export enum TopicCategoryCustomType {
  unrevised = 'unrevised',
  subterms = 'subterms',
  exercisesContent = 'exercisesContent',
}

// Some flags to control schema.org behaviour. Not very well done yet.

export interface SchemaData {
  wrapWithItemType?: string
  useArticleTag?: boolean
  setContentAsSection?: boolean
}

/**  License data without content for `license/details/…` page. */
export interface LicenseData {
  id: number // id of the license
  title: string
  url: string // to the license
  isDefault?: boolean
  shortTitle?: string // show this if not default
  agreement: string
}

// Taxonomy: Folders with other entities, sorted by category, first level of subfolders and exercises are shown directly

export interface TaxonomyPage extends EntityPageBase {
  kind: 'taxonomy'
  taxonomyData: TaxonomyData
}

export interface UserPage extends EntityPageBase {
  kind: 'user/profile'
  userData: {
    id: number
    username: string
    imageUrl: string
    chatUrl?: string
    motivation?: string
    description?: EditorRowsDocument | null
    lastLogin?: string | null
    date: string
    roles: { role: Role; instance: Instance | null }[]
    isActiveReviewer: boolean
    isActiveAuthor: boolean
    isActiveDonor: boolean
    activityByType: User['activityByType']
  }
}

// Shared attributes for first and second level.

export interface TaxonomyTermBase {
  articles: TaxonomyLink[]
  courses: TaxonomyLink[]
  videos: TaxonomyLink[]
  applets: TaxonomyLink[]
  exercises: TaxonomyLink[]
  events: TaxonomyLink[]
  description?: EditorRowsDocument
}

export interface TaxonomyLink {
  title: string
  url: string
  unrevised?: boolean
  id: number
}

// Second level has folders and exercises as links

export interface TaxonomySubTerm extends TaxonomyTermBase, TaxonomyLink {
  folders: TaxonomyLink[]
  type: TaxonomyTermType
}

// First level loads second level elements and exercises as content.

export interface TaxonomyData extends TaxonomyTermBase {
  id: number
  alias: string
  title: string
  trashed: boolean
  taxonomyType: TaxonomyTermType
  subterms: TaxonomySubTerm[]
  exercisesContent: (EditorExerciseDocument | EditorExerciseGroupDocument)[]
  licenseData?: LicenseData
}

export interface LoggedInData {
  authMenu: HeaderData
  strings: (typeof loggedInData)['strings']
}

export type CompBaseProps<T = object> = FunctionComponent<
  T & {
    className?: string
    style?: CSSProperties
    title?: string
  }
>
