import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

import { HSpace } from './content/h-space'
import { Horizon } from './content/horizon'
import { Lazy } from './content/lazy'
import { HeadTags } from './head-tags'
import { Breadcrumbs } from './navigation/breadcrumbs'
import { MaxWidthDiv } from './navigation/max-width-div'
import { MetaMenu } from './navigation/meta-menu'
import { NewsletterPopup } from './scripts/newsletter-popup'
import { CommentAreaProps } from '@/components/comments/comment-area'
import { EntityPageBase, SingleEntityPage, TaxonomyPage } from '@/data-types'

export interface EntityBaseProps {
  children: ReactNode
  page: (SingleEntityPage | TaxonomyPage) & EntityPageBase
  entityId: number
}

const CommentArea = dynamic<CommentAreaProps>(() =>
  import('@/components/comments/comment-area').then((mod) => mod.CommentArea)
)

export function EntityBase({ children, page, entityId }: EntityBaseProps) {
  const noComments =
    page.kind === 'single-entity' && page.entityData.typename === 'Page'

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
          {renderBreadcrumbs()}
          <main className="min-h-half">{children}</main>

          {!noComments && <CommentArea id={entityId} />}

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

  function renderBreadcrumbs() {
    return (
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
    )
  }
}
