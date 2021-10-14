import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { AddRevision, AddRevisionProps } from '@/components/pages/add-revision'
import { fetchEditorData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<AddRevisionProps>((props) => (
  <FrontendClientBase noContainers loadLoggedInData>
    {props.type === 'error' ? 'whoops' : <AddRevision {...props} />}
  </FrontendClientBase>
))

export const getServerSideProps: GetServerSideProps<AddRevisionProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)

  const { type, initialState } = await fetchEditorData(
    '/' + context.locale! + '/' + id.toString()
  )

  return {
    props: {
      initialState,
      type,
    },
  }
}
