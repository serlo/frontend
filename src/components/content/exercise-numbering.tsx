import React from 'react'
import styled from 'styled-components'

interface ExerciseNumberingProps {
  index: number
}

export function ExerciseNumbering({ index }: ExerciseNumberingProps) {
  if (!Number.isInteger(index)) return null
  const number = Number.isInteger(index) ? `${index + 1} ` : ''
  return <StyledNumber>{number}</StyledNumber>
}

const StyledNumber = styled.span`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: block;
    position: absolute;
    margin-top: 2px;
    margin-left: -4.5rem;
    width: 3rem;
    font-size: 2rem;
    text-align: right;
    font-weight: bold;
    color: ${(props) => props.theme.colors.brand};
  }
`
