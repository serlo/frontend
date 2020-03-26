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
  if( i == 1 ) return null

  //TODO: Consider max number of items to display.
  //const entryLabel = (l.length > 4 && i == 2) ? '…' : bcEntry.label
  //if( l.length > 4 && i > 1 && i < l.length - 1 ) return null

  return l.length !== i + 1 ? (
    <>
      <Breadcrumb href={bcEntry.url}>{bcEntry.label}</Breadcrumb>
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

const BreadcrumbWrapper = styled.div`
  margin: 10px;
`

const Breadcrumb = styled.a`

  display: inline-block;
  border-radius: 5px;
  color: ${props => props.theme.colors.brand};
  font-weight: normal;
  text-decoration: none;
  font-size: 20px;
  margin: 0 20px 0 0;
  padding: 2px 6px;
  white-space: nowrap;

  &:hover {
    background: ${props => transparentize(0.35, props.theme.colors.brand)};
    color: ${props => props.theme.colors.bluewhite};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    &:after {
      content: ">";
      color: ${props => props.theme.colors.lightgray};
      position: absolute;
      margin-left: 13px
    }
  }
`

const BreadcrumbLast = styled(Breadcrumb)`

  &:after {
    display: none !important;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: inline-flex;
    background: ${props =>
      transparentize(0.35, props.theme.colors.lightBlueBackground)};
    border-radius: 12px;
    padding-left: 4px;
    margin-top: 8px;

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
