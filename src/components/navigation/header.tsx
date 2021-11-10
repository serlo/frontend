import { Router } from 'next/router'
import { useState } from 'react'

import { Logo } from './logo'
import { Menu } from './menu'
import { MobileMenu } from './mobile-menu'
import { MobileMenuButton } from './mobile-menu-button'
import { SearchInput } from './search-input'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { useWindowWidth } from '@/helper/use-window-width'
import { theme } from '@/theme'

export function Header() {
  const [isOpen, setOpen] = useState(false)
  const auth = useAuthentication()
  const { headerData, strings } = useInstanceData()

  // compat: close mobile menu on client side navigation, we need the global Router instance
  Router.events.on('routeChangeStart', () => {
    setOpen(false)
  })

  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < theme.breakpointsInt.sm

  return (
    <header className="bg-brand-100">
      {isMobile ? (
        <MobileMenuButton onClick={() => setOpen(!isOpen)} open={isOpen} />
      ) : null}
      <div className="pt-3 pb-6 px-side lg:px-side-lg">
        {isMobile ? null : <Menu data={headerData} auth={auth.current} />}
        <Logo subline={strings.header.slogan} />
      </div>
      <SearchInput />
      {isOpen && isMobile ? (
        <MobileMenu data={headerData} auth={auth.current} />
      ) : null}
    </header>
  )
}
