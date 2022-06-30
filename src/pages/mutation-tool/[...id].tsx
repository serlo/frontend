import { NewNode } from '@edtr-io/plugin-text'
import { converter } from '@serlo/markdown'
import { parseDOM } from 'htmlparser2'
import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { EditorPageData, fetchEditorData } from '@/fetcher/fetch-editor-data'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { renderNested } from '@/schema/article-renderer'
import { convert } from '@/schema/convert-edtr-io-state'
import { EdtrPluginSerloTable, EdtrState } from '@/schema/edtr-io-types'

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

interface LegacyNode {
  type: string
  name: string
  attribs: {
    class?: string
    href?: string
    src?: string
    alt?: string
    id?: string
  }
  children: LegacyNode[]
  text?: string
  data?: string
}

type Col = EdtrPluginSerloTable['state']['rows'][0]['columns'][0]

function convertTable(html: string): EdtrPluginSerloTable | undefined {
  const dom = parseDOM(html) as unknown as LegacyNode[]

  const table = dom[0].children.filter((child) => child.type === 'tag')[0]
  if (!table || table.name !== 'table') return undefined

  const tHeadAndTBody = table.children.filter((child) => child.type === 'tag')
  if (tHeadAndTBody.length !== 2) return undefined

  const rows = [
    ...tHeadAndTBody[0].children,
    ...tHeadAndTBody[1].children,
  ].filter((child) => child.type === 'tag')

  const convertedRows = rows.map((row) => {
    const columns = row.children
      .filter((col) => col.type === 'tag')
      .map((col): Col => {
        return {
          content: {
            plugin: 'text',
            state: convertCellContent(col),
          },
        }
      })
    return {
      columns,
    }
  })

  return {
    plugin: 'serloTable',
    state: {
      tableType: 'OnlyColumnHeader',
      rows: convertedRows,
    },
  }
}

function convertCellContent(cell: LegacyNode) {
  if (cell.children.length === 0) return []
  if (cell.children.length > 1 || cell.children[0].name !== 'p') {
    throw 'unknown state'
  }
  const contentNodes = cell.children[0].children

  const converted = contentNodes.map(convertContentNode)
  // console.log([{ type: 'p', children: [converted] }])
  return [{ plugin: 'text', state: [{ type: 'p', children: converted }] }]
}

function convertContentNode(node: LegacyNode): NewNode | [] {
  //handle code? 0: {text: "Test", code: true}

  if (node.type === 'text') return { text: node.data ?? '' }

  if (node.type === 'tag') {
    // console.log(node.name)
    if (node.name === 'br') {
      return { text: ' ' }
    }

    if (node.name === 'strong') {
      return { text: node.children[0].data ?? '', strong: true }
    }

    if (node.name === 'em') {
      return { text: node.children[0].data ?? '', em: true }
    }

    if (node.name === 'a' && node.attribs.href) {
      return {
        type: 'a',
        href: node.attribs.href,
        children: [{ text: node.children[0].data ?? '' }],
      }
    }

    if (node.name === 'span' && node.attribs.class === 'mathInline') {
      if (node.children.length !== 1) {
        console.log('mathInline: unexpected state, skipping')
        return { text: '' }
      }
      const mathContent =
        node.children[0].children[0].data?.replace(/%%/, '') ?? ''
      // not working as expected?!
      return {
        type: 'math',
        src: mathContent,
        inline: true,
        children: [{ text: mathContent }], //???
      }
    }
    console.log('unsupported tag')
    console.log(node.name)
    console.log(node)
    return []
  }

  console.log('unsupported type')
  console.log(node.type)
  console.log(node)

  return { text: 'test' }
}

function Content(props: EditorPageData) {
  // table to serloTable
  function mutateTable(node: EdtrState) {
    if (node.plugin === 'serloTable') {
      // console.log('orig:')
      // console.log(JSON.stringify(node.state.rows[1].columns))
    }
    if (node.plugin === 'table') {
      const html = converter.makeHtml(node.state)
      const result = convertTable(html)

      if (result) {
        mutated.push({ inState: node, outState: result })
      }
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

    // mutateToBox(node)
    // mutateSpoilerTitle(node)
    mutateTable(node)

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
