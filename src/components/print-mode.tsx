import { useEffect, useState } from 'react'

import { removeHash } from '../helper/remove-hash'
import { showToastNotice } from '../helper/show-toast-notice'
import { useInstanceData } from '@/contexts/instance-context'

// print mode deactivates lazy loading and expands spoilers and solution,
// automatic redirect should work in chrome and firefox
// print warning is only a fallback now
// #print--preview is used for pdf creation and preview

export const isPrintMode =
  typeof window !== 'undefined' && window.location.hash.startsWith('#print--')

const showSolutions =
  isPrintMode && window.location.hash === '#print--preview-no-solutions'
    ? false
    : true

export const printModeSolutionVisible = isPrintMode ? showSolutions : false

export function PrintMode() {
  const [scrolledToBottom, setScrolled] = useState(false)

  const { strings } = useInstanceData()

  useEffect(() => {
    if (!isPrintMode) {
      window.addEventListener('beforeprint', function () {
        window.location.hash = 'print--now'
        window.location.reload()
        return false
      })
    }

    if (window.location.hash === '#print--now') {
      showToastNotice(`⌛  ${strings.print.preparingNotice}  🖨️`)
      setTimeout(() => {
        window.print()
      }, 2000) // give injections a chance ☮
      removeHash()
    }

    if (window.location.hash.startsWith('#print--preview')) {
      document.documentElement.classList.add('serlo-print-style')
    }
  })

  useEffect(() => {
    if (!scrolledToBottom) {
      window.addEventListener('scroll', () => {
        try {
          const heightOfWindow = window.innerHeight
          const contentScrolled = window.pageYOffset
          const bodyHeight = document.body.offsetHeight

          const height = bodyHeight - heightOfWindow
          const p = contentScrolled / height

          if (p > 0.9 && !scrolledToBottom) setScrolled(true)
        } catch (e) {
          //
        }
      })
    }
  }, [scrolledToBottom])

  if (isPrintMode) return null
  if (scrolledToBottom) return null

  return (
    <div className="hidden print:block print:border-2 print:border-black print:text-lg print:pb-2 print:mt-2">
      {strings.print.warning}
    </div>
  )
}
