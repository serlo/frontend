import { useEffect, useState } from 'react'
import { Editor as SlateEditor, Range, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import { InlineOverlayPosition } from '../../components/inline-overlay'
import type { Link, TextEditorPluginConfig } from '../../types'
import { getLinkElement, isLinkActive } from '../../utils/link'
import { InlineOverlayWhite } from '../inline-overlay-white'
import { LinkContentSearch } from './link-content-search'

interface LinkControlsProps {
  isSelectionChanged: number
  editor: SlateEditor
  config: TextEditorPluginConfig
}

export function LinkControls({
  isSelectionChanged: selectionChanged,
  editor,
  config,
}: LinkControlsProps) {
  const [element, setElement] = useState<Link | null>(null)
  const [value, setValue] = useState('')

  const { selection } = editor

  useEffect(() => {
    if (!selection) return

    const isCollapsed = selection && Range.isCollapsed(selection)

    if (isCollapsed && isLinkActive(editor)) {
      const linkElement = getLinkElement(editor) || null
      setElement(linkElement)
      setValue(linkElement ? linkElement.href : '')
    } else {
      setElement(null)
    }
  }, [selectionChanged, selection, editor])

  if (!element) return null

  return (
    <InlineOverlayWhite
      config={config}
      initialPosition={InlineOverlayPosition.below}
    >
      <LinkContentSearch
        setValue={(href: string) => {
          setValue(href)
          const path = ReactEditor.findPath(editor, element)
          Transforms.setNodes(editor, { href: href }, { at: path })
          // move cursor out of link
          Transforms.move(editor)
          Transforms.move(editor, { unit: 'offset' })
          ReactEditor.focus(editor)
        }}
        removeLink={() => {
          setElement(null)
          const path = ReactEditor.findPath(editor, element)
          Transforms.unwrapNodes(editor, { at: path })
          ReactEditor.focus(editor)
        }}
        value={value}
        shouldFocus={
          element.href === '' && element.children[0].text.trim() !== ''
        }
      />
      {/* placeholder={config.i18n.link.placeholder} */}
    </InlineOverlayWhite>
  )
}
