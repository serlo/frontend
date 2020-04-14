import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import { lighten } from 'polished'
import { inputFontReset } from '../../helper/csshelper'
import SearchIcon from '../../../public/img/search-icon.svg'
import SearchResults from './SearchResults'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function SearchInput() {
  const [searchLoaded, setSearchLoaded] = React.useState(false)
  const [searchActive, setSearchActive] = React.useState(false)

  //const [showSettings, setShowSettings] = React.useState(false)
  const inputRef = React.useRef(null)
  const [value, setValue] = React.useState('')

  const checkElement = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector)
  }

  // TODO: Get placeholder of Google element (when it exists) replace with "Suche"
  // and copy original string to Google branding in overlay

  // Experiment: "lazy load" scripts and build input on the fly when using the search for the first time
  function activateSearch() {
    if (searchActive) return

    if (!searchLoaded) {
      var cx = '016022363195733463411:78jhtkzhbhc'
      //var cx = '017461339636837994840:ifahsiurxu4' //current serlo search
      var gcse = document.createElement('script')
      gcse.type = 'text/javascript'
      gcse.async = true
      gcse.src = 'https://cse.google.com/cse.js?cx=' + cx
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(gcse, s)

      setSearchLoaded(true)
    }

    checkElement('#gsc-i-id1').then(input => {
      input.focus()
      setSearchActive(true)
    })
  }

  return (
    <>
      <SearchForm id="searchform" onClick={activateSearch}>
        {!searchActive && (
          <>
            <PlaceholderText>Suche</PlaceholderText>
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
beware, a bit of improvised styled component use ahead.
this is kind of a pattern for lack of better solutions:
https://github.com/styled-components/styled-components/issues/1209#issue-263146426
still nicer than repeating all styles later imho.
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

/* needs to be global style because it's just added as last body element */
const AutocompleteStyle = createGlobalStyle`
  table.gstl_50.gssb_c{

    z-index: 100010;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      margin-top: 2px;
      display:block !important;
      left: 5px !important;
      right: 5px !important;
      width: auto !important;
    }

    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      left: inherit !important;
      margin-left: 10px;
      margin-top: 2px;
      width: auto;
      display:block !important;
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
