export function createBreadcrumbs(uuid) {
  if (uuid.navigation?.path) {
    const crumbs = uuid.navigation.path
      .slice(0, -1) // compat: remove last entry because it is the title
      .filter(entry => entry.url && entry.label) // compat: empty entries
    return crumbs
  }
  return []
}
