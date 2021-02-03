export const isClient = () => typeof window !== 'undefined'
export const isMac = () => navigator.platform.indexOf('Mac') > -1
export const isWin = () => navigator.platform.indexOf('Win') > -1
