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
        trigger="click"
        placement="bottom-start"
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

const Li = styled.li`
  display: inline-block;
`

const Link = styled.a<{ active?: boolean }>`
  color: ${props =>
    props.theme.colors[props.active ? 'darkgray' : 'lightblue']};

  &:active,
  &:hover {
    color: ${props => props.theme.colors.darkgray};
  }

  text-decoration: none;

  padding: 3px 6px;
  margin-right: 10px;
  font-weight: bold;
  transition: all 0.2s ease-in-out 0s;

  cursor: pointer;
`

function SubMenuInner(props) {
  const { children } = props
  return (
    <SubList>
      {children.map(entry => {
        return (
          <SubLi key={entry.title}>
            <Link href={entry.url}>{entry.title}</Link>
          </SubLi>
        )
      })}
    </SubList>
  )
}

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

const SubLi = styled.li`
  margin-bottom: 10px;
`
