import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { default as NextLink } from 'next/link'
import { useState, useEffect } from 'react'

import { Link } from '../../content/link'
import { getAvatarUrl } from '../../user/user-link'
import { AuthenticationPayload } from '@/auth/auth-provider'
import { FaIcon } from '@/components/fa-icon'
import { MenuSubButtonLink } from '@/components/user-tools/menu-sub-button-link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { HeaderData, HeaderLink } from '@/data-types'
import { getAuthData, shouldUseNewAuth } from '@/helper/feature-auth'
import { submitEvent } from '@/helper/submit-event'

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

export function Menu({ data, auth }: MenuProps) {
  const [mounted, setMounted] = useState(!shouldUseNewAuth())
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  useEffect(() => setMounted(true), [])

  const loggedInComponents = useLoggedInComponents()

  // TODO: make sure overlay closes on link-click

  return (
    <NavigationMenu.Root className="min-h-[50px] hidden md:block mt-[1.7rem] md:mt-7">
      <NavigationMenu.List className="text-right block m-0 p-0">
        {data.map((link, i) => renderItem({ link }, i))}
        {renderAuthMenu()}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )

  function renderAuthMenu() {
    const data = getAuthData(
      mounted && auth !== null,
      strings.header.login,
      loggedInData?.authMenu
    )

    // render placeholder while data is loading
    if (!data)
      return renderItem(
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
      return renderItem(
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

  function renderItem(
    { link, authMenuMounted }: EntryData,
    i: number | string
  ) {
    const hasChildren = link.children !== undefined
    const hasIcon =
      link.icon &&
      link.icon !== undefined &&
      menuIconMapping[link.icon] !== undefined

    const styledLinkCls = /* className={ */ clsx(
      'serlo-button-blue-transparent',
      'text-[0.9rem] leading-tight block transition mx-[3px] my-0 text-brand-light',
      hasIcon ? '-mt-[5px] p-[7px]' : 'mt-[11px] py-0.5 px-[7px]',
      'serlo-menu-entry-special'
    )

    const linkOrTrigger = hasChildren ? (
      <Link>
        <NavigationMenu.Trigger className={styledLinkCls}>
          {renderIcon()}
          {!hasIcon && link.title} <FaIcon icon={faCaretDown} />
        </NavigationMenu.Trigger>
      </Link>
    ) : (
      <Link href={link.url} passHref>
        <NavigationMenu.Link className={clsx('group', styledLinkCls)}>
          {renderIcon()} {!hasIcon && link.title}
          {/* <span className="sr-only">{strings.pageTitles.notifications}</span> TODO: only show for notifs*/}
        </NavigationMenu.Link>
      </Link>
    )

    return (
      <NavigationMenu.Item
        className={clsx(
          'inline-block',
          (authMenuMounted === undefined ? true : authMenuMounted)
            ? 'opacity-100'
            : 'opacity-0',
          'ease-linear duration-700'
        )}
        key={link.title}
        onClick={() => {
          if (link.url === '/spenden') submitEvent('spenden-header-menu-click')
        }}
      >
        {linkOrTrigger}
        {hasChildren ? renderContent(link.children) : null}
      </NavigationMenu.Item>
    )

    function renderIcon() {
      if (!hasIcon) return null

      if (link.icon === 'notifications') {
        const UnreadNotificationsCount =
          loggedInComponents?.UnreadNotificationsCount
        if (UnreadNotificationsCount)
          return <UnreadNotificationsCount icon={menuIconMapping[link.icon]} />
      }

      if (link.icon === 'user' && auth && auth.username) {
        return (
          <img
            className="rounded-full w-6 h-6 inline -mt-1"
            src={getAvatarUrl(auth.username)}
            title={`${link.title} ${auth.username}`}
          />
        )
      }

      // only notification and user are in use and handled above
      return null
    }
  }

  function renderContent(subEntries?: HeaderLink[]) {
    if (!subEntries) return null
    return (
      <NavigationMenu.Content className="absolute z-50 mt-2">
        <NavigationMenu.Sub>
          <NavigationMenu.List className="serlo-sub-list">
            {subEntries.map((entry) => {
              const href = auth
                ? entry.url.replace(
                    '/user/me',
                    `/user/${auth.id}/${auth.username}`
                  )
                : entry.url

              return (
                <NavigationMenu.Item key={entry.title}>
                  <NavigationMenu.Link href={href}>
                    <MenuSubButtonLink href={href} path={['menu']}>
                      {entry.title}
                    </MenuSubButtonLink>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              )
            })}
          </NavigationMenu.List>
        </NavigationMenu.Sub>
      </NavigationMenu.Content>
    )
  }
}
