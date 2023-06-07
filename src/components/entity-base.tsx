import { faPencil, faTimes } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

import { CommentAreaEntityProps } from './comments/comment-area-entity'
import { HSpace } from './content/h-space'
import { Horizon } from './content/horizon'
import { Lazy } from './content/lazy'
import { FaIcon } from './fa-icon'
import { HeadTags } from './head-tags'
import { JsonLd } from './json-ld'
import { Breadcrumbs } from './navigation/breadcrumbs'
import { MaxWidthDiv } from './navigation/max-width-div'
import { SecondaryMenu } from './navigation/secondary-menu'
import { NewsletterPopup } from './scripts/newsletter-popup'
import type { DonationsBannerProps } from '@/components/content/donations-banner-experiment/donations-banner'
import { useInstanceData } from '@/contexts/instance-context'
import {
  EntityPageBase,
  SingleEntityPage,
  TaxonomyPage,
  UuidType,
} from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { isProduction } from '@/helper/is-production'

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

export function EntityBase({ children, page, entityId }: EntityBaseProps) {
  const [popup, setPopup] = useState(false)
  const [button, setButton] = useState(false)
  const [popupClicked, setPopupClicked] = useState(false)
  const [group, setGroup] = useState('')

  const { asPath } = useRouter()
  const { lang } = useInstanceData()

  const startDate = new Date('2023-06-12T00:00:00+02:00')
  const endDate = new Date('2023-06-19T00:00:00+02:00')

  useEffect(() => {
    decideAB()
    triggerButton()
    const timer = setTimeout(() => {
      triggerPopup()
    }, 20000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const noComments =
    page.kind === 'single-entity' &&
    (page.entityData.typename === UuidType.Page ||
      page.entityData.typename === UuidType.GroupedExercise)

  return (
    <>
      {popup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30">
          <div className="relative z-[1200] mx-side w-[500px] rounded-xl bg-white text-center">
            <button
              className="serlo-button-blue absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full"
              onClick={() => {
                setPopup(false)
                if (!popupClicked) {
                  submitEvent('exit-popup-' + group)
                } else {
                  if (isProduction) {
                    Cookies.set('serlo-mitmach-woche-show-button', '1', {
                      expires: endDate,
                      sameSite: 'Lax',
                    })
                  }
                  submitEvent('show-button')
                  setButton(true)
                }
                if (isProduction) {
                  Cookies.set('serlo-mitmach-woche-popup-shown', '1', {
                    expires: 8,
                    sameSite: 'Lax',
                  })
                }
              }}
            >
              <FaIcon icon={faTimes} className="text-2xl text-white"></FaIcon>
            </button>
            {group === 'a' && (
              <>
                <p className="mx-side mt-6 text-3xl italic">
                  Serlo ist zum Mitmachen!
                </p>
                <p className="serlo-p mt-6 text-left text-lg">
                  Wir möchten dich diese Woche einladen, den Editor
                  auszuprobieren und Artikel selbst anzupassen.
                  <br />
                  Deine Änderungen kannst du für dich speichern und gleich im
                  Unterricht einsetzen.
                </p>
              </>
            )}
            {group === 'b' && (
              <>
                <p className="mx-side mt-6 text-3xl font-bold">
                  Artikel für Lerngruppen anpassen und teilen
                </p>
                <p className="serlo-p mt-6 text-left text-lg">
                  Probiere unseren Editor zur Inhaltserstellung aus,
                  <br />
                  speichere deine Anpassungen für deine Lerngruppe und setze sie
                  gleich im Unterricht ein.
                </p>
              </>
            )}
            <p className="mb-8">
              <a
                className="serlo-button-green"
                target="_blank"
                href={`https://frontend-git-poc-remix-serlo.vercel.app/entity/repository/add-revision/${entityId}`}
                rel="noreferrer"
                onClick={() => {
                  submitEvent('click-popup-' + group)
                  setPopupClicked(true)
                }}
              >
                Jetzt ausprobieren!
              </a>
            </p>
          </div>
        </div>
      )}
      {button && (
        <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-[200] flex justify-center">
          <div className="pointer-events-auto">
            <a
              className="serlo-button-green"
              target="_blank"
              href={`https://frontend-git-poc-remix-serlo.vercel.app/entity/repository/add-revision/${entityId}`}
              rel="noreferrer"
              onClick={() => {
                submitEvent('click-button-' + group)
              }}
            >
              <FaIcon icon={faPencil} className="mr-2" />
              {group === 'a' && <>Öffne den Editor zum Ausprobieren</>}
              {group === 'b' && <>Artikel für Lerngruppe anpassen und teilen</>}
            </a>
            <button
              title="Banner verstecken"
              onClick={() => {
                const result = confirm('Nicht mehr anzeigen?')
                if (result) {
                  setButton(false)
                  submitEvent('exit-button-' + group)
                }
              }}
              className="serlo-button-blue-transparent ml-5 h-8 w-8 bg-[rgba(0,0,0,0.05)] text-gray-600"
            >
              <FaIcon icon={faTimes} />
            </button>
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
          noindex={'entityData' in page && page.entityData.trashed}
        />
      )}
      {page.kind === 'single-entity' || page.kind === 'taxonomy' ? (
        <JsonLd data={page} id={entityId} />
      ) : null}
      {page.newsletterPopup && <NewsletterPopup />}
      <div className="relative">
        <MaxWidthDiv showNav={!!page.secondaryMenuData}>
          {renderBreadcrumbs()}
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

  function renderBreadcrumbs() {
    return (
      <Breadcrumbs
        data={page.breadcrumbsData}
        isTaxonomy={
          page.kind !== 'single-entity' &&
          !(page.metaData?.contentType === 'topic-folder')
        }
        asBackButton={
          page.kind === 'single-entity' &&
          page.entityData.typename === UuidType.GroupedExercise
        }
      />
    )
  }

  function triggerPopup() {
    // pop-up already visible
    if (popup) {
      return
    }

    // only for article
    if (
      page.kind !== 'single-entity' ||
      page.entityData.typename !== UuidType.Article
    ) {
      return
    }

    // pop-up already shown - but only for production
    if (Cookies.get('serlo-mitmach-woche-popup-shown')) {
      return
    }

    // only in german version
    if (lang !== Instance.De) {
      return
    }

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

    setPopup(true)
    submitEvent('show-popup-' + Cookies.get('serlo-mitmach-woche-group')!)
  }

  function triggerButton() {
    // in staging, popup is always shown
    if (!isProduction) {
      return
    }

    // only for article
    if (
      page.kind !== 'single-entity' ||
      page.entityData.typename !== UuidType.Article
    ) {
      return
    }

    // only show button if requested
    if (!Cookies.get('serlo-mitmach-woche-show-button')) {
      return
    }

    setButton(true)
    submitEvent('show-button-' + Cookies.get('serlo-mitmach-woche-group')!)
  }

  function decideAB() {
    // always shuffle in preview
    if (!Cookies.get('serlo-mitmach-woche-group') || !isProduction) {
      Cookies.set(
        'serlo-mitmach-woche-group',
        Math.random() < 0.5 ? 'a' : 'b',
        {
          expires: isProduction ? 8 : undefined,
          sameSite: 'Lax',
        }
      )
    }
    setGroup(Cookies.get('serlo-mitmach-woche-group') || 'a')
  }

  function submitEvent(event: string) {
    void (async () => {
      await fetch('/api/frontend/mitmach-woche', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          path: asPath,
          isProduction,
        }),
      })
    })()
  }
}
