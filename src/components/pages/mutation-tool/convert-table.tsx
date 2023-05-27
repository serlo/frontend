import { converter } from '@serlo/markdown'
// eslint-disable-next-line import/no-deprecated
import { parseDOM } from 'htmlparser2'

import { TableType } from '@/edtr-io/plugins/serlo-table/renderer'
import { LegacyNode } from '@/schema/convert-legacy-state'
import {
  EdtrPluginSerloTable,
  EdtrPluginTable,
  SlateBlockElement,
  SlateTextElement,
} from '@/schema/edtr-io-types'

export function convertTable(
  legacyState: EdtrPluginTable
): EdtrPluginSerloTable | undefined {
  const html = converter.makeHtml(legacyState.state)
  // console.log(html)
  return convertHTMLtoState(html)
}

function convertHTMLtoState(html: string): EdtrPluginSerloTable | undefined {
  // eslint-disable-next-line import/no-deprecated
  const dom = parseDOM(html) as unknown as LegacyNode[]
  // console.log(dom)

  const table = dom[0].children.filter((child) => child.type === 'tag')[0]
  if (!table || table.name !== 'table') {
    console.error('Unexpected state, skipping this table!')
    return undefined
  }

  const tHeadAndTBody = table.children.filter((child) => child.type === 'tag')
  if (tHeadAndTBody.length !== 2) {
    console.error('Unexpected state (no header or body), skipping this table!')
    return undefined
  }

  const rows = [
    ...tHeadAndTBody[0].children,
    ...tHeadAndTBody[1].children,
  ].filter((child) => child.type === 'tag')

  const convertedRows = rows.map((row) => {
    const columns = row.children
      .filter((col) => col.type === 'tag')
      .map((col): Col => ({ content: convertCellContent(col) }))
    return {
      columns,
    }
  })

  const hasEmptyHeaderRow = convertedRows[0].columns.every(
    (cell) => !Object.hasOwn(cell.content, 'state')
  )
  // remove empty headers
  const finalRows = hasEmptyHeaderRow ? convertedRows.slice(1) : convertedRows

  return {
    plugin: 'serloTable',
    state: {
      tableType: hasEmptyHeaderRow
        ? TableType.OnlyRowHeader
        : TableType.OnlyColumnHeader,
      rows: finalRows,
    },
  }
}

type Col = EdtrPluginSerloTable['state']['rows'][0]['columns'][0]

function convertCellContent(cell: LegacyNode) {
  if (cell.children.length === 0) return { plugin: 'text' }
  if (cell.children.length > 1 || cell.children[0].name !== 'p') {
    console.warn('unexpected state, cell will be empty')
    return { plugin: 'text' }
  }
  const contentNodes = cell.children[0].children
  const converted = contentNodes.map(convertContentNode)
  return { plugin: 'text', state: [{ type: 'p', children: converted }] }
}

function convertContentNode(
  node: LegacyNode
): SlateTextElement | SlateBlockElement | [] {
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
      if (
        node.children[0].data?.includes('%') ||
        node.children[0].data?.includes('$$')
      )
        console.warn(
          'content: table has link with formula that will not be converted! check manually'
        )
      return {
        type: 'a',
        href: node.attribs.href,
        children: [{ text: node.children[0].data ?? '' }],
      }
    }

    if (node.name === 'span' && node.attribs.class === 'mathInline') {
      if (
        node.children.length !== 1 ||
        !Object.hasOwn(node.children[0], 'children')
      ) {
        console.log(node.children)
        console.log(
          'content: mathInline has unexpected state, content will be empty'
        )
        return { text: '' }
      }

      const mathContent =
        node.children[0].children[0].data?.replace(/%%/g, '') ?? ''
      // not working as expected?!
      return {
        type: 'math',
        src: mathContent,
        inline: true,
        children: [{ text: mathContent }], //???
      }
    }

    if (node.name === 'span' && node.attribs.class === 'math') {
      if (node.children.length !== 1) {
        console.log('content: math has unexpected state, content will be empty')
        return { text: '' }
      }
      const mathContent =
        node.children[0].data
          ?.replace(/%%/g, '')
          .replace('$$', '')
          .replace('$$', '') ?? ''
      return {
        type: 'math',
        src: mathContent,
        inline: true,
        children: [{ text: mathContent }], //???
      }
    }

    console.warn('content: unsupported tag, content will be empty')
    console.log(node.name)
    console.log(node)
    return { text: '' }
  }

  console.error('content: unsupported type, content will be empty')
  console.log(node.type)
  console.log(node)

  return { text: '' }
}
