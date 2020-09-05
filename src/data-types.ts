import { TaxonomyTermType } from '@serlo/api'

import { Instance } from './fetcher/query'
import { instanceData, instanceLandingData, loggedInData } from '@/data/en'

// This file describes the data structures that controls the frontend.

// There are two types of data: instance data (language specific) and page data.

// Instance data are bound to one language and will not reload between pages within this language.

// Page data is reloaded for every page request.

// Both data comes in through initial props on the index page.

// If your data is static across all pages and languages, don't add it here, but add it directly to the component.

// The origin points to the frontend deployment.

export interface InitialProps {
  instanceData?: InstanceData
  pageData: PageData
  origin: string
}

// Instance data consists of the language, translation strings, header menu and footer menu.

// The frontend supports all languages that the backend supports.

export interface InstanceData {
  lang: Instance | string
  strings: typeof instanceData['strings'] //infer types from english language file
  headerData: HeaderData
  footerData: FooterData
}

// Menus are trees of title and urls, possibly with icons.

export type HeaderData = HeaderLink[]

export interface HeaderLink {
  title: string
  url: string
  icon?: HeaderIcon
  children?: HeaderLink[]
}

export type HeaderIcon =
  | 'subject'
  | 'about'
  | 'participate'
  | 'community'
  | 'donate'
  | 'user'
  | 'login'
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

export type FooterIcon = 'newsletter' | 'github'

// We have different types of pages, each with its own set of data:

export type PageData =
  | LandingPage
  | DonationPage
  | SearchPage
  | ErrorPage
  | LicenseDetailPage
  | NotificationsPage
  | SingleEntityPage
  | RevisionPage
  | TaxonomyPage

// The landing page is custom built and takes i18n strings

export interface LandingPage {
  kind: 'landing'
  landingData: InstanceLandingData
}

// Landing pages have a different structure, because they should only load on the landing page

export interface InstanceLandingData {
  lang: string
  strings: typeof instanceLandingData['strings']
}

// The same for donation, search and notifications page:

export interface DonationPage {
  kind: 'donation'
}

export interface SearchPage {
  kind: 'search'
}

export interface NotificationsPage {
  kind: 'user/notifications'
}

// Error page has some additional data

export interface ErrorPage {
  kind: 'error'
  errorData: ErrorData
}

export interface ErrorData {
  code: number
  message?: string
}

// License detail page has some additional data

export interface LicenseDetailPage extends EntityPageBase {
  kind: 'license-detail'
  licenseData: LicenseDetailData
}

export interface LicenseDetailData {
  title: string
  content: FrontendContentNode[]
  iconHref: string
}

// There are several page elements that are common for entities:

export interface EntityPageBase {
  breadcrumbsData?: BreadcrumbsData
  secondaryNavigationData?: SecondaryNavigationData
  metaData?: HeadData
  horizonData?: HorizonData
  newsletterPopup: boolean
  cacheKey?: string // save page data to session storage
}

// Breadcrumb entries are shown nexts to each other, with possible ellipsis in between
// (Another example of discrimination data types ...)

export type BreadcrumbsData = BreadcrumbEntry[]

export type BreadcrumbEntry = BreadcrumbLinkEntry | BreadcrumbEllipsis

export interface BreadcrumbLinkEntry {
  label: string
  url?: string | null
  ellipsis?: boolean
}

export interface BreadcrumbEllipsis extends BreadcrumbLinkEntry {
  label: ''
  ellipsis: true
}

// Menu shown on the left (desktop) or between header and content (mobile)
// Links can be active, urls are already prettified.

export type SecondaryNavigationData = SecondaryNavigationEntry[]

export interface SecondaryNavigationEntry {
  url?: string
  title: string
  active?: boolean
}

// Populate some head tags (e.g. open graph)

export interface HeadData {
  title: string
  contentType?: string
  metaDescription?: string
  metaImage?: string
}

// The data that fills the horizon (desktop, below content)

export type HorizonData = HorizonEntry[]

export interface HorizonEntry {
  title: string
  imageUrl: string
  text: string
  url: string
}

// All entities (except taxonomy) have a shared data structure.

export interface SingleEntityPage extends EntityPageBase {
  kind: 'single-entity'
  entityData: EntityData
}

export interface EntityData {
  id: number
  typename: string
  revisionId?: number
  title?: string
  categoryIcon?: EntityTypes
  schemaData?: SchemaData
  content?: FrontendContentNode[]
  inviteToEdit?: boolean
  licenseData?: LicenseData
  courseData?: CourseData
}

export interface RevisionPage extends EntityPageBase {
  kind: 'revision'
  revisionData: RevisionData
}

