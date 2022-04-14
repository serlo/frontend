import { NewHeadingElement, NewNode } from '@edtr-io/plugin-text'
import { NextApiRequest, NextApiResponse } from 'next'

import json from '@/mfnf-converter/example1.json'
import { MfnfElement } from '@/mfnf-converter/mfnf-ast-types'
import { EdtrPluginText, EdtrState } from '@/schema/edtr-io-types'

// TODO: remove empty ps

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log(Array.isArray(json.content))
    res.json({
      plugin: 'rows',
      state: astToEdtrStateArray(json.content as MfnfElement[]),
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    res.json('could not convert: ' + (error as string))
  }
}

function astToEdtrStateArray(nodes: MfnfElement[]): EdtrState[] {
  // move content of headings to main branch
  const flat = nodes.reduce<MfnfElement[]>(flattenHeadingContent, [])
  return flat.reduce<EdtrState[]>(convertAstReducer, [])
}

function flattenHeadingContent(accumulator: MfnfElement[], node: MfnfElement) {
  if (node.type === 'heading') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const flat = node.content.reduce<MfnfElement[]>(flattenHeadingContent, [])
    const cleanedNode = { ...node, content: [] }
    return [...accumulator, cleanedNode, ...flat]
  }
  return [...accumulator, node]
}

function convertAstReducer(
  accumulator: EdtrState[],
  currentValue: MfnfElement
): EdtrState[] {
  const plugin = convertPlugin(currentValue)
  if (plugin) return [...accumulator, plugin]
  return accumulator
}

function convertPlugin(node: MfnfElement): EdtrState | null {
  //probably text plugin

  if (node.type === 'externalreference') {
    return wrapInTextPlugin(convertForTextPlugin(node))
  }

  if (node.type === 'formatted') {
    return wrapInTextPlugin(convertForTextPlugin(node))
  }

  if (node.type === 'heading') {
    return wrapInTextPlugin(convertForTextPlugin(node))
  }

  if (node.type.toLowerCase() === 'internalreference') {
    return wrapInTextPlugin(convertForTextPlugin(node))
  }
  if (node.type === 'list') {
    return wrapInTextPlugin(convertForTextPlugin(node))
  }
  if (node.type === 'listitem') {
    return wrapInTextPlugin(convertForTextPlugin(node))
  }
  if (node.type === 'paragraph') {
    return wrapInTextPlugin(convertForTextPlugin(node))
  }
  if (node.type === 'text') {
    return wrapInTextPlugin(convertForTextPlugin(node))
  }

  //rest
  //   if (node.type === 'document') {
  //     return {
  //       plugin: 'rows',
  //       state: convertArray(node.content),
  //     }
  //   }

  // if(node.type === 'comment') { ??
  //     return {plugin: 'rows', state: convertArray(node.content)}
  // }
  if (node.type === 'error') {
    return makeErrorBox('Error in Wikitext parser:' + node.message)
  }
  //   if (node.type === 'gallery') {
  //     return { plugin: 'rows', state: convertArray(node.content) }
  //   }
  //   if (node.type === 'htmlTag') {
  //     return { plugin: 'rows', state: convertArray(node.content) }
  //   }
  //   if (node.type === 'table') {
  //     return { plugin: 'rows', state: convertArray(node.content) }
  //   }
  //   if (node.type === 'tableCell') {
  //     return { plugin: 'rows', state: convertArray(node.content) }
  //   }
  //   if (node.type === 'tableRow') {
  //     return { plugin: 'rows', state: convertArray(node.content) }
  //   }
  if (node.type === 'template') {
    const name = node.name[0].type === 'text' ? node.name[0].text : undefined

    if (name === ':Mathe für Nicht-Freaks: Vorlage:Definition') {
      // {{:Mathe für Nicht-Freaks: Vorlage:Definition
      //  |titel=Kilometer
      //  |definition=Ein Kilometer sind 1000 Meter.
      // }}
      // TODO: anker

      const title = node.content.find(
        (child) => child.type === 'templateargument' && child.name === 'titel'
      )
      const titleNodes =
        title && title.type === 'templateargument' && title.value

      const definition = node.content.find(
        (child) =>
          child.type === 'templateargument' && child.name === 'definition'
      )
      const definitionNodes =
        definition && definition.type === 'templateargument' && definition.value

      if (!definitionNodes) return null

      return {
        plugin: 'box',
        state: {
          type: 'definition',
          title: {
            plugin: 'text',
            state: titleNodes ? convertArrayForTextPlugin(titleNodes) : [],
          },
          content: {
            plugin: 'rows',
            state: [
              {
                plugin: 'text',
                state: definitionNodes
                  ? convertArrayForTextPlugin(definitionNodes)
                  : [],
              },
            ],
          },
          anchorId: 'box-1',
        },
      }
    }

    return makeErrorBox('Unknown Template: ' + (name ?? '?'))
  }

  return makeErrorBox('Unknown Type: ' + node.type)
}

