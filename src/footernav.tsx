import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  padding: 0 15px 24px;
  background-color: ${props => props.theme.colors.lightBackground};
`

const FooterNavContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const ColWithPadding = styled.div`
  padding-right: 16px;
  box-sizing: border-box;
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-grow: 1;
    flex-basis: 0;
  }
  @media (max-width: ${props =>
    props.theme.breakpoints.lg}) and (min-width: ${props =>
  props.theme.breakpoints.md}){
    flex-basis: 50%;
    max-width: 50%;
  }
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-basis: 100%
    max-width: 100%;
  }
`

const CategoryHeader = styled.h3`
  font-size: 1rem;
  margin-bottom: 8px;
  color: #444;
`

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  line-height: 1.35;
`

const NavLi = styled.li`
  display: inline;

  &:after {
    content: ' • ';
    color: #ccc;
    margin-right: 3px;
  }
  &:last-child:after {
    content: '';
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
    margin-top: 5px;
    &:after {
      display: none;
      content: '';
    }
  }
`

const NavLink = styled.a`
  color: #888;
  text-decoration: none;

  &:focus {
    text-decoration: none;
    color: #888;
  }
  &:hover {
    color: ${props => props.theme.colors.darkGray};
    border-bottom: 2px solid #ccc;
  }
  &:hover,
  &:active {
    text-decoration: none;
  }
`
