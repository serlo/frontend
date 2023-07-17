import React, { useCallback, useMemo } from 'react'
import { createEditor } from 'slate'
import { Editable, withReact, Slate, RenderElementProps } from 'slate-react'

import { TextLeafRenderer } from './text-leaf-renderer'
// TODO: Either duplicate or extract from text plugin
import { MathElement } from '../text/components/math-element'

interface CaptionEditorProps {
  focused: boolean
}

export const CaptionEditor = ({ focused }: CaptionEditorProps) => {
  const editor = useMemo(() => withReact(createEditor()), [])

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

  return (
    <Slate
      editor={editor}
      value={[
        {
          type: 'p',
          children: [{ text: '' }],
        },
      ]}
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
