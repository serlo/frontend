import React from 'react'
import styled, { css } from 'styled-components'
import { makeDefaultButton } from '../../helper/csshelper'

interface MetaMenuProps {
  links: MetaMenuLink[]
  pagealias: string
}

interface MetaMenuLink {
  title: string
  url: string
}

export default function MetaMenu(props: MetaMenuProps) {
  const { links, pagealias } = props

  return (
    <MetaMenuWrapper>
      <List>
        {links.map((entry, i) => (
          <Li key={entry.url}>
            <Link href={entry.url}>
              <ButtonStyle active={pagealias === entry.url}>
                {entry.title}
              </ButtonStyle>
            </Link>
          </Li>
        ))}
      </List>
    </MetaMenuWrapper>
  )
}

const MetaMenuWrapper = styled.nav`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    position: absolute;
    z-index: 2;
    display: block;
    left: ${props => props.theme.defaults.sideSpacingMobile};

    width: 170px;
    margin-right: 30px;
    margin-top: 33px;
  }

  @media (min-width: 1300px) {
    width: 200px;
    left: ${props => props.theme.defaults.sideSpacingLg};
  }
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Li = styled.li``

const Link = styled.a`
  display: block;
  padding-bottom: 14px;
`

const ButtonStyle = styled.span<{ active?: boolean }>`
  ${makeDefaultButton}
  font-weight: bold;
  padding: 3px 7px;
  border-radius: 12px;
  ${Link}:hover & {
    color: #fff;
    background-color: ${props => props.theme.colors.brand};
  }

  ${props =>
    props.active &&
    css`
      &,
      &:hover,
      ${Link}:hover & {
        color: #333;
        background-color: ${props => props.theme.colors.lightBlueBackground};
      }
    `};
`
