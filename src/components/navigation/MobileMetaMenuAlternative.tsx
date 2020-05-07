import React, { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'

interface MobileMetaMenuProps {
  links: MetaMenuEntry[]
  pagealias: string
}

interface MetaMenuEntry {
  title: string
  url: string
}

export default function MobileMetaMenu(props: MobileMetaMenuProps) {
  const activeRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && activeRef.current) {
      containerRef.current.scrollLeft = activeRef.current.offsetLeft - 8
    }
  })

  return (
    <>
      <StyledGradient />
      <StyledScrollMenu ref={containerRef}>
        {props.links.map((entry, i) => {
          const active = entry.url === props.pagealias
          return (
            <li
              ref={active ? activeRef : null}
              key={'metamobile' + entry.title}
            >
              <StyledLink active={active} href={entry.url}>
                {entry.title}
              </StyledLink>
              <StyledLink
                aria-hidden="true"
                spacer
                lastChild={i === props.links.length - 1}
              ></StyledLink>
            </li>
          )
        })}
      </StyledScrollMenu>
    </>
  )
}

const StyledLink = styled.a<{
  spacer?: boolean
  active?: boolean
  lastChild?: boolean
}>`
  text-decoration: none;
  /* line-height: 40px; */
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
  ${props =>
    props.active &&
    css`
      color: #333;
    `};
`

const StyledScrollMenu = styled.ul`
  font-size: 0.9rem;
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }

  @media (pointer: fine) {
  }

  list-style-type: none;
  padding: 0;
  margin: 20px 8px;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  border-radius: 10px;

  & li {
    display: inline-block;
  }

  border: 1px solid ${props => props.theme.colors.lightBlueBackground};
`

const StyledGradient = styled.div`
  background-color: red;
  position: absolute;
  pointer-events: none;
  right: 9px;
  margin-top: 26px;
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
`
