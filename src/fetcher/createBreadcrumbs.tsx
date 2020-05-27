// TODO: needs type declaration
export function createBreadcrumbs(uuid: any) {
  let breadcrumbs = uuid.navigation?.path

  if (!breadcrumbs) {
    const taxonomyPaths = uuid.taxonomyTerms ?? uuid.course?.taxonomyTerms
    if (taxonomyPaths) {
      for (const child of taxonomyPaths) {
        const { path } = child.navigation
        if (!breadcrumbs || breadcrumbs.length > path.length) {
          // compat: some paths are short-circuited, ignore them
          if (
            // TODO: needs type declaration
            path.some((x: any) => x.label === 'Mathematik') &&
            // TODO: needs type declaration
            !path.some((x: any) => x.label === 'Alle Themen')
          ) {
            continue
          }

          breadcrumbs = path
        }
      }
    }
  }

  if (breadcrumbs) {
    return (
      breadcrumbs
        .slice(0, -1) // compat: remove last entry because it is the entry itself
        // TODO: needs type declaration
        .filter((entry: any) => entry.url && entry.label)
    ) // compat: remove empty entries
  }
}
