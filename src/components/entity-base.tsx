import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

import { CommentAreaEntityProps } from './comments/comment-area-entity'
import { HSpace } from './content/h-space'
import { Horizon } from './content/horizon'
import { Lazy } from './content/lazy'
import { HeadTags } from './head-tags'
import { JsonLd } from './json-ld'
import { Breadcrumbs } from './navigation/breadcrumbs'
import { MaxWidthDiv } from './navigation/max-width-div'
import { MetaMenu } from './navigation/meta-menu'
import { NewsletterPopup } from './scripts/newsletter-popup'
import { EntityPageBase, SingleEntityPage, TaxonomyPage } from '@/data-types'

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

export function EntityBase({ children, page, entityId }: EntityBaseProps) {
  const noComments =
    page.kind === 'single-entity' &&
    (page.entityData.typename === 'Page' ||
      page.entityData.typename === 'GroupedExercise')

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
      {page.kind === 'single-entity' || page.kind === 'taxonomy' ? (
        <JsonLd data={page} id={entityId} />
      ) : null}
      {page.newsletterPopup && <NewsletterPopup />}
      <div className="relative">
        <MaxWidthDiv showNav={!!page.secondaryNavigationData}>
          {renderBreadcrumbs()}
          <main>{children}</main>
          {!noComments && (
            <>
              <div id="comment-area-begin-scrollpoint" />
              <Lazy>
                <CommentAreaEntity entityId={entityId} />
              </Lazy>
            </>
          )}
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
