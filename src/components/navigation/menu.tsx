import { faCaretDown, faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { TippyProps } from '@tippyjs/react'
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { Link } from '../content/link'
import { SubButtonStyle } from '../user-tools/sub-button-style'
import { SubLink } from './sub-link'
import { SubList } from './sub-list'
import { AuthenticationPayload } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { HeaderData, HeaderLink } from '@/data-types'
import { makeTransparentButton } from '@/helper/css'
import { getAuthData, shouldUseNewAuth } from '@/helper/feature-auth'

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
  auth: AuthenticationPayload
}

export function Menu(props: MenuProps) {
  const [Tippy, setTippy] = useState<typeof import('@tippyjs/react') | null>(
    null
  )
  useEffect(() => {
    void import('@tippyjs/react').then((value) => setTippy(value))
  }, [])
  if (!Tippy) {
    return <MenuWithoutTippy {...props} />
  }
  return <MenuWithTippy {...props} Tippy={Tippy} />
}

function MenuWithoutTippy(props: MenuProps) {
  return <MenuInner {...props} />
}

function MenuWithTippy(
  props: MenuProps & { Tippy: typeof import('@tippyjs/react') }
) {
  const [source, target] = props.Tippy.useSingleton()
  return <MenuInner {...props} source={source} target={target} />
}

function MenuInner({
  data,
  auth,
  Tippy,
  source,
  target,
}: MenuProps & {
  Tippy?: typeof import('@tippyjs/react')
  source?: any
  target?: any
}) {
  //
  const [mounted, setMounted] = useState(!shouldUseNewAuth())
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  type TippyRoot = Parameters<NonNullable<TippyProps['onCreate']>>[0]
  const [tippyRoot, setTippyRoot] = useState<TippyRoot | null>(null)

  useEffect(() => setMounted(true), [])

  const lic = useLoggedInComponents()

  function onSubMenuInnerClick() {
    if (tippyRoot && tippyRoot !== undefined) tippyRoot.hide()
  }

  return (
    <ResponsiveNav>
      {Tippy && (
        <Tippy.default
          singleton={source}
          placement="bottom-start"
          trigger="click mouseenter focus"
          hideOnClick
          interactive
          delay={[50, 0]}
          duration={[300, 100]}
          animation="fade"
          onCreate={(tip) => {
            //console.log('set tippy root')
            setTippyRoot(tip)
          }}
        />
      )}
      <List>
        {data.map((link, i) => renderEntry({ link }, i))}
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
      return renderEntry(
        {
          link: {
            url: '/auth/login',
            title: strings.header.login,
            icon: 'user',
          },
          authMenuMounted: false,
        },
        'auth'
      )

    return data.map((link) => {
      return renderEntry(
        {
          link: link,
          authMenuMounted: mounted,
        },
        'auth'
      )
    })
  }

  interface EntryData {
    link: HeaderLink
    authMenuMounted?: boolean
  }

  function renderEntry(
    { link, authMenuMounted }: EntryData,
    i: number | string
  ) {
    const hasChildren = link.children !== undefined
    const hasIcon =
      link.icon &&
      link.icon !== undefined &&
      menuIconMapping[link.icon] !== undefined
    return (
      <Li
        key={link.title}
        show={authMenuMounted === undefined ? true : authMenuMounted}
      >
        {hasChildren ? (
          Tippy ? (
            <Tippy.default
              content={renderSubMenuInner(link.children, i)}
              singleton={target}
            >
              <StyledLink
                hasIcon={hasIcon}
                as="a"
                tabIndex={0} /*active={true}*/
              >
                {renderIcon()}
                {!hasIcon && link.title} <FontAwesomeIcon icon={faCaretDown} />
              </StyledLink>
            </Tippy.default>
          ) : (
            <StyledLink hasIcon={hasIcon} as="a" tabIndex={0} /*active={true}*/>
              {renderIcon()}
              {!hasIcon && link.title} <FontAwesomeIcon icon={faCaretDown} />
            </StyledLink>
          )
        ) : (
          <StyledLink
            hasIcon={hasIcon}
            /*active={true}*/ href={link.url}
            path={['menu', i]}
          >
            {renderIcon()} {!hasIcon && link.title}
          </StyledLink>
        )}
      </Li>
    )

    function renderIcon() {
      if (!hasIcon) return null

      if (link.icon === 'notifications') {
        const Comp = lic?.UnreadNotificationsCount
        if (Comp) return <Comp icon={menuIconMapping[link.icon]} />
      }

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

  function renderSubMenuInner(subEntries?: HeaderLink[], i?: number | string) {
    return (
      <SubList>
        {subEntries !== undefined &&
          subEntries.map((entry, i2) => {
            const href =
              entry.url === '/user/public' && auth
                ? `/user/${auth.id}/${auth.username}`
                : entry.url
            return (
              <li key={entry.title} onClick={onSubMenuInnerClick}>
                <SubLink href={href} path={['menu', i!, i2]}>
                  <SubButtonStyle>{entry.title}</SubButtonStyle>
                </SubLink>
              </li>
            )
          })}
      </SubList>
    )
  }
}

const ResponsiveNav = styled.nav`
  min-height: 50px;
  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
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
`

const StyledLink = styled(Link)<{ active?: boolean; hasIcon?: boolean }>`
  ${makeTransparentButton}
  ${linkStyle}
  font-size: 1rem;
  color: ${(props) =>
    props.theme.colors[props.active ? 'darkgray' : 'lightblue']};

  background-color: ${(props) =>
    props.active ? props.theme.colors.lighterblue : 'inherit'};

  transition: all 0.3s ease-in-out 0s;
  display: block;

  margin: 0 3px;
  margin-top: ${(props) => (props.hasIcon ? '-5px' : '11px')};
  padding: ${(props) => (props.hasIcon ? '7px' : '2px 7px')};
`
