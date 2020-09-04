import { QueryResponse, TaxonomyTerms } from './query'
import { BreadcrumbsData } from '@/data-types'

export function createBreadcrumbs(uuid: QueryResponse) {
  if (uuid.__typename === 'TaxonomyTerm') {
    if (uuid.navigation?.path.nodes) {
      return compat(uuid.navigation?.path.nodes)
    }
  }

  if (uuid.__typename === 'CoursePage') {
    return compat(buildFromTaxTerms(uuid.course?.taxonomyTerms.nodes))
  }

  if (
    uuid.__typename === 'Article' ||
    uuid.__typename === 'Video' ||
    uuid.__typename === 'Applet' ||
    uuid.__typename === 'Exercise' ||
    uuid.__typename === 'ExerciseGroup'
  ) {
    return compat(buildFromTaxTerms(uuid.taxonomyTerms.nodes))
  }

  function buildFromTaxTerms(taxonomyPaths: TaxonomyTerms | undefined) {
    if (taxonomyPaths === undefined) return undefined
    let breadcrumbs

    for (const child of taxonomyPaths) {
      if (!child.navigation) continue
      const path = child.navigation.path.nodes
      if (!breadcrumbs || breadcrumbs.length > path.length) {
        // compat: some paths are short-circuited, ignore them
        if (
          path.some((x) => x.label === 'Mathematik') &&
          !path.some((x) => x.label === 'Alle Themen')
        ) {
          continue
        }

        breadcrumbs = path
      }
    }

    return breadcrumbs
  }

  function compat(breadcrumbs: BreadcrumbsData | undefined) {
    if (!breadcrumbs) return breadcrumbs
    if (
      !(uuid.__typename == 'Exercise' || uuid.__typename == 'ExerciseGroup')
    ) {
      breadcrumbs = breadcrumbs.slice(0, -1) // compat: remove last entry because it is the entry itself
    }
    breadcrumbs = breadcrumbs.filter((entry) => entry.url && entry.label) // compat: remove empty entries
    breadcrumbs = breadcrumbs.filter((entry) => entry.label !== 'Alle Themen') // compat/test: remove "Alle Themen" because landing pages offer a similar overview
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
