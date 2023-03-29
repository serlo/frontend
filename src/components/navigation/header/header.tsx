import { faHeart } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Logo } from './logo'
import { Menu } from './menu/menu'
import { MobileMenuButton } from './mobile-menu-button'
import { SkipMenu } from './skip-menu'
import { FaIcon } from '@/components/fa-icon'
import { Quickbar } from '@/components/navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'
import { submitEvent } from '@/helper/submit-event'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { strings } = useInstanceData()
  const router = useRouter()

  const isLanding = router.route === '/'
  const hideQuickbar = router.route === '/search' || isLanding

  useEffect(() => {
    const escapeHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    document.body.addEventListener('keydown', escapeHandler)

    // close mobile menu on client side navigation, we need the global Router instance
    const openMobileMenu = () => {
      setMobileMenuOpen(false)
    }
    Router.events.on('routeChangeStart', openMobileMenu)

    return () => {
      document.body.removeEventListener('keydown', escapeHandler)
      Router.events.off('routeChangeStart', openMobileMenu)
    }
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
        <div className="mobileExt:flex mobileExt:justify-between flex-wrap lg:flex-nowrap">
          <Logo foldOnMobile />
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

  function renderQuickbar() {
    if (isLanding) return renderSpecialDonationButton()
    if (hideQuickbar) return null
    return (
      <Quickbar
        className={clsx(
          'mt-7 mx-auto text-left font-normal',
          'mobileExt:max-w-sm mobileExt:ml-4 mobileExt:mr-0 mobileExt:mt-5 mobileExt:px-2 mobileExt:flex-grow',
          'md:mt-0 md:max-w-xs',
          'lg:mt-6 lg:max-w-sm'
        )}
        placeholder={strings.header.search}
      />
    )
  }

  function renderSpecialDonationButton() {
    return (
      <button
        className="serlo-button-green absolute text-[0.9rem] right-4 md:right-6 lg:right-12 top-32 md:top-[1.15rem] py-0.75"
        onClick={() => {
          submitEvent('spenden-header-menu-click-landing')
          void router.push('/spenden')
        }}
      >
        <FaIcon icon={faHeart} /> Jetzt Spenden
      </button>
    )
  }
}
