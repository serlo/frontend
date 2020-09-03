import { converter } from '../../external/markdown'
import { convertLegacyState } from './convert-legacy-state'
import {
  EdtrState,
  SlateBlockMock,
  TextNodeMock,
  EdtrPluginEquations,
  EdtrPluginLayout,
} from './edtr-io-types'
import { MathProps } from '@/components/content/math'
import {
  FrontendContentNode,
  FrontendLiNode,
  FrontendTextColor,
} from '@/data-types'

const colors: FrontendTextColor[] = ['blue', 'green', 'orange']

function isEdtrState(
  node: EdtrState | SlateBlockMock | TextNodeMock
): node is EdtrState {
  return (node as EdtrState).plugin !== undefined
}

function isSlateBlock(
  node: EdtrState | SlateBlockMock | TextNodeMock
): node is SlateBlockMock {
  return (node as SlateBlockMock).type !== undefined
}

function isTextNode(
  node: EdtrState | SlateBlockMock | TextNodeMock
): node is TextNodeMock {
  return (node as TextNodeMock).text !== undefined
}

export function convert(
  node?: EdtrState | SlateBlockMock | TextNodeMock
): FrontendContentNode[] {
  // compat: no or empty node, we ignore
  if (!node || Object.keys(node).length === 0) {
    // console.log('e: node EMPTY')
    return []
  }

  if (Array.isArray(node)) {
    return node.flatMap(convert)
  }

  if (isEdtrState(node)) {
    return convertPlugin(node) as FrontendContentNode[]
  }

  if (isSlateBlock(node)) {
    return convertSlate(node) as FrontendContentNode[]
  }

  if (isTextNode(node)) {
    return convertText(node) as FrontendContentNode[]
  }

  console.log('unsupported -> ', node)
  return []
}

function convertPlugin(node: EdtrState) {
  if (node.plugin === 'rows') {
    return convert((node.state as unknown) as EdtrState)
  }
  if (node.plugin === 'text') {
    return convert(node.state)
  }
  if (node.plugin === 'image') {
    return [
      {
        type: 'img',
        src: node.state.src,
        alt: node.state.alt,
        maxWidth: node.state.maxWidth,
      },
    ]
  }
  //Note: Not supported any more in edtr
  if (node.plugin === 'important') {
    return [
      {
        type: 'important',
        children: convert(node.state),
      },
    ]
  }
  if (node.plugin === 'spoiler') {
    return [
      {
        type: 'spoiler-container',
        children: [
          {
            type: 'spoiler-title',
            children: [
              {
                type: 'text',
                text: node.state.title,
              },
            ],
          },
          {
            type: 'spoiler-body',
            //TODO: investigate why registering as string
            children: convert((node.state.content as unknown) as EdtrState),
          },
        ],
      },
    ]
  }

  if (node.plugin === 'multimedia') {
    const width = node.state.width ?? 50
    return [
      {
        type: 'row',
        children: [
          {
            type: 'col',
            size: 100 - width,
            //TODO: investigate why registering as string
            children: convert((node.state.explanation as unknown) as EdtrState),
          },
          {
            type: 'col',
            size: width,
            //TODO: investigate why registering as string
            children: convert((node.state.multimedia as unknown) as EdtrState),
          },
        ],
      },
    ]
  }
  if (node.plugin === 'layout') {
    return [
      {
        type: 'row',
        children: (node as EdtrPluginLayout).state.map((child) => {
          const children = convert(child.child)
          // compat: math align left
          children.forEach((child) => {
            if (child.type === 'math') {
              child.alignLeft = true
            }
          })
          return {
            type: 'col',
            size: child.width,
            children,
          }
        }),
      },
    ]
  }
  if (node.plugin === 'injection') {
    return [
      {
        type: 'injection',
        href: (node.state as unknown) as string,
      },
    ]
  }
  if (node.plugin === 'highlight') {
    return [
      {
        type: 'code',
        code: node.state.code,
      },
    ]
  }
  if (node.plugin === 'table') {
    const html = converter.makeHtml(node.state)
    return convertLegacyState(html).children
  }
  if (node.plugin === 'video') {
    return [
      {
        type: 'video',
        src: node.state.src,
      },
    ]
  }
  if (node.plugin === 'anchor') {
    return [
      {
        type: 'anchor',
        id: node.state,
      },
    ]
  }
  if (node.plugin === 'geogebra') {
    // compat: full url given
    let id = node.state
    const match = /geogebra\.org\/m\/(.+)/.exec(id)
    if (match) {
      id = match[1]
    }
    return [{ type: 'geogebra', id }]
  }

  // TODO handle this manually in the fetcher!
  /*if (node.plugin === 'exercise') {
    return [
      {
        type: '@edtr-io/exercise',
        state: {
          content: convert((node.state as EditorStateDummy).content!),
          interactive: (convert(
            (node.state as EditorStateDummy).interactive
          )[0] as unknown) as ExerciseChildData['state']['interactive'],
        },
      },
    ]
  }*/
  // TODO handle this manually in the fetcher!
  /*if (node.plugin === 'solution') {
    return [
      {
        type: '@edtr-io/solution',
        state: {
          prerequisite: ((node.state as unknown) as SolutionChildData['state'])
            .prerequisite,
          strategy: convert((node.state as EditorStateDummy).strategy),
          steps: convert((node.state as EditorStateDummy).steps),
        },
      },
    ]
  }
  if (node.plugin === 'scMcExercise') {
    return [
      {
        plugin: 'scMcExercise',
        state: {
          //@ts-expect-error
          isSingleChoice: (node.state as EditorStateDummy).isSingleChoice,
          answers: (node.state as EditorStateDummy).answers.map((answer) => {
            return {
              isCorrect: answer.isCorrect,
              content: convert(answer.content!),
              feedback: convert(answer.feedback),
            }
          }),
        },
      },
    ]
  }
  if (node.plugin === 'inputExercise') {
    return [
      {
        plugin: 'inputExercise',
        state: {
          //@ts-expect-error
          type: (node.state as EditorStateDummy).type,
          unit: (node.state as EditorStateDummy).unit,
          answers: (node.state as EditorStateDummy).answers,
        },
      },
    ]
  }*/

  if (node.plugin === 'equations') {
    const steps = (node as EdtrPluginEquations).state.steps.map((step) => {
      return {
        left: convert(step.left),
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sign: step.sign, //TODO: probably a bug
        right: convert(step.right),
        transform: convert(step.transform),
      }
    })
    return [{ type: 'equations', steps }]
  }

  return []
}

