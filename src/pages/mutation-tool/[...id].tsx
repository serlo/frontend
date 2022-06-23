import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { EditorPageData, fetchEditorData } from '@/fetcher/fetch-editor-data'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { renderNested } from '@/schema/article-renderer'
import { convert } from '@/schema/convert-edtr-io-state'
import {
  EdtrPluginBox,
  EdtrPluginSpoiler,
  EdtrState,
} from '@/schema/edtr-io-types'

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase noContainers loadLoggedInData entityId={props.id}>
      <Content {...props} />
    </FrontendClientBase>
  )
})

interface MutatedPlugin {
  inState: EdtrState
  outState: EdtrState
}

function Content(props: EditorPageData) {
  const generatedBoxId = () => `box${Math.floor(10000 + Math.random() * 90000)}`

  // important & quote plugins to box
  function mutateToBox(node: EdtrState) {
    if (node.plugin === 'blockquote' || node.plugin === 'important') {
      const mutatedPlugin: EdtrPluginBox = {
        plugin: 'box',
        state: {
          title: {
            plugin: 'text',
            state: [{ type: 'p', children: [{}] }],
          },
          content: {
            plugin: 'rows',
            state: node.state,
          },
          type: node.plugin === 'blockquote' ? 'quote' : 'blank',
          anchorId: generatedBoxId(),
        },
      }
      mutated.push({ inState: node, outState: mutatedPlugin })
    }
  }

  // TODO: decide on an approach
  // rich text in spoiler title
  function mutateSpoilerTitle(node: EdtrState) {
    if (node.plugin === 'spoiler') {
      const mutatedPlugin: EdtrPluginSpoiler = {
        plugin: node.plugin,
        state: {
          ...node.state,
          title: node.state.title, // ?
          // richTitle: {
          //   plugin: 'text',
          //   state: [{ type: 'p', children: [{ text: node.state.title }] }],
          // },
        },
      }
      mutated.push({ inState: node, outState: mutatedPlugin })
    }
  }

  const mutated: MutatedPlugin[] = []

  const state = props.initialState.state as {} | undefined
  if (state && hasOwnPropertyTs(state, 'content')) {
    const content = JSON.parse(state.content as string) as EdtrState
    parseContent(content)
  }

  return (
    <>
      {mutated.map((node, i) => {
        return (
          <div key={`${node.inState.plugin} ${i}`}>
            <div className="mt-12 py-6 flex border-4">
              <b className="absolute -mt-14">{node.inState.plugin}</b>
              <div className="flex-1">
                {renderNested(convert(node.inState), [''], [''])}
              </div>
              <div className="flex-1">
                {renderNested(convert(node.outState), [''], [''])}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )

  function parseContent(data?: EdtrState) {
    if (!data) return
    if (Array.isArray(data)) data.forEach(parseContent)
    const node = data as EdtrState

    mutateToBox(node)
    mutateSpoilerTitle(node)

    if (hasOwnPropertyTs(node, 'content'))
      parseContent(node.content as EdtrState)
    if (!(node.state instanceof String)) parseContent(node.state as EdtrState)
  }
}

export const getServerSideProps: GetServerSideProps<EditorPageData> = async (
  context
) => {
  // for me it always returns as an array of strings. not sure why the type differs here.
  const result = await fetchEditorData(
    context.locale!,
    context.params?.id as string[] | undefined
  )

  if (result.errorType == 'failed-fetch') return { notFound: true }
  return { props: result }
}
