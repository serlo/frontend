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
    // <FrontendClientBase noContainers loadLoggedInData entityId={props.id}>
    <Content {...props} />
    // </FrontendClientBase>
  )
})

interface MutatedPlugin {
  inState: EdtrState
  outState: EdtrState
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
  // const result = await fetchEditorData(
  //   context.locale!,
  //   context.params?.id as string[] | undefined
  // )

  // if (result.errorType == 'failed-fetch') return { notFound: true }

  const result = {
    initialState: {
      plugin: 'type-article',
      state: {
        id: 206397,
        license: {
          id: 1,
          title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0.',
          shortTitle: 'CC BY-SA 4.0',
          url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
          agreement:
            'Mit dem Speichern dieser Seite versicherst du, dass du deinen Beitrag (damit sind auch Änderungen gemeint) selbst verfasst hast bzw. dass er keine fremden Rechte verletzt. Du willigst ein, deinen Beitrag unter der <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">Creative Commons Attribution/Share-Alike Lizenz 4.0</a> und/oder unter einer gleichwertigen Lizenz zu veröffentlichen, welche der Serlo Education e. V. entsprechend der Regelungen in den <a href="/21654">Nutzungsbedingungen</a> festlegen darf. Falls du den Beitrag nicht selbst verfasst hast, muss er unter den <a href="/21654">Nutzungsbedingungen</a> verfügbar sein und du stimmst zu, notwendigen Lizenzanforderungen zu folgen.',
        },
        revision: 249063,
        changes: '',
        title: 'Testseite für Tabellen',
        content:
          '{"plugin":"article","state":{"introduction":{"plugin":"articleIntroduction","state":{"explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"multimedia":{"plugin":"image","state":{"src":"","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Hier kommt eine Tabelle (3-spaltiges Layout):"}]}]},{"plugin":"serloTable","state":{"rows":[{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Neue "}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Tabelle"}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"mit "},{"type":"math","src":"Math","inline":true,"children":[{"text":"Math"}]},{"text":" und so"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"mit "},{"text":"Code","code":true}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"nur Math","inline":true,"children":[{"text":"nur Math"}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"nur Code","code":true}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Bold","strong":true},{"text":" "},{"text":"Italic","em":true}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Zeilenumbruch"}]},{"type":"p","children":[{"text":"asdasd"}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Leer drüber"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"aaai"}]}]}}]}],"tableType":"OnlyColumnHeader"}},{"plugin":"text","state":[{"type":"p","children":[{}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Wieso werden die Änderungen im neuen Frontend nicht angezeigt??"}]}]},{"plugin":"table","state":"|Title|Seite|Hier|\\n|||\\n|Test|So<br/>neue Zeile|gehts|\\n|%%n=42%%<br/>%%n=43%%|%%\\\\begin{aligned}n=42\\\\\\\\n=43\\\\end{aligned}%%|%%\\\\pi%%|\\n|Text|zum|füllen|"},{"plugin":"highlight","state":{"code":"class DoIt\\nend","language":"text","showLineNumbers":false}},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Eine SVG-Grafik 410 breit."}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/608d990e0cbad_f6b8258f886deecb87bce8ab54113e428d243b75.svg","alt":"Zahlengerade","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}},{"plugin":"image","state":{"src":"https://assets.serlo.org/608d990e0cbad_f6b8258f886deecb87bce8ab54113e428d243b75.svg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"SVG 360 breit"}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/608d9cd597f7e_59e07960496d5e2610d611feda167555fefa46d9.svg","alt":"Zahlengerade","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}},{"plugin":"image","state":{"src":"https://assets.serlo.org/608d9cd597f7e_59e07960496d5e2610d611feda167555fefa46d9.svg","alt":"Zahlengerade","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"SVG 210 breit"}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/608d9d054501a_74d46f72d060993060080ca0149391003e69c7e2.svg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}},{"plugin":"image","state":{"src":"https://assets.serlo.org/608d9d054501a_74d46f72d060993060080ca0149391003e69c7e2.svg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Latex-Fonts in Inkscape auf Grössen:"}]},{"type":"p","children":[{"text":"16px - 15px - 14px - 13px - 12px - 11px - 10px"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\mathbb{R} \\\\subset 42","inline":true,"children":[{"text":""}]},{"text":""}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/608db937b43f8_8fdcbe3f2254e7dfd062ec2cd0f8c6398bbf10e2.svg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}},{"plugin":"table","state":"|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |\\n|----|----|----|----|----|----|----|----|----|----|---|---|---|---|---|\\n|x| -4,5 | -3,5 | -2,5 | -1,5 | -0,5 | 0,5 | 1,5 | 2,5 | 3,5 | 4,5 | 5,5 | 6,5 | 7,5 | 8,5 |\\n| y | 3,71 | 1 |-0,26 |-1,09 |-1,71 |-2,20 |-2,62 |-2,97 |-3,28 |-3,55 |-3,80 |-4,02 |-4,23 |-4,42 |"}]},"exercises":[],"exerciseFolder":{"id":"","title":""},"relatedContent":{"articles":[],"courses":[],"videos":[]},"sources":[{"href":"","title":"Test"}]}}',
        meta_title: '',
        meta_description: '',
      },
    },
    converted: false,
    type: 'Article',
    needsReview: false,
    id: 206397,
    errorType: 'none',
    breadcrumbsData: [
      {
        label: 'Community',
        url: '/19882/startseite-für-autorinnen',
        id: 19882,
      },
      {
        label: 'Sandkasten für AutorInnen',
        url: '/community/106082/sandkasten',
        id: 106082,
      },
    ],
  }
  return { props: result }
}

