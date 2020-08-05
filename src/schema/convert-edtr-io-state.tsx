import { converter } from '../../external/markdown'
import { convertLegacyState } from './convert-legacy-state'
import { StepProps } from '@/components/content/equations'
import { MathProps } from '@/components/content/math'
import {
  FrontendContentNode,
  FrontendLiNode,
  FrontendTextColor,
} from '@/data-types'

const colors: FrontendTextColor[] = ['blue', 'green', 'orange']

//This is incorrect, an editor node only has plugin and state
//TODO: write tests for this converter, import edtr-io types, …
export interface EditorStateDummy {
  plugin?: string
  state?: EditorStateDummy | string
  child: EditorStateDummy
  children: EditorStateDummy[]
  content?: EditorStateDummy[]

  title?: string
  class?: string
  href?: string
  src?: string
  alt?: string
  id?: number | string
  maxWidth?: number
  text?: string
  size?: number
  formula?: string
  inline?: boolean
  alignLeft?: boolean
  level?: number
  strong?: boolean
  em?: boolean
  width?: number
  explanation: EditorStateDummy
  multimedia: EditorStateDummy
  interactive: EditorStateDummy[]
  code: string
  prerequisite: EditorStateDummy[]
  strategy: EditorStateDummy[]
  isSingleChoice: boolean
  type: string
  unit: string
  answers: EditorStateDummy[]
  steps: EditorStateDummy[]
  color: number | string
  left: EditorStateDummy[]
  sign: StepProps['sign']
  right: EditorStateDummy[]
  transform: EditorStateDummy[]
  feedback: EditorStateDummy[]
  isCorrect: boolean
}

export function convert(
  node: EditorStateDummy | EditorStateDummy[]
): FrontendContentNode[] {
  if (!node) {
    console.log('e: node EMPTY')
    return []
  }

  if (Array.isArray(node)) {
    return node.flatMap(convert)
  }

  // compat: empty object, we ignore
  if (Object.keys(node).length === 0) {
    return []
  }

  const plugin = node.plugin
  if (plugin === 'rows') {
    return convert(node.state as EditorStateDummy)
  }
  if (plugin === 'text') {
    return convert(node.state as EditorStateDummy)
  }
  if (plugin === 'image') {
    return [
      {
        type: 'img',
        src: (node.state as EditorStateDummy).src!,
        alt: (node.state as EditorStateDummy).alt!,
        maxWidth: (node.state as EditorStateDummy).maxWidth,
      },
    ]
  }
  if (plugin === 'important') {
    return [
      {
        type: 'important',
        children: convert(node.state as EditorStateDummy),
      },
    ]
  }
  if (plugin === 'spoiler') {
    return [
      {
        type: 'spoiler-container',
        children: [
          {
            type: 'spoiler-title',
            children: [
              { type: 'text', text: (node.state as EditorStateDummy).title! },
            ],
          },
          {
            type: 'spoiler-body',
            children: convert((node.state as EditorStateDummy).content!),
          },
        ],
      },
    ]
  }
  if (plugin === 'multimedia') {
    const width = (node.state as EditorStateDummy).width ?? 50
    return [
      {
        type: 'row',
        children: [
          {
            type: 'col',
            size: 100 - width,
            children: convert((node.state as EditorStateDummy).explanation),
          },
          {
            type: 'col',
            size: width,
            children: convert((node.state as EditorStateDummy).multimedia),
          },
        ],
      },
    ]
  }
  if (plugin === 'layout') {
    return [
      {
        type: 'row',
        children: ((node.state as unknown) as EditorStateDummy[]).map(
          (child) => {
            const children = convert(child.child)
            // compat: math align left
            children.forEach((child) => {
              if (child.type === 'math') {
                child.alignLeft = true
              }
            })
            return {
              type: 'col',
              size: child.width!,
              children,
            }
          }
        ),
      },
    ]
  }
  if (plugin === 'injection') {
    return [
      {
        type: 'injection',
        href: (node.state as unknown) as string,
      },
    ]
  }
  if (plugin === 'highlight') {
    return [
      {
        type: 'code',
        code: (node.state as EditorStateDummy).code,
      },
    ]
  }
  if (plugin === 'table') {
    const html = converter.makeHtml(node.state as string)
    return convertLegacyState(html).children
  }
  if (plugin === 'video') {
    return [
      {
        type: 'video',
        src: (node.state as EditorStateDummy).src!,
      },
    ]
  }
  if (plugin === 'anchor') {
    return [
      {
        type: 'anchor',
        id: (node.state as unknown) as string,
      },
    ]
  }
  if (plugin === 'geogebra') {
    // compat: full url given
    let id = node.state as string
    const match = /geogebra\.org\/m\/(.+)/.exec(id)
    if (match) {
      id = match[1]
    }
    return [{ type: 'geogebra', id }]
  }
  // TODO handle this manually in the fetcher!
  /*if (plugin === 'exercise') {
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
  /*if (plugin === 'solution') {
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
  if (plugin === 'scMcExercise') {
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
  if (plugin === 'inputExercise') {
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
  if (plugin === 'equations') {
    const steps = (node.state as EditorStateDummy).steps.map((step) => {
      return {
        left: convert(step.left),
        sign: step.sign,
        right: convert(step.right),
        transform: convert(step.transform),
      }
    })
    return [{ type: 'equations', steps }]
  }

  const type = node.type
  if (type === 'p') {
    // compat unwrap math from p
    const children = convert(node.children)
    if (children.length === 1 && children[0].type === 'math') {
      return children
    }
    // compat: unwrap ul/ol from p
    if (
      children.length === 1 &&
      (children[0].type === 'ul' || children[0].type === 'ol')
    ) {
      return children
    }
    // compat handle newlines
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
  if (type === 'a') {
    return [
      {
        type: 'a',
        href: node.href ?? '',
        children: convert(node.children),
      },
    ]
  }
  if (type === 'h') {
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
  if (type === 'math' && !node.inline) {
    return [
      {
        type: 'math',
        formula: node.src!,
      },
    ]
  }
  if (type === 'math' && node.inline) {
    return [
      {
        type: 'inline-math',
        formula: node.src!,
      },
    ]
  }
  if (type === 'unordered-list') {
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
  if (type === 'ordered-list') {
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
  if (type === 'list-item') {
    return [
      {
        type: 'li',
        children: convert(node.children),
      },
    ]
  }
  if (type === 'list-item-child') {
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

  if (node.text !== undefined) {
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

  console.log('-> ', node)
  return []
}
