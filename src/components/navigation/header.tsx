import { Router } from 'next/router'
import { useState } from 'react'

import { Logo } from './logo'
import { Menu } from './menu'
import { MobileMenu } from './mobile-menu'
import { MobileMenuButton } from './mobile-menu-button'
import { SearchInput } from './search-input'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'

export function Header() {
  const [isOpen, setOpen] = useState(false)
  const auth = useAuthentication()
  const { headerData, strings } = useInstanceData()

  // compat: close mobile menu on client side navigation, we need the global Router instance
  Router.events.on('routeChangeStart', () => {
    setOpen(false)
  })

  return (
    <header className="bg-brand-100">
      <MobileMenuButton onClick={() => setOpen(!isOpen)} open={isOpen} />
      <div className="pt-3 pb-6 px-side lg:px-side-lg">
        <Menu data={headerData} auth={auth.current} />
        <Logo subline={strings.header.slogan} />
      </div>
      <SearchInput />
      {isOpen && <MobileMenu data={headerData} auth={auth.current} />}
    </header>
  )
}
