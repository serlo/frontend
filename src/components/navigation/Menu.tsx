import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Tippy, { useSingleton } from '@tippyjs/react'
import { makeDefaultButton } from '../../helper/csshelper'

export default function Menu(props) {
  const { links } = props
  const [source, target] = useSingleton()

  return (
    <ResponsiveNav>
      <Tippy
        singleton={source}
        placement="bottom-start"
        trigger="mouseenter focus click"
        interactive={true}
        delay={[50, 0]}
        duration={[300, 100]}
        animation="fade"
      />
      <List>
        {links.map(link => (
          <Entry link={link} key={link.title} target={target} />
        ))}
      </List>
    </ResponsiveNav>
  )
}

function Entry(props) {
  const { link, target } = props
  const hasChildren = link.children !== undefined

  return (
    <Li>
      {hasChildren ? (
        <Tippy
          content={<SubMenuInner children={link.children} />}
          singleton={target}
        >
          <Link /*active={true}*/>
            {link.title} <FontAwesomeIcon icon={faCaretDown} />
          </Link>
        </Tippy>
      ) : (
        <Link /*active={true}*/ href={link.url}>{link.title}</Link>
      )}
    </Li>
  )
}

function SubMenuInner(props) {
  const { children } = props
  return (
    <SubList>
      {children.map(entry => {
        return (
          <li key={entry.title}>
            <SubLink href={entry.url}>
              <_Button>{entry.title}</_Button>
            </SubLink>
          </li>
        )
      })}
    </SubList>
  )
}

const ResponsiveNav = styled.nav`
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const List = styled.ul`
  text-align: right;
  user-select: none;
  display: block;
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  display: inline-block;
`

const linkStyle = css`
  &:active,
  &:hover,
  &[aria-expanded='true'] {
    color: #fff;
    background-color: ${props => props.theme.colors.brand};
  }
  text-decoration: none;
`

const Link = styled.a<{ active?: boolean }>`
  ${makeDefaultButton}
  ${linkStyle}
  color: ${props =>
    props.theme.colors[props.active ? 'darkgray' : 'lightblue']};

  background-color: ${props =>
    props.theme.colors[props.active ? 'lighterblue' : 'inherit']};

  font-weight: bold;
  transition: all 0.3s ease-in-out 0s;
  display: block;
  margin: 11px 3px 0 3px;
`

const SubList = styled.ul`
  background-color: white;
  padding: 12px 15px 12px 10px;
  margin: 0;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  display: block;
  overflow: auto;
  list-style-type: none;
  width: auto;
  border-radius: 10px;
`

const SubLink = styled.a`
  padding-top: 3px;
  padding-bottom: 3px;
  display: block;
  text-decoration: none;
  &:hover span {
    color: #fff;
    background-color: ${props => props.theme.colors.brand};
  }
`

const _Button = styled.span`
  text-decoration: none;
  ${linkStyle}
  ${makeDefaultButton}
  color: ${props => props.theme.colors.brand};
`
