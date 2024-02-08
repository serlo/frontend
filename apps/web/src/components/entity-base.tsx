import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { type ReactNode, useEffect, useState } from 'react'

import type { CommentAreaEntityProps } from './comments/comment-area-entity'
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
import { ABProvider, useABValue } from '@/contexts/ab'
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
  const abValue = useABValue(entityId)

  const { asPath } = useRouter()
  const { lang } = useInstanceData()

  const [survey, setSurvey] = useState(false)
  const [answers] = useState(
    shuffleArray([
      <button
        key="yes"
        className="serlo-button-blue w-24"
        onClick={() => {
          handleModalInput('yes')
        }}
      >
        JA
      </button>,
      <button
        key="rarely"
        className="serlo-button-blue w-24"
        onClick={() => {
          handleModalInput('rarely')
        }}
      >
        SELTEN
      </button>,
      <button
        key="no"
        className="serlo-button-blue w-24"
        onClick={() => {
          handleModalInput('no')
        }}
      >
        NEIN
      </button>,
    ])
  )

  function handler(e: KeyboardEvent) {
    if (e.key === 'Escape' && survey) {
      handleModalInput('exit')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerPopup()
    }, 20000)

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
    <ABProvider value={abValue}>
      {survey && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30">
          <div className="relative z-[1200] mx-side w-[500px] rounded-xl bg-white text-center">
            <button
              className="serlo-button-blue absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full"
              onClick={() => {
                handleModalInput('exit')
              }}
            >
              <FaIcon icon={faTimes} className="text-2xl text-white"></FaIcon>
            </button>
            <p className="mx-side mt-4 italic text-almost-black">
              Wir stellen regelmäßig Fragen auf der Plattform, um unser
              Lernangebot für dich weiter zu verbessern.
            </p>
            <p className="serlo-p mt-6 text-2xl font-bold">
              Bekommst du zu Hause Hilfe, wenn du beim Lernen nicht
              weiterkommst?
            </p>

            <p className="flex justify-around">{answers}</p>

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
    </ABProvider>
  )

  function renderBreadcrumbs() {
    return (
      <Breadcrumbs
        data={page.breadcrumbsData}
        isTaxonomy={
          page.kind !== 'single-entity' &&
          !(page.metaData?.contentType === 'topic-folder')
        }
      />
    )
  }

  function triggerPopup() {
    // pop-up already visible
    if (survey) {
      return
    }

    // pop-up already shown - but only for production
    if (Cookies.get('serlo-survey-beta-123-shown')) {
      return
    }

    // only in german version
    if (lang !== Instance.De) {
      return
    }

    const startDate = new Date('2023-07-22T00:00:00+02:00')
    const endDate = new Date('2023-07-24T00:00:00+02:00')

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
    submitEvent('show')
    document.addEventListener('keydown', handler)
  }

  function handleModalInput(
    event: 'exit' | 'yes' | 'no' | 'rarely' | 'noStudent'
  ) {
    submitEvent(event)
    setSurvey(false)
    document.removeEventListener('keydown', handler)
  }

  function submitEvent(event: string) {
    void (async () => {
      await fetch('/api/frontend/survey-submission', {
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
