import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Tippy, { useSingleton } from '@tippyjs/react'

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
          <Link>
            {link.title} <FontAwesomeIcon icon={faCaretDown} />
          </Link>
        </Tippy>
      ) : (
        <Link href={link.url}>{link.title}</Link>
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
            <SubLink href={entry.url}>{entry.title}</SubLink>
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

const Link = styled.a<{ active?: boolean }>`
  color: ${props =>
    props.theme.colors[props.active ? 'darkgray' : 'lightblue']};

  transition: background-color 0.2s;

  &:active,
  &:hover,
  &[aria-expanded='true'] {
    color: #fff;
    background-color: ${props => props.theme.colors.brand};
  }

  text-decoration: none;

  display: block;
  margin: 11px 3px 0 3px;
  font-weight: bold;
  transition: all 0.2s ease-in-out 0s;
  border-radius: 80px;
  padding: 5px 9px;

  cursor: pointer;
`

const SubList = styled.ul`
  background-color: white;
  padding: 16px 8px 8px;
  margin: 0;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  display: block;
  overflow: auto;
  list-style-type: none;
  width: auto;
`

const SubLink = styled(Link)`
  padding-top: 6px;
  padding-bottom: 6px;

  &:hover {
    background: inherit;
    color: ${props => props.theme.colors.darkgray};
  }
`
