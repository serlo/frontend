import { faArrowCircleLeft, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transparentize } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

import { Link } from '../content/link'
import { BreadcrumbsData, BreadcrumbEntry } from '@/data-types'
import { makeTransparentButton, makeMargin } from '@/helper/css'

export interface BreadcrumbsProps {
  data?: BreadcrumbsData
  isTaxonomy: boolean
}

export function Breadcrumbs({ data, isTaxonomy }: BreadcrumbsProps) {
  if (!data || data.length < 1) {
    return <BreadcrumbWrapper> </BreadcrumbWrapper>
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
            isTaxonomy={isTaxonomy}
          />
        )
      })}
    </BreadcrumbWrapper>
  )
}

interface BradcrumbEntriesProps {
  bcEntry: BreadcrumbEntry
  i: number
  arrayLength: number
  isTaxonomy: boolean
}

function BreadcrumbEntries({
  bcEntry,
  i,
  arrayLength,
  isTaxonomy,
}: BradcrumbEntriesProps) {
  if (bcEntry.ellipsis) {
    return <BreadcrumbLink as="span">…</BreadcrumbLink>
  } else {
    if (arrayLength !== i + 1) {
      return (
        <BreadcrumbLink href={bcEntry.url ?? undefined}>
          {bcEntry.label}
        </BreadcrumbLink>
      )
    } else
      return (
        <>
          <BreadcrumbLinkLast
            href={bcEntry.url ?? undefined}
            isTaxonomy={isTaxonomy}
          >
            <MobileIcon>
              <FontAwesomeIcon icon={faArrowCircleLeft} size="1x" />
            </MobileIcon>
            {!isTaxonomy && (
              <DesktopIcon>
                <FontAwesomeIcon icon={faList} size="1x" />
              </DesktopIcon>
            )}
            {bcEntry.label}
          </BreadcrumbLinkLast>
        </>
      )
  }
}

const BreadcrumbWrapper = styled.nav`
  ${makeMargin};
  margin-top: 25px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin: 25px 0 45px 10px;
  }
`

const BreadcrumbLink = styled(Link)`
  display: inline-block;
  color: ${(props) => props.theme.colors.brand};

  ${makeTransparentButton};
  padding-top: 2px;
  padding-bottom: 2px;

  font-weight: normal;
  align-items: center;

  &:not([href]),
  &:not([href]):hover {
    background: transparent;
    color: ${(props) => props.theme.colors.dark1};
    cursor: default;
  }

  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    display: none;
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

const BreadcrumbLinkLast = styled(BreadcrumbLink)<{ isTaxonomy: boolean }>`
  &:after {
    display: none;
  }

  ${(props) =>
    !props.isTaxonomy &&
    css`
      background: ${(props) => props.theme.colors.bluewhite};
      font-weight: bold;
    `};

  color: ${(props) => props.theme.colors.brand};

  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
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
