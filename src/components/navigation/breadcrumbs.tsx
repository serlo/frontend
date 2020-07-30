import { faArrowCircleLeft, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { makeDefaultButton, makeMargin } from '../../helper/css'
import { Link } from '../content/link'
import { BreadcrumbsData, BreadcrumbEntry } from '@/data-types'

export interface BreadcrumbsProps {
  data: BreadcrumbsData
}

export function Breadcrumbs({ data }: BreadcrumbsProps) {
  if (!data || data.length < 1) {
    return null
  }

  return (
    <BreadcrumbWrapper>
      {data.map((bcEntry, i, completeArray) => {
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

function BreadcrumbEntries({ bcEntry, i, arrayLength }: BradcrumbEntriesProps) {
  if (bcEntry.ellipsis) {
    return <BreadcrumbLink as="span">…</BreadcrumbLink>
  } else {
    if (arrayLength !== i + 1) {
      return <BreadcrumbLink href={bcEntry.url}>{bcEntry.label}</BreadcrumbLink>
    } else
      return (
        <>
          <BreadcrumbLinkLast href={bcEntry.url}>
            <MobileIcon>
              <FontAwesomeIcon icon={faArrowCircleLeft} size="1x" />
            </MobileIcon>
            <DesktopIcon>
              <FontAwesomeIcon icon={faList} size="1x" />
            </DesktopIcon>
            {bcEntry.label}
          </BreadcrumbLinkLast>
        </>
      )
  }
}

const BreadcrumbWrapper = styled.nav`
  ${makeMargin}
  margin-top: 25px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin: 25px 0 45px 10px;
  }
`

const BreadcrumbLink = styled(Link)`
  display: inline-block;
  color: ${(props) => props.theme.colors.brand};

  ${makeDefaultButton}
  padding-top: 2px;
  padding-bottom: 2px;

  font-weight: normal;
  font-size: 1.125rem;
  align-items: center;
  text-decoration: none !important;

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

const BreadcrumbLinkLast = styled(BreadcrumbLink)`
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
  display: inline-block;
  margin-right: 4px;
  padding-top: 1px;
`

const MobileIcon = styled(Icon)`
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const DesktopIcon = styled(Icon)`
  display: none;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: inline-block;
    font-size: 1rem;
  }
`
