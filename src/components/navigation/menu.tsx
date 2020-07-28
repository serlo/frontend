import { faCaretDown, faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy, { TippyProps, useSingleton } from '@tippyjs/react'
import dynamic from 'next/dynamic'
import React from 'react'
import styled, { css } from 'styled-components'

import { Link } from '../content/link'
import { UnreadNotificationsCountProps } from './unread-notifications-count'
import { AuthPayload } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { HeaderData, HeaderLink } from '@/data-types'
import { makeDefaultButton } from '@/helper/css'
import { getAuthData, shouldUseNewAuth } from '@/helper/feature-auth'

const UnreadNotificationsCount = dynamic<UnreadNotificationsCountProps>(() =>
  import('./unread-notifications-count').then(
    (mod) => mod.UnreadNotificationsCount
  )
)

// Only show some icons on full menu
const menuIconMapping = {
  subject: undefined,
  about: undefined,
  participate: undefined,
  community: undefined,
  donate: undefined,
  login: undefined,
  user: faUser,
  notifications: faBell,
}

export interface MenuProps {
  data: HeaderData
  auth: AuthPayload
}

export function Menu({ data, auth }: MenuProps) {
  const [source, target] = useSingleton()
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

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
    const data = getAuthData(
      mounted && auth !== null,
      strings.header.login,
      loggedInData?.authMenu
    )

    // render placeholder while data is loading
    if (!data)
      return (
        <Entry
          link={{
            url: '/auth/login',
            title: strings.header.login,
            icon: 'user',
          }}
          target={target}
          authMenuMounted={false}
          onSubMenuInnerClick={onSubMenuInnerClick}
        />
      )

    return data.map((link, i) => {
      return (
        <Entry
          key={i}
          link={link}
          target={target}
          authMenuMounted={mounted}
          onSubMenuInnerClick={onSubMenuInnerClick}
        />
      )
    })
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
  const hasIcon =
    link.icon &&
    link.icon !== undefined &&
    menuIconMapping[link.icon] !== undefined

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
          <StyledLink hasIcon={hasIcon} as="a" /*active={true}*/>
            {renderIcon()}
            {!hasIcon && link.title} <FontAwesomeIcon icon={faCaretDown} />
          </StyledLink>
        </Tippy>
      ) : (
        <StyledLink hasIcon={hasIcon} /*active={true}*/ href={link.url}>
          {renderIcon()} {!hasIcon && link.title}
        </StyledLink>
      )}
    </Li>
  )

  function renderIcon() {
    if (!hasIcon) return null

    if (link.icon === 'notifications')
      return <UnreadNotificationsCount icon={menuIconMapping[link.icon]} />

    return (
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon
          // checking for undefined this in hasIcon
          icon={menuIconMapping[link.icon!]!}
          style={{ height: '1.4rem', width: '1.4rem', paddingTop: '0' }}
        />
      </span>
    )
  }
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
                <SubButtonStyle>{entry.title}</SubButtonStyle>
              </SubLink>
            </li>
          )
        })}
    </SubList>
  )
}

const ResponsiveNav = styled.nav`
  min-height: 50px;
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

    /*just for notifications count*/
    & span.number {
      color: ${(props) => props.theme.colors.brand};
    }
    & span.fa-layers {
      color: #fff;
    }
  }
  text-decoration: none !important;
`

const StyledLink = styled(Link)<{ active?: boolean; hasIcon?: boolean }>`
  ${makeDefaultButton}
  ${linkStyle}
  color: ${(props) =>
    props.theme.colors[props.active ? 'darkgray' : 'lightblue']};

  background-color: ${(props) =>
    props.active ? props.theme.colors.lighterblue : 'inherit'};

  font-weight: bold;
  transition: all 0.3s ease-in-out 0s;
  display: block;

  margin: 0 3px;
  margin-top: ${(props) => (props.hasIcon ? '-5px' : '11px')};
  padding: ${(props) => (props.hasIcon ? '7px' : '2px 7px')};
`

export const SubList = styled.ul`
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

export const SubLink = styled(Link)`
  padding-top: 3px;
  padding-bottom: 3px;
  display: block;
  text-decoration: none;
  cursor: pointer;
  &:hover span {
    color: #fff;
    background-color: ${(props) => props.theme.colors.brand};
  }
`

export const SubButtonStyle = styled.span`
  text-decoration: none;
  display: block;
  ${linkStyle}
  ${makeDefaultButton}
  color: ${(props) => props.theme.colors.brand};
`
