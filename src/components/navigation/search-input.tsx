import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import { useRouter } from 'next/router'
import { lighten } from 'polished'
import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'

import { StyledA } from '../tags/styled-a'
import SearchIcon from '@/assets-webkit/img/search-icon.svg'
import { useInstanceData } from '@/contexts/instance-context'
import { inputFontReset, makeLightButton, makePadding } from '@/helper/css'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { theme } from '@/theme'

interface SearchInputProps {
  onSearchPage?: boolean
}

/*
This components starts with only a placeholder that looks like a searchbar (basically a button).
When activated (by click) it loads the Google Custom Search scrips that generate the real input button and alot of markup.
We style this markup and use it to silenty replace the placeholder.
From this point on it's a styled GSC that loads /search to display the results.
It's a bit hacky, but it's free and works quite well.
*/

export function SearchInput({ onSearchPage }: SearchInputProps) {
  const [searchLoaded, setSearchLoaded] = React.useState(false)
  const [searchActive, setSearchActive] = React.useState(false)
  const [consentJustGiven, setConsentJustGiven] = React.useState(false)
  const consentGiven =
    typeof window !== 'undefined' &&
    sessionStorage.GoogleSearchConsent === 'true'

  const searchFormRef = React.useRef<HTMLDivElement>(null)

  // const [isSearchPage, setIsSearchPage] = React.useState(false)
  const { lang, strings } = useInstanceData()
  const router = useRouter()

  React.useEffect(() => {
    // note: find a better way to tell search input that it should activate itself
    if (onSearchPage) {
      activateSearch()
    }
    // I only want to run this the first time the page loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (consentJustGiven) activateSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consentJustGiven])

  React.useEffect(() => {
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

  function giveConsent() {
    sessionStorage.GoogleSearchConsent = 'true'
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
        if (
          !e.metaKey &&
          !e.ctrlKey &&
          link &&
          link.classList.contains(className) &&
          typeof link.dataset.ctorig !== 'undefined' &&
          link.dataset.ctorig.startsWith(langDomain)
        ) {
          e.preventDefault()
          void router
            .push('/[[...slug]]', link.dataset.ctorig.replace(langDomain, ''))
            .then(() => window.scrollTo(0, 0))
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
      <Tippy
        content={renderConsentPop()}
        trigger="focus click"
        interactive
        placement="bottom-end"
      >
        <SearchForm
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
              <PlaceholderText>{strings.header.search}</PlaceholderText>
              <PlaceholderButton>
                {!searchLoaded ? (
                  <PlaceholderIcon />
                ) : (
                  <LoadingIcon icon={faSpinner} size="1x" spin />
                )}
              </PlaceholderButton>
            </>
          )}

          <div
            className="gcse-searchbox-only"
            data-autocompletemaxcompletions="7"
            data-resultsurl="/search"
            data-enablehistory="true"
          />
        </SearchForm>
      </Tippy>
      <AutocompleteStyle />
    </>
  )
  function renderConsentPop() {
    if (searchActive || consentGiven) return null
    return (
      <ConsentPop>
        {replacePlaceholders(strings.search.privacy, {
          privacypolicy: (
            <_StyledA href="/privacy" target="_blank">
              {strings.embed.link}
            </_StyledA>
          ),
        })}
        <br />
        <ConsentButton
          onClick={giveConsent}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              giveConsent()
            }
          }}
        >
          {strings.search.agree}
        </ConsentButton>
      </ConsentPop>
    )
  }
}

const height = 40
const heightPx = `${height}px`

const smHeight = 35
const smHeightPx = `${smHeight}px`

/*
this is kind of a pattern for lack of better solutions:
https://github.com/styled-components/styled-components/issues/1209#issue-263146426
*/

const sharedTextStyles = css`
  flex: 1;
  margin-left: 52px;
  line-height: ${heightPx};
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.brand};

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-left: 15px;
  }
`

const sharedButtonStyles = css`
  height: ${heightPx};
  width: ${heightPx};

  background-color: ${(props) => props.theme.colors.brand};
  transition: background-color 0.2s ease-in;
  text-align: center;
  pointer-events: none;
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    border-radius: 5rem;
    width: 35px;
    height: 35px;
    margin: 0;
  }

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.lighterblue};
  }
`

