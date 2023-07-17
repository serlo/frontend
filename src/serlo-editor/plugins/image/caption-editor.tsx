import React, { useCallback } from 'react'
import { Editor, Node } from 'slate'
import { Editable, Slate, RenderElementProps } from 'slate-react'

import { TextLeafRenderer } from './text-leaf-renderer'
// TODO: Either duplicate or extract from text plugin
import { MathElement } from '../text/components/math-element'

interface CaptionEditorProps {
  editor: Editor
  focused: boolean
  onChange: (value: string) => void
}

export const CaptionEditor = ({
  editor,
  focused,
  onChange,
}: CaptionEditorProps) => {
  const handleRenderElement = useCallback(
    (props: RenderElementProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { element, attributes, children } = props

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

  const handleChange = useCallback(() => {
    onChange(Node.string(editor))
  }, [editor, onChange])

  return (
    <Slate
      editor={editor}
      value={[
        {
          type: 'p',
          children: [{ text: '' }],
        },
      ]}
      onChange={handleChange}
    >
      <Editable
        placeholder="Enter some rich text…"
        renderElement={handleRenderElement}
        renderLeaf={(props) => (
          <span {...props.attributes}>
            <TextLeafRenderer {...props} />
          </span>
        )}
      />
    </Slate>
  )
}
