import { faTimes } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
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
import {
  EntityPageBase,
  SingleEntityPage,
  TaxonomyPage,
  UuidType,
} from '@/data-types'

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
  const [survey, setSurvey] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSurvey(true)
    }, 20000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const noComments =
    page.kind === 'single-entity' &&
    (page.entityData.typename === UuidType.Page ||
      page.entityData.typename === UuidType.GroupedExercise)

  return (
    <>
      {survey && (
        <div className="fixed inset-0 bg-black/30 z-[1000] flex justify-center items-center">
          <div className="h-[300px] w-[500px] bg-white z-[1200] rounded-xl relative mx-side">
            <button className="-right-3 -top-3 w-12 h-12 rounded-full absolute serlo-button-blue flex justify-center items-center">
              <FaIcon icon={faTimes} className="text-2xl text-white"></FaIcon>
            </button>
            <p className="text-almost-black mx-side mt-4">
              Wir stellen regelmäßig Fragen auf der Plattform, um unser
              Lernangebot für dich weiter zu verbessern.
            </p>
            <p className="serlo-p italic text-2xl mt-6">
              Bekommst du zu Hause Hilfe, wenn du beim Lernen nicht
              weiterkommst?
            </p>

            <p className="flex justify-around">
              <button className="serlo-button-blue w-24">JA</button>
              <button className="serlo-button-blue w-24">NEIN</button>
            </p>

            <p className="text-center mt-8">
              <button className="hover:underline">
                Ich bin keine Schüler*in.
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
}
