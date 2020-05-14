import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import { lighten } from 'polished'
import { inputFontReset } from '../../helper/csshelper'
import SearchIcon from '../../../public/_assets/img/search-icon.svg'
import SearchResults from './SearchResults'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { theme } from '../../theme'
import i18next from 'i18next'

/*
This components starts with only a placeholder that looks like a searchbar (basically a button).
When activated (by click) it loads the Google Custom Search scrips that generate the real input button and alot of markup.
We style this markup and use it to silenty replace the placeholder.
From this point on it's a styled GSC that displays the results in an overlay.
It's a bit hacky, but it's free and works quite well.
*/

export default function SearchInput() {
  const [searchLoaded, setSearchLoaded] = React.useState(false)
  const [searchActive, setSearchActive] = React.useState(false)

  const checkElement = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector)
  }

  function activateSearch() {
    if (searchActive) return

    if (!searchLoaded) {
      const cx = '016022363195733463411:78jhtkzhbhc'
      const gcse = document.createElement('script')
      gcse.type = 'text/javascript'
      gcse.async = true
      gcse.src = 'https://cse.google.com/cse.js?cx=' + cx
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(gcse, s)

      setSearchLoaded(true)
    }

    checkElement('#gsc-i-id1').then(input => {
      // const placeholder = input.getAttribute('placeholder') stopped working
      const placeholder = 'Custom Search'
      input.setAttribute('placeholder', 'Suche')
      document
        .querySelector('#___gcse_1 .gsc-results-wrapper-overlay')
        .setAttribute('data-customsearch', placeholder)

      input.focus()
      setSearchActive(true)
    })
  }

  return (
    <>
      <SearchForm id="searchform" onClick={activateSearch}>
        {!searchActive && (
          <>
            <PlaceholderText>{i18next.t('Search')}</PlaceholderText>
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
          className="gcse-searchbox"
          data-autocompletemaxcompletions="5"
        ></div>
      </SearchForm>

      <AutocompleteStyle />

      <SearchResults>
        <div className="gcse-searchresults"></div>
      </SearchResults>
    </>
  )
}

const height = 40
const heightPx = height + 'px'

const smHeight = 35
const smHeightPx = smHeight + 'px'

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
  color: ${props => props.theme.colors.brand};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 15px;
  }
`

const sharedButtonStyles = css`
  height: ${heightPx};
  width: ${heightPx};

  background-color: ${props => props.theme.colors.brand};
  transition: background-color 0.2s ease-in;
  text-align: center;
  pointer-events: none;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    border-radius: 5rem;
    width: 35px;
    height: 35px;
    margin: 0;
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.lighterblue};
  }
`

const sharedIconStyles = css`
  width: 18px;
  height: 18px;
  fill: #fff;
  margin-top: ${(height - 19) / 2}px;
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
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

    @media (min-width: ${props => props.theme.breakpoints.sm}) {
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

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
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
  background-color: ${props => lighten(0.1, props.theme.colors.lighterblue)};
  display: flex;
  transition: background-color 0.4s ease;
  cursor: pointer;

  &:focus-within {
    background-color: ${props => lighten(0.1, props.theme.colors.lighterblue)};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-left: 16px;
    min-height: 38px;
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    position: absolute;
    top: 133px;
    right: 32px;
    height: ${smHeightPx};
    width: 200px;
    background-color: transparent;
    border-radius: 18px;
    transition: all 0.4s ease;
    justify-content: flex-end;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
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

    @media (max-width: ${theme.breakpoints.sm}) {
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
