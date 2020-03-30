import * as React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

interface BreadcrumbProps {
  entries?: BreadcrumbEntry[]
}

interface BreadcrumbEntry {
  label: string
  url: string
}

export default function Breadcrumbs(props: BreadcrumbProps) {
  const { entries } = props
  if (!entries || entries.length < 2) {
    return null
  }

  /*
  should probably happen on server side, last entry of Breadcrumbs should link to overview
  at least on mobile but probably on larger screens too.
  */

  const filteredEntries = entries.slice(0,entries.length - 1)

  return (
    <BreadcrumbWrapper>
      {filteredEntries.map((bcEntry, i, l) => {
        return (
          <BreadcrumbEntries
            bcEntry={bcEntry}
            i={i}
            l={l}
            key={i}
          ></BreadcrumbEntries>
        )
      })}
    </BreadcrumbWrapper>
  )
}

function BreadcrumbEntries(props) {
  const { bcEntry, i, l } = props

  //should probably happen on server side, don't show "all topics"
  if (i == 1) return null

  const overflow = l.length > 5
  const itemsToRemove = l.length - 5
  const ellipsesItem = overflow && i == 2

  if (overflow && i > 2 && i < 1 + itemsToRemove) return null

  return l.length !== i + 1 ? (
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
  margin: 25px 10px 0 10px;
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 45px;
  }
`

const Breadcrumb = styled.a`
  display: inline-block;
  border-radius: 5px;
  color: ${props => props.theme.colors.brand};
  font-weight: normal;
  text-decoration: none;
  font-size: 1.125rem;
  padding: 2px 6px;
  align-items: center;

  &[href]:hover {
    background: ${props => transparentize(0.35, props.theme.colors.brand)};
    color: ${props => props.theme.colors.bluewhite};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
    font-size: 1.25rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    white-space: nowrap;
    margin: 0 12px 0 0;

    &:after {
      content: '>';
      color: ${props => props.theme.colors.lightgray};
      position: absolute;
      margin-left: 8px;
    }
  }
`

const BreadcrumbLast = styled(Breadcrumb)`
  &:after {
    display: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: inline-flex;
    background: ${props =>
      transparentize(0.35, props.theme.colors.lightBlueBackground)};
    border-radius: 12px;
    padding-left: 4px;

    &:hover {
      background: ${props => transparentize(0.35, props.theme.colors.brand)};
      color: ${props => props.theme.colors.bluewhite};
    }
  }
`

const Icon = styled.span`
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
  margin-right: 10px;
`
