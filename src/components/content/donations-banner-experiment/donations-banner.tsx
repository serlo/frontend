import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { Lazy } from '../lazy'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, UuidType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { isProduction } from '@/helper/is-production'
import { submitEvent } from '@/helper/submit-event'

// Round 2
// 10% Artikel & Aufgabensammlung
// 100% Ende von Kurs
// new testimonials

const hideDonationBannerKey = 'hide-donation-banner'

declare global {
  // eslint-disable-next-line no-var
  var hack__lastId: number
  // eslint-disable-next-line no-var
  var hack__id: number
}

const reducedChance = isProduction ? 0.2 : 1 // 20% or always while developing

// show on articles and exercise groups
const articleBanners = [
  {
    id: 'banner-A2',
    isLong: false,
    text: (
      <div className="text-left">
        <p className="serlo-p special-hyphens-initial leading-6">
          … dass in Deutschland pro Jahr über 1,1 Millionen Schüler*innen teure
          Nachhilfe in Anspruch nehmen? Die Corona-Pandemie hat den Bedarf noch
          größer gemacht. Aber nicht jede Familie kann sich das leisten!
        </p>
        <p className="serlo-p special-hyphens-initial leading-6">
          Mit unserer freien Lernplattform Serlo schaffen wir Zugang zu
          hochwertigen Lernmaterialien für{' '}
          <b>alle Schüler*innen komplett kostenlos</b>.
        </p>
        <p className="serlo-p special-hyphens-initial leading-6 font-bold">
          Mit deiner Spende, groß oder klein, kannst du diese Arbeit
          unterstützen.
        </p>
      </div>
    ),
    call: 'Wusstest du schon …',
    imageSrc: '/_assets/img/donations/donation-bird.svg',
  },
  {
    id: 'banner-B2',
    isLong: false,
    text: (
      <div className="text-left">
        <p className="serlo-p special-hyphens-initial leading-6">
          … dass wir alle Inhalte auf Serlo ehrenamtlich erstellen? Hier
          engagieren sich hunderte Lehrkräfte, Lehramtsstudierende und
          Pädagog*innen für das gemeinsame Ziel:{' '}
          <b>
            Kostenloser Zugang zu hochwertigen Lernmaterialien – für alle
            Schüler*innen
          </b>
          .
        </p>
        <p className="serlo-p special-hyphens-initial leading-6">
          Als nächstes möchten wir gerne weitere Übungsformate für Serlo
          entwickeln, die Nutzbarkeit auf Smartphones verbessern und es
          Schüler*innen ermöglichen, eigene Lernziele zu definieren und ihren
          eigenen Lernstand zu speichern.
        </p>
        <p className="serlo-p special-hyphens-initial leading-6 font-bold">
          Unterstütze uns, Serlo noch besser zu machen!
        </p>
      </div>
    ),
    call: 'Wusstest du schon …',
    imageSrc: '/_assets/img/donations/donation-bird.svg',
    buttonText: '',
    roles: [],
    username: '',
  },
  {
    id: 'banner-testimonial-WandaPaetzold',
    isLong: false,
    text: (
      <p className="my-5 font-handwritten mx-side text-[1.05em] text-truegray-700 leading-[2.2rem]">
        „ Ich unterstütze Serlo, da ich der Meinung bin, dass ein einfacher
        Zugang zu Bildung ohne Bezahlung und Werbung ein Grundrecht für jede*n
        ist und Serlo ermöglicht es mir als Lehrerin, für viel mehr Menschen
        Wissen zu teilen und zu vermitteln.“
      </p>
    ),
    call: '',
    buttonText: 'Jetzt auch spenden',
    roles: ['Lehrerin', 'Spenderin'],
    username: 'WandaPaetzold',
    imageSrc: 'https://community.serlo.org/avatar/WandaPaetzold',
  },
  {
    id: 'banner-testimonial-Maria_F',
    isLong: false,
    text: (
      <div className="text-left">
        <p className="my-5 font-handwritten mx-side text-[1.05em] text-truegray-700 leading-[2.2rem]">
          „ Ich nutze Serlo gern in meinem Unterricht, weil es mir bei der
          Differenzierung hilft. Ich weiß, dass ich mich auf die Qualität der
          Inhalte verlassen kann.
          <br />
          <br />
          Deswegen unterstütze ich Serlo gern mit einer Spende.“
        </p>
      </div>
    ),
    call: '',
    buttonText: 'Jetzt auch spenden',
    roles: ['Lehrerin', 'Spenderin'],
    username: 'Maria_F',
    imageSrc: 'https://community.serlo.org/avatar/Maria_F',
  },
  {
    id: 'banner-testimonial-Lena',
    isLong: false,
    text: (
      <div className="text-left">
        <p className="my-5 font-handwritten mx-side text-[1.05em] text-truegray-700 leading-[2.2rem]">
          „ Bildung für alle - und das kostenfrei.
          <br />
          Ein so wichtiges Ziel, um der (Chancen-)Gerechtigkeit unserer
          Gesellschaft ein Stück näher zu kommen!
          <br />
          <br />
          Danke an all die Menschen, die das möglich machen!“
        </p>
      </div>
    ),
    call: '',
    buttonText: 'Jetzt auch spenden',
    roles: ['Spenderin'],
    username: 'Lena',
    imageSrc: '/_assets/img/donations/lena.jpg',
  },
  {
    id: 'banner-testimonial-Daniel-Flueck',
    isLong: false,
    text: (
      <div className="text-left">
        <p className="my-5 font-handwritten mx-side text-[1.05em] text-truegray-700 leading-[2.2rem]">
          „ Ich wünsche mir eine Welt, wo nicht nur Wissen sondern auch der Weg,
          um Wissen zu erlangen, frei verfügbar ist. <br />
          Ich hoffe, dass die Bewegung von ‚Open Educational Resources‘ auch
          eine moderne Didaktik immer mehr in die Klassenzimmer trägt.“
        </p>
      </div>
    ),
    call: '',
    buttonText: 'Jetzt auch spenden',
    roles: ['Spender'],
    username: 'Daniel-Flueck',
    imageSrc: 'https://community.serlo.org/avatar/Daniel-Flueck',
  },
]

