import { PreferenceContext } from '@editor/core'
import { isElementWithinList } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import { MathEditor } from '@editor/math'
import React, { useContext, useMemo } from 'react'
import { Editor, Node, Path, Range, Transforms } from 'slate'
import {
  ReactEditor,
  RenderElementProps,
  useSlate,
  useSelected,
} from 'slate-react'

import { StaticMath } from '../static-components/static-math'
// eslint-disable-next-line import/no-unassigned-import
import 'serlo-katex-styles/styles.css'
import type {
  MathElement as MathElementType,
  Paragraph,
} from '../types/text-editor'

export interface MathElementProps {
  element: MathElementType
  attributes: RenderElementProps['attributes']
  focused: boolean
  children: RenderElementProps['children']
}

const visualEditorPreferenceKey = 'text:math:visual-editor'

export function MathElement({
  element,
  attributes,
  focused,
  children,
}: MathElementProps) {
  const editor = useSlate()
  const selected = useSelected()
  const preferences = useContext(PreferenceContext)
  const isVisualMode = !!preferences.getKey(visualEditorPreferenceKey)

  const isInsideListElement = useMemo(() => {
    return isElementWithinList(element, editor)
  }, [editor, element])

  const shouldShowMathEditor =
    focused &&
    selected &&
    editor.selection &&
    Range.isCollapsed(editor.selection)

  if (!shouldShowMathEditor) {
    return (
      <>
        {/* Slate void elements need to set attributes and contentEditable={false}
          See: https://docs.slatejs.org/api/nodes/element#rendering-void-elements */}
        <span {...attributes} contentEditable={false}>
          <StaticMath src={element.src} inline={element.inline} type="math" />
          {children}
        </span>
      </>
    )
  }

  const VoidWrapper = element.inline ? 'span' : 'div'
  return (
    // Slate void elements need to set attributes and contentEditable={false}
    // See: https://docs.slatejs.org/api/nodes/element#rendering-void-elements
    <>
      <VoidWrapper {...attributes} tabIndex={-1} contentEditable={false}>
        <MathEditor
          state={element.src}
          inline={element.inline}
          readOnly={false}
          visual={isVisualMode}
          disableBlock={isInsideListElement}
          onInlineChange={handleInlineChange}
          onChange={(src) => updateElement({ src })}
          closeMathEditorOverlay={transformOutOfElement}
          onMoveOutRight={transformOutOfElement}
          onMoveOutLeft={() => {
            transformOutOfElement({ reverse: true })
          }}
          onDeleteOutRight={() => {
            transformOutOfElement({ shouldDelete: true })
          }}
          onDeleteOutLeft={() => {
            transformOutOfElement({ shouldDelete: true, reverse: true })
          }}
          onEditorChange={(visual) =>
            preferences.setKey(visualEditorPreferenceKey, visual)
          }
        />
        {children}
      </VoidWrapper>
    </>
  )

  function updateElement(update: Partial<MathElementType>) {
    const path = ReactEditor.findPath(editor, element)

    Transforms.setNodes(editor, update, { at: path })
  }

  /**
   * Applies slate node transformations when MathElement is changed from inline to block type and backwards.
   */
  function handleInlineChange(newInlineValue: boolean) {
    // Editor.withoutNormalizing prevents automatically deleting elements by slate normalization until all transformations are done.
    Editor.withoutNormalizing(editor, () => {
      const path = ReactEditor.findPath(editor, element)

      // Set property `inline` on MathElement to new value
      Transforms.setNodes(editor, { inline: newInlineValue }, { at: path })

      newInlineValue ? transformNodeToInline() : transformNodeToBlock()

      function transformNodeToInline() {
        // We can be sure that Node at `path` has type MathElementType here
        const mathElement = Node.get(editor, path) as MathElementType

        // Remove math element
        Transforms.removeNodes(editor, { at: path })

        // Re-add math element inside p element
        const newNode: Paragraph = {
          type: 'p',
          children: [
            { text: '' },
            {
              ...mathElement,
            },
            { text: '' },
          ],
        }
        Transforms.insertNodes(editor, newNode, { at: path })

        const nextSiblingPath = Path.next(path)
        const hasSiblingAfter = Node.has(editor, nextSiblingPath)
        if (hasSiblingAfter) {
          const nodeAfter = Node.get(editor, nextSiblingPath)
          if ('type' in nodeAfter && nodeAfter.type === 'p') {
            // Merge next sibling node with newNode
            Transforms.mergeNodes(editor, { at: nextSiblingPath })
          }
        }

        const hasSiblingBefore = path[path.length - 1] !== 0
        if (hasSiblingBefore) {
          const nodeBefore = Node.get(editor, Path.previous(path))
          if ('type' in nodeBefore && nodeBefore.type === 'p') {
            // Merge newNode with previous sibling node
            Transforms.mergeNodes(editor, { at: path })
          }
        }
      }

      function transformNodeToBlock() {
        // Take the MathElement and lift it up one node level. This automatically splits siblings before and after the MathElement.
        // Example:
        // {
        //   type: 'p',
        //   children: [
        //     { text: 'Bla' },
        //     { type: 'math', ... },
        //     { text: 'MoreBla' },
        //   ]
        // }
        //
        // becomes
        //
        // {
        //   type: 'p',
        //   children: [
        //     { text: 'Bla' },
        //   ]
        // },
        // { type: 'math', ... },
        // {
        //   type: 'p',
        //   children: [
        //     { text: 'MoreBla' },
        //   ]
        // }
        Transforms.liftNodes(editor, { at: path })
      }
    })
  }

  function transformOutOfElement({
    reverse = false,
    shouldDelete = false,
  }: {
    reverse?: boolean
    shouldDelete?: boolean
  } = {}) {
    const unit = 'character'

    Transforms.move(editor, { unit, reverse })
    if (shouldDelete) {
      Transforms.delete(editor, { unit, reverse })
    }

    ReactEditor.focus(editor)
  }
}
