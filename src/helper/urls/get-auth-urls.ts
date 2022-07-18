// helpers while we test kratos alongside the old version

export function getPasswordChangeUrl() {
  return process.env.NODE_ENV === 'production'
    ? '/auth/password/change'
    : '/auth/settings'
}

export function getLogoutUrl() {
  return process.env.NODE_ENV === 'production'
    ? '/api/auth/logout'
    : '/auth/logout'
}
