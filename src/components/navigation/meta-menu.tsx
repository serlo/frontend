import { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { makeTransparentButton } from '../../helper/css'
import { Link } from '../content/link'
import { SecondaryNavigationData, SecondaryNavigationEntry } from '@/data-types'

export interface MetaMenuProps {
  data: SecondaryNavigationData
}

export function MetaMenu({ data }: MetaMenuProps) {
  const activeRef = useRef<HTMLLIElement>(null)
  const containerRef = useRef<HTMLUListElement>(null)

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
          {data.map((entry, i) => {
            return (
              <li key={entry.url} ref={entry.active ? activeRef : null}>
                {renderLink(entry, !!entry.active, i)}
              </li>
            )
          })}
        </List>
      </MetaMenuWrapper>
    </>
  )

  function renderLink(
    entry: SecondaryNavigationEntry,
    active: boolean,
    index: number
  ) {
    return (
      <StyledLink href={entry.url} active={active} path={[`metamenu${index}`]}>
        <ButtonStyle active={active}>{entry.title}</ButtonStyle>
      </StyledLink>
    )
  }
}

const MetaMenuWrapper = styled.nav`
  @media (max-width: ${(props) => props.theme.breakpointsMax.md}) {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    position: absolute;
    z-index: 2;
    left: ${(props) => props.theme.defaults.sideSpacingMobile};

    width: 170px;
    margin-right: 30px;
    margin-top: 33px;
  }

  @media (min-width: 1300px) {
    width: 200px;
    left: ${(props) => props.theme.defaults.sideSpacingLg};
  }
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakpointsMax.md}) {
    font-size: 0.9rem;

    padding: 12px 16px 0 16px;
    display: inline-block;
    white-space: nowrap;

    & li {
      display: inline-block;
    }
  }
`

interface LinkProps {
  spacer?: boolean
  active?: boolean
  lastChild?: boolean
}

const StyledLink = styled(Link)<LinkProps>`
  @media (max-width: ${(props) => props.theme.breakpointsMax.md}) {
    text-decoration: none !important;
    padding: 3px 0;
    margin-right: 1rem;
    display: inline-block;
    font-weight: bold;
    color: ${(props) => props.theme.colors.brand};
    border-bottom: 2px solid
      ${(props) =>
        props.active
          ? props.theme.colors.brand
          : props.theme.colors.lightBlueBackground};
  }
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: ${(props) => (props.spacer ? 'none' : 'block')};
    padding-bottom: 14px;
  }
`

const ButtonStyle = styled.span<{ active?: boolean }>`
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    ${makeTransparentButton}
    border-radius: 12px;
    ${StyledLink}:hover & {
      color: #fff;
      background-color: ${(props) => props.theme.colors.brand};
    }
    ${(props) =>
      props.active &&
      css`
        &,
        &:hover,
        ${StyledLink}:hover & {
          color: #333;
          @media (min-width: ${(props) => props.theme.breakpoints.md}) {
            background-color: ${(props) =>
              props.theme.colors.lightBlueBackground};
          }
        }
      `}
  }
`

const StyledGradient = styled.div`
  @media (max-width: ${(props) => props.theme.breakpointsMax.md}) {
    position: absolute;
    pointer-events: none;
    right: 0;
    z-index: 1;
    height: 58px;
    width: 60px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
`
