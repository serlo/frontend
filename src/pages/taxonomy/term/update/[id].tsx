import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { EditorPageData, fetchEditorData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      loadLoggedInData /* warn: enables preview editor without login */
    >
      <div className="relative">
        <MaxWidthDiv>
          <main>
            <AddRevision {...props} />
          </main>
        </MaxWidthDiv>{' '}
      </div>
    </FrontendClientBase>
  )
})

export const getServerSideProps: GetServerSideProps<EditorPageData> = async (
  context
) => {
  // for me it always returns as an array of strings. not sure why the type differs here.
  const result = await fetchEditorData(context.locale!, [context.params?.id] as
    | string[]
    | undefined)

  if (result.errorType == 'failed-fetch') {
    return { notFound: true }
  }

  return {
    props: result,
  }
}
