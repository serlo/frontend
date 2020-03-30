import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { makePadding } from '../../helper/csshelper'

export default function SearchInput(props) {
  const { value } = props

  const [focused, setFocused] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const inputRef = React.useRef(null)

  function onButtonClick(e: React.MouseEvent) {
    e.preventDefault()

    if (focused && inputRef.current.value.length > 0)
      alert('sending:' + inputRef.current.value)

    inputRef.current.focus()
  }

  return (
    <>
      <SearchForm id="searchform" name="searchform">
        {/* <Settings
          onClick={e => {
            e.preventDefault()
            setShowSettings(!showSettings)
          }}
        >
          <FontAwesomeIcon icon={faSlidersH} size="lg" />
        </Settings> */}

        <_Input
          type="search"
          name="searchtext"
          ref={inputRef}
          placeholder="Suche"
          aria-label="Alle Inhalte durchsuchen"
          value={value}
          focused={focused}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
          }}
        />
        <_Button
          onMouseDown={e => e.preventDefault()}
          onClick={onButtonClick}
          type="submit"
          focused={focused}
        >
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </_Button>
      </SearchForm>
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

const SearchForm = styled.form`
  background-color: ${props => lighten(0.1, props.theme.colors.lighterblue)};
  display: flex;
  justify-content: center;
  transition: background-color 0.4s ease;

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

// const Settings = styled.button`
//   width: 45px;
//   height: 40px;
//   background-color: transparent;
//   border: none;
//   color: ${props => lighten(0.5, props.theme.colors.darkgray)};
//   cursor: pointer;
// `

const _Button = styled.button<{ focused: boolean }>`
  background-color: ${props =>
    props.focused
      ? props.theme.colors.brand
      : lighten(0.1, props.theme.colors.lighterblue)};
  transition: background-color 0.2s ease-in;

  color: ${props => (props.focused ? 'white' : props.theme.colors.brand)};
  height: 40px;
  min-width: 40px;
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  font-size: 0.8em;

  &:hover {
    background-color: ${props => props.theme.colors.brand};
    color: white;
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    color: white;
    min-width: 35px;
    height: 35px;
    border-radius: 17px;
  }
`
const _Input = styled.input<{ focused: boolean }>`
  color: ${props => props.theme.colors.brand};
  font-weight: bold;
  font-size: 1em;
  padding-left: 50px;
  padding-right: 7px;

  background-color: transparent;

  flex-grow: 1;
  flex-shrink: 1;
  width: 100px;

  border: 0;
  outline: none;

  cursor: ${props => (props.focused ? 'auto' : 'pointer')};

  &::placeholder {
    color: ${props => props.theme.colors.brand};
  }

  ::-webkit-input-placeholder{opacity:1}
  ::-moz-placeholder{opacity:1}
  :-ms-input-placeholder{opacity:1}


  &:focus::placeholder {
    opacity: 0;
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
    padding-left: 12px;
    padding-right: 6px;
    width: 96px;
    &::placeholder {
      color: ${props => props.theme.colors.lightblue};
      text-align: right;
    }
  }
`
