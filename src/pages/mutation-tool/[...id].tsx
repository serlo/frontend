// import { converter } from '@serlo/markdown'
import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { EditorPageData, fetchEditorData } from '@/fetcher/fetch-editor-data'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { renderNested } from '@/schema/article-renderer'
import { convert } from '@/schema/convert-edtr-io-state'
// import { convertLegacyState } from '@/schema/convert-legacy-state'
import {
  EdtrPluginBox,
  // EdtrPluginSerloTable,
  EdtrPluginSpoiler,
  // EdtrPluginText,
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

  // table to serloTable
  /*
  function mutateTable(node: EdtrState) {
    if (node.plugin === 'serloTable') {
      // console.log(node)
    }
    if (node.plugin === 'table') {
      const html = converter.makeHtml(node.state)
      // compat: the markdown converter could return all types of content, only use table nodes.
      const children = convertLegacyState(html).children.filter(
        (child) => child.type == 'table'
      )

      //this is a bit stupid because I turn Frontend-States back to Edtr States
      // but it's all typed so it should work

      const trs = children[0].children
        ?.filter((n) => n.type === 'tr')
        .map((row) => {
          return {
            columns: row.children?.map((td) => {
              // const empty = [{ type: 'text', children: [{ text: '' }] }]

              const contentChildren =
                td.children && td.children.length
                  ? td.children[0].children
                  : undefined

              const children = contentChildren?.map(
                (contentNode): EdtrPluginText['state'] => {
                  if (
                    contentNode &&
                    contentNode.type !== 'text' &&
                    contentNode.type !== 'inline-math'
                  ) {
                    console.log(`unsupported content type: ${contentNode.type}`)
                    console.log(contentNode)
                    return []
                    // TODO: handle code? 0: {text: "Test", code: true}
                  }

                  if (contentNode.type === 'text') {
                    return [
                      { type: 'p', children: [{ text: contentNode.text }] },
                    ]
                  }
                  if (contentNode.type === 'inline-math') {
                    return [
                      {
                        // @ts-expect-error for now
                        type: 'p',
                        children: [
                          {
                            text: contentNode.formula,
                            inline: true,
                            type: 'math',
                            // @ts-expect-error for now
                            src: contentNode.formulaSource,
                          },
                        ],
                      },
                    ]
                  }
                  return []
                }
              )
              return {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children }],
                },
              }
            }),
          }
        })

      if (!trs) return

      const mutatedPlugin: EdtrPluginSerloTable = {
        plugin: 'serloTable',
        state: {
          tableType: 'OnlyColumnHeader',
          // @ts-expect-error for now
          rows: trs,
        },
      }
      mutated.push({ inState: node, outState: mutatedPlugin })
    }
  }
*/
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
    // mutateTable(node)

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
