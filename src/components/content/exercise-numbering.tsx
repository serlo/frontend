import React from 'react'
import styled from 'styled-components'

import { makeMargin } from '@/helper/css'

interface ExerciseNumberingProps {
  index: number
  isChild?: boolean
}

export function ExerciseNumbering({ index, isChild }: ExerciseNumberingProps) {
  if (!Number.isInteger(index)) return null

  if (isChild) {
    const char = String.fromCharCode(97 + index)
    return <StyledNumberChild>{char}</StyledNumberChild>
  }

  return <StyledNumberParent>{index + 1}</StyledNumberParent>
}

const StyledNumberParent = styled.span`
  display: block;
  width: 3rem;
  height: 3rem;

  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  /* color: ${(props) => props.theme.colors.brand}; */
  color: #fff;
  background-color: ${(props) => props.theme.colors.brand};
  border-radius: 100%;
  box-sizing: border-box;
  padding-top: 0.3rem;

  ${makeMargin}
  margin-bottom: 20px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    position: absolute;
    margin-top: -10px;
    margin-left: -40px;
  }

    @media (min-width: ${(props) => props.theme.breakpoints.md}) {
      margin-left: -3.5rem;
    }
`

const StyledNumberChild = styled.span`
  display: block;
  width: 1.9rem;
  height: 1.9rem;

  font-size: 1.125rem;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.colors.brand};
  /* color: #fff; */
  background-color: ${(props) => props.theme.colors.lightBlueBackground};
  border-radius: 100%;
  box-sizing: border-box;
  padding-top: 0.22em;
  ${makeMargin}
  margin-bottom: 10px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    position: absolute;
    margin-top: 22px;
    margin-left: -42px;
  }
`
