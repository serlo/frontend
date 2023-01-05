// Import React dependencies.
import { EditorProps } from '@edtr-io/core'
import React, { memo, useCallback, useState } from 'react'
// Import the Slate editor factory.
import {
  Transforms,
  BaseEditor,
  createEditor,
  CustomTypes,
  Descendant,
} from 'slate'
// Import the Slate components and React plugin.
import { withHistory } from 'slate-history'
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  useSlateStatic,
  RenderElementProps,
} from 'slate-react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { SerloEditor } from '@/edtr-io/serlo-editor'

interface CustomElement {
  type: 'paragraph'
  children: CustomText[]
}

interface EditableVoidElement {
  state: object
  type: 'editable-void'
  children: [{ text: '' }]
}
interface CustomText {
  text: string
}

// Add the initial value.
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'A second line of text in a paragraph.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement | EditableVoidElement
    Text: CustomText
  }
}

const EdtrIoElement = memo(
  (props: RenderElementProps) => {
    const editor = useSlateStatic()

    if (props.element.type != 'editable-void') throw 'bad'

    return (
      <div
        {...props.attributes}
        contentEditable={false}
        className="border border-black bg-lime-400 mb-5"
      >
        <div className="">
          <div className="controls-portal hidden" />
          <div className="edtr-io serlo-editor-hacks">
            <SerloEditor
              entityNeedsReview={false}
              onSave={() => new Promise((r) => r)}
              type="User"
              initialState={props.element.state as EditorProps['initialState']}
              onChange={({ getDocument }) => {
                const path = ReactEditor.findPath(editor, props.element)
                const newProperties: Partial<EditableVoidElement> = {
                  state: getDocument() as object,
                }
                Transforms.setNodes(editor, newProperties, { at: path })
              }}
            />
          </div>
        </div>
        {props.children}
      </div>
    )
  },
  () => {
    return true
  }
)

const DefaultElement = (props: RenderElementProps) => {
  return (
    <p {...props.attributes} className="serlo-p">
      {props.children}
    </p>
  )
}

export default function SlateTest() {
  const [editor] = useState(() =>
    withEditableVoids(withReact(withHistory(createEditor())))
  )

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'editable-void':
        return <EdtrIoElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  return (
    <FrontendClientBase>
      <Slate editor={editor} value={initialValue}>
        <Editable renderElement={renderElement} className="p-1 bg-pink-200" />
        <Toolbar />
      </Slate>
    </FrontendClientBase>
  )
}

const withEditableVoids = (editor: CustomTypes['Editor']) => {
  const { isVoid } = editor

  editor.isVoid = (element) => {
    return element.type === 'editable-void' ? true : isVoid(element)
  }

  return editor
}

const insertEditableVoid = (editor: CustomTypes['Editor']) => {
  const voidNode: EditableVoidElement = {
    type: 'editable-void',
    children: [{ text: '' }],
    state: {
      plugin: 'type-taxonomy',
      state: {
        term: { name: '' },
        description: '{"plugin":"rows"}',
      },
    },
  }
  Transforms.insertNodes(editor, voidNode)
}

function Toolbar() {
  const editor = useSlateStatic()
  return (
    <div className="bg-white mt-6">
      <button
        onClick={(e) => {
          e.preventDefault()
          insertEditableVoid(editor)
        }}
      >
        edtr-io einfügen
      </button>
    </div>
  )
}
