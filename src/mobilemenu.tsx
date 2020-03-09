import styled from 'styled-components'
import { transparentize } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function MobileMenu(props) {
  const { links } = props
  return (
    <List>
      {links.map((entry, index) => (
        <Entry key={index} {...entry} />
      ))}
    </List>
  )
}

function Entry(props) {
  const { url, title, childKey, icon, isChild, children } = props
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <li>
        <EntryLink
          key={childKey}
          href={url}
          onClick={
            children
              ? e => {
                  setOpen(!open)
                  e.preventDefault()
                }
              : undefined
          }
          isChild={isChild}
        >
          {!isChild ? (
            <IconWrapper>
              <FontAwesomeIcon
                icon={icon ? icon : faBars}
                size="1x"
                style={{ fontSize: '1.3em' }}
              />
            </IconWrapper>
          ) : null}
          <EntryLinkText isChild={isChild}>
            {title}
            {children ? (
              <span>
                {' '}
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            ) : null}
          </EntryLinkText>
        </EntryLink>
      </li>
      {open &&
        children &&
        children.map((entry, index) => (
          <Entry {...entry} isChild={true} key={index + '--' + childKey} />
        ))}
    </>
  )
}

const EntryLinkText = styled.span<{ isChild?: boolean }>`
  display: inline-block;
  vertical-align: middle;
  margin-top: ${props => (props.isChild ? '0' : '1.1rem')};
`

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  .Collapsible__trigger.is-open li a {
    background: ${props => transparentize(0.8, props.theme.colors.brand)};
  }
`

const Seperator = styled.li`
  height: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.lighterblue};
`

const EntryLink = styled.a<{ isChild?: boolean }>`
  background-color: ${props => props.theme.colors.bluewhite};
  display: flex;
  align-items: start;
  padding: 1em;
  color: ${props => props.theme.colors.brand};
  border-bottom: 1px solid;
  border-color: ${props => props.theme.colors.lighterblue};
  font-weight: bold;
  text-decoration: none;
  font-size: ${props => props => (props.isChild ? '1rem' : '1.33rem')};

  &:hover,
  &:focus,
  &:active {
    background: ${props => transparentize(0.8, props.theme.colors.brand)};
  }
`

const IconWrapper = styled.div`
  width: 2.5em;
  height: 2.5em;
  background-color: #d7ebf4;
  border-radius: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.lightblue};
  text-align: center;
  margin-right: 1em;
`
