import clsx from 'clsx'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Link } from '../../content/link'
import { Menu } from './menu/menu'
import { MobileMenuButton } from './mobile-menu-button'
import { SkipMenu } from './skip-menu'
import { Quickbar } from '@/components/navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { strings } = useInstanceData()
  const router = useRouter()

  const hideQuickbar = router.route === '/search' || router.route === '/'

  useEffect(() => {
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    })

    // close mobile menu on client side navigation, we need the global Router instance
    Router.events.on('routeChangeStart', () => {
      setMobileMenuOpen(false)
    })
  }, [])

  return (
    <header
      className={clsx(
        'text-truegray-700 pt-3',
        hideQuickbar ? '' : 'bg-brand-100',
        'pb-9 bg-[url("/_assets/img/header-curve.svg")] bg-no-repeat bg-bottom bg-[length:100vw_3rem]'
      )}
    >
      <SkipMenu />
      <div className="pt-3 pb-6 px-side lg:px-side-lg">
        <div className="mobile:flex mobile:justify-between flex-wrap lg:flex-nowrap">
          {renderLogo()}
          <div
            className={clsx(
              'min-h-[50px] md:block mt-[1.7rem] md:mt-7',
              'order-last md:order-none lg:order-last ',
              'w-full md:w-auto',
              mobileMenuOpen ? '' : 'hidden'
            )}
          >
            <Menu />
          </div>
          <div className="hidden md:block lg:hidden basis-full h-0" />
          {renderQuickbar()}
          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            open={mobileMenuOpen}
          />
        </div>
      </div>
    </header>
  )

  function renderLogo() {
    return (
      <Link href="/" path={['logo']} className="w-min sm:w-auto">
        <img
          className="inline"
          alt="Serlo"
          src="/_assets/img/serlo-logo.svg"
          width="120"
          height="80"
        />
        <span
          className={clsx(
            'font-handwritten text-xl align-text-top text-truegray-700',
            'ml-9 mt-2 block mobile:inline-block mobile:ml-9 sm:mt-4 mobile:whitespace-nowrap',
            'sm:ml-2'
          )}
        >
          Die freie Lernplattform
        </span>
      </Link>
    )
  }

  function renderQuickbar() {
    if (hideQuickbar) return null
    return (
      <Quickbar
        className={clsx(
          'mt-7 mx-auto text-left font-normal',
          'mobile:max-w-sm mobile:ml-4 mobile:mr-0 mobile:mt-5 mobile:px-2 mobile:flex-grow',
          'md:mt-0 md:max-w-xs',
          'lg:mt-6 lg:max-w-sm'
        )}
        placeholder={strings.header.search}
      />
    )
  }
}
