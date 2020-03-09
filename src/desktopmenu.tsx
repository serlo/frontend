import styled from 'styled-components'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import onClickOutside from 'react-onclickoutside'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function Menu(props) {
  const { links } = props
  return (
    <ResponsiveNav>
      <List>
        {links.map((link, index) => (
          <Entry link={link} key={index} />
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
  const { link } = props
  const [isOpen, setOpen] = React.useState(false)
  const hasChildren = link.children !== undefined
  return (
    <Li>
      <Link
        onMouseDown={!isOpen ? () => setOpen(!isOpen) : undefined}
        active={isOpen && hasChildren}
      >
        {link.title} {hasChildren && <FontAwesomeIcon icon={faCaretDown} />}
      </Link>
      {isOpen && link.children && (
        <SubMenu
          children={link.children}
          onClose={() => {
            setOpen(false)
          }}
        />
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
`

// improve this one day
const SubMenuInner: any = props => {
  const { children, onClose } = props
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

const SubMenu = onClickOutside(SubMenuInner, {
  handleClickOutside: () => SubMenuInner.handleClickOutside
})

const SubList = styled.ul`
  position: absolute;
  background-color: white;
  padding: 1rem 0.5rem 0.5rem;
  margin: 0;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  display: block;
  overflow: auto;
  z-index: 5;
  list-style-type: none;
`

const SubLi = styled.li`
  margin-bottom: 0.6rem;
`
