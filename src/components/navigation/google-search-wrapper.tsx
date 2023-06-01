import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

import { cfWorkerLinks } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'

/* 
  Uses Google Programmable Search
  https://programmablesearchengine.google.com/controlpanel/
*/

const searchEngineIds: Record<Instance, string> = {
  de: '017461339636837994840:ifahsiurxu4',
  es: '5bd728bf64beb7e94',
  fr: 'b31aebc4f2a4db942',
  ta: '65f223ba41d6c4383',
  hi: 'd1ded9becf410cea7',
  en: 'b3d3ba59c482534d2',
}

export function GoogleSeachWrapper() {
  const [searchLoaded, setSearchLoaded] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const searchFormRef = useRef<HTMLDivElement>(null)

  const { lang } = useInstanceData()
  const router = useRouter()

  //init
  useEffect(() => {
    loadSearchScripts()
    activateSearch()
  })

  const checkElement = async (selector: string) => {
    while (document.querySelector(selector) === null) {
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector)
  }

  function loadSearchScripts() {
    const gcse = document.createElement('script')
    gcse.type = 'text/javascript'
    gcse.async = true
    gcse.src = 'https://cse.google.com/cse.js?cx=' + searchEngineIds[lang]

    const s = document.getElementsByTagName('script')[0]
    s.parentNode!.insertBefore(gcse, s)

    setSearchLoaded(true)
  }

  function activateSearch() {
    if (searchActive || !searchLoaded) return

    void checkElement('#gsc-i-id1').then(() => {
      const resultsContainer = document.querySelector(
        '.gsc-wrapper'
      ) as HTMLDivElement
      setupLinkCatcher(resultsContainer)
      setSearchActive(true)
    })
  }

  function setupLinkCatcher(container: HTMLDivElement | null) {
    if (!container || container === undefined) return
    const className = 'gs-title'

    container.addEventListener(
      'click',
      function (e) {
        const langDomain = `https://${lang}.serlo.org`
        const target = e.target as HTMLElement
        const link = target.classList.contains(className)
          ? target
          : target.parentElement

        const absoluteHref = link?.dataset.ctorig
        const relativeHref = absoluteHref?.replace(langDomain, '')
        const isFrontendResultsLink =
          link &&
          link.classList.contains(className) &&
          typeof absoluteHref !== 'undefined' &&
          absoluteHref.startsWith(langDomain) &&
          relativeHref !== undefined &&
          !cfWorkerLinks.includes(relativeHref)

        if (isFrontendResultsLink) {
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault()
            void router.push(relativeHref).then(() => {
              if (window.location.hash.length < 1) window.scrollTo(0, 0)
            })
          }
        }
      },
      false
    )
  }

  return (
    <>
      <div
        className="mb-24"
        id="searchform"
        ref={searchFormRef}
        tabIndex={searchActive ? -1 : 0}
      >
        {/* Note: This exact classname is important for gcse to work!*/}
        <div
          className="gcse-search"
          data-autocompletemaxcompletions="7"
          data-resultsurl="/search"
          data-enablehistory="true"
        />
      </div>
    </>
  )
}
