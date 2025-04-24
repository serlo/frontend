import { BlankRendererStatic } from '@editor/plugins/blanks-exercise/blank-renderer-static'
import { LinkRenderer } from '@editor/static-renderer/link-renderer'
import { createElement, lazy, Suspense, type JSX } from 'react'
import { Descendant, Element } from 'slate'

import { TextLeafRenderer } from '../components/text-leaf-renderer'
import { ListElementType } from '../types/text-editor'

const StaticMath = lazy(() =>
  import('./static-math').then((module) => ({
    default: module.StaticMath,
  }))
)

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
      const classNames = [
        'serlo-h1',
        'serlo-h2',
        'serlo-h3',
        'serlo-p font-bold mb-0 mt-4', // h4 fallback
      ]
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
        <LinkRenderer href={element.href}>
          <StaticSlate element={children} />
        </LinkRenderer>
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
    // "list-item-child"
    if (element.type === ListElementType.LIST_ITEM_TEXT) {
      // compat: don't wrap children in a <p> for old content that has <p> children already
      if (children.length >= 1) {
        const isAllParagraphs =
          children.find((child) => {
            return !(
              Object.hasOwn(child, 'type') &&
              (child as unknown as Element).type === 'p'
            )
          }) === undefined

        if (isAllParagraphs) return <StaticSlate element={children} />
      }

      return (
        <p className="slate-p serlo-p mb-0 ml-0 min-h-[1.33em]">
          <StaticSlate element={children} />
        </p>
      )
    }
    if (element.type === 'math') {
      return (
        <Suspense>
          <StaticMath {...element} />
        </Suspense>
      )
    }
    if (element.type === 'textBlank') {
      const isCorrectAnswerEmpty =
        element.correctAnswers.at(0) === undefined ||
        element.correctAnswers.at(0)?.answer.trim().length === 0
      if (isCorrectAnswerEmpty) return null

      return <BlankRendererStatic blankId={element.blankId} />
    }

    // unwrap block level math elements
    if (
      element.children.length === 1 &&
      Object.hasOwn(element.children[0], 'type') &&
      element.children[0].type === 'math' &&
      element.children[0].inline === false
    ) {
      return <StaticSlate element={children} />
    }

    return (
      <p className="slate-p serlo-p mb-0 min-h-[1.33em]">
        <StaticSlate element={children} />
      </p>
    )
  }

  return <TextLeafRenderer leaf={element}>{element.text}</TextLeafRenderer>
}
