import styled from 'styled-components'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import onClickOutside from 'react-onclickoutside'

export function Menu(props) {
  const { className, links } = props
  return (
    <nav className={className}>
      <List className={className}>
        {links.map((link, index) => (
          <Entry link={link} key={index} />
        ))}
      </List>
    </nav>
  )
}

const List = styled.ul`
  text-align: right;
  user-select: none;
`

const Entry = props => {
  const { link } = props
  const [isOpen, setOpen] = React.useState(false)
  const hasChildren = link.children !== undefined
  return (
    <Li>
      <Link
        onMouseDown={!isOpen ? () => setOpen(!isOpen) : undefined}
        active={isOpen && hasChildren}
      >
        {link.title} {hasChildren && <FontAwesomeIcon icon="caret-down" />}
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
const Link = styled.a<any>`
  color: ${props =>
    props.theme.colors[props.active ? 'darkgray' : 'lightblue']};

  :active,
  :hover {
    color: ${props => props.theme.colors.darkgray};
  }

  padding: 0.2em 0.4em;
  margin-right: 0.6rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out 0s;
`

const SubMenuInner: any = props => {
  const { children, onClose } = props
  SubMenuInner.handleClickOutside = onClose
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
`

const SubLi = styled.li`
  margin-bottom: 0.6rem;
`
