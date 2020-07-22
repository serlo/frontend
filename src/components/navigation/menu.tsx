import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy, { TippyProps, useSingleton } from '@tippyjs/react'
import React from 'react'
import styled, { css } from 'styled-components'

import { makeDefaultButton } from '../../helper/css'
import { Link } from '../content/link'
import { AuthPayload } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { HeaderData, HeaderLink } from '@/data-types'
import { getAuthLink, shouldUseNewAuth } from '@/helper/feature-auth'

export interface MenuProps {
  data: HeaderData
  auth: AuthPayload
}

export function Menu({ data, auth }: MenuProps) {
  const [source, target] = useSingleton()
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())
  const { strings } = useInstanceData()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  type TippyRoot = Parameters<NonNullable<TippyProps['onCreate']>>[0]
  const [tippyRoot, setTippyRoot] = React.useState<TippyRoot | null>(null)

  function onSubMenuInnerClick() {
    if (tippyRoot && tippyRoot !== undefined) tippyRoot.hide()
  }

  return (
    <ResponsiveNav>
      <Tippy
        singleton={source}
        placement="bottom-start"
        trigger="click mouseenter focus"
        hideOnClick
        interactive
        delay={[50, 0]}
        duration={[300, 100]}
        animation="fade"
        onCreate={(tip) => setTippyRoot(tip)}
      />
      <List>
        {data.map((link) => (
          <Entry
            link={link}
            key={link.title}
            target={target}
            onSubMenuInnerClick={onSubMenuInnerClick}
          />
        ))}
        {renderAuthMenu()}
      </List>
    </ResponsiveNav>
  )

  function renderAuthMenu() {
    const link = getAuthLink(
      mounted && auth !== null,
      strings.header.login,
      strings.header.logout
    )

    return (
      <Entry
        link={link}
        target={target}
        authMenuMounted={mounted}
        onSubMenuInnerClick={onSubMenuInnerClick}
      />
    )
  }
}

interface EntryProps {
  link: HeaderLink
  target: TippyProps['singleton']
  authMenuMounted?: boolean
  onSubMenuInnerClick: () => void
}

function Entry({
  link,
  target,
  onSubMenuInnerClick,
  authMenuMounted,
}: EntryProps) {
  const hasChildren = link.children !== undefined

  return (
    <Li show={authMenuMounted === undefined ? true : authMenuMounted}>
      {hasChildren ? (
        <Tippy
          content={
            <SubMenuInner
              onSubMenuInnerClick={onSubMenuInnerClick}
              subEntries={link.children}
            ></SubMenuInner>
          }
          singleton={target}
        >
          <StyledLink as="a" /*active={true}*/>
            {link.title} <FontAwesomeIcon icon={faCaretDown} />
          </StyledLink>
        </Tippy>
      ) : (
        <StyledLink /*active={true}*/ href={link.url}>{link.title}</StyledLink>
      )}
    </Li>
  )
}

interface SubMenuInnerProps {
  subEntries: HeaderLink[] | undefined
  onSubMenuInnerClick: () => void
}

function SubMenuInner({ subEntries, onSubMenuInnerClick }: SubMenuInnerProps) {
  return (
    <SubList>
      {subEntries !== undefined &&
        subEntries.map((entry) => {
          return (
            <li key={entry.title} onClick={onSubMenuInnerClick}>
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
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
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

const Li = styled.li<{ show: boolean }>`
  display: inline-block;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 0.7s linear;
`

const linkStyle = css`
  &:active,
  &:hover,
  &[aria-expanded='true'] {
    color: #fff;
    background-color: ${(props) => props.theme.colors.brand};
  }
  text-decoration: none !important;
`

const StyledLink = styled(Link)<{ active?: boolean }>`
  ${makeDefaultButton}
  ${linkStyle}
  color: ${(props) =>
    props.theme.colors[props.active ? 'darkgray' : 'lightblue']};

  background-color: ${(props) =>
    props.active ? props.theme.colors.lighterblue : 'inherit'};

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

const SubLink = styled(Link)`
  padding-top: 3px;
  padding-bottom: 3px;
  display: block;
  text-decoration: none;
  &:hover span {
    color: #fff;
    background-color: ${(props) => props.theme.colors.brand};
  }
`

const _Button = styled.span`
  text-decoration: none;
  ${linkStyle}
  ${makeDefaultButton}
  color: ${(props) => props.theme.colors.brand};
`
