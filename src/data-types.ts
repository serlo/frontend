import { Instance } from './fetcher/query'

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
  lang: Instance
  strings: {
    header: HeaderStrings
    footer: FooterStrings
  }
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

export interface HeaderStrings {
  slogan: string
  search: string
  login: string
  logout: string
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
  icon?: 'newsletter' | 'github'
}

export interface FooterStrings {
  summaryHeading: string
  summaryText: string
  learnMore: string
  participate: string
  donate: string
  toTop: string
}

// We have different types of pages, each with its own set of data:

export type PageData =
  | LandingPage
  | DonationPage
  | SearchPage
  | ErrorPage
  | SingleEntityPage
  | TaxonomyPage

// The landing page is custom built and takes no additional data

export interface LandingPage {
  kind: 'landing'
}

// The same for donation, search and error page:

export interface DonationPage {
  kind: 'donation'
}

export interface SearchPage {
  kind: 'search'
}

export interface ErrorPage {
  kind: 'error'
}

// There are several page elements that are common for entities:

export interface EntityPageBase {
  breadcrumbsData?: BreadcrumbsData
  secondaryNavigationData?: SecondaryNavigationData
  /*horizonData?: HorizonData
  metaData?: HeadData
  newsletterPopup?: boolean*/
}

// Breadcrumb entries are shown nexts to each other, with possible ellipsis in between
// (Another example of discrimination data types ...)

export type BreadcrumbsData = BreadcrumbEntry[]

export type BreadcrumbEntry = BreadcrumbLinkEntry | BreadcrumbEllipsis

export interface BreadcrumbLinkEntry {
  label: string
  url?: string
  ellipsis: undefined
}

export interface BreadcrumbEllipsis {
  ellipsis: true
}

// Menu shown on the left (desktop) or between header and content (mobile)
// Links can be active, urls are already prettified.

export type SecondaryNavigationData = SecondaryNavigationEntry[]

export interface SecondaryNavigationEntry {
  url: string
  title: string
  active?: boolean
}

/*

















*/

// -------------- Existing

export interface HeadData {
  title: string
  contentType?: string
  metaDescription?: string
  metaImage?: string
}

interface EntityData {
  /*title?: string
  icon?: EntityTitleIcon
  content: EditorState['children']
  wrapWithSchema?: string
  setContentAsSection?: boolean
  courseNavigationData?: CourseNavigationData
  courseTitle?: string
  courseFooterData?: CourseFooterData
  shareData?: ShareData
  userToolsData?: UserToolsData
  licenseData?: LicenseData*/
}

interface SingleEntityPage extends EntityPageBase {
  kind: 'single-entity'
  //entity: EntityData
}

interface TaxonomyPage extends EntityPageBase {
  kind: 'taxonomy'
  //taxonomyData: unknown
}

//---------------------------------------------------------------
