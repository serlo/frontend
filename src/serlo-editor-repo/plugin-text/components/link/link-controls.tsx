import { useEffect, useState } from 'react'
import { Editor as SlateEditor, Range, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import { InlineOverlayPosition } from '../../components/inline-overlay'
import type { Link, TextEditorPluginConfig } from '../../types'
import { getLinkElement, isLinkActive } from '../../utils/link'
import { InlineOverlayWhite } from '../inline-overlay-white'
import { LinkContentSearch } from './link-content-search'

interface LinkControlsProps {
  hasSelectionChanged: number
  editor: SlateEditor
  config: TextEditorPluginConfig
  isLinkNewlyCreated: boolean
  setIsLinkNewlyCreated: (value: boolean) => void
}

export function LinkControls({
  hasSelectionChanged,
  editor,
  config,
  isLinkNewlyCreated,
  setIsLinkNewlyCreated,
}: LinkControlsProps) {
  const [element, setElement] = useState<Link | null>(null)
  const [value, setValue] = useState('')

  const { selection } = editor

  useEffect(() => {
    if (!selection) return

    const isCollapsed = selection && Range.isCollapsed(selection)

    if (isCollapsed && isLinkActive(editor)) {
      const element = getLinkElement(editor) || null
      setElement(element)
      setValue(element ? element.href : '')
    } else {
      setElement(null)
    }
  }, [hasSelectionChanged, selection, editor])

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
        }}
        removeLink={() => {
          setElement(null)
          const path = ReactEditor.findPath(editor, element)
          Transforms.unwrapNodes(editor, { at: path })
        }}
        value={value}
        shouldFocus={isLinkNewlyCreated}
        afterFocusing={() => setIsLinkNewlyCreated(false)}
      />
      {/* placeholder={config.i18n.link.placeholder} */}
    </InlineOverlayWhite>
  )
}
