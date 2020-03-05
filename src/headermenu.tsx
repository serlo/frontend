import styled from 'styled-components'
import * as React from 'react'
import { StyledIcon } from './icon'

export default function Menu(props) {
  return (
    <List className={props.className}>
      {props.links.map((entry, index) => {
        return <Entry entry={entry} />
      })}
    </List>
  )
}

const Entry = props => {
  const { entry } = props
  const [isOpen, setOpen] = React.useState(false)
  return (
    <>
      <Li>
        <Link onClick={() => setOpen(!isOpen)}>
          {entry.title}
          {entry.children && <StyledIcon src={'/img/caret-down.svg'} />}
        </Link>
        {isOpen && entry.children && (
          <SubMenu>
            <SubList>
              {entry.children.map((entry, index) => {
                return (
                  <SubLi>
                    <Link>{entry.title}</Link>
                  </SubLi>
                )
              })}
            </SubList>
          </SubMenu>
        )}
      </Li>
    </>
  )
}

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: right;
  user-select: none;
`

const Li = styled.li`
  display: inline-block;
  cursor: pointer;
`
const Link = styled.a`
  margin-right: 0.6rem;
  font-weight: bold;
  text-align: right;
  font-size: 1rem;
  color: rgb(82, 166, 208);
  margin-right: 0.6rem;
  font-weight: bold;
  text-align: right;
  box-shadow: none;
  width: auto;
  height: auto;
  padding: 0.2em 0.4em;
  transition: all 0.2s ease-in-out 0s;
  :hover,
  :active {
    color: rgb(33, 37, 41);
  }
`

const SubMenu = styled.div`
  position: absolute;
`
const SubList = styled.ul`
  background-color: rgb(255, 255, 255);
  padding: 1rem 0.5rem 0.5rem;
  margin: 0px;
  list-style-type: none;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  display: block;
  overflow: auto;
`

const SubLi = styled.li`
  margin-bottom: 0.6rem;
`

/*.Collapsible__trigger.is-open li a {
    background: transparentizeColor('brand', 0.8);
  }*/
