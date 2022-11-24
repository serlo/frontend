export function filterUnwantedRedirection({
  desiredPath,
  unwantedPaths,
  alternativePath = '/',
}: {
  desiredPath: string | null
  unwantedPaths: string[]
  alternativePath?: string
}) {
  if (
    !desiredPath ||
    desiredPath === sessionStorage.getItem('currentPathname') ||
    unwantedPaths.some(
      (unwantedPath) =>
        new URL(desiredPath).pathname === unwantedPath.replace(/^\/?/, '/')
    )
  ) {
    return alternativePath
  }
  return desiredPath
}
