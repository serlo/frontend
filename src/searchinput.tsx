import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SearchInput = props => {
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef(null)

  function onButtonClick(e: React.MouseEvent) {
    e.preventDefault()

    if (focused && inputRef.current.value.length > 0)
      alert('sending:' + inputRef.current.value)

    inputRef.current.focus()
  }

  return (
    <_Wrap id="searchform" name="searchform">
      <_Input
        type="text"
        name="searchtext"
        ref={inputRef}
        placeholder="Suche"
        aria-label="Suche"
        value={props.value}
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
        <FontAwesomeIcon icon="search" />
      </_Button>
    </_Wrap>
  )
}

const _Wrap = styled.form`
  background-color: rgb(186, 219, 238)};
  width: 100%;
  display: flex;
  margin-top: 0;
  transition: background-color 0.4s ease;

  &:focus-within {
    background-color: rgb(186, 219, 238);
  }

  @media (min-width: 52rem) {
    width: 7rem;
    position: absolute;
    top: 7.95rem;
    right: 2rem;
    background-color: transparent;
    border-radius: 1.1rem;
    height: 2.2rem;
    margin-top: 0;

    transition: all 0.4s ease;

    &:focus-within {
      width: 12rem;
      background-color: rgb(186, 219, 238);
    }
  }

  @media (min-width: 75rem) {
    right: 1.7rem;
    margin-top: -0.3rem;
    margin-left: auto;
  }
`
const _Button = styled.button<any>`
  background-color: ${props =>
    props.focused ? 'rgb(0, 126, 193)' : 'rgb(186, 219, 238)'};
  transition: background-color 0.2s ease-in;
  min-width: 2.5rem;
  height: 2.5rem;
  border: 0;
  color: rgb(0, 126, 193);
  color: ${props => (props.focused ? '#fff' : 'rgb(0, 126, 193)')};
  border-radius: 0;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 126, 193);
    color: #fff;
  }

  @media (min-width: 52rem) {
    color: #fff;
    top: 0;
    padding: 0.1rem 0 0 0.1rem;
    min-width: 2.2rem;
    height: 2.2rem;
    border-radius: 1.1rem;
  }
`
const _Input = styled.input<any>`
  color: rgb(0, 126, 193);
  font-weight: bold;
  width: calc(100% - 3rem);
  background-color: transparent;
  border: 0;
  /* height: 2.5rem; */
  padding-left: 3rem;
  outline: none;
  cursor: ${props => (props.focused ? 'auto' : 'pointer')};

  &::placeholder {
    color: rgb(0, 126, 193);
    outline: none;
  }

  &:focus::placeholder {
    opacity: 0;
  }

  @media (min-width: 52rem) {
    padding: 0 0 0 0.8rem;
    margin-top: -0.2rem;
    &::placeholder {
      color: rgb(186, 219, 238);
      text-align: right;
      padding-right: 1rem;
      margin-top: -0.1rem;
    }
  }
`
