export const isClient = typeof window !== 'undefined'
export const isServer = !isClient
export const isMac = isClient && navigator.platform.indexOf('Mac') > -1
export const isWin = isClient && navigator.platform.indexOf('Win') > -1
