import { createElement, useCallback, useMemo } from 'react'
import { Editor as SlateEditor } from 'slate'
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