const courseBanner = {
  id: 'banner-course-1',
  isLong: false,
  call: 'Hat dir dieser Kurs weitergeholfen?',
  text: (
    <div className="text-left">
      <p className="serlo-p special-hyphens-initial leading-6">
        Wir möchten <b>mehr kleinschrittige Kurse</b> entwickeln, die
        Nutzbarkeit auf Smartphones verbessern und es Schüler*innen ermöglichen,
        eigene Lernziele zu definieren und ihren eigenen Lernstand zu speichern.
      </p>
      <p className="serlo-p special-hyphens-initial leading-6">
        All das kostet Geld. Und weil Serlo als gemeinnütziges Projekt für immer
        kostenlos und frei von Werbung bleiben wird, sind wir auf Spenden
        angewiesen.
      </p>
      <p className="serlo-p special-hyphens-initial leading-6 font-bold">
        Es wäre großartig, wenn du uns hilfst, Serlo noch besser zu machen!
      </p>
    </div>
  ),
  imageSrc: '/_assets/img/donations/donation-bird.svg',
  buttonText: '',
  roles: [],
  username: '',
}

type Banner = typeof articleBanners[number]

export interface DonationsBannerProps {
  id: number
  entityData: EntityData
}

export function DonationsBanner({ id, entityData }: DonationsBannerProps) {
  const [banner, setBanner] = useState<Banner | undefined>(undefined)
  const bannerRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const { lang } = useInstanceData()

  useEffect(() => {
    globalThis.hack__id = id

    const isCourse = entityData.typename === UuidType.CoursePage
    const isLastCoursePage =
      isCourse &&
      entityData.courseData &&
      entityData.courseData.pages.length === entityData.courseData.index + 1

    const chanceShow = isCourse ? true : Math.random() < reducedChance

    const showOnType =
      isLastCoursePage ||
      entityData.typename === UuidType.Article ||
      entityData.typename === UuidType.TaxonomyTerm

    const hiddenByUser =
      sessionStorage.getItem(hideDonationBannerKey) === 'true'

    if (lang !== Instance.De || !showOnType || !chanceShow || hiddenByUser) {
      setBanner(undefined)
      return undefined
    }

    setBanner(
      isCourse
        ? courseBanner
        : articleBanners[Math.floor(Math.random() * articleBanners.length)]
    )

    const horizon = document.getElementById('horizon')
    if (horizon) horizon.style.display = 'none'

    // rerole on entity change
  }, [setBanner, id, lang, entityData])

  if (!banner) return null

  const isTestimonial = banner.id.startsWith('banner-testimonial')

  return (
    <Lazy slim>
      <aside
        ref={bannerRef}
        onLoad={() => {
          const observer = new IntersectionObserver((entries, _observer) => {
            const entry = entries[0]
            if (
              entry.isIntersecting &&
              globalThis.hack__lastId !== globalThis.hack__id
            ) {
              globalThis.hack__lastId = globalThis.hack__id
              submitEvent(`spenden-seen-${banner.id}`)
            }
          })
          if (bannerRef.current) observer.observe(bannerRef.current)
        }}
        className={clsx(
          'w-[100vw] relative py-6 px-side text-center text-xl overflow-x-hidden',
          'bg-[url("/_assets/img/landing/about-container.svg")] bg-no-repeat bg-bottom bg-[length:100vw_100%]',
          'sm:flex sm:justify-between sm:text-left sm:-mx-2 sm:px-0',
          'sm:max-w-[100vw] lg:text-2xl lg:py-10 lg:my-16',
          'bg-[url("/_assets/img/landing/about-container.svg")]'
        )}
      >
        {renderHideButton()}
        <figure className="mx-auto mt-6 max-w-[22rem] sm:mr-0 sm:max-w-[15rem] text-center">
          <img
            src={banner.imageSrc}
            className={clsx(
              ' sm:h-fit',
              isTestimonial
                ? 'rounded-full max-w-[12rem] sm:mt-2 sm:p-3'
                : 'scale-x-[-1] sm:px-3 px-16'
            )}
          />
          {isTestimonial ? (
            <>
              <p className="text-base mt-1 font-bold text-gray-700">
                @{banner.username}
              </p>
              {renderRoles(banner.roles)}
            </>
          ) : null}
        </figure>
        <div className="max-w-2xl mx-auto px-side sm:mt-5 sm:ml-0">
          <p className="my-5 font-handwritten mx-side text-[1.32em] text-brand">
            {banner.call}
          </p>
          <div className="">{banner.text}</div>

          <p className="block mb-6 mx-auto sm:mb-10 sm:ml-side lg:mb-24">
            <button
              className="serlo-button-green"
              onClick={() => {
                submitEvent(`spenden-clicked-${banner.id}`)
                void router.push('/spenden')
              }}
            >
              {banner.buttonText ? banner.buttonText : 'Jetzt spenden'}{' '}
            </button>
          </p>
        </div>
      </aside>
      <style jsx>{`
        aside {
          left: calc(-50vw + 50%);
        }
        @media (min-width: 800px) {
          aside {
            left: -51px;
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
    </Lazy>
  )

  function renderHideButton() {
    return (
      <button
        title="Banner verstecken"
        onClick={() => {
          sessionStorage.setItem(hideDonationBannerKey, 'true')
          setBanner(undefined)
        }}
        className="serlo-button-blue-transparent absolute right-6  bg-[rgba(0,0,0,0.05)] text-truegray-600 w-8 h-8"
      >
        <FaIcon icon={faTimes} />
      </button>
    )
  }

  function renderRoles(roles: string[] | undefined) {
    if (!roles) return null

    return (
      <b className="block text-[16px] text-brand -mt-1">{roles.join(', ')}</b>
    )
  }
}
