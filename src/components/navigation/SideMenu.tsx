import React from 'react'
import styled, { css } from 'styled-components'
import { makeDefaultButton } from '../../helper/csshelper'
// import { useRouter } from 'next/router'

export default function SideMenu(props) {
  const { links } = props

  return (
    <SideMenuWrapper>
      <List>
        {links.map((entry, i) => {
          //TODO: build with server or useRouter (currently only router.pathname only returns ...slug )
          //const router = useRouter()
          //console.log(router.pathname)
          const active =
            process.browser && entry.url == window.location.pathname

          return (
            <Li key={entry.url}>
              <Link href={entry.url}>
                <ButtonStyle active={active}>{entry.title}</ButtonStyle>
              </Link>
            </Li>
          )
        })}
      </List>
    </SideMenuWrapper>
  )
}

const SideMenuWrapper = styled.nav`
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
