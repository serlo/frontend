import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { makeDefaultButton, makeMargin } from '../../helper/css'

export interface BreadcrumbsProps {
  entries?: BreadcrumbEntry[]
}

interface BreadcrumbEntry {
  label: string
  url: string
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { entries } = props
  if (!entries || entries.length < 1) {
    return null
  }

  return (
    <BreadcrumbWrapper>
      {entries.map((bcEntry, i, completeArray) => {
        return (
          <BreadcrumbEntries
            bcEntry={bcEntry}
            i={i}
            arrayLength={completeArray.length}
            key={i}
          ></BreadcrumbEntries>
        )
      })}
    </BreadcrumbWrapper>
  )
}

interface BradcrumbEntriesProps {
  bcEntry: BreadcrumbEntry
  i: number
  arrayLength: number
}

function BreadcrumbEntries(props: BradcrumbEntriesProps) {
  const { bcEntry, i, arrayLength } = props
  const maxItems = 4
  const overflow = arrayLength > maxItems
  const itemsToRemove = arrayLength - maxItems
  const ellipsesItem = overflow && i == 2

  if (overflow && i > 2 && i < 1 + itemsToRemove) return null
  if (arrayLength - itemsToRemove > 4 && i === 1) return null

  return arrayLength !== i + 1 ? (
    <>
      {ellipsesItem ? (
        <Breadcrumb>…</Breadcrumb>
      ) : (
        <Breadcrumb href={bcEntry.url}>{bcEntry.label}</Breadcrumb>
      )}
    </>
  ) : (
    <BreadcrumbLast href={bcEntry.url}>
      <Icon>
        <FontAwesomeIcon icon={faArrowCircleLeft} size="1x" />
      </Icon>
      {bcEntry.label}
    </BreadcrumbLast>
  )
}

const BreadcrumbWrapper = styled.nav`
  ${makeMargin}
  margin-top: 25px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin: 25px 0 45px 10px;
  }
`

const Breadcrumb = styled.a`
  display: inline-block;
  color: ${(props) => props.theme.colors.brand};

  ${makeDefaultButton}
  padding-top: 2px;
  padding-bottom: 2px;

  font-weight: normal;
  font-size: 1.125rem;
  align-items: center;

  &:not([href]),
  &:not([href]):hover {
    background: transparent;
    color: ${(props) => props.theme.colors.dark1};
    cursor: default;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
    font-size: 1.125rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    white-space: nowrap;
    margin: 0 19px 5px 0;

    &:after {
      content: '>';
      color: ${(props) => props.theme.colors.lightgray};
      position: absolute;
      margin-left: 12px;
    }
  }
`

const BreadcrumbLast = styled(Breadcrumb)`
  &:after {
    display: none;
  }

  background: ${(props) => props.theme.colors.bluewhite};
  color: ${(props) => props.theme.colors.brand};
  font-weight: bold;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: inline-flex;
    background: ${(props) =>
      transparentize(0.35, props.theme.colors.lightBlueBackground)};
    border-radius: 12px;
    padding-left: 4px;

    &:hover {
      background: ${(props) => transparentize(0.35, props.theme.colors.brand)};
      color: ${(props) => props.theme.colors.bluewhite};
    }
  }
`

const Icon = styled.span`
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
  margin-right: 10px;
`
