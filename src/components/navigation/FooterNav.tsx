import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import { makeResponsivePadding } from '../../helper/csshelper'

export interface NavChild {
  title: string
  url: string
  icon?: any
}
export interface NavEntry {
  title: string
  children: NavChild[]
}

export interface NavProps {
  navEntries: NavEntry[]
}

export function FooterNav(props: NavProps) {
  return (
    <FooterNavGrid>
      <nav>
        <FooterNavContainer>
          {props.navEntries.map((category, index) => {
            const children = category.children.map((link, childindex) => {
              return (
                <NavLi key={index + childindex}>
                  <NavLink href={link.url}>
                    {link.icon && (
                      <FontAwesomeIcon icon={link.icon} size="1x" />
                    )}{' '}
                    {link.title}
                  </NavLink>
                </NavLi>
              )
            })
            return (
              <ColWithPadding key={index}>
                <CategoryHeader>{category.title}</CategoryHeader>
                <NavList>{children}</NavList>
              </ColWithPadding>
            )
          })}
        </FooterNavContainer>
      </nav>
    </FooterNavGrid>
  )
}

const FooterNavGrid = styled.div`
  padding: 8px 0 40px;
  background-color: ${props => props.theme.colors.lightBackground};
`

const FooterNavContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const ColWithPadding = styled.div`
  margin-top: 16px;
  padding: 0;
  ${makeResponsivePadding}
  box-sizing: border-box;
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-grow: 1;
    flex-basis: 0;
  }
  @media (max-width: ${props =>
    props.theme.breakpoints.md}) and (min-width: ${props =>
  props.theme.breakpoints.sm}){
    flex-basis: 50%;
    max-width: 50%;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-basis: 100%;
    max-width: 100%;
  }
`

const CategoryHeader = styled.h3`
  font-size: 1rem;
  margin-bottom: 8px;
  color: ${props => lighten(0.05, props.theme.colors.dark1)};
`

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  line-height: 1.35;
`

const NavLi = styled.li`
  display: inline-block;

  &:after {
    content: ' • ';
    color: ${props => lighten(0.2, props.theme.colors.dark1)};
    margin-right: 6px;
  }
  &:last-child:after {
    content: '';
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
    margin-top: 2px;

    &:after {
      content: '';
      display: none;
    }
  }
`

const NavLink = styled.a`
  color: ${props => lighten(0.15, props.theme.colors.dark1)};
  text-decoration: none;

  &:focus {
    text-decoration: none;
    color: ${props => lighten(0.1, props.theme.colors.dark1)};
  }
  &:hover {
    color: ${props => props.theme.colors.darkGray};
    border-bottom: 2px solid ${props => lighten(0.2, props.theme.colors.dark1)};
  }
  &:hover,
  &:active {
    text-decoration: none;
  }
`
