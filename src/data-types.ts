import { HorizonData } from './components/content/horizon'
import { LicenseData } from './components/content/license-notice'
import { BreadcrumbsData } from './components/navigation/breadcrumbs'
import { CourseFooterData } from './components/navigation/course-footer'
import { CourseNavigationData } from './components/navigation/course-navigation'
import { FooterData } from './components/navigation/footer-nav'
import { SecondaryNavigationData } from './components/navigation/meta-menu'
import { HeaderData } from './components/navigation/mobile-menu'
import { UserToolsData } from './components/navigation/user-tools'
import { Instance } from './fetcher/query'
import { EntityTitleIcon } from './helper/header-by-content-type'
import { EditorState } from './schema/article-renderer'

// STATE_0 untouched

// Every page is tied to an instance, and this instance has some specific (langauge-local) data

export interface InstanceData {
  lang: Instance
  strings: {
    slogan: string
  }
  headerData: HeaderData
  footerData: FooterData
}

// Depending on the type of the page we fetching different props

interface LandingPage {
  kind: 'landing'
}

interface DonationPage {
  kind: 'donation'
}

interface SearchPage {
  kind: 'search'
}

interface ErrorPageType {
  kind: 'error'
}

interface EntityPageBase {
  secondaryNavigationData?: SecondaryNavigationData
  breadcrumbsData?: BreadcrumbsData
  horizonData?: HorizonData
  metaData?: unknown
  newsletterPopup?: boolean
}

interface EntityData {
  title?: string
  icon?: EntityTitleIcon
  content: EditorState['children']
  wrapWithSchema?: string
  setContentAsSection?: boolean
  courseNavigationData?: CourseNavigationData
  courseTitle?: string
  courseFooterData?: CourseFooterData
  shareData?: ShareData
  userToolsData?: UserToolsData
  licenseData?: LicenseData
}

interface SingleEntityPage extends EntityPageBase {
  kind: 'single-entity'
  entity: EntityData
}

interface TaxonomyPage extends EntityPageBase {
  kind: 'taxonomy'
  taxonomyData: unknown
}

interface InitialProps {
  instanceData: InstanceData
  pageData:
    | LandingPage
    | DonationPage
    | SearchPage
    | SingleEntityPage
    | TaxonomyPage
    | ErrorPageType
}

//---------------------------------------------------------------