function convertSlate(node: SlateBlockMock) {
  if (node.type === 'p') {
    const children = convert(node.children)

    // compat unwrap math from p
    if (children.length === 1 && children[0].type === 'math') {
      return children
    }
    // compat: unwrap ul/ol from p
    //TODO: can not reproduce, does not seem to happen, check again or delete
    if (
      children.length === 1 &&
      (children[0].type === 'ul' || children[0].type === 'ol')
    ) {
      return children
    }

    // compat handle newlines
    //TODO: can not reproduce, what is expected behaviour here?
    if (
      children.some(
        (child) =>
          (child.type === 'text' && child.text.includes('\n')) ||
          child.type === 'inline-math'
      )
    ) {
      const splitted: (FrontendContentNode | '##break##')[] = children.flatMap(
        (child) => {
          if (child.type === 'text' && child.text.includes('\n')) {
            const parts: (
              | FrontendContentNode
              | '##break##'
            )[] = child.text.split('\n').flatMap((text) => [
              {
                type: 'text',
                text,
              },
              '##break##',
            ])
            parts.pop()
            return parts
          }
          return [child]
        }
      )
      let current: FrontendContentNode[] = []
      const result: FrontendContentNode[] = []
      if (splitted[0] === '##break##') splitted.shift()
      if (splitted[splitted.length - 1] !== '##break##')
        splitted.push('##break##')
      splitted.forEach((el) => {
        if (el === '##break##') {
          result.push({
            type: 'p',
            children: current,
          })
          current = []
        } else {
          current.push(el)
        }
      })
      return result
    }

    // compat: extract math formulas
    //TODO: can not reproduce, happens elsewhere now, right? can be deleted?
    const math = children.filter(
      (child) => child.type === 'math' || child.type === 'inline-math'
    )
    if (math.length >= 1) {
      if (
        children.every(
          (child) =>
            child.type === 'math' ||
            child.type === 'inline-math' ||
            (child.type === 'text' && child.text === '')
        )
      ) {
        return children
          .filter(
            (child) => child.type === 'math' || child.type === 'inline-math'
          )
          .map((mathChild) => {
            return {
              type: 'math',
              formula: (mathChild as MathProps).formula,
              alignLeft: true, // caveat: this differs from existing presentation
            }
          })
      }
    }
    return [
      {
        type: 'p',
        children,
      },
    ]
  }
  if (node.type === 'a') {
    return [
      {
        type: 'a',
        href: node.href ?? '',
        children: convert(node.children),
      },
    ]
  }
  if (node.type === 'h') {
    if (
      node.level === 1 ||
      node.level === 2 ||
      node.level == 3 ||
      node.level === 4 ||
      node.level === 5
    ) {
      return [
        {
          type: 'h',
          level: node.level,
          children: convert(node.children),
        },
      ]
    } else {
      return [
        {
          type: 'h',
          level: 5,
          children: convert(node.children),
        },
      ]
    }
  }
  if (node.type === 'math' && !node.inline) {
    return [
      {
        type: 'math',
        formula: node.src!,
      },
    ]
  }
  if (node.type === 'math' && node.inline) {
    return [
      {
        type: 'inline-math',
        formula: node.src!,
      },
    ]
  }
  if (node.type === 'unordered-list') {
    const children: FrontendLiNode[] = []
    convert(node.children).forEach((child) => {
      if (child.type === 'li') {
        children.push(child)
      }
    })
    return [
      {
        type: 'ul',
        children,
      },
    ]
  }
  if (node.type === 'ordered-list') {
    const children: FrontendLiNode[] = []
    convert(node.children).forEach((child) => {
      if (child.type === 'li') {
        children.push(child)
      }
    })
    return [
      {
        type: 'ol',
        children,
      },
    ]
  }
  if (node.type === 'list-item') {
    return [
      {
        type: 'li',
        children: convert(node.children),
      },
    ]
  }
  if (node.type === 'list-item-child') {
    // compat: don't wrap ps
    const children = convert(node.children)
    if (
      children.filter(
        (child) =>
          child.type === 'inline-math' ||
          child.type === 'a' ||
          child.type !== undefined
      ).length === 0
    ) {
      return children
    }
    return [{ type: 'p', children }]
  }

  return []
}

function convertText(node: TextNodeMock) {
  if (node.text === '') return []
  return [
    {
      type: 'text',
      text: node.text,
      em: node.em,
      strong: node.strong,
      color: colors[node.color as number],
    },
  ]
}
