import { faTimes } from '@fortawesome/free-solid-svg-icons'
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

  const noComments =
    page.kind === 'single-entity' &&
    (page.entityData.typename === UuidType.Page ||
      page.entityData.typename === UuidType.GroupedExercise ||
      page.entityData.typename === UuidType.Exercise)

  return (
    <ABProvider value={abValue}>
      {survey && (
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
              href="/mathe/298181/einhorn-der-mathematik-%C3%BCbersicht-aller-episoden"
              className="group"
            >
              <div>
                <div className="mt-10">
                  <p>
                    <button className="text-3xl">
                      Internationaler Tag der Mathematik
                    </button>
                  </p>

                  <p className="mt-3 max-w-[400px] text-lg">
                    Feiere zusammen mit uns diesen Tag und erlebe die Mathematik
                    von ihrer spielerischen Seite.
                  </p>
                  <p className="mt-4">
                    <button className="rounded-full bg-pink-600 px-4 py-2 font-bold text-white transition-colors group-hover:bg-pink-500">
                      Zum Einhorn der Mathematik
                    </button>
                  </p>
                </div>
              </div>
            </a>

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/mathe/298181/einhorn-der-mathematik-%C3%BCbersicht-aller-episoden">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src="https://assets.serlo.org/e16a66c0-c26b-11ee-b6d8-a1dea02dc7c7/einhorndermathematikC3BCbersichtallerepisoden.png"
                  alt="Einhorn der Mathematik"
                  className="mb-10 ml-8 mt-14 h-36"
                />
              </div>
            </a>
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
        asBackButton={
          page.kind === 'single-entity' &&
          page.entityData.typename === UuidType.GroupedExercise
        }
      />
    )
  }

  function triggerPopup() {
    // pop-up already visible
    if (survey) {
      return
    }

    if (lang !== Instance.De) {
      return
    }

    if (!asPath.startsWith('/mathe/')) {
      return
    }

    if (asPath.includes('einhorn-der-mathematik')) {
      return
    }

    setSurvey(true)

    /*
    // pop-up already shown - but only for production
    if (Cookies.get('serlo-survey-beta-123-shown')) {
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
    */
  }
}
