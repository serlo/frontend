import { MainUuidType } from './query-types'
import { BreadcrumbsData, UuidType } from '@/data-types'

const landingTaxonomyAliasRewrite: Record<
  number,
  { label?: string; url: string }
> = {
  5: { label: 'Mathematik', url: '/mathe' },
  7899: { url: '/informatik' },
  17744: {
    url: '/nachhaltigkeit',
  },
  23362: { url: '/biologie' },
  87993: { url: '/community' },
  18230: { url: '/chemie' },
  181883: { url: '/lerntipps' },

  // smaller german subjects
  41108: { url: '/physik' },
  25985: { url: '/englisch' },
  79157: { url: '/politik' },
}

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
    | undefined
): BreadcrumbsData | undefined {
  if (taxonomyPath === undefined) return undefined
  // because we don't have infinite recursion, this is the best we can do now
  // move this function into the API
  let current: RecursiveTree = taxonomyPath as RecursiveTree
  const breadcrumbs: BreadcrumbsData = []

  while (current.alias !== '/3/root' && current.parent) {
    if (Object.hasOwn(landingTaxonomyAliasRewrite, current.id)) {
      breadcrumbs.unshift({
        label: current.title,
        ...landingTaxonomyAliasRewrite[current.id],
        id: current.id,
      })
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

export function createBreadcrumbs(uuid: MainUuidType) {
  if (uuid.__typename === UuidType.TaxonomyTerm) {
    return compat(taxonomyParentsToRootToBreadcrumbsData(uuid))
  }

  if (uuid.__typename === UuidType.CoursePage) {
    return compat(buildFromTaxTerms(uuid.course?.taxonomyTerms.nodes))
  }

  if (
    uuid.__typename === UuidType.Article ||
    uuid.__typename === UuidType.Video ||
    uuid.__typename === UuidType.Applet ||
    uuid.__typename === UuidType.Exercise ||
    uuid.__typename === UuidType.ExerciseGroup ||
    uuid.__typename === UuidType.Course
  ) {
    return compat(buildFromTaxTerms(uuid.taxonomyTerms.nodes))
  }

  function buildFromTaxTerms(
    taxonomyPaths:
      | Extract<
          MainUuidType,
          { __typename: 'Article' }
        >['taxonomyTerms']['nodes']
      | undefined
  ) {
    if (taxonomyPaths === undefined) return undefined
    const breadcrumbCandidates = taxonomyPaths.map(
      taxonomyParentsToRootToBreadcrumbsData
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
