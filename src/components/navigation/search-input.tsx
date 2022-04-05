import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

import { isLegacyLink } from '../content/link'
import { FaIcon } from '../fa-icon'
import { LazyTippy } from './lazy-tippy'
import SearchIcon from '@/assets-webkit/img/search-icon.svg'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

/*
This components starts with only a placeholder that looks like a searchbar (basically a button).
When activated (by click) it loads the Google Custom Search scrips that generate the real input button and alot of markup.
We style this markup and use it to silenty replace the placeholder.
From this point on it's a styled GSC that loads /search to display the results.
It's a very hacky, but it's free and works … okay.
*/

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
  const onSearchPage = router.route === '/search'

  useEffect(() => {
    // note: find a better way to tell search input that it should activate itself
    if (onSearchPage) {
      activateSearch()
    }
    // I only want to run this the first time the page loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    if (searchActive) return
    if (!consentGiven) {
      searchFormRef.current?.focus()
      return
    }

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
      setSearchActive(true)

      const resultsContainer = document.getElementById('gcs-results')
      setupLinkCatcher(resultsContainer)
    })
  }

  function onConsentButtonAction() {
    giveConsent(ExternalProvider.GoogleSearch)
    setConsentJustGiven(true)
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
        if (
          !e.metaKey &&
          !e.ctrlKey &&
          link &&
          link.classList.contains(className) &&
          typeof absoluteHref !== 'undefined' &&
          absoluteHref.startsWith(langDomain) &&
          relativeHref !== undefined &&
          !isLegacyLink(relativeHref)
        ) {
          e.preventDefault()
          void router.push('/[[...slug]]', relativeHref).then(() => {
            if (window.location.hash.length < 1) window.scrollTo(0, 0)
          })
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
      <LazyTippy
        content={renderConsentPop()}
        trigger="focus click"
        interactive
        placement="bottom-start"
        onLoaded={() => {
          if (onSearchPage && !consentGiven) {
            searchFormRef.current?.focus()
          }
        }}
      >
        <div /*SearchForm*/
          className="serlo-search-input-hack"
          id="searchform"
          ref={searchFormRef}
          onClick={activateSearch}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              activateSearch()
            }
          }}
          tabIndex={searchActive ? -1 : 0}
        >
          {!searchActive && (
            <>
              <div className="grow shrink" /*PlaceholderText*/>
                <input
                  className="gsc-input outline-none mt-2 !ml-0"
                  placeholder={strings.header.search}
                ></input>
              </div>
              <button
                style={{ fill: 'white' }}
                className="gsc-search-button" /*PlaceholderButton*/
              >
                {!searchLoaded ? (
                  <SearchIcon /*PlaceholderIcon*/ className="-mt-1" />
                ) : (
                  <FaIcon
                    /*LoadingIcon*/ icon={faSpinner}
                    className="text-white animate-spin-slow"
                  />
                )}
              </button>
            </>
          )}

          {/* Note: This exact classname is important for gcse to work!*/}
          <div
            className="gcse-searchbox-only"
            data-autocompletemaxcompletions="7"
            data-resultsurl="/search"
            data-enablehistory="true"
          />
        </div>
      </LazyTippy>
    </>
  )
  function renderConsentPop() {
    if (searchActive || consentGiven) return null
    return (
      <div
        className={clsx(
          'w-[88vw] sm:w-[277px] bg-brand text-white',
          'rounded-[10px] shadow-md',
          'px-side py-3 z-10 outline-none'
        )} /*ConsentPop*/
      >
        <button
          className="serlo-button mt-1 mb-2 mx-auto block bg-white hover:bg-brand-300 text-brand text-base py-0.5" /*ConsentButton*/
          onClick={onConsentButtonAction}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              onConsentButtonAction()
            }
          }}
        >
          {strings.search.agree}
        </button>
        {replacePlaceholders(strings.search.privacy, {
          privacypolicy: (
            <a
              className="text-white font-bold hover:no-underline"
              href="/privacy"
              target="_blank"
            >
              {strings.entities.privacyPolicy}
            </a>
          ),
        })}
      </div>
    )
  }
}
