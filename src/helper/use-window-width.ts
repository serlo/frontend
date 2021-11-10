import { useEffect, useState } from 'react'

export function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window === 'undefined' ? 1200 : window.innerWidth
  )
  function changeWidth() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])
  return width
}
