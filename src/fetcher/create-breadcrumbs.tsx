import { QueryResponse, Path, TaxonomyTerms } from './query'

export function createBreadcrumbs(uuid: QueryResponse) {
  if (uuid.__typename === 'TaxonomyTerm') {
    if (uuid.navigation?.path) {
      return compat(uuid.navigation?.path)
    }
  }

  if (uuid.__typename === 'CoursePage') {
    return compat(buildFromTaxTerms(uuid.course?.taxonomyTerms))
  }

  if (
    uuid.__typename === 'Article' ||
    uuid.__typename === 'Video' ||
    uuid.__typename === 'Applet' ||
    uuid.__typename === 'Exercise' ||
    uuid.__typename === 'ExerciseGroup'
  ) {
    return compat(buildFromTaxTerms(uuid.taxonomyTerms))
  }

  function buildFromTaxTerms(taxonomyPaths: TaxonomyTerms | undefined) {
    if (taxonomyPaths === undefined) return undefined
    let breadcrumbs

    for (const child of taxonomyPaths) {
      const { path } = child.navigation
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

  function compat(breadcrumbs: Path | undefined) {
    return breadcrumbs
      ?.slice(0, -1) // compat: remove last entry because it is the entry itself
      .filter((entry) => entry.url && entry.label) // compat: remove empty entries
      .filter((entry) => entry.label !== 'Alle Themen') // compat/test: remove "Alle Themen" because landing pages offer a similar overview
  }
}
