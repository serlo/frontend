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
        <div className="fixed bottom-0 left-0 right-0 z-[200] border-t-2 border-gray-300 bg-yellow-100">
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
              href="mailto:tina@serlo.org"
              target="_blank"
              className="group"
              rel="noreferrer"
            >
              <div>
                <div className="brand brand my-6 ml-4 mobileExt:mt-6 sm:mt-10">
                  <div className="mt-3 flex justify-between">
                    <p className="mr-14 text-lg sm:mr-0 sm:max-w-[400px] sm:text-2xl">
                      Bekämpfe die <strong>Ungerechtigkeit</strong> bei der
                      <strong> Prüfungsvorbereitung</strong> als ehrenamtliche*r
                      Matheautor*in!
                    </p>
                  </div>
                  <button className="my-2 inline-flex items-center rounded-lg bg-brand px-3 py-2 text-center text-base font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-base">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 256 256"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32 56C27.6 56 24 59.6 24 64V75.05L110.25 145.85C120.6 154.35 135.45 154.35 145.8 145.85L232 75.05V64C232 59.6 228.4 56 224 56H32ZM24 106.1V192C24 196.4 27.6 200 32 200H224C228.4 200 232 196.4 232 192V106.1L161 164.4C141.8 180.15 114.15 180.15 95 164.4L24 106.1ZM0 64C0 46.35 14.35 32 32 32H224C241.65 32 256 46.35 256 64V192C256 209.65 241.65 224 224 224H32C14.35 224 0 209.65 0 192V64Z"
                        fill="white"
                      />
                    </svg>
                    &nbsp; Melde dich bei tina@serlo.org!
                  </button>
                </div>
              </div>
            </a>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="my-8 mr-8 hidden h-20 mobileExt:h-40 sm:mb-10 sm:ml-4 sm:mt-6 sm:block sm:h-48"
              src="https://assets.serlo.org/f08cdf70-d553-11ee-830e-c731413216ff/image.png"
              alt="Tina"
            />
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

  /*function renderUnicorn() {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages }
        <a href="">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element}
            <img
              src="https://denkspace.de/images/tina.png"
              alt="Einhorn der Mathematik"
              className="h-40 mobileExt:h-28 sm:mb-10 sm:ml-8 sm:mt-14 sm:h-36"
            />
          </div>
        </a>
      </>
    )
  }*/

  function triggerPopup() {
    // pop-up already visible
    if (survey) {
      return
    }

    if (lang !== Instance.De) {
      return
    }

    const isMath =
      asPath.startsWith('/mathe/') ||
      (page.breadcrumbsData &&
        page.breadcrumbsData.some((val) => val.label.includes('Mathematik')))

    if (!isMath) {
      return
    }

    // pop-up already shown
    if (Cookies.get('serlo-call-for-authors')) {
      return
    }

    const startDate = new Date('2024-02-22T00:00:00+02:00')
    const endDate = new Date('2024-03-03T00:00:00+02:00')

    // pop-up will vanish after survey run
    if (Date.now() > endDate.getTime()) {
      return
    }

    // don't show before the start date
    if (Date.now() < startDate.getTime()) {
      return
    }

    Cookies.set('serlo-call-for-authors', '1', {
      expires: 7,
      sameSite: 'Lax',
    })

    setSurvey(true)
  }
}
