import React, { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { makeDefaultButton } from '../../helper/csshelper'

interface MetaMenuProps {
  pagealias: string
  navigation: any
}

export default function MetaMenu(props: MetaMenuProps) {
  const { navigation, pagealias } = props

  const activeRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && activeRef.current) {
      containerRef.current.scrollLeft = activeRef.current.offsetLeft - 8
    }
  })

  return (
    <>
      <MetaMenuWrapper>
        <StyledGradient />
        <List ref={containerRef}>
          {navigation.map((entry, i) => {
            const active = entry.url === pagealias
            return (
              <Li key={entry.url} ref={active ? activeRef : null}>
                <Link href={entry.url}>
                  <ButtonStyle active={active}>{entry.title}</ButtonStyle>
                </Link>
                <Link
                  aria-hidden="true"
                  spacer
                  lastChild={i === navigation.length - 1}
                ></Link>
              </Li>
            )
          })}
        </List>
      </MetaMenuWrapper>
    </>
  )
}

const MetaMenuWrapper = styled.nav`
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    z-index: 2;
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;

    margin: 20px 8px;

    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    border-radius: 10px;

    & li {
      display: inline-block;
    }

    border: 1px solid ${props => props.theme.colors.lightBlueBackground};
  }
`

const Li = styled.li``

interface LinkProps {
  spacer?: boolean
  active?: boolean
  lastChild?: boolean
}

const Link = styled.a<LinkProps>`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    text-decoration: none;
    padding: 18px 7px;
    display: inline-block;
    font-weight: bold;
    color: ${props => props.theme.colors.brand};

    ${props =>
      props.spacer &&
      css`
        border-right: ${props.lastChild
          ? 'none'
          : `1px solid ${props.theme.colors.lightgray}`};
        vertical-align: middle;
        padding: 15px 0;
        padding-right: ${props.lastChild ? '20px' : '0'};
      `};
  }
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => (props.spacer ? 'none' : 'block')};
    padding-bottom: 14px;
  }
`

const ButtonStyle = styled.span<{ active?: boolean }>`
  ${props =>
    props.active &&
    css`
      &,
      &:hover,
      ${Link}:hover & {
        color: #333;
        @media (min-width: ${props => props.theme.breakpoints.md}) {
          background-color: ${props => props.theme.colors.lightBlueBackground};
        }
      }
    `};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    ${makeDefaultButton}
    font-weight: bold;
    padding: 3px 7px;
    border-radius: 12px;
    ${Link}:hover & {
      color: #fff;
      background-color: ${props => props.theme.colors.brand};
    }
  }
`

const StyledGradient = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    pointer-events: none;
    right: 9px;
    margin-top: 6px;
    z-index: 1;
    height: 44px;
    width: 65px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
`
