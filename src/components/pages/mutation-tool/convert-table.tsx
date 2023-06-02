import { converter } from '@serlo/markdown'
// eslint-disable-next-line import/no-deprecated
import { parseDOM } from 'htmlparser2'

import { TableType } from '@/edtr-io/plugins/serlo-table/renderer'
import { LegacyNode } from '@/schema/convert-legacy-state'
import {
  EdtrPluginImage,
  EdtrPluginSerloTable,
  EdtrPluginTable,
  EdtrPluginText,
  SlateBlockElement,
  SlateTextElement,
} from '@/schema/edtr-io-types'

export function convertTable(
  legacyState: EdtrPluginTable
): ReturnType<typeof convertHTMLtoState> {
  // console.log(legacyState.state)
  const html = converter.makeHtml(legacyState.state)
  return convertHTMLtoState(html)
}

function convertHTMLtoState(
  html: string
): EdtrPluginSerloTable | EdtrPluginText | undefined {
  // eslint-disable-next-line import/no-deprecated
  const dom = parseDOM(html) as unknown as LegacyNode[]

  const table = dom[0]?.children.filter((child) => child.type === 'tag')[0]
  if (!table) {
    console.log('Invalid table, replacing with text plugin!')
    return { plugin: 'text' } as EdtrPluginText
  }
  if (table.name !== 'table') {
    if (
      (table.name === 'span' && table.attribs.class === 'math') ||
      table.attribs.class === 'mathInline'
    ) {
      console.log('hacked math, replacing!')
      const mathContent =
        table.children[0]?.data
          ?.replace(/%%/g, '')
          .replace('$$', '')
          .replace('$$', '') ?? ''
      return {
        plugin: 'text',
        state: [
          {
            type: 'p',
            children: [
              {
                type: 'math',
                src: mathContent,
                inline: true,
                children: [{ text: mathContent }],
              },
            ],
          },
        ],
      }
    } else {
      console.log('table misused for something else check!!')
      console.log(table.name)
      console.log(table.attribs)
      return undefined
    }
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
  const trimmedRows = hasEmptyHeaderRow ? convertedRows.slice(1) : convertedRows

  const colLength = trimmedRows.reduce(
    (acc, { columns }) => Math.max(columns.length, acc),
    0
  )

  const finalRows = trimmedRows.map(({ columns }) => {
    if (columns.length === colLength) return { columns }

    const oldLength = columns.length
    columns.length = colLength

    return {
      columns: columns.fill({ content: { plugin: 'text' } }, oldLength),
    }
  })

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
  const cellChildren = cell.children

  if (cellChildren.length === 0) return { plugin: 'text' }

  if (cellChildren.length > 1) {
    console.log('unexpected: cell has more than one child, cell will be empty')
    console.log(cell.children)
    return { plugin: 'text' }
  }

  const onlyChild = cellChildren[0]

  if (!['p', 'h4', 'ul', 'ol', 'pre'].includes(onlyChild.name)) {
    console.log('unexpected state, cell will be empty')
    console.log(onlyChild)
    console.log(cell.children.length)
    console.log(onlyChild.name)
    return { plugin: 'text' }
  }

  const filteredChildren = onlyChild.children.filter((child) => {
    const text = child.data?.replace(/\r?\n|\r$/, '')
    return child.type === 'text' &&
      (text === '\\n' || text === '*' || text === '#' || text === '')
      ? false
      : true
  })

  if (filteredChildren.length === 0) return { plugin: 'text' }

  const liElement = filteredChildren.find((child) => child.name === 'li')
  if (liElement) {
    const liConverted = filteredChildren[0].children.map(convertContentNode)
    return { plugin: 'text', state: [{ type: 'p', children: liConverted }] }
  }

  const converted = filteredChildren.map(convertContentNode)

  const convertedImg = converted.find(
    (obj) => Object.hasOwn(obj, 'plugin') && obj.plugin === 'image'
  )
  if (convertedImg) return convertedImg

  return { plugin: 'text', state: [{ type: 'p', children: converted }] }
}

function convertContentNode(
  node: LegacyNode
): SlateTextElement | SlateBlockElement | [] | EdtrPluginImage {
  //handle code? 0: {text: "Test", code: true}

  if (node.type === 'text') return { text: node.data ?? '' }

  if (node.type === 'tag') {
    if (node.name === 'br') {
      return { text: ' ' }
    }

    if (node.name === 'strong') {
      if (node.children[0].type !== 'text') {
        return convertContentNode(node.children[0])
      }
      return { text: node.children[0].data ?? '', strong: true }
    }

    if (node.name === 'em') {
      if (node.children[0].type !== 'text') {
        return convertContentNode(node.children[0])
      }
      return { text: node.children[0].data ?? '', em: true }
    }

    if (node.name === 'a' && node.attribs.href) {
      if (
        node.children[0].data?.includes('%') ||
        node.children[0].data?.includes('$$')
      ) {
        console.log(
          'content: link with formula that will not be converted! check manually'
        )
      }
      if (node.children[0].type !== 'text') {
        console.log(
          'content: link with unexpected content, content will be deleted!'
        )
        return { text: '' }
      }
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
        return { text: ' ' }
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

    if (node.name === 'code') {
      if (
        !node.children ||
        node.children.length !== 1 ||
        node.children[0].type !== 'text' ||
        !node.children[0].data
      ) {
        console.log('content: math has unexpected state, content will be empty')
        return { text: '' }
      }
      const text = node.children[0].data.replace(/\r?\n|\r$/, '').trim()
      return {
        text: text,
        code: true,
      }
    }

    if (node.name === 'img') {
      if (!node.attribs || !node.attribs.src) {
        console.log('content: img has unexpected state, content will be empty')
        return { text: '' }
      }
      return {
        plugin: 'image',
        state: { src: node.attribs.src, alt: node.attribs.alt },
      } as EdtrPluginImage
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