const sharedIconStyles = css`
  width: 18px;
  height: 18px;
  fill: #fff;
  margin-top: ${(height - 19) / 2}px;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-top: ${(smHeight - 18) / 2}px;
  }
`

const gscMiscResets = css`
  #___gcse_0 {
    flex: 1;
  }

  .gcse-search {
    display: none;
  }

  .gsc-input-box {
    border: 0;
    padding: 0;
    background: none;
  }

  .gsib_a {
    padding: 0;

    @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
      padding: 4px 0 0 0;
      vertical-align: top;
    }
  }

  form.gsc-search-box,
  table.gsc-search-box {
    margin-bottom: 0 !important;
  }

  td.gsc-search-button {
    vertical-align: top;
  }
`

const gcsInput = css`
  background: transparent !important;
  text-indent: 0 !important;

  &,
  &::placeholder {
    ${inputFontReset}
    ${sharedTextStyles}
    line-height: inherit;
    font-size: 1rem !important;
  }

  &::placeholder {
    text-indent: 50px !important;
  }

  @media (min-width: 450px) {
    text-indent: 50px !important;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    text-indent: 15px !important;

    &::placeholder {
      text-indent: 15px !important;
    }
  }
`

const gcsButton = css`
  ${sharedButtonStyles}

  /*resets*/
  pointer-events: auto;
  padding: 0;
  border: 0;
  outline: none;
  border-radius: 0;

  & > svg {
    /* doesn't need shared styles */
    width: 18px;
    height: 18px;
  }
`

const PlaceholderText = styled.div`
  ${sharedTextStyles}
`

const PlaceholderButton = styled.div`
  ${sharedButtonStyles}
`

const PlaceholderIcon = styled(SearchIcon)`
  ${sharedIconStyles}
`

const LoadingIcon = styled(FontAwesomeIcon)`
  ${sharedIconStyles}
  color: #fff;
  font-size: 20px;
`

const SearchForm = styled.div`
  background-color: ${(props) => lighten(0.1, props.theme.colors.lighterblue)};
  display: flex;
  transition: background-color 0.4s ease;
  cursor: pointer;
  outline: none;

  &:focus-within {
    background-color: ${(props) =>
      lighten(0.1, props.theme.colors.lighterblue)};
  }

  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    padding-left: 16px;
    min-height: 38px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    position: absolute;
    top: 133px;
    right: 32px;
    height: ${smHeightPx};
    width: 300px;
    background-color: transparent;
    border-radius: 18px;
    transition: all 0.4s ease;
    justify-content: flex-end;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    right: 27px;
    margin-left: auto;
  }

  ${gscMiscResets}

  input.gsc-input {
    ${gcsInput}
  }

  button.gsc-search-button {
    ${gcsButton}
  }
`

/* needs to be global style because the autocomplete markup is just added as last body element */
const AutocompleteStyle = createGlobalStyle`
  table.gstl_50.gssb_c{

    z-index: 100010;

    @media (max-width: ${theme.breakpointsMax.sm}) {
      margin-top: 2px;
      left: 5px !important;
      right: 5px !important;
      width: auto !important;
    }

    @media (min-width: ${theme.breakpoints.sm}) {
      margin-left: 10px;
      margin-top: 2px;
      width: auto;
    }

    .gsc-completion-container > tbody > tr {
      border-top: 1px solid #ccc;
    }

    .gssb_a td{
      ${inputFontReset}
      white-space: normal !important;
    }
  }
`

//this is overriding the styles of the modal-content only. see doc to change overlay etc.

const ConsentPop = styled.div`
  background-color: ${(props) => props.theme.colors.brand};
  color: #fff;
  width: auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  ${makePadding};
  padding-top: 12px;
  padding-bottom: 12px;
  z-index: 5;
  width: 88vw;
  outline: 0;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 277px;
  }
`

const ConsentButton = styled.button`
  ${makeLightButton}
  background-color: #fff;
  font-size: 1rem;
  margin-top: 12px;
  &:hover {
    background-color: ${(props) =>
      lighten(0.15, props.theme.colors.lighterblue)};
    color: ${(props) => props.theme.colors.brand};
  }
`

const _StyledA = styled(StyledA)`
  color: #fff;
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    text-decoration: none;
  }
`
