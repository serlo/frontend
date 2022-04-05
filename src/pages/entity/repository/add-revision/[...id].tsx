import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { EditorPageData, fetchEditorData } from '@/fetcher/fetch-editor-data'
import { isProduction } from '@/helper/is-production'
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
            <Guard needsAuth={isProduction ? true : undefined} data>
              <>
                {props.converted ? <EditorWarning converted /> : null}
                <AddRevision {...props} />
              </>
            </Guard>
          </main>
        </MaxWidthDiv>{' '}
      </div>
    </FrontendClientBase>
  )
})

function EditorWarning({
  type,
  converted,
}: {
  type?: 'type-unsupported' | 'failure'
  converted?: boolean
}) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  const legacyUrl = window.location.pathname
    .replace('add-revision', 'add-revision-old')
    .replace('create', 'create-old')

  const isFailure = type === 'failure'

  return (
    <StaticInfoPanel icon={faInfoCircle} type="warning">
      <>
        {converted
          ? editorStrings.edtrIo.notConverted
          : isFailure
          ? editorStrings.edtrIo.conversionError
          : editorStrings.edtrIo.notSupportedYet}{' '}
        <br />
        <a href={legacyUrl} className="serlo-link">
          {editorStrings.edtrIo.editInOld}.
        </a>
      </>
    </StaticInfoPanel>
  )
}

export const getServerSideProps: GetServerSideProps<EditorPageData> = async (
  context
) => {
  // for me it always returns as an array of strings. not sure why the type differs here.
  const result = await fetchEditorData(
    context.locale!,
    context.params?.id as string[] | undefined
  )

  if (result.errorType == 'failed-fetch') {
    return { notFound: true }
  }

  return {
    props: result,
  }
}
