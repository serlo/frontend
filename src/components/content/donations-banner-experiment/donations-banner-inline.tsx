import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { Lazy } from '../lazy'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { isProduction } from '@/helper/is-production'
import { submitEvent } from '@/helper/submit-event'
import { tw } from '@/helper/tw'

// Round 2
// 3% unter einer Lösung

const reducedChance = isProduction ? 0.03 : 1 // 3% or always while developing

const possibleBanners: { [key in DonationsBannerProps['place']]: Banner[] } = {
  solution: [
    {
      id: 'banner-solution-1',
      isLong: false,
      call: 'Hat dir diese Aufgabe weitergeholfen?',
      text: (
        <div className="text-left">
          <p className="serlo-p leading-6 special-hyphens-initial">
            Wir möchten <b>mehr interaktive Aufgaben</b> entwickeln, die
            Nutzbarkeit auf Smartphones verbessern und es Schüler*innen
            ermöglichen, eigene Lernziele zu definieren und ihren eigenen
            Lernstand zu speichern.
          </p>
          <p className="serlo-p leading-6 special-hyphens-initial">
            All das kostet Geld. Und weil Serlo als gemeinnütziges Projekt für
            immer kostenlos und frei von Werbung bleiben wird, sind wir auf
            Spenden angewiesen.
          </p>
          <p className="serlo-p font-bold leading-6 special-hyphens-initial">
            Es wäre großartig, wenn du uns hilfst, Serlo noch besser zu machen!
          </p>
        </div>
      ),
      imageSrc: '/_assets/img/donations/donation-bird.svg',
    },
  ],
}

interface Banner {
  id: string
  isLong: boolean
  text: React.ReactNode
  call: string
  imageSrc: `/_assets/img/donations/${string}.svg`
}

export interface DonationsBannerProps {
  id: number
  place: 'solution'
}

export function DonationsBannerInline({ id, place }: DonationsBannerProps) {
  const [banner, setBanner] = useState<Banner | undefined>(undefined)
  const bannerRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const { lang } = useInstanceData()

  useEffect(() => {
    globalThis.hack__id = id

    if (lang !== Instance.De || Math.random() > reducedChance) {
      setBanner(undefined)
      return
    }

    const banners = possibleBanners[place]
    const chosenBannerIndex = Math.floor(Math.random() * banners.length)
    setBanner(banners.at(chosenBannerIndex))

    const horizon = document.getElementById('horizon')
    if (horizon) horizon.style.display = 'none'

    // rerole on entity change
  }, [setBanner, id, lang, place])

  if (!banner) return null

  return (
    <Lazy slim>
      <aside
        ref={bannerRef}
        className={tw`
            bg-[url("/_assets/img/landing/about-container.svg")] bg-[length:100vw_100%] bg-bottom bg-no-repeat
            px-side pb-5 text-center text-lg
            sm:mx-0 sm:flex sm:justify-between sm:px-0 sm:text-left
            lg:my-4 lg:py-4 lg:text-xl
          `}
      >
        <img
          onLoad={() => {
            const observer = new IntersectionObserver(
              (entries) => {
                const entry = entries.at(0)
                if (
                  entry &&
                  entry.isIntersecting &&
                  globalThis.hack__lastId !== globalThis.hack__id
                ) {
                  globalThis.hack__lastId = globalThis.hack__id
                  submitEvent(`spenden-seen-${banner.id}`)
                }
              },
              { threshold: 0.8 }
            )
            if (bannerRef.current !== null) observer.observe(bannerRef.current)
          }}
          src={banner.imageSrc}
          className="mx-auto mt-6 max-w-[18rem] scale-x-[-1] px-16 sm:mr-0 sm:max-w-[12rem] sm:px-3"
        />
        <div className="mx-auto max-w-2xl px-side sm:mt-10 sm:ml-0">
          <p className="mx-side mb-4 font-handwritten text-[1.32em] text-brand">
            {banner.call}
          </p>
          <div className="">{banner.text}</div>

          <p className="mx-auto mb-6 block sm:mb-10 sm:ml-side lg:mb-8">
            <button
              className="serlo-button-green"
              onClick={() => {
                submitEvent(`spenden-clicked-${banner.id}`)
                void router.push('/spenden')
              }}
            >
              Jetzt spenden
            </button>
          </p>
        </div>
      </aside>
    </Lazy>
  )
}
