import styled from 'styled-components'
import React from 'react'
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
        duration={[null, null]}
      />
      <List>
        {links.map((link, index) => (
          <Entry link={link} key={index} target={target} />
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
        <Link>{link.title}</Link>
      )}
    </Li>
  )
}

const Li = styled.li`
  display: inline-block;
  cursor: pointer;
`
const Link = styled.a<{ active?: boolean }>`
  color: ${props =>
    props.theme.colors[props.active ? 'darkgray' : 'lightblue']};

  &:active,
  &:hover {
    color: ${props => props.theme.colors.darkgray};
  }

  padding: 0.2em 0.4em;
  margin-right: 0.6rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out 0s;

  cursor: pointer;
`

// improve this one day
function SubMenuInner(props) {
  const { children } = props
  return (
    <SubList>
      {children.map((entry, index) => {
        return (
          <SubLi key={index}>
            <Link>{entry.title}</Link>
          </SubLi>
        )
      })}
    </SubList>
  )
}

const SubList = styled.ul`
  background-color: white;
  padding: 1rem 0.5rem 0.5rem;
  margin: 0;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  display: block;
  overflow: auto;
  list-style-type: none;
  width: auto;
`

const SubLi = styled.li`
  margin-bottom: 0.6rem;
  cursor: default;
`
