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
  if (!entries || entries.length < 1) {
    return <p>""</p>
  }

  return (
    <BreadcrumbWrapper>
      {entries.map((bcEntry, i, l) => {
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
  return l.length !== i + 1 ? (
    <>
      <Breadcrumb href={bcEntry.url}>{bcEntry.label}</Breadcrumb>
      <Seperator>></Seperator>
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

const Seperator = styled.span`
  color: ${props => props.theme.colors.dark1};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const Breadcrumb = styled.a`
  border-radius: 5px;
  color: ${props => props.theme.colors.brand};
  font-weight: normal;
  text-decoration: none;
  font-size: 20px;
  margin: 0 7px 0 5px;
  padding: 2px 8px;

  &:hover {
    background: ${props => transparentize(0.35, props.theme.colors.brand)};
    color: ${props => props.theme.colors.bluewhite};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const BreadcrumbLast = styled(Breadcrumb)`
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: inline-flex;
    background: ${props =>
      transparentize(0.35, props.theme.colors.lightBlueBackground)};
    border-radius: 12px;
    padding-left: 2px;

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
