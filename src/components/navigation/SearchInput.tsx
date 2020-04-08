import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { inputFontReset } from '../../helper/csshelper'

export default function SearchInput() {
  const [focused, setFocused] = React.useState(false)
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
      // input.addEventListener('input', function(e) {
      //   inputRef.current.value = e.target.value
      // })
      setSearchActive(true)
    })
  }

  return (
    <>
      <SearchForm id="searchform" onClick={activateSearch}>
        {!searchLoaded && <a>Placeholder</a>}
        <div
          className="gcse-searchbox"
          data-autocompletemaxcompletions="5"
        ></div>
      </SearchForm>

      <AutocompleteStyle />

      <SearchResultsWrap>
        <div className="gcse-searchresults"></div>
      </SearchResultsWrap>
    </>
  )
}

const AutocompleteStyle = createGlobalStyle`
  table.gstl_50.gssb_c{

    z-index: 100010;

    /* TODO: Get value from theme */
    @media (max-width: 800px) { 
      margin-top: 2px;
      display:block !important;
      left: 5px !important;
      right: 5px !important;
      width: auto !important;
    }

    @media (min-width: 800px) {
      margin-left: 10px;
      margin-top: 2px;
      width: auto;
      display:block !important;
    }

    .gsc-completion-container > tbody > tr {
      border-top: 1px solid #ccc;
    }

    .gssb_a td{
      white-space: normal !important;
      font-size: 1rem;
      font-family: Karmilla, sans-serif;
    }
  }
`

const SearchForm = styled.div`
  #___gcse_0,
  & > div {
    flex: 1;
  }

  .gcse-search {
    display: none;
  }

  .gsc-input-box {
    border: 0;
    background: none;
  }

  .gsc-control-cse {
    background-color: white;
    border: 0;
    padding: 0;
    z-index: 20;
  }

  input.gsc-input {
    background: transparent !important;

    text-indent: 0 !important;

    &, &::placeholder {
      font-size: 1rem !important;
      ${inputFontReset}
      font-weight: bold;
      color: ${props => props.theme.colors.brand};
      font-size: 1rem !important;
    }

    &::placeholder {
      text-indent: 50px !important;
    }
    
    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      &{text-indent: 15px !important;}
    }

  }

  .gsib_a {
    padding: 0;

    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      padding: 2px 0 0 0;
      vertical-align: top;
    }
  }

  form.gsc-search-box,
  table.gsc-search-box {
    margin-bottom: 0 !important;
  }

  td.gsc-search-button{
    vertical-align: top;
  }

  button.gsc-search-button, button.gsc-search-button:hover, button.gsc-search-button:focus  {

    background-color: ${props => props.theme.colors.brand};
    transition: background-color 0.2s ease-in;

    color: 'white';
    height: 40px;
    min-width: 40px;
    padding: 0;
    border: 0;
    outline: none;
    cursor: pointer;
    font-size: 0.8em;
    border-radius: 0;

    & > svg {
      width: 18px;
      height: 18px
    }

    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      border-radius: 5rem;
      width: 35px;
      height: 35px;
      min-width: auto;
      margin: 0;
    }

    &:hover, &:focus{
      background-color: ${props => props.theme.colors.lighterblue};
    }
/* 
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    color: white;
    min-width: 35px;
    height: 35px;
    border-radius: 17px;
  } */
  }

  background-color: ${props => lighten(0.1, props.theme.colors.lighterblue)};
  display: flex;
  /* justify-content: center; */
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
    height: 35px;
    width: 224px;
    background-color: transparent;
    border-radius: 18px;
    transition: all 0.4s ease;
    justify-content: flex-end;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    right: 27px;
    /* margin-top: -5px; */
    margin-left: auto;
  }
`

const SearchResultsWrap = styled.div`
  .gsc-results-wrapper-overlay {
    top: 220px;
    padding: 0 6px 220px 6px;
    box-shadow: none;
  }

  .gsc-modal-background-image {
    top: 210px;
    opacity: 1;
  }

  .gsc-control-wrapper-cse {
    max-width: 800px;
    margin: 0 auto;

    .gsc-results-wrapper-visible::before {
      content: 'Custom Search';
      font-weight: bold;
      display: block;
      color: ${props => props.theme.colors.brand};
      width: 100%;
      padding: 10px 0;
      background: url('http://www.google.com/cse/static/images/1x/googlelogo_lightgrey_46x16dp.png')
        left center no-repeat;
      text-indent: 50px;
    }

    .gsc-url-top,
    div.gs-per-result-labels {
      display: none;
    }

    div.gs-title {
      margin-bottom: 4px;
    }
  }

  .gsc-control-cse {
    font-family: Karmilla, sans-serif;

    .gs-spelling,
    .gs-result .gs-title,
    .gs-result .gs-title * {
      font-size: 1.125rem;
    }

    &,
    .gsc-table-result {
      font-size: 1rem;
    }
  }

  .gsc-webResult .gsc-result {
    padding-bottom: 15px;
  }

  .gsc-table-cell-thumbnail.gsc-thumbnail {
    display: none;
  }
`
