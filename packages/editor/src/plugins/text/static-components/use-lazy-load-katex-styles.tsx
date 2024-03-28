import { useEffect } from 'react'

function loadKaTeXStyles() {
  const stylesheetHref = '@serlo/frontend/src/../external/katexstyles.css'
  const existingLink = document.querySelector(`link[href="${stylesheetHref}"]`)

  if (!existingLink) {
    const link = document.createElement('link')
    link.href = stylesheetHref
    link.type = 'text/css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
}

export function useLazyLoadKaTeXStyles() {
  useEffect(() => {
    loadKaTeXStyles()
  }, [])
}
