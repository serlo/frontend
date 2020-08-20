import React from 'react'
import styled from 'styled-components'

import { Link } from '../link'
import { makeMargin } from '@/helper/css'

interface ExerciseNumberingProps {
  index: number
  isChild?: boolean
  entityId: number
}

export function ExerciseNumbering({
  index,
  isChild,
  entityId,
}: ExerciseNumberingProps) {
  if (!Number.isInteger(index)) return null

  const url = `/${entityId}`

  if (isChild) {
    const char = String.fromCharCode(97 + index)
    return <StyledNumberChild href={url}>{char}</StyledNumberChild>
  }

  return <StyledNumberParent href={url}>{index + 1}</StyledNumberParent>
}

const StyledNumberParent = styled(Link)`
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

  &:hover {
    text-decoration: none;
    background-color: ${(props) => props.theme.colors.lighterblue};
  }
`

const StyledNumberChild = styled(Link)`
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

  &:hover {
    text-decoration: none;
    background-color: ${(props) => props.theme.colors.brand};
    color: #fff;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    position: absolute;
    margin-top: -4px;
    margin-left: -42px;
  }
`