export interface RevisionData {
  typename: string
  date: string
  type: EntityTypes
  user: {
    id: number
    username: string
  }
  repositoryId: number
  thisRevision: {
    id: number
    title?: string
    metaTitle?: string
    metaDescription?: string
    content?: FrontendContentNode[]
    url?: string
  }
  currentRevision: {
    id?: number
    title?: string
    metaTitle?: string
    metaDescription?: string
    content?: FrontendContentNode[]
    url?: string
  }
  changes?: string
}

// Entities each should have an translated string and a corresponding icon

export type EntityTypes =
  | 'applet'
  | 'article'
  | 'course'
  | 'coursePage'
  | 'event'
  | 'exercise'
  | 'exerciseGroup'
  | 'groupedExercise'
  | 'page'
  | 'solution'
  | 'taxonomyTerm'
  | 'user'
  | 'video'
  | 'revision'
  | 'comment'
  | 'thread'
  //just in case
  | 'folder'

export type EntityStrings = {
  [K in EntityTypes]: string
}

// Entities can belong to a category that we use in the taxonomy

export type CategoryTypes =
  | 'articles'
  | 'courses'
  | 'videos'
  | 'applets'
  | 'folders'
  | 'exercises'
  | 'events'

export type CategoryStrings = {
  [K in EntityTypes]: string
}

// Some flags to control schema.org behaviour. Not very well done yet.

export interface SchemaData {
  wrapWithItemType?: string
  useArticleTag?: boolean
  setContentAsSection?: boolean
}

// The actual content of the page.

// The frontend defines it's own content format that bridges the gap between legacy and edtr-io state.
// Will switch to edtr-io state one day.
// Until then: Here are the types the frontend expects after converting

export interface FrontendTextNode {
  type: 'text'
  text: string
  color?: FrontendTextColor
  em?: boolean
  strong?: boolean
  children?: undefined
}

export type FrontendTextColor = 'blue' | 'green' | 'orange'

export interface FrontendANode {
  type: 'a'
  href: string
  children?: FrontendContentNode[]
}

export interface FrontendInlineMathNode {
  type: 'inline-math'
  formula: string
  children?: undefined
}

export interface FrontendPNode {
  type: 'p'
  children?: FrontendContentNode[]
}

export interface FrontendHNode {
  type: 'h'
  level: 1 | 2 | 3 | 4 | 5
  id?: string
  children?: FrontendContentNode[]
}

export interface FrontendMathNode {
  type: 'math'
  formula: string
  alignLeft?: boolean
  children?: undefined
}

export interface FrontendImgNode {
  type: 'img'
  src: string
  href?: string
  alt: string
  maxWidth?: number
  children?: undefined
}

export interface FrontendSpoilerContainerNode {
  type: 'spoiler-container'
  children: [FrontendSpoilerTitleNode, FrontendSpoilerBodyNode]
}

export interface FrontendSpoilerTitleNode {
  type: 'spoiler-title'
  children?: FrontendContentNode[]
}

export interface FrontendSpoilerBodyNode {
  type: 'spoiler-body'
  children?: FrontendContentNode[]
}

export interface FrontendUlNode {
  type: 'ul'
  children?: FrontendLiNode[]
}

export interface FrontendOlNode {
  type: 'ol'
  children?: FrontendLiNode[]
}

export interface FrontendLiNode {
  type: 'li'
  children?: FrontendContentNode[]
}

export interface FrontendRowNode {
  type: 'row'
  children?: FrontendColNode[]
}

export interface FrontendColNode {
  type: 'col'
  size: number
  children?: FrontendContentNode[]
}

export interface FrontendImportantNode {
  type: 'important'
  children?: FrontendContentNode[]
}

export interface FrontendAnchorNode {
  type: 'anchor'
  id: string
  children?: undefined
}

export interface FrontendTableNode {
  type: 'table'
  children?: FrontendTrNode[]
}

export interface FrontendTrNode {
  type: 'tr'
  children?: (FrontendThNode | FrontendTdNode)[]
}

export interface FrontendThNode {
  type: 'th'
  children?: FrontendContentNode[]
}

export interface FrontendTdNode {
  type: 'td'
  children?: FrontendContentNode[]
}

export interface FrontendGeogebraNode {
  type: 'geogebra'
  id: string
  children?: undefined
}

export interface FrontendInjectionNode {
  type: 'injection'
  href: string
  children?: undefined
}

interface BareSolution {
  legacy?: FrontendContentNode[]
  edtrState?: SolutionEdtrState
  license?: LicenseData
}

export interface FrontendExerciseNode {
  type: 'exercise'
  task: {
    legacy?: FrontendContentNode[]
    edtrState?: TaskEdtrState
    license?: LicenseData
  }
  solution: BareSolution
  grouped?: boolean
  positionInGroup?: number
  positionOnPage?: number
  context: {
    id: number
    parent?: number
    solutionId?: number
  }
  children?: undefined
  href?: string
}

export interface FrontendSolutionNode {
  type: 'solution'
  solution: BareSolution

  context: {
    id: number
  }
  href?: string
  children?: undefined
}

