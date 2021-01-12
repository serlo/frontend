import React from 'react'

import { HSpace } from './content/h-space'
import { Horizon } from './content/horizon'
import { Lazy } from './content/lazy'
import { HeadTags } from './head-tags'
import { Breadcrumbs } from './navigation/breadcrumbs'
import { MaxWidthDiv } from './navigation/max-width-div'
import { MetaMenu } from './navigation/meta-menu'
import { RelativeContainer } from './navigation/relative-container'
import { NewsletterPopup } from './scripts/newsletter-popup'
import { EntityPageBase, PageData } from '@/data-types'

export interface EntityBaseProps {
  children: React.ReactNode
  page: PageData & EntityPageBase
}

export function EntityBase({ children, page }: EntityBaseProps) {
  return (
    <>
      {page.secondaryNavigationData && (
        <MetaMenu data={page.secondaryNavigationData} />
      )}
      {page.metaData && <HeadTags data={page.metaData} />}
      {page.newsletterPopup && <NewsletterPopup />}
      <RelativeContainer>
        <MaxWidthDiv showNav={!!page.secondaryNavigationData}>
          <Breadcrumbs
            data={page.breadcrumbsData}
            isTaxonomy={
              page.kind !== 'single-entity' &&
              !(page.metaData?.contentType == 'topic-folder')
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
      </RelativeContainer>
    </>
  )
}
