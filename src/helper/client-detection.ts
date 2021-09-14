// Beware: Replacing typeof window !== 'undefined' can increase bundle size
// (see https://github.com/serlo/frontend/issues/1268#issuecomment-918879156)
const isClient = typeof window !== 'undefined'

export const isMac = isClient && navigator.platform.indexOf('Mac') > -1
export const isWin = isClient && navigator.platform.indexOf('Win') > -1
