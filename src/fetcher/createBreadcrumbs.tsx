export function createBreadcrumbs(uuid) {
  let breadcrumbs = uuid.navigation?.path

  if (!breadcrumbs) {
    const taxonomyPaths = uuid.taxonomyTerms ?? uuid.course?.taxonomyTerms
    if (taxonomyPaths) {
      for (const child of taxonomyPaths) {
        const { path } = child.navigation
        console.log(path)
        if (!breadcrumbs || breadcrumbs.length > path.length) {
          // compat: some paths are short-circuited, ignore them
          if (
            path.some(x => x.label === 'Mathematik') &&
            !path.some(x => x.label === 'Alle Themen')
          ) {
            continue
          }

          breadcrumbs = path
        }
      }
    }
  }

  if (breadcrumbs) {
    return breadcrumbs
      .slice(0, -1) // compat: remove last entry because it is the entry itself
      .filter(entry => entry.url && entry.label) // compat: remove empty entries
  }
}
