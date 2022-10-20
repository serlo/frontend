import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { Lazy } from '../lazy'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { isProduction } from '@/helper/is-production'
import { submitEvent } from '@/helper/submit-event'

// Round 2
// 3% unter einer Lösung

const reducedChance = isProduction ? 0.03 : 0.03 // 3% or always while developing

const possibleBanners: { [key in DonationsBannerProps['place']]: Banner[] } = {
  solution: [
    {
      id: 'banner-solution-1',
      isLong: false,
      call: 'Hat dir diese Aufgabe weitergeholfen?',
      text: (
        <div className="text-left">
          <p className="serlo-p special-hyphens-initial leading-6">
            Wir möchten <b>mehr interaktive Aufgaben</b> entwickeln, die
            Nutzbarkeit auf Smartphones verbessern und es Schüler*innen
            ermöglichen, eigene Lernziele zu definieren und ihren eigenen
            Lernstand zu speichern.
          </p>
          <p className="serlo-p special-hyphens-initial leading-6">
            All das kostet Geld. Und weil Serlo als gemeinnütziges Projekt für
            immer kostenlos und frei von Werbung bleiben wird, sind wir auf
            Spenden angewiesen.
          </p>
          <p className="serlo-p special-hyphens-initial leading-6 font-bold">
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

  if (banner == null) return null

  return (
    <Lazy slim>
      <aside
        ref={bannerRef}
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
          if (bannerRef.current != null) observer.observe(bannerRef.current)
        }}
        className={clsx(
          'px-side text-center text-lg pb-5',
          'bg-[url("/_assets/img/landing/about-container.svg")] bg-no-repeat bg-bottom bg-[length:100vw_100%]',
          'sm:flex sm:justify-between sm:text-left sm:mx-0 sm:px-0',
          'lg:text-xl lg:py-4 lg:my-4'
        )}
      >
        <img
          src={banner.imageSrc}
          className="mt-6 px-16 max-w-[18rem] mx-auto sm:h-fit sm:mr-0 sm:max-w-[12rem] sm:px-3 scale-x-[-1]"
        />
        <div className="max-w-2xl mx-auto px-side sm:mt-10 sm:ml-0">
          <p className="mb-4 font-handwritten text-[1.32em] text-brand mx-side">
            {banner.call}
          </p>
          <div className="">{banner.text}</div>

          <p className="block mb-6 mx-auto sm:mb-10 sm:ml-side lg:mb-8">
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