export interface LegacyNode {
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

export function convertTable(html: string): EdtrPluginSerloTable | undefined {
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

  const mockCol = [
    {
      content: {
        plugin: 'text',
        state: [
          {
            plugin: 'text',
            state: [
              {
                type: 'p',
                children: [
                  { text: 'mit ' },
                  {
                    type: 'math',
                    src: 'Math',
                    inline: true,
                    children: [{ text: 'Math' }],
                  },
                  { text: ' und so' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      content: {
        plugin: 'text',
        state: [
          {
            plugin: 'text',
            state: [
              {
                type: 'p',
                children: [{ text: 'mit ' }, { text: 'Code', code: true }],
              },
            ],
          },
        ],
      },
    },
  ]
  const mockConvertedRows = [
    { columns: mockCol },
    { columns: mockCol },
    { columns: mockCol },
  ]
  console.log('=======')
  console.log(
    convertedRows[2].columns[0].content.state?.[0].state[0].children[0]
  )
  console.log(
    mockConvertedRows[2].columns[0].content.state?.[0].state[0].children[1]
  )
  console.log('=======')

  //what else happens with math src in converter?

  return {
    plugin: 'serloTable',
    state: {
      tableType: 'OnlyColumnHeader',
      rows: convertedRows,
    },
  }
}
const emptyState = [{ type: 'p', children: [{ text: '111' }] }]

function convertCellContent(cell: LegacyNode) {
  if (cell.children.length === 0) return emptyState
  if (cell.children.length > 1 || cell.children[0].name !== 'p') {
    throw 'unknown state'
  }
  const contentNodes = cell.children[0].children

  const converted = contentNodes.map(convertContentNode)
  // console.log([{ type: 'p', children: [converted] }])
  return [{ plugin: 'text', state: [{ type: 'p', children: converted }] }]
}

function convertContentNode(node: LegacyNode): NewNode {
  //handle code? 0: {text: "Test", code: true}

  if (node.type === 'text') return { text: node.data ?? '' }

  if (node.type === 'tag') {
    // console.log(node.name)
    if (node.name === 'br') {
      return { text: ' ' }
    }

    if (node.name === 'span' && node.attribs.class === 'mathInline') {
      if (node.children.length !== 1) {
        console.log('mathInline: unexpected state, skipping')
        return { text: '' }
      }
      const mathContent = node.children[0].children[0].data ?? ''
      // not working as expected?!
      return {
        type: 'math',
        src: mathContent,
        inline: true,
        children: [{ text: mathContent }], //???
      }
    }
    console.log('unsupported tag')
  }

  console.log('unsupported type')

  return { text: 'test' }
}

function convertLegacy(node: LegacyNode[] | LegacyNode): EdtrState[] {
  if (!node) {
    return []
  }

  if (Array.isArray(node)) return node.flatMap(convertLegacy)
  // if (node.type === 'tag') return convertTags(node)
  // if (node.type === 'text') return convertTags(node)

  return []
}
