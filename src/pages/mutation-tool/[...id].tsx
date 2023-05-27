import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MutationPreview } from '@/components/pages/mutation-tool/preview'
import { EditorPageData, fetchEditorData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { EdtrPluginTable, EdtrState } from '@/schema/edtr-io-types'

export default renderedPageNoHooks<EditorPageData>((props) => {
  const state = props.initialState.state as {} | undefined

  if (!state || !Object.hasOwn(state, 'content')) return <>invalid</>

  const tables: EdtrPluginTable[] = []

  function getTables(data?: EdtrState) {
    if (!data) return
    if (Array.isArray(data)) data.forEach(getTables)
    const node = data as EdtrState

    if (node.plugin === 'table') {
      tables.push(node)
    }
    //@ts-expect-error 🤷
    if (Object.hasOwn(node, 'content')) getTables(node.content as EdtrState)
    //@ts-expect-error 🤷
    if (Object.hasOwn(node, 'steps')) getTables(node.steps as EdtrState)
    if (!(node.state instanceof String)) getTables(node.state as EdtrState)
  }

  //@ts-expect-error 🤷
  const content = JSON.parse(state.content as string) as EdtrState

  getTables(content)

  return (
    <FrontendClientBase noContainers loadLoggedInData entityId={props.id}>
      <MutationPreview tablesState={tables} />
    </FrontendClientBase>
  )
})

export const getServerSideProps: GetServerSideProps<EditorPageData> = async (
  context
) => {
  const result = await fetchEditorData(
    context.locale!,
    context.params?.id as string[] | undefined
  )

  if (result.errorType === 'failed-fetch') return { notFound: true }

  return { props: result }
}