function convertArrayForTextPlugin(nodes: MfnfElement[]): NewNode[] {
  return nodes.map(convertForTextPlugin)
}

function convertForTextPlugin(node: MfnfElement): NewNode {
  if (node.type === 'externalreference') {
    return {
      type: 'a',
      href: node.target,
      children: convertArrayForTextPlugin(node.caption),
    }
  }
  if (node.type === 'formatted') {
    // 'nowiki' | <-
    // 'bold' |
    // 'italic' |
    // 'math' | <-
    // 'strikethrough' | <-
    // 'underline' | <-
    // 'code' |
    // 'blockquote' | <-
    // 'preformatted'

    if (node.content.length > 1)
      return makeErrorP('More than one child of formated content')

    const text = node.content[0].type === 'text' ? node.content[0].text : ''

    if (node.markup === 'math')
      return {
        type: 'math',
        src: text,
        inline: true,
        children: [], // ?
      }

    return {
      text,
      code:
        node.markup === 'code' || node.markup === 'preformatted'
          ? true
          : undefined,
      em: node.markup === 'italic' ? true : undefined,
      strong: node.markup === 'bold' ? true : undefined,
    }
  }
  if (node.type === 'heading') {
    return {
      type: 'h',
      level: node.depth <= 6 ? (node.depth as NewHeadingElement['level']) : 6,
      children: convertArrayForTextPlugin(node.caption),
    }
  }
  if (node.type === 'internalreference') {
    // console.log('options: ')
    // console.log(node.options) // e.g. [ [ { type: 'text', position: [Object], text: 'thumb' } ] ]
    // console.log('target: ')
    // console.log(node.target)
    return {
      type: 'a',
      href: '#internallink!?',
      children: convertArrayForTextPlugin(node.caption),
    }
  }
  if (node.type === 'list') {
    const kind =
      node.content[0] &&
      node.content[0].type === 'listitem' &&
      node.content[0].kind

    if (kind === 'unordered')
      return {
        type: 'unordered-list',
        children: convertArrayForTextPlugin(node.content),
      }
    if (
      kind === 'ordered' ||
      kind === 'definition' || // TODO: what makes them special, how to render?
      kind === 'definitionterm' ||
      !kind
    )
      return {
        type: 'ordered-list',
        children: convertArrayForTextPlugin(node.content),
      }
    // return {
    //   type: 'p',
    //   children: [{ text: 'ERROR: Definition Lists are not suppored atm.' }],
    // }
  }
  if (node.type === 'listitem') {
    if (node.depth > 1) {
      return {
        type: 'list-item-child',
        children: convertArrayForTextPlugin(node.content),
      }
    }
    return {
      type: 'list-item',
      children: convertArrayForTextPlugin(node.content),
    }
  }
  if (node.type === 'paragraph') {
    return {
      type: 'p',
      children: convertArrayForTextPlugin(node.content),
    }
  }
  if (node.type === 'text') {
    return { text: node.text }
  }
  if (node.type === 'template') {
    if (
      node.name[0] &&
      node.name[0].type === 'text' &&
      node.name[0].text === 'Formel'
    ) {
      const mathNode =
        node.content[0].type === 'templateargument'
          ? node.content[0].value
          : undefined
      if (
        mathNode &&
        mathNode[0].type === 'formatted' &&
        mathNode[0].markup === 'math' &&
        mathNode[0].content[0].type === 'text'
      ) {
        const content = mathNode[0].content[0].text
        return {
          type: 'math',
          src: content,
          inline: false,
          children: [], // ?
        }
      }
    }
  }
  return makeErrorP('Unsupported type: ' + node.type)
}

function wrapInTextPlugin(node: NewNode | NewNode[]): EdtrPluginText {
  return {
    plugin: 'text',
    state: Array.isArray(node) ? node : [node],
  }
}

function makeErrorP(msg: string): NewNode {
  return {
    text: ` [Error: ${msg}] `,
    strong: true,
    color: 2,
  }
}

function makeErrorBox(msg: string): EdtrState {
  return {
    plugin: 'box',
    state: {
      type: 'attention',
      title: {
        plugin: 'text',
        state: [
          {
            type: 'p',
            children: [{ text: msg }],
          },
        ],
      },
      content: {
        plugin: 'text',
        state: [],
      },
      anchorId: 'box-1',
    },
  }
}
