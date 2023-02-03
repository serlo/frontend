import { Instance } from './graphql-types/operations'
import { MainUuidType } from './query-types'
import { BreadcrumbsData, UuidType } from '@/data-types'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

interface RecursiveTree {
  title: string
  alias: string
  id: number
  parent: RecursiveTree
}

export function taxonomyParentsToRootToBreadcrumbsData(
  taxonomyPath:
    | Extract<
        MainUuidType,
        { __typename: 'Article' }
      >['taxonomyTerms']['nodes'][0]
    | undefined,
  instance: Instance
): BreadcrumbsData | undefined {
  if (taxonomyPath === undefined) return undefined
  // because we don't have infinite recursion, this is the best we can do now
  // move this function into the API
  let current: RecursiveTree = taxonomyPath as RecursiveTree
  const breadcrumbs: BreadcrumbsData = []

  const { secondaryMenus } = getInstanceDataByLang(instance)

  while (current.id !== 3 && current.parent) {
    // find subject of this path and rewrite root breadcrumb
    const matching = secondaryMenus.filter((menu) => menu.rootId === current.id)
    if (matching.length > 0) {
      breadcrumbs.unshift({
        label: matching[0].rootName ?? current.title,
        url: matching[0].landingUrl,
        id: current.id,
      })
      break // not going further, especially for subjects under construction
    } else {
      breadcrumbs.unshift({
        label: current.title,
        url: current.alias,
        id: current.id,
      })
    }
    // the recursion is limited, so there is a slight type mismatch
    current = current.parent
  }

  return breadcrumbs
}

export function createBreadcrumbs(uuid: MainUuidType, instance: Instance) {
  if (uuid.__typename === UuidType.TaxonomyTerm) {
    return compat(taxonomyParentsToRootToBreadcrumbsData(uuid, instance))
  }

  if (uuid.__typename === UuidType.CoursePage) {
    return compat(buildFromTaxTerms(uuid.course?.taxonomyTerms.nodes, instance))
  }

  if (
    uuid.__typename === UuidType.Article ||
    uuid.__typename === UuidType.Video ||
    uuid.__typename === UuidType.Applet ||
    uuid.__typename === UuidType.Exercise ||
    uuid.__typename === UuidType.ExerciseGroup ||
    uuid.__typename === UuidType.Course
  ) {
    return compat(buildFromTaxTerms(uuid.taxonomyTerms.nodes, instance))
  }

  function buildFromTaxTerms(
    taxonomyPaths:
      | Extract<
          MainUuidType,
          { __typename: 'Article' }
        >['taxonomyTerms']['nodes']
      | undefined,
    instance: Instance
  ) {
    if (taxonomyPaths === undefined) return undefined
    const breadcrumbCandidates = taxonomyPaths.map((candidate) =>
      taxonomyParentsToRootToBreadcrumbsData(candidate, instance)
    )
    let breadcrumbs

    // select first shortest taxonomy path
    for (const path of breadcrumbCandidates) {
      if (!path) continue
      if (!breadcrumbs || breadcrumbs.length > path.length) {
        breadcrumbs = path
      }
    }

    return breadcrumbs
  }

  function compat(breadcrumbs: BreadcrumbsData | undefined) {
    if (!breadcrumbs) return breadcrumbs

    if (uuid.__typename == UuidType.TaxonomyTerm && breadcrumbs.length > 1) {
      breadcrumbs = breadcrumbs.slice(0, -1) // compat: remove last entry because it is the entry itself
    }

    breadcrumbs = breadcrumbs.filter((entry) => entry.url && entry.label) // compat: remove empty entries
    const shortened: BreadcrumbsData = []
    breadcrumbs.map((entry, i, arr) => {
      const maxItems = 4
      const overflow = arr.length > maxItems
      const itemsToRemove = arr.length - maxItems
      const ellipsesItem = overflow && i == 2

      if (overflow && i > 2 && i < 1 + itemsToRemove) return
      // special case
      if (arr.length - itemsToRemove > 4 && i === 1) return
      if (ellipsesItem) {
        shortened.push({ label: '', ellipsis: true })
      } else {
        shortened.push(entry)
      }
    })

    return shortened
  }
}
