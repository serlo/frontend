import { converter } from '../../external/markdown'
import { convertLegacyState } from './convert-legacy-state'

const colors = ['blue', 'green', 'orange']

// TODO: needs type declaration
export function convertEdtrIoState(state: any) {
  return { children: convert(state) }
}

// TODO: needs type declaration
export function convert(node: any): any {
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
    return convert(node.state)
  }
  if (plugin === 'text') {
    return convert(node.state)
  }
  if (plugin === 'image') {
    return [
      {
        type: 'img',
        src: node.state.src,
        alt: node.state.alt,
        maxWidth: node.state.maxWidth,
      },
    ]
  }
  if (plugin === 'important') {
    return [
      {
        type: 'important',
        children: convert(node.state),
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
            children: [{ text: node.state.title }],
          },
          {
            type: 'spoiler-body',
            children: convert(node.state.content),
          },
        ],
      },
    ]
  }
  if (plugin === 'multimedia') {
    const width = node.state.width ?? 50
    return [
      {
        type: 'row',
        children: [
          {
            type: 'col',
            size: 100 - width,
            children: convert(node.state.explanation),
          },
          {
            type: 'col',
            size: width,
            children: convert(node.state.multimedia),
          },
        ],
      },
    ]
  }
  if (plugin === 'layout') {
    return [
      {
        type: 'row',
        // TODO: needs type declaration
        children: node.state.map((child: any) => {
          const children = convert(child.child)
          // compat: math align left
          // TODO: needs type declaration
          children.forEach((child: any) => {
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
  if (plugin === 'injection') {
    return [
      {
        type: 'injection',
        href: node.state,
      },
    ]
  }
  if (plugin === 'highlight') {
    return [
      {
        type: 'code',
        content: node.state.code,
      },
    ]
  }
  if (plugin === 'table') {
    const html = converter.makeHtml(node.state)
    return convertLegacyState(html).children
  }
  if (plugin === 'video') {
    return [
      {
        type: 'video',
        src: node.state.src,
      },
    ]
  }
  if (plugin === 'anchor') {
    return [
      {
        type: 'anchor',
        id: node.state,
      },
    ]
  }
  if (plugin === 'geogebra') {
    // compat: full url given
    let id = node.state
    const match = /geogebra\.org\/m\/(.+)/.exec(id)
    if (match) {
      id = match[1]
    }
    return [{ type: 'geogebra', id }]
  }
  if (plugin === 'exercise') {
    return [
      {
        type: '@edtr-io/exercise',
        state: {
          content: convert(node.state.content),
          interactive: convert(node.state.interactive)[0],
        },
      },
    ]
  }
  if (plugin === 'solution') {
    return [
      {
        type: '@edtr-io/solution',
        state: {
          prerequisite: node.state.prerequisite,
          strategy: convert(node.state.strategy),
          steps: convert(node.state.steps),
        },
      },
    ]
  }
  if (plugin === 'scMcExercise') {
    return [
      {
        plugin: 'scMcExercise',
        state: {
          isSingleChoice: node.state.isSingleChoice,
          // TODO: needs type declaration
          answers: node.state.answers.map((answer: any) => {
            return {
              isCorrect: answer.isCorrect,
              content: convert(answer.content),
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
          type: node.state.type,
          unit: node.state.unit,
          answers: node.state.answers,
        },
      },
    ]
  }
  if (plugin === 'equations') {
    // TODO: needs type declaration
    const steps = node.state.steps.map((step: any) => {
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
        // TODO: needs type declaration
        (child: any) =>
          (child.text && child.text.includes('\n')) ||
          child.type === 'inline-math'
      )
    ) {
      // TODO: needs type declaration
      const splitted = children.flatMap((child: any) => {
        if (child.text && child.text.includes('\n')) {
          // TODO: needs type declaration
          const parts = child.text.split('\n').flatMap((text: any) => [
            {
              text,
            },
            '##break##',
          ])
          parts.pop()
          return parts
        }
        return child
      })
      // TODO: needs type declaration
      let current: any[] = []
      // TODO: needs type declaration
      const result: any[] = []
      if (splitted[0] === '##break##') splitted.shift()
      if (splitted[splitted.length - 1] !== '##break##')
        splitted.push('##break##')
      // TODO: needs type declaration
      splitted.forEach((el: any) => {
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
      // TODO: needs type declaration
      (child: any) => child.type === 'math' || child.type === 'inline-math'
    )
    if (math.length >= 1) {
      if (
        children.every(
          // TODO: needs type declaration
          (child: any) =>
            child.type === 'math' ||
            child.type === 'inline-math' ||
            child.text === ''
        )
      ) {
        return (
          children
            .filter(
              // TODO: needs type declaration
              (child: any) =>
                child.type === 'math' || child.type === 'inline-math'
            )
            // TODO: needs type declaration
            .map((mathChild: any) => {
              return {
                type: 'math',
                formula: mathChild.formula,
                alignLeft: true, // caveat: this differs from existing presentation
              }
            })
        )
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
        href: node.href,
        children: convert(node.children),
      },
    ]
  }
  if (type === 'h') {
    return [
      {
        type: 'h',
        level: node.level,
        children: convert(node.children),
      },
    ]
  }
  if (type === 'math' && !node.inline) {
    return [
      {
        type: 'math',
        formula: node.src,
      },
    ]
  }
  if (type === 'math' && node.inline) {
    return [
      {
        type: 'inline-math',
        formula: node.src,
      },
    ]
  }
  if (type === 'unordered-list') {
    return [
      {
        type: 'ul',
        children: convert(node.children),
      },
    ]
  }
  if (type === 'ordered-list') {
    return [
      {
        type: 'ol',
        children: convert(node.children),
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
        // TODO: needs type declaration
        (child: any) =>
          child.type === 'inline-math' ||
          child.type === 'a' ||
          child.text !== undefined
      ).length === 0
    ) {
      return children
    }
    return [{ type: 'p', children }]
  }

  if (node.text !== undefined) {
    if (node.color) {
      node.color = colors[node.color]
    }
    // ignore empty spans
    if (node.text === '') return []
    return [node]
  }

  console.log('-> ', node)
  return []
}
