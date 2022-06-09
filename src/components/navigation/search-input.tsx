import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

import { isLegacyLink } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { submitEvent } from '@/helper/submit-event'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

/* Uses Google Custom Search */

export function SearchInput() {
  const [searchLoaded, setSearchLoaded] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [consentJustGiven, setConsentJustGiven] = useState(false)
  const { checkConsent, giveConsent } = useConsent()
  const consentGiven = checkConsent(ExternalProvider.GoogleSearch)
  const searchFormRef = useRef<HTMLDivElement>(null)

  // const [isSearchPage, setIsSearchPage] = useState(false)
  const { lang, strings } = useInstanceData()
  const router = useRouter()

  useEffect(() => {
    submitEvent('search-showing-results')
    activateSearch()
  })

  useEffect(() => {
    if (consentJustGiven) activateSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consentJustGiven])

  useEffect(() => {
    const resultsContainer = document.getElementById('gcs-results')
    setupLinkCatcher(resultsContainer)
  })

  const checkElement = async (selector: string) => {
    while (document.querySelector(selector) === null) {
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector)
  }

  function activateSearch() {
    if (searchActive || !consentGiven) return

    if (!searchLoaded) {
      const gcse = document.createElement('script')
      gcse.type = 'text/javascript'
      gcse.async = true
      gcse.src = 'https://cse.google.com/cse.js?cx=' + getSearchEngineId(lang)

      const s = document.getElementsByTagName('script')[0]
      s.parentNode!.insertBefore(gcse, s)

      setSearchLoaded(true)
    }

    void checkElement('#gsc-i-id1').then((element) => {
      const input = element as HTMLInputElement
      input.setAttribute('placeholder', strings.header.search)
      input.focus()
      const resultsContainer = document.getElementById('gcs-results')
      setupLinkCatcher(resultsContainer)

      setSearchActive(true)
    })
  }

  function setupLinkCatcher(container: HTMLElement | null) {
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
          !isLegacyLink(relativeHref)

        if (isFrontendResultsLink) {
          submitEvent('search-result-click')
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault()
            void router.push('/[[...slug]]', relativeHref).then(() => {
              if (window.location.hash.length < 1) window.scrollTo(0, 0)
            })
          }
        }
      },
      false
    )
  }

  function getSearchEngineId(instance: string) {
    switch (instance) {
      case 'de':
        return '017461339636837994840:ifahsiurxu4'
      case 'es':
        return '5bd728bf64beb7e94'
      case 'fr':
        return 'b31aebc4f2a4db942'
      case 'ta':
        return '65f223ba41d6c4383'
      case 'hi':
        return 'd1ded9becf410cea7'
      case 'en':
      default:
        return 'b3d3ba59c482534d2'
    }
  }

  return (
    <>
      {consentGiven ? (
        <div
          className={clsx('max-w-md mb-8')}
          id="searchform"
          ref={searchFormRef}
          tabIndex={searchActive ? -1 : 0}
        >
          {/* Note: This exact classname is important for gcse to work!*/}
          <div
            className="gcse-searchbox-only"
            data-autocompletemaxcompletions="7"
            data-resultsurl="/search"
            data-enablehistory="true"
          />
        </div>
      ) : (
        renderConsentBanner()
      )}
    </>
  )
  function renderConsentBanner() {
    if (consentGiven) return
    return (
      <div
        className={clsx(
          'text-brand',
          'rounded-[10px] border-2',
          'px-side py-3 z-10 outline-none'
        )}
      >
        {replacePlaceholders(strings.search.privacy, {
          privacypolicy: (
            <a
              className="text-brand serlo-link font-bold hover:no-underline"
              href="/privacy"
              target="_blank"
            >
              {strings.entities.privacyPolicy}
            </a>
          ),
        })}
        <button
          className="serlo-button serlo-make-interactive-primary mt-2 mb-1 block py-0.5"
          onClick={() => {
            submitEvent('search-consented')
            giveConsent(ExternalProvider.GoogleSearch)
            setConsentJustGiven(true)
          }}
        >
          {strings.search.agree}
        </button>
      </div>
    )
  }
}
