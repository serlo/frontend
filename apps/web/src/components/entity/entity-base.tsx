import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'

import type { CommentAreaEntityProps } from '../comments/comment-area-entity'
import { HSpace } from '../content/h-space'
import { Horizon } from '../content/horizon'
import { Lazy } from '../content/lazy'
import { HeadTags } from '../head-tags'
import { JsonLd } from '../json-ld'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { MaxWidthDiv } from '../navigation/max-width-div'
import { SecondaryMenu } from '../navigation/secondary-menu'
import { NewsletterPopup } from '../scripts/newsletter-popup'
import type { DonationsBannerProps } from '@/components/content/donations-banner-experiment/donations-banner'
import { ABProvider, useABValue } from '@/contexts/ab'
import {
  type EntityPageBase,
  type SingleEntityPage,
  type TaxonomyPage,
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
  const abValue = useABValue(entityId)

  const noComments =
    page.kind === 'single-entity' &&
    (page.entityData.typename === UuidType.Page ||
      page.entityData.typename === UuidType.Exercise)

  return (
    <ABProvider value={abValue}>
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
    </ABProvider>
  )
}
