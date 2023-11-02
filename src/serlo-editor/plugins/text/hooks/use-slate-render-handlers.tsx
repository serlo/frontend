import { createElement, useCallback, useMemo } from 'react'
import { Editor as SlateEditor, Transforms } from 'slate'
import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react'

import { MathElement } from '../components/math-element'
import { TextLeafWithPlaceholder } from '../components/text-leaf-with-placeholder'
import { ListElementType } from '../types/text-editor'
import { selectMayManipulateSiblings, store } from '@/serlo-editor/store'

interface UseSlateRenderHandlersArgs {
  focused: boolean
  id: string
  editor: SlateEditor
  placeholder?: string
}

export const useSlateRenderHandlers = ({
  focused,
  id,
  editor,
  placeholder,
}: UseSlateRenderHandlersArgs) => {
  const mayManipulateSiblings = useMemo(
    () => selectMayManipulateSiblings(store.getState(), id),
    [id]
  )

  const handleRenderElement = useCallback(
    (props: RenderElementProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { element, attributes, children } = props

      if (element.type === 'h') {
        const classNames = ['serlo-h1', 'serlo-h2', 'serlo-h3']
        return createElement(
          `h${element.level}`,
          { ...attributes, className: classNames[element.level - 1] },
          <>{children}</>
        )
      }
      if (element.type === 'a') {
        return (
          <a
            href={element.href}
            className="serlo-link cursor-pointer"
            {...attributes}
          >
            {children}
          </a>
        )
      }
      if (element.type === ListElementType.UNORDERED_LIST) {
        return (
          <ul className="serlo-ul" {...attributes}>
            {children}
          </ul>
        )
      }
      if (element.type === ListElementType.ORDERED_LIST) {
        return (
          <ol className="serlo-ol" {...attributes}>
            {children}
          </ol>
        )
      }
      if (element.type === ListElementType.LIST_ITEM) {
        return <li {...attributes}>{children}</li>
      }
      if (element.type === ListElementType.LIST_ITEM_TEXT) {
        return <div {...attributes}>{children}</div>
      }
      if (element.type === 'math') {
        return (
          <MathElement
            element={element}
            attributes={attributes}
            focused={focused}
          >
            {children}
          </MathElement>
        )
      }
      if (element.type === 'blank') {
        // TODO: Render <BlankRenderer> here instead
        // <BlankRenderer> needs to ...
        // - always show input fields
        // - accept callback onChange that is passed to input element to update correctAnswer
        return (
          <span {...attributes} contentEditable={false}>
            <input
              value={element.correctAnswer}
              size={element.correctAnswer.length}
              className="my-0.5 rounded-full border border-brand bg-brand-50 pl-2 pr-1"
              onChange={(e) => {
                const path = ReactEditor.findPath(editor, element)
                Transforms.setNodes(
                  editor,
                  { correctAnswer: e.target.value },
                  { at: path }
                )
              }}
            />
            {/* children is always an empty text but slate will complain if this is not included here */}
            {children}
          </span>
        )
      }
      return <div {...attributes}>{children}</div>
    },
    [focused]
  )

  const handleRenderLeaf = useCallback(
    (props: RenderLeafProps) => (
      <TextLeafWithPlaceholder
        {...props}
        customPlaceholder={placeholder}
        onAdd={
          mayManipulateSiblings
            ? () => {
                ReactEditor.focus(editor)
                editor.insertText('/')
              }
            : undefined
        }
      />
    ),
    [editor, mayManipulateSiblings, placeholder]
  )

  return { handleRenderElement, handleRenderLeaf }
}
