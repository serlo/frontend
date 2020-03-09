import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchInput(props) {
  const { value } = props

  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef(null)

  function onButtonClick(e: React.MouseEvent) {
    e.preventDefault()

    if (focused && inputRef.current.value.length > 0)
      alert('sending:' + inputRef.current.value)

    inputRef.current.focus()
  }

  return (
    <SearchForm id="searchform" name="searchform">
      <_Input
        type="text"
        name="searchtext"
        ref={inputRef}
        placeholder="Suche"
        aria-label="Suche"
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
  )
}

const SearchForm = styled.form`
  background-color: ${props => lighten(0.1, props.theme.colors.lighterblue)};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    position: absolute;
    top: 8rem;
    right: 2rem;
    height: 2.2rem;
    width: 14rem;
    background-color: transparent;
    border-radius: 1.1rem;
    transition: all 0.4s ease;
    justify-content: flex-end;
  }

  width: 100%;
  display: flex;
  justify-content: center;
  transition: background-color 0.4s ease;

  &:focus-within {
    background-color: ${props => lighten(0.1, props.theme.colors.lighterblue)};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    right: 1.7rem;
    margin-top: -0.3rem;
    margin-left: auto;
  }
`

const _Button = styled.button<{ focused: boolean }>`
  background-color: ${props =>
    props.focused
      ? props.theme.colors.brand
      : lighten(0.1, props.theme.colors.lighterblue)};
  transition: background-color 0.2s ease-in;

  color: ${props => (props.focused ? 'white' : props.theme.colors.brand)};

  height: 2.5rem;
  min-width: 2.5rem;

  border: 0;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.brand};
    color: white;
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    color: white;
    padding: 0.1rem 0 0 0.1rem;
    min-width: 2.2rem;
    height: 2.2rem;
    border-radius: 1.1rem;
  }
`
const _Input = styled.input<{ focused: boolean }>`
  color: ${props => props.theme.colors.brand};
  font-weight: bold;
  font-size: 1.15em;

  background-color: transparent;

  flex-grow: 1;

  border: 0;
  outline: none;

  margin-left: 3rem;
  cursor: ${props => (props.focused ? 'auto' : 'pointer')};

  &::placeholder {
    color: ${props => props.theme.colors.brand};
  }

  &:focus::placeholder {
    opacity: 0;
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
    padding-left: 0.5rem;
    padding-right: 0.4rem;
    width: 6rem;
    ::placeholder {
      color: ${props => props.theme.colors.lightblue};
      text-align: right;
    }
  }
`