export interface TaskEdtrState {
  content: FrontendContentNode[] // edtr-io plugin "exercise"
  interactive?: EdtrPluginScMcExercise | EdtrPluginInputExercise
}

export interface SolutionEdtrState {
  prerequisite?: {
    // edtr-io plugin "solution"
    id?: number
    href?: string // added, the resolved alias
    title: string
  }
  strategy: FrontendContentNode[]
  steps: FrontendContentNode[]
}

export interface EdtrPluginScMcExercise {
  plugin: 'scMcExercise' // edtr-io plugin
  state: {
    answers: {
      isCorrect: boolean
      feedback: FrontendContentNode[]
      content: FrontendContentNode[]
    }[]
    isSingleChoice?: boolean
  }
}

export interface EdtrPluginInputExercise {
  plugin: 'inputExercise' // edtr-io plugin
  state: {
    type:
      | 'input-number-exact-match-challenge'
      | 'input-string-normalized-match-challenge'
      | 'input-expression-equal-match-challenge'
    answers: {
      value: string
      isCorrect: boolean
    }[]
    unit: string
  }
}

export interface FrontendExerciseGroupNode {
  type: 'exercise-group'
  license?: LicenseData
  positionOnPage?: number
  content: FrontendContentNode[]
  children?: FrontendExerciseNode[]
  context: {
    id: number
  }
  href?: string
}

export interface FrontendVideoNode {
  type: 'video'
  src: string
  children?: undefined
}

export interface FrontendCodeNode {
  type: 'code'
  code: string
  children?: undefined
}

export interface FrontendEquationsNode {
  type: 'equations'
  steps: {
    left: FrontendContentNode[]
    sign: SignType
    right: FrontendContentNode[]
    transform: FrontendContentNode[]
  }[]
  children?: undefined
}

export type SignType =
  | 'equals'
  | '='
  | 'greater-than'
  | 'greater-than-or-equal'
  | 'less-than'
  | 'less-than-or-equal'
  | 'almost-equal-to'

export type FrontendVoidNode =
  | FrontendInlineMathNode
  | FrontendMathNode
  | FrontendImgNode
  | FrontendAnchorNode
  | FrontendGeogebraNode
  | FrontendInjectionNode
  | FrontendExerciseNode
  | FrontendSolutionNode
  | FrontendVideoNode
  | FrontendCodeNode
  | FrontendEquationsNode

export type FrontendElementNode =
  | FrontendANode
  | FrontendPNode
  | FrontendHNode
  | FrontendSpoilerTitleNode
  | FrontendSpoilerBodyNode
  | FrontendLiNode
  | FrontendColNode
  | FrontendImportantNode
  | FrontendThNode
  | FrontendTdNode

export type FrontendRestrictedElementNode =
  | FrontendSpoilerContainerNode
  | FrontendTableNode
  | FrontendSpoilerContainerNode
  | FrontendUlNode
  | FrontendOlNode
  | FrontendRowNode
  | FrontendTableNode
  | FrontendTrNode
  | FrontendExerciseGroupNode

export type FrontendContentNode =
  | FrontendTextNode
  | FrontendVoidNode
  | FrontendElementNode
  | FrontendRestrictedElementNode

// A license notice.

export interface LicenseData {
  title: string
  url: string // to to license
  id: number // of the license
  default: boolean
}

// Data for a course page.

export interface CourseData {
  id: number
  title: string
  pages: CoursePagesData
  nextPageUrl?: string
}

export type CoursePagesData = CoursePageEntry[]

export interface CoursePageEntry {
  title: string
  url: string
  active?: boolean
}

// Taxonomy: Folders with other entities, sorted by category, first level of subfolders and exercises are shown directly

export interface TaxonomyPage extends EntityPageBase {
  kind: 'taxonomy'
  taxonomyData: TaxonomyData
}

// Shared attributes for first and second level.

export interface TaxonomyTermBase {
  articles: TaxonomyLink[]
  courses: TaxonomyLink[]
  videos: TaxonomyLink[]
  applets: TaxonomyLink[]
  exercises: TaxonomyLink[]
  events: TaxonomyLink[]
  description?: FrontendContentNode[]
}

export interface TaxonomyLink {
  title: string
  url: string
}

// Second level has folders and exercises as links

export interface TaxonomySubTerm extends TaxonomyTermBase, TaxonomyLink {
  folders: TaxonomyLink[]
}

// First level loads second level elements and exercises as content.

export interface TaxonomyData extends TaxonomyTermBase {
  id: number
  title: string
  taxonomyType: TaxonomyTermType
  subterms: TaxonomySubTerm[]
  exercisesContent: (FrontendExerciseNode | FrontendExerciseGroupNode)[]
  licenseData?: LicenseData
}

export interface LoggedInData {
  authMenu: HeaderData
  strings: typeof loggedInData['strings']
}
