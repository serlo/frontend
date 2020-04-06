import React from 'react'
import styled from 'styled-components'
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

  // Experiment: "lazy load" scripts and build input on the fly when using the search for the first time
  // function activateSearch() {
  //   // setActive(true)

  //   if (!searchLoaded) {
  //     // var cx = '016022363195733463411:78jhtkzhbhc'
  //     var cx = '017461339636837994840:ifahsiurxu4' //current serlo search
  //     var gcse = document.createElement('script')
  //     gcse.type = 'text/javascript'
  //     gcse.async = true
  //     gcse.src = 'https://cse.google.com/cse.js?cx=' + cx
  //     var s = document.getElementsByTagName('script')[0]
  //     s.parentNode.insertBefore(gcse, s)

  //     setSearchLoaded(true)
  //   }

  //   checkElement('#gsc-i-id1').then(input => {
  //     input.focus()
  //     input.addEventListener('input', function(e) {
  //       inputRef.current.value = e.target.value
  //     })
  //     setSearchActive(true)
  //     // setActive(true)
  //   })
  // }

  // function onFocus() {
  //   activateSearch()
  //   setFocused(true)
  // }

  function onChange(e) {
    setValue(e.target.value)
    const input = document.getElementById('gsc-i-id1') as HTMLInputElement
    input.value = e.target.value
  }
  return (
    <>
      <SearchForm id="searchform">
        {/* <Settings
          onClick={e => {
            e.preventDefault()
            setShowSettings(!showSettings)
          }}
        >
          <FontAwesomeIcon icon={faSlidersH} size="lg" />
        </Settings> */}
        <div
          className="gcse-searchbox"
          data-autocompletemaxcompletions="5"
        ></div>
      </SearchForm>

      <SearchResultsWrap>
        <div className="gcse-searchresults"></div>
      </SearchResultsWrap>
      {/* {showSettings && (
        <SearchSettings>Hier kommen Sucheinstellungen hin</SearchSettings>
      )} */}
    </>
  )
}

// const SearchSettings = styled.div`
//   text-align: center;
//   padding: 30px;
//   background-color: ${props => lighten(0.1, props.theme.colors.lighterblue)};
//   border-top: thin solid ${props => props.theme.colors.brand};
// `

const SearchForm = styled.div`
  #___gcse_0,
  & > div {
    /* display: none; */
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
    /* opacity: 1; */
    background-color: white;
    border: 0;
    /* padding-top: 0;
    padding-left: 0;
    padding-bottom: 0; */
    padding: 0;
    /* position: absolute; */
    z-index: 20;
    /* display: none; */
  }

  input.gsc-input {
    background: transparent !important;

    &, &::placeholder {
      font-size: 1rem !important;
      ${inputFontReset}
      font-weight: bold;
      color: ${props => props.theme.colors.brand};
      font-size: 1rem !important;
      text-indent: 0 !important;
    }

    &::placeholder {
      text-indent: 50px !important;
    }
  }

  .gsib_a {
    padding: 0;
  }

  form.gsc-search-box,
  table.gsc-search-box {
    margin-bottom: 0 !important;
  }
/* 
  .gsc-results-wrapper-overlay {
    top: 220px;
  }

  .gsc-modal-background-image {
    top: 210px;
    opacity: 1;
  } */

  .gsc-search-button {

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

    & > svg {
      width: 19px;
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
  min-height: 38px;

  &:focus-within {
    background-color: ${props => lighten(0.1, props.theme.colors.lighterblue)};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-left: 16px;
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
  .gsc-control-wrapper-cse {
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
  }
`
