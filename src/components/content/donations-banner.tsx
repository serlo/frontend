import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Lazy } from './lazy'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { isProduction } from '@/helper/is-production'
import { submitEvent } from '@/helper/submit-event'

const chance = isProduction ? 0.2 : 0 // 20% or always while developing

const banners = [
  {
    id: 'banner-1a',
    text: (
      <>
        Serlo ist die einzige Lernplattform Deutschlands, die kostenlos ist. Wir
        finanzieren uns rein über Spenden und Förderer. Unterstütze auch du uns!{' '}
      </>
    ),
    call: 'Gemeinsam mit Dir gestalten wir Bildung neu.',
    imageSrc: '/_assets/img/donations/donation-bird.svg',
  },
]

type Banner = typeof banners[number]

export function DonationsBanner({ id }: { id: number }) {
  const [banner, setBanner] = useState<Banner | undefined>(undefined)
  const router = useRouter()

  const { lang } = useInstanceData()

  useEffect(() => {
    if (lang !== Instance.De) return
    if (Math.random() < chance) return
    setBanner(banners[Math.floor(Math.random() * banners.length)])

    const horizon = document.getElementById('horizon')
    if (horizon) horizon.style.display = 'none'

    // rerole on entity change
  }, [setBanner, id, lang])

  if (lang !== Instance.De || !banner) return null
  return (
    <Lazy slim>
      <div
        onLoad={() => {
          console.log('loaded now!')
        }}
      >
        <style jsx>{`
          @media (min-width: 800px) {
            aside {
              left: calc(-50vw + 50% - 51px);
            }
          }
          @media (min-width: 1024px) {
            aside {
              left: calc(-50vw + 50%);
            }
          }
          @media (min-width: 1216px) {
            button {
              zoom: 1.15;
              position: absolute;
            }
          }
        `}</style>
        <aside
          style={{ left: 'calc(-50vw + 50%)' }}
          className={clsx(
            'w-[100vw] relative py-6 px-side text-center text-xl font-bold',
            'bg-[url("/_assets/img/landing/about-container.svg")] bg-no-repeat bg-bottom bg-[length:100vw_100%]',
            'sm:flex sm:justify-between sm:text-left sm:mx-0 sm:px-0',
            'sm:max-w-[100vw] lg:text-2xl lg:py-10 lg:my-16'
          )}
        >
          <img
            src={banner.imageSrc}
            className="px-16 rounded-full -mb-5 max-w-[20rem] mx-auto sm:h-fit md:mr-0"
          />
          <div className="max-w-2xl mx-auto px-side sm:mt-5 md:ml-0">
            <p className="">{banner.text}</p>
            <p className="my-5 font-handwritten text-[1.32em] text-brand">
              {banner.call}
              <button
                className="serlo-button-green mt-6 block mx-auto sm:ml-0 lg:inline-block lg:ml-4 lg:mt-0"
                onClick={() => {
                  submitEvent(`spenden-${banner.id}`)
                  void router.push('/spenden')
                }}
              >
                Jetzt Spenden
              </button>
            </p>
          </div>
        </aside>
      </div>
    </Lazy>
  )
}
