import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useEffect, useState, type ReactNode } from 'react'

import type { CommentAreaEntityProps } from '../comments/comment-area-entity'
import { HSpace } from '../content/h-space'
import { Horizon } from '../content/horizon'
import { Lazy } from '../content/lazy'
import { FaIcon } from '../fa-icon'
import { HeadTags } from '../head-tags'
import { JsonLd } from '../json-ld'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { MaxWidthDiv } from '../navigation/max-width-div'
import { SecondaryMenu } from '../navigation/secondary-menu'
import { NewsletterPopup } from '../scripts/newsletter-popup'
import type { DonationsBannerProps } from '@/components/content/donations-banner-experiment/donations-banner'
import { useInstanceData } from '@/contexts/instance-context'
import {
  type EntityPageBase,
  type SingleEntityPage,
  type TaxonomyPage,
  UuidType,
} from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { isProduction } from '@/helper/is-production'
import { shuffleArray } from '@/helper/shuffle-array'
import { submitEvent } from '@/helper/submit-event'

export interface EntityBaseProps {
  children: ReactNode
  page: (SingleEntityPage | TaxonomyPage) & EntityPageBase
  entityId: number
}

const CommentAreaEntity = dynamic<CommentAreaEntityProps>(() =>
  import('@/components/comments/comment-area-entity').then(
    (mod) => mod.CommentAreaEntity
  )
)

const DonationsBanner = dynamic<DonationsBannerProps>(() =>
  import(
    '@/components/content/donations-banner-experiment/donations-banner'
  ).then((mod) => mod.DonationsBanner)
)

const ids = [
  //bayern quali
  75678, 290075, 290077, 290131, 290131, 261569, 261570, 261603, 261604, 226922,
  226923, 226928, 226929, 226930, 178169, 178171, 178172, 179069, 179070,
  141779, 141780, 141781, 141782, 141783, 130894, 130897, 130898, 130900,
  130901, 92980, 92981, 92982, 92983, 92984, 75679, 75680, 75681, 75682, 75683,
  77847, 77848, 77849, 77850, 77851,
  // bayern msa
  247427, 293322, 304887, 293323, 293324, 261415, 261417, 261418, 247428,
  247432, 247433, 247429, 247430, 247431,
  // bayern rs 1
  75049, 288940, 288941, 288942, 288943, 288944, 272196, 272220, 272221, 272222,
  272223, 232930, 232931, 232932, 232933, 232934, 180388, 180389, 180390,
  180394, 180395, 146968, 146973, 146974, 146975, 146976, 146967, 146969,
  146970, 146971, 146972, 95100, 103785, 103788, 103794, 104305, 104314, 95101,
  95102, 95103, 95104, 75548, 103797, 104307, 104312, 75051, 75052, 75053,
  75054, 75050, 103769, 103773, 104301, 76758, 76759, 228745, 228746,
  // bayern rs 2
  76750, 288945, 288946, 288947, 288948, 288950, 272224, 272237, 272238, 272239,
  272241, 234076, 234077, 234079, 234080, 234081, 180403, 180422, 180423,
  180424, 180425, 146981, 146982, 146983, 146984, 146985, 139217, 139218,
  140408, 148102, 148103, 94502, 104318, 94503, 94879, 148540, 148541, 76714,
  104310, 104316, 76754, 76755, 76756, 76757, 76717, 104299, 104303, 76760,
  76761, 76762, 76763,
]

const options = [
  ['Wissenslücken erkennen und beheben', 'wissensluecken'],
  ['Viele Aufgaben zum Üben', 'vieleaufgaben'],
  ['Aufgaben, die ich thematisch interessant finde', 'interessanteaufgaben'],
  ['Schwierigkeitsgrad von Aufgaben auswählen können', 'schwierigkeitsgrad'],
  ['Meinen Lernfortschritt sehen', 'lernfortschritt'],
  ['Gute Übersicht über Prüfungsthemen', 'uebersicht'],
  ['Mit Freunden zusammen lernen', 'freunde'],
  [
    'Unterstützung bekommen, wenn man irgendwo hängt/nicht weiterkommt',
    'unterstuetzung',
  ],
  [
    'Gezielte Unterstützung in den letzten Wochen vor der Prüfung',
    'vorpruefung',
  ],
  ['Lernbegleitung während des ganzen Schuljahres', 'lernbegleitung'],
  ['Persönlichen Bezug zur Prüfung herstellen können', 'bezug'],
  ['Lerntipps/Hilfe zur besseren Selbstorganisation', 'lerntipps'],
  ['Hilfe bei Prüfungsangst', 'angst'],
  ['Hilfe im Umgang mit Frust', 'frust'],
  ['Motivationshilfen', 'motivation'],
]

