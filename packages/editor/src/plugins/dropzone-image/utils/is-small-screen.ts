export const isSmallScreen = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 1024
  }
  return false
}
