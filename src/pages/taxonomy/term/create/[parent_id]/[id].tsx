import { FrontendClientBase } from '@/components/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  return (
    <FrontendClientBase
      noContainers
      loadLoggedInData /* warn: enables preview editor without login */
    >
      <div className="relative">
        <MaxWidthDiv>
          <main>{/* TODO <AddRevision  /> */}</main>
        </MaxWidthDiv>{' '}
      </div>
    </FrontendClientBase>
  )
})

// TODO
