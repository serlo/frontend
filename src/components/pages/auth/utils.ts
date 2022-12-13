export const loginUrl = '/auth/login'
export const registrationUrl = '/auth/registration'
export const verificationUrl = '/auth/verification'
export const settingsUrl = '/auth/settings'
export const logoutUrl = '/auth/logout'
export const recoveryUrl = 'auth/recovery'

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
