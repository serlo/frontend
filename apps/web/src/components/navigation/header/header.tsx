import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Logo } from './logo'
import { Menu } from './menu/menu'
import { MobileMenuButton } from './mobile-menu-button'
import { SkipMenu } from './skip-menu'
import { Link } from '@/components/content/link'
import { Quickbar } from '@/components/navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
import { submitEvent } from '@/helper/submit-event'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { strings, lang } = useInstanceData()
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
    <>
      {renderTempExamsBanner()}
      <header
        className={cn(
          `
        bg-[url("/_assets/img/header-curve.svg")] bg-[length:100vw_3rem]
          bg-bottom bg-no-repeat pb-9 pt-3 text-almost-black
        `,
          hideQuickbar ? '' : 'bg-brand-100'
        )}
      >
        <SkipMenu />
        <div className="px-side pb-6 pt-3 lg:px-side-lg">
          <div className="flex-wrap mobileExt:flex mobileExt:justify-between lg:flex-nowrap">
            <Logo foldOnMobile />
            <div
              className={cn(
                `order-last mt-[1.7rem] min-h-[50px] w-full
              md:order-none md:mt-8 md:block
              md:w-auto lg:order-last`,
                mobileMenuOpen ? '' : 'hidden'
              )}
            >
              <Menu isMobile={mobileMenuOpen} />
            </div>
            <div className="hidden h-0 basis-full md:block lg:hidden" />
            {renderQuickbar()}
            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              open={mobileMenuOpen}
            />
          </div>
        </div>
      </header>
    </>
  )

  function renderQuickbar() {
    if (hideQuickbar) return null

    return (
      <Quickbar
        className={cn(`
      mx-auto mt-7 text-left font-normal
      mobileExt:ml-4 mobileExt:mr-0 mobileExt:mt-5 mobileExt:max-w-sm mobileExt:flex-grow mobileExt:px-2
      md:mt-0 md:max-w-xs
      lg:mt-6 lg:max-w-sm
      `)}
        placeholder={strings.header.search}
      />
    )
  }

  function renderTempExamsBanner() {
    if (lang !== Instance.De) return null
    const isInMath = router.asPath.startsWith('/mathe/')
    if (
      !['/serlo', '/search', '/community', '/mitmachen'].includes(
        router.asPath
      ) &&
      !isInMath
    )
      return null

    return (
      <Link
        id="oam-banner"
        onClick={() => {
          if (isInMath) submitEvent('oam-banner-click-math')
          else submitEvent('oam-banner-click-meta')
        }}
        href="/mathe-pruefungen"
        className="group block bg-newgreen bg-opacity-20 p-3 text-black hover:!no-underline mobile:text-center sm:py-2"
      >
        🎓 Ui, fast schon Prüfungszeit?{' '}
        <b className="serlo-link group-hover:underline">
          Hier geht&apos;s zur Mathe-Prüfungsvorbereitung
        </b>
        .
      </Link>
    )
  }

  // function renderSpecialDonationButton() {
  //   return (
  //     <button
  //       className="py-0.75 serlo-button-green absolute right-4 top-32 text-[0.9rem] md:right-6 md:top-[1.15rem] lg:right-12"
  //       onClick={() => {
  //         submitEvent('spenden-header-menu-click-landing')
  //         void router.push('/spenden')
  //       }}
  //     >
  //       <FaIcon icon={faHeart} /> Jetzt Spenden
  //     </button>
  //   )
  // }
}
