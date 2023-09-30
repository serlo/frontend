import { createElement } from 'react'
import { Descendant } from 'slate'

import { TextLeafRenderer } from './components/text-leaf-renderer'
import { ListElementType } from './types/text-editor'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'

export function StaticSlate({
  element,
}: {
  element: Descendant | Descendant[]
}): JSX.Element | null {
  if (Array.isArray(element))
    return (
      <>
        {element.map((item, index) => (
          <StaticSlate key={index} element={item} />
        ))}
      </>
    )

  if (Object.hasOwn(element, 'type')) {
    const { children } = element

    if (element.type === 'h') {
      const classNames = ['serlo-h1', 'serlo-h2', 'serlo-h3']
      return createElement(
        `h${element.level}`,
        { className: classNames[element.level - 1] },
        <>
          <StaticSlate element={children} />
        </>
      )
    }
    if (element.type === 'a') {
      return (
        <a href={element.href} className="serlo-link cursor-pointer">
          <StaticSlate element={children} />
        </a>
      )
    }
    if (element.type === ListElementType.UNORDERED_LIST) {
      return (
        <ul className="serlo-ul">
          <StaticSlate element={children} />
        </ul>
      )
    }
    if (element.type === ListElementType.ORDERED_LIST) {
      return (
        <ol className="serlo-ol">
          <StaticSlate element={children} />
        </ol>
      )
    }
    if (element.type === ListElementType.LIST_ITEM) {
      return (
        <li>
          <StaticSlate element={children} />
        </li>
      )
    }
    if (element.type === ListElementType.LIST_ITEM_TEXT) {
      return (
        <p className="slate-p serlo-p mb-0 ml-0 min-h-[1.33em]">
          <StaticSlate element={children} />
        </p>
      )
    }
    if (element.type === 'math') {
      const MathRenderer = editorRenderers.getMathRenderer()
      return <MathRenderer {...element} />
    }
    return (
      <p className="slate-p serlo-p mb-0 min-h-[1.33em]">
        <StaticSlate element={children} />
      </p>
    )
  }

  return <TextLeafRenderer leaf={element}>{element.text}</TextLeafRenderer>
}