export function EntityBase({ children, page, entityId }: EntityBaseProps) {
  const { lang } = useInstanceData()
  const [survey, setSurvey] = useState(false)
  const [answers] = useState(shuffleArray(options))
  const [selected, setSelected] = useState<string[]>([])

  function handler(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      handleModalInput('exit')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerPopup()
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const noComments =
    page.kind === 'single-entity' &&
    (page.entityData.typename === UuidType.Page ||
      page.entityData.typename === UuidType.Exercise)

  return (
    <>
      {survey && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30">
          <div className="relative z-[1200] mx-side w-[550px] rounded-xl bg-white text-center">
            <button
              className="serlo-button-blue absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full"
              onClick={() => {
                handleModalInput('exit')
              }}
            >
              <FaIcon icon={faTimes} className="text-2xl text-white"></FaIcon>
            </button>
            <p className="mx-side mt-4 italic text-almost-black">
              Wir möchten unser Angebot verbessern und dich optimal
              bei&nbsp;der&nbsp;Prüfungsvorbereitung unterstützen.
            </p>
            <p className="serlo-p mt-6 text-2xl font-bold">
              Was findest du besonders hilfreich, um dich gut auf deine Prüfung
              vorzubereiten?
            </p>

            <p className="-mt-5 mb-5">(Mehrfach-Nennung möglich)</p>

            <div className="mx-12 max-h-[300px] overflow-auto overscroll-none text-left text-lg [&_input]:cursor-pointer [&_label]:cursor-pointer [&_p]:my-2">
              {answers.map(([text, key]) => {
                return (
                  <p key={key}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected.includes(key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (!selected.includes(key)) {
                              setSelected([...selected, key])
                            }
                          } else {
                            setSelected(selected.filter((x) => x !== key))
                          }
                        }}
                      />{' '}
                      {text}
                    </label>
                  </p>
                )
              })}
            </div>

            <p className="mt-6">
              <button
                className="serlo-button-blue"
                onClick={() => {
                  setSurvey(false)
                  document.removeEventListener('keydown', handler)
                  for (const s of selected) {
                    submitEvent(`oam_survey_${s}`)
                  }
                }}
              >
                Abschicken
              </button>
            </p>

            <p className="mb-8 mt-8">
              <button
                className="underline"
                onClick={() => {
                  handleModalInput('noStudent')
                }}
              >
                Ich bin keine Schüler*in
              </button>
            </p>
          </div>
        </div>
      )}
      {page.secondaryMenuData && (
        <SecondaryMenu data={page.secondaryMenuData} />
      )}
      {page.metaData && (
        <HeadTags
          data={page.metaData}
          breadcrumbsData={page.breadcrumbsData}
          noIndex={'entityData' in page && page.entityData.trashed}
        />
      )}
      {page.kind === 'single-entity' || page.kind === 'taxonomy' ? (
        <JsonLd data={page} id={entityId} />
      ) : null}
      {page.newsletterPopup && <NewsletterPopup />}
      <div className="relative">
        <MaxWidthDiv showNav={!!page.secondaryMenuData}>
          <Breadcrumbs
            data={page.breadcrumbsData}
            isTaxonomy={
              page.kind !== 'single-entity' &&
              !(page.metaData?.contentType === 'topic-folder')
            }
          />
          <main id="content">{children}</main>

          {/* Temporary donations banner trial */}
          {page.kind === 'single-entity' ? (
            <DonationsBanner id={entityId} entityData={page.entityData} />
          ) : null}

          <div id="comment-area-begin-scrollpoint" />
          {!noComments && (
            <>
              <Lazy>
                <CommentAreaEntity entityId={entityId} />
              </Lazy>
              <HSpace amount={40} />
            </>
          )}
          {page.horizonData && (
            <>
              <Lazy>
                <Horizon data={page.horizonData} />
              </Lazy>
              <HSpace amount={40} />
            </>
          )}
        </MaxWidthDiv>
      </div>
    </>
  )

  function triggerPopup() {
    // pop-up already visible
    if (survey) {
      return
    }

    if (!ids.includes(entityId)) {
      return
    }

    // not optimized for small screens
    if (window.innerWidth < 600 || window.innerHeight < 800) {
      return
    }

    if (Cookies.get('serlo-survey-beta-123-shown')) {
      // pop-up already shown - but only for production
      return
    }

    // only in german version
    if (lang !== Instance.De) {
      return
    }

    const startDate = new Date('2023-06-10T00:00:00+02:00')
    const endDate = new Date('2024-06-30T00:00:00+02:00')

    // pop-up will vanish after survey run
    if (Date.now() > endDate.getTime()) {
      return
    }

    if (isProduction) {
      // don't show in production before the start date
      if (Date.now() < startDate.getTime()) {
        return
      }
    }

    if (isProduction) {
      Cookies.set('serlo-survey-beta-123-shown', '1', {
        expires: 7,
        sameSite: 'Lax',
      })
    }

    setSurvey(true)
    submitEvent('oam_survey_show')
    document.addEventListener('keydown', handler)
  }

  function handleModalInput(event: 'exit' | 'noStudent') {
    submitEvent(`oam_survey_${event}`)
    setSurvey(false)
    document.removeEventListener('keydown', handler)
  }
}
