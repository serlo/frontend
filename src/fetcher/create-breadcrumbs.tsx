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

type TaxonomyTermNodes = Extract<
  MainUuidType,
  { __typename: 'Article' }
>['taxonomyTerms']['nodes']

function countParents(taxonomyPath: TaxonomyTermNodes[0]) {
  function count(current: RecursiveTree): number {
    if (current.parent) {
      return count(current.parent) + 1
    } else {
      return 0
    }
  }
  return count(taxonomyPath as RecursiveTree)
}

export function taxonomyParentsToRootToBreadcrumbsData(
  taxonomyPath: TaxonomyTermNodes[0] | undefined,
  instance: Instance
): BreadcrumbsData | undefined {
  if (taxonomyPath === undefined) return undefined
  // because we don't have infinite recursion, this is the best we can do now
  // move this function into the API
  let current = taxonomyPath as RecursiveTree
  const breadcrumbs: BreadcrumbsData = []

  const { secondaryMenus } = getInstanceDataByLang(instance)

  function getSubjectName(current: RecursiveTree) {
    // we what to short circuit taxonomy if entry is part of the meta menu
    // In this case we need to walk to the subject and extract the name
    let name = ''
    while (current.parent && current.id !== 3) {
      name = current.title
      current = current.parent
    }
    return name
  }

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
      // check if this breadcrumb is already part of secondary menu
      const matching2 = secondaryMenus.filter((menu) =>
        menu.entries.some((entry) => entry.id === current.id)
      )
      if (matching2.length > 0) {
        const metaMenuEntry = matching2[0].entries.filter(
          (menu) => menu.id === current.id
        )[0]

        breadcrumbs.unshift({
          label: metaMenuEntry.title,
          url: current.alias,
          id: current.id,
        })
        breadcrumbs.unshift({
          label: matching2[0].rootName ?? getSubjectName(current),
          url: matching2[0].landingUrl,
          id: matching2[0].rootId,
        })
        break
      } else {
        breadcrumbs.unshift({
          label: current.title,
          url: current.alias,
          id: current.id,
        })
      }
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
    taxonomyPaths: TaxonomyTermNodes | undefined,
    instance: Instance
  ) {
    if (taxonomyPaths === undefined) return undefined

    // we select first shortest taxonomy path as main taxonomy and show it in breadcrumbs
    // this happens directly on taxonomy parents and is not taking short-cuircuits into account
    let mainTax
    let count = -1

    for (const path of taxonomyPaths) {
      if (!path) continue
      if (count === -1 || count > countParents(path)) {
        mainTax = path
        count = countParents(mainTax)
      }
    }

    return taxonomyParentsToRootToBreadcrumbsData(mainTax, instance)
  }

  function compat(breadcrumbs: BreadcrumbsData | undefined) {
    if (!breadcrumbs) return breadcrumbs

    if (uuid.__typename === UuidType.TaxonomyTerm && breadcrumbs.length > 1) {
      breadcrumbs = breadcrumbs.slice(0, -1) // compat: remove last entry because it is the entry itself
    }

    breadcrumbs = breadcrumbs.filter((entry) => entry.url && entry.label) // compat: remove empty entries
    const shortened: BreadcrumbsData = []
    breadcrumbs.map((entry, i, arr) => {
      const maxItems = 4
      const overflow = arr.length > maxItems
      const itemsToRemove = arr.length - maxItems
      const ellipsesItem = overflow && i === 2

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
