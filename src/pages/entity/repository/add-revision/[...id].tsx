import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { ErrorPage } from '@/components/pages/error-page'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  EditorFetchErrorData,
  EditorPageData,
  fetchEditorData,
} from '@/fetcher/fetch-editor-data'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<EditorPageData | EditorFetchErrorData>(
  (props) => {
    const isError = hasOwnPropertyTs(props, 'errorType')

    return (
      <FrontendClientBase
        noContainers
        loadLoggedInData /* warn: enables preview editor without login */
      >
        {isError ? (
          <>
            {props.errorType === 'failed-fetch' ? (
              <ErrorPage
                code={props.code ?? 400}
                message="Error while fetching data"
              />
            ) : (
              <EditorWarning type={props.errorType} />
            )}
          </>
        ) : (
          <>
            <div className="relative">
              <MaxWidthDiv>
                <main>
                  {props.converted ? <EditorWarning converted /> : null}
                  <AddRevision {...props} />
                </main>
              </MaxWidthDiv>{' '}
            </div>
          </>
        )}
      </FrontendClientBase>
    )
  }
)

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

export const getServerSideProps: GetServerSideProps<
  EditorPageData | EditorFetchErrorData
> = async (context) => {
  // for me it always returns as an array of strings. not sure why the type differs here.
  const result = await fetchEditorData(
    context.locale!,
    context.params?.id as string[] | undefined
  )

  return {
    props: result,
  }
}
