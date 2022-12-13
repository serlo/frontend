import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { UuidType } from '@/data-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface TaxonomyTermCreateProps {
  parent: number
}

export default renderedPageNoHooks<TaxonomyTermCreateProps>(({ parent }) => {
  return (
    <FrontendClientBase
      noContainers
      loadLoggedInData /* warn: enables preview editor without login */
    >
      <div className="relative">
        <MaxWidthDiv>
          <main>
            <AddRevision
              type={UuidType.TaxonomyTerm}
              entityNeedsReview={false}
              id={parent}
              initialState={{
                plugin: 'type-taxonomy',
                state: {
                  term: { name: '' },
                  description: '{"plugin":"rows"}',
                },
              }}
              errorType="none"
            />
          </main>
        </MaxWidthDiv>{' '}
      </div>
    </FrontendClientBase>
  )
})

export const getServerSideProps: GetServerSideProps<
  TaxonomyTermCreateProps
> = async (context) => {
  const parent = parseInt((context.params?.id as string) ?? '')
  return {
    props: { parent },
  }
}
