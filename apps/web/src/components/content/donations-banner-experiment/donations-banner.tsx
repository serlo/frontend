import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { Lazy } from '../lazy'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, UuidType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
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
        <p className="serlo-p hyphens-manual leading-6">
          … dass in Deutschland pro Jahr über 1,1 Millionen Schüler*innen teure
          Nachhilfe in Anspruch nehmen? Die Corona-Pandemie hat den Bedarf noch
          größer gemacht. Aber nicht jede Familie kann sich das leisten!
        </p>
        <p className="serlo-p hyphens-manual leading-6">
          Mit unserer freien Lernplattform Serlo schaffen wir Zugang zu
          hochwertigen Lernmaterialien für{' '}
          <b>alle Schüler*innen komplett kostenlos</b>.
        </p>
        <p className="serlo-p hyphens-manual font-bold leading-6">
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
        <p className="serlo-p hyphens-manual leading-6">
          … dass wir alle Inhalte auf Serlo ehrenamtlich erstellen? Hier
          engagieren sich hunderte Lehrkräfte, Lehramtsstudierende und
          Pädagog*innen für das gemeinsame Ziel:{' '}
          <b>
            Kostenloser Zugang zu hochwertigen Lernmaterialien – für alle
            Schüler*innen
          </b>
          .
        </p>
        <p className="serlo-p hyphens-manual leading-6">
          Als nächstes möchten wir gerne weitere Übungsformate für Serlo
          entwickeln, die Nutzbarkeit auf Smartphones verbessern und es
          Schüler*innen ermöglichen, eigene Lernziele zu definieren und ihren
          eigenen Lernstand zu speichern.
        </p>
        <p className="serlo-p hyphens-manual font-bold leading-6">
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
      <p className="mx-side my-5 font-handwritten text-[1.05em] leading-[2.2rem] text-almost-black">
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
        <p className="mx-side my-5 font-handwritten text-[1.05em] leading-[2.2rem] text-almost-black">
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
        <p className="mx-side my-5 font-handwritten text-[1.05em] leading-[2.2rem] text-almost-black">
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
        <p className="mx-side my-5 font-handwritten text-[1.05em] leading-[2.2rem] text-almost-black">
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
      <p className="serlo-p hyphens-manual leading-6">
        Wir möchten <b>mehr kleinschrittige Kurse</b> entwickeln, die
        Nutzbarkeit auf Smartphones verbessern und es Schüler*innen ermöglichen,
        eigene Lernziele zu definieren und ihren eigenen Lernstand zu speichern.
      </p>
      <p className="serlo-p hyphens-manual leading-6">
        All das kostet Geld. Und weil Serlo als gemeinnütziges Projekt für immer
        kostenlos und frei von Werbung bleiben wird, sind wir auf Spenden
        angewiesen.
      </p>
      <p className="serlo-p hyphens-manual font-bold leading-6">
        Es wäre großartig, wenn du uns hilfst, Serlo noch besser zu machen!
      </p>
    </div>
  ),
  imageSrc: '/_assets/img/donations/donation-bird.svg',
  buttonText: '',
  roles: [],
  username: '',
}

type Banner = (typeof articleBanners)[number]

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
        className={cn(`
            relative w-[100vw] overflow-x-hidden bg-[url("/_assets/img/landing/about-container.svg")] 
            bg-[url("/_assets/img/landing/about-container.svg")] bg-[length:100vw_100%] bg-bottom bg-no-repeat 
            px-side py-6 text-center
            text-xl sm:-mx-2 sm:flex sm:max-w-[100vw] sm:justify-between
            sm:px-0 sm:text-left lg:my-16 lg:py-10 lg:text-2xl
          `)}
      >
        {renderHideButton()}
        <figure className="mx-auto mt-6 max-w-[22rem] text-center sm:mr-0 sm:max-w-[15rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.imageSrc}
            onLoad={() => {
              const observer = new IntersectionObserver(
                (entries, _observer) => {
                  const entry = entries[0]
                  if (
                    entry.isIntersecting &&
                    globalThis.hack__lastId !== globalThis.hack__id
                  ) {
                    globalThis.hack__lastId = globalThis.hack__id
                    submitEvent(`spenden-seen-${banner.id}`)
                  }
                }
              )
              if (bannerRef.current) observer.observe(bannerRef.current)
            }}
            className={cn(
              'mx-auto mb-3',
              isTestimonial
                ? 'max-w-[12rem] rounded-full sm:mt-2 sm:p-3'
                : 'scale-x-[-1] px-16 sm:px-3'
            )}
          />
          {isTestimonial ? (
            <>
              <p className="mt-1 text-base font-bold text-gray-700">
                @{banner.username}
              </p>
              {renderRoles(banner.roles)}
            </>
          ) : null}
        </figure>
        <div className="mx-auto max-w-2xl px-side sm:ml-0 sm:mt-5">
          <p className="mx-side my-5 font-handwritten text-[1.32em] text-brand">
            {banner.call}
          </p>
          <div className="text-center sm:text-left">{banner.text}</div>

          <p className="mx-auto mb-6 block sm:mb-10 sm:ml-side lg:mb-24">
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
            /*zoom: 1.15;*/
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
        className="serlo-button-blue-transparent absolute right-6  h-8 w-8 bg-[rgba(0,0,0,0.05)] text-gray-600"
      >
        <FaIcon icon={faTimes} />
      </button>
    )
  }

  function renderRoles(roles: string[] | undefined) {
    if (!roles) return null

    return (
      <b className="-mt-1 block text-[16px] text-brand">{roles.join(', ')}</b>
    )
  }
}
