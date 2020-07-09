import { Instance } from './fetcher/query'

// This file describes the data structures that controls the frontend.

// There are two types of data: instance data (language specific) and page data.

// Instance data are bound to one language and will not reload between pages within this language.

// Page data is reloaded for every page request.

// Both data comes in through initial props on the index page.

// If your data is static across all pages and languages, don't add it here, but add it directly to the component.

export interface InitialProps {
  instanceData: InstanceData
  pageData:
    | LandingPage
    | DonationPage
    | SearchPage
    | SingleEntityPage
    | TaxonomyPage
    | ErrorPage
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
  slogan: string // "Die freie Lernplattform"
  search: string // "Suche"
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

/*



















*/

// -------------- Existing

interface LandingPage {
  kind: 'landing'
}

interface DonationPage {
  kind: 'donation'
}

interface SearchPage {
  kind: 'search'
}

interface ErrorPage {
  kind: 'error'
}

interface EntityPageBase {
  /*secondaryNavigationData?: SecondaryNavigationData
  breadcrumbsData?: BreadcrumbsData
  horizonData?: HorizonData
  metaData?: unknown
  newsletterPopup?: boolean*/
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

/*import { HorizonData } from './components/content/horizon'
import { LicenseData } from './components/content/license-notice'
import { BreadcrumbsData } from './components/navigation/breadcrumbs'
import { CourseFooterData } from './components/navigation/course-footer'
import { CourseNavigationData } from './components/navigation/course-navigation'
import { SecondaryNavigationData } from './components/navigation/meta-menu'
import { UserToolsData } from './components/navigation/user-tools'
import { EntityTitleIcon } from './helper/header-by-content-type'
import { EditorState } from './schema/article-renderer'

// STATE_0 untouched

// Every page is tied to an instance, and this instance has some specific (langauge-local) data

// Depending on the type of the page we fetching different props



*/
//---------------------------------------------------------------
