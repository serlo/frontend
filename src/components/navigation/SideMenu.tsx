import React from 'react'
import styled from 'styled-components'

export default function SideMenu(props) {
  const { links } = props

  return (
    <SideMenuWrapper>
      {links.map(entry => (
        <p key={entry.url}>
          <a href={entry.url}>{entry.title}</a>
        </p>
      ))}
    </SideMenuWrapper>
  )
}

const SideMenuWrapper = styled.div`
  display: none;
  width: 200px;
  flex-shrink: 0;
  margin-right: 30px;
  background-color: lightgreen;
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }
`

export const SideMenuBalancer = styled.div`
  display: none;
  width: 200px;
  flex-shrink: 1;
  flex-grow: 0;
  margin-left: 30px;
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }
`
