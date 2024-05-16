import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FaIcon } from './fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'

export function ShowOnScrollBanner() {
  const [survey, setSurvey] = useState(false)

  const { asPath } = useRouter()
  const { lang } = useInstanceData()

  useEffect(() => {
    const threshold = 10
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.scrollY

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      if (scrollY < lastScrollY) {
        triggerPopup()
        return // ticking stays true, so this is not retriggered
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!survey) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] border-t-2 border-gray-300 bg-brand-50">
      <button
        className="serlo-button-blue absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full"
        onClick={() => {
          setSurvey(false)
        }}
      >
        <FaIcon icon={faTimes} className="text-2xl text-white"></FaIcon>
      </button>
      <div className="flex flex-row justify-center">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="https://einhorn.arrrg.de/"
          target="_blank"
          className="group"
          rel="noreferrer"
        >
          <div>
            <div className="ml-2 mt-2 mobileExt:mt-6 sm:mt-10">
              <p>
                <button className="mr-12 text-left text-3xl sm:mr-0">
                  Internationaler Tag der Mathematik
                </button>
              </p>

              <div className="mt-3 flex justify-between">
                <p className="text-lg sm:max-w-[400px]">
                  Feiere zusammen mit uns diesen Tag und erlebe die Mathematik
                  von ihrer spielerischen Seite.
                </p>
                <div className="mr-4 mt-4 min-w-fit sm:hidden">
                  {renderUnicorn()}
                </div>
              </div>
              <p className="mb-4 mt-4">
                <button className="rounded-full bg-pink-600 px-4 py-2 font-bold text-white transition-colors group-hover:bg-pink-500">
                  Zum Einhorn der Mathematik
                </button>
              </p>
            </div>
          </div>
        </a>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="hidden sm:block">{renderUnicorn()}</div>
      </div>
    </div>
  )

  function renderUnicorn() {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/mathe/298181/einhorn-der-mathematik-%C3%BCbersicht-aller-episoden">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              src="https://assets.serlo.org/e16a66c0-c26b-11ee-b6d8-a1dea02dc7c7/einhorndermathematikC3BCbersichtallerepisoden.png"
              alt="Einhorn der Mathematik"
              className="h-20 mobileExt:h-28 sm:mb-10 sm:ml-8 sm:mt-14 sm:h-36"
            />
          </div>
        </a>
      </>
    )
  }

  function triggerPopup() {
    // pop-up already visible
    if (survey) return

    const startDate = new Date('2024-03-14T00:00:00+02:00')
    const endDate = new Date('2024-03-15T00:00:00+02:00')

    if (
      lang !== Instance.De ||
      !asPath.startsWith('/mathe/') ||
      asPath.includes('einhorn-der-mathematik') ||
      // pop-up already shown
      Cookies.get('serlo-international-day-of-mathematics-banner') ||
      // only show inside date range
      Date.now() > endDate.getTime() ||
      Date.now() < startDate.getTime()
    ) {
      return
    }

    Cookies.set('serlo-international-day-of-mathematics-banner', '1', {
      expires: 2,
      sameSite: 'Lax',
    })

    setSurvey(true)
  }
}
