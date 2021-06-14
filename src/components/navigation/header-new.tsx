import { Router } from 'next/router'
import { useState } from 'react'

import { Link } from '../content/link'
import { MenuNew } from './menu-new'
import { MobileMenu } from './mobile-menu'
import { MobileMenuButtonNew } from './mobile-menu-button-new'
import { SearchInputNew } from './search-input-new'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'

export function HeaderNew() {
  const [isOpen, setOpen] = useState(false)
  const auth = useAuthentication()
  const { headerData } = useInstanceData()

  // compat: close mobile menu on client side navigation, we need the global Router instance
  Router.events.on('routeChangeStart', () => {
    setOpen(false)
  })

  return (
    <header>
      <MobileMenuButtonNew onClick={() => setOpen(!isOpen)} open={isOpen} />
      <div className="flex justify-between pt-3 pb-6 px-side lg:px-side-lg">
        <div>
          <Link href="/" path={['logo']}>
            <img
              className="inline"
              alt="Serlo"
              src="/_assets/img/serlo-logo.svg"
              width="120"
              height="80"
            />
          </Link>
          <span className="font-handwritten text-xl ml-2 mt-4 inline-block align-text-top">
            Die freie Lernplattform
          </span>
        </div>
        <div className="hidden md:block">
          <SearchInputNew />
        </div>

        <MenuNew data={headerData} auth={auth.current} />
      </div>
      {isOpen && <MobileMenu data={headerData} auth={auth.current} />}
    </header>
  )
}
