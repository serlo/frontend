import React from 'react'
import styled from 'styled-components'

export default function MobileMetaMenu(props) {
  const { links } = props

  return (
    <MobileMenuWrapper>
      {links.map(entry => (
        <a href={entry.url} key={entry.url}>
          {entry.title}
        </a>
      ))}
    </MobileMenuWrapper>
  )
}

const MobileMenuWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: lightsteelblue;
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
  & a {
    margin-right: 10px;
  }
`
