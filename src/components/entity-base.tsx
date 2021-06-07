import * as React from 'react'

import { HSpace } from './content/h-space'
import { Horizon } from './content/horizon'
import { Lazy } from './content/lazy'
import { HeadTags } from './head-tags'
import { Breadcrumbs } from './navigation/breadcrumbs'
import { MaxWidthDiv } from './navigation/max-width-div'
import { MetaMenu } from './navigation/meta-menu'
import { NewsletterPopup } from './scripts/newsletter-popup'
import { EntityPageBase, SlugPageData } from '@/data-types'

export interface EntityBaseProps {
  children: React.ReactNode
  page: SlugPageData & EntityPageBase
}

export function EntityBase({ children, page }: EntityBaseProps) {
  return (
    <>
      {page.secondaryNavigationData && (
        <MetaMenu data={page.secondaryNavigationData} />
      )}
      {page.metaData && (
        <HeadTags
          data={page.metaData}
          breadcrumbsData={page.breadcrumbsData}
          noindex={'entityData' in page && page.entityData.trashed}
        />
      )}
      {page.newsletterPopup && <NewsletterPopup />}
      <div className="relative">
        <MaxWidthDiv showNav={!!page.secondaryNavigationData}>
          <Breadcrumbs
            data={page.breadcrumbsData}
            isTaxonomy={
              page.kind !== 'single-entity' &&
              !(page.metaData?.contentType == 'topic-folder')
            }
            asBackButton={
              page.kind == 'single-entity' &&
              page.entityData.typename == 'GroupedExercise'
            }
          />
          <main>{children}</main>
          <HSpace amount={40} />
          {page.horizonData && (
            <Lazy>
              <Horizon data={page.horizonData} />
            </Lazy>
          )}
        </MaxWidthDiv>
      </div>
    </>
  )
}
