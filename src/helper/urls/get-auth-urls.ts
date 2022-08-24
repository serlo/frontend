// helpers while we test kratos alongside the old version

export function getPasswordChangeUrl() {
  return process.env.NODE_ENV === 'production'
    ? '/auth/password/change'
    : '/auth/settings'
}

export function getLogoutUrl() {
  return '/auth/logout'
  // FIXME: kratos-vercel.serlo-staging.dev it was evaluating to prod.
  // return process.env.NODE_ENV === 'production'
  //   ? '/api/auth/logout'
  //   : '/auth/logout'
}
