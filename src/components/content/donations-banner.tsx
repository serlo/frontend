import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Lazy } from './lazy'
import { useInstanceData } from '@/contexts/instance-context'
import { submitEvent } from '@/helper/submit-event'

// only instance: de

const chance = 0.2 // 20%

const banners = [
  {
    id: 'banner-1a',
    text: (
      <>
        Serlo ist die einzige Lernplattform Deutschlands, die kostenlos ist. Wir
        finanzieren uns rein über Spenden und Förderer. Unterstütze auch du uns!{' '}
        <p className="italic">Gemeinsam mit Dir gestalten wir Bildung neu.</p>
      </>
    ),
    imageSrc:
      'https://assets.serlo.org/6234abb319002_cde9403895bd5ad35fe739ca964535a0b79908d7.jpg',
  },
]

type Banner = typeof banners[number]

export function DonationsBanner({ id }: { id: number }) {
  const [banner, setBanner] = useState<Banner | undefined>(undefined)
  const router = useRouter()

  const { lang } = useInstanceData()

  useEffect(() => {
    if (lang !== 'de') return
    if (Math.random() < chance) return
    setBanner(banners[Math.floor(Math.random() * banners.length)])

    const horizon = document.getElementById('horizon')
    if (horizon) horizon.style.display = 'none'

    // rerole on entity change
  }, [setBanner, id, lang])

  if (lang !== 'de' || !banner) return null

  return (
    <Lazy slim>
      <div className="h-64 py-6">
        <aside
          className={clsx(
            'absolute left-0 right-0 h-64',
            'sm:flex sm:items-stretch sm:justify-between',
            'px-side pt-8 pb-6 -ml-2.5',
            'text-2xl font-bold',
            'bg-[url("/_assets/img/landing/about-container.svg")] bg-no-repeat bg-bottom bg-[length:100vw_100%]'
          )}
        >
          <img src={banner.imageSrc} className="rounded-full" />
          <h1>{banner.text}</h1>
          <button
            className="serlo-button-green"
            onClick={() => {
              submitEvent(`spenden-${banner.id}`)
              void router.push('/spenden')
            }}
          >
            Jetzt Spenden
          </button>
        </aside>
      </div>
    </Lazy>
  )
}
