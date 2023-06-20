import { useEffect, useState } from 'react'
import { Editor as SlateEditor, Range, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import { useTextConfig } from '../../hooks/use-text-config'
import type { Link, TextEditorPluginConfig } from '../../types'
import { getLinkElement, isLinkActive } from '../../utils/link'
import { LinkOverlay } from '../link-overlay'
import { LinkOverlayEditMode } from './edit-mode/link-overlay-edit-mode'
import { LinkOverlayWithHref } from './link-overlay-with-href'
import {
  QuickbarData,
  fetchQuickbarData,
} from '@/components/navigation/quickbar'

interface LinkControlsProps {
  isSelectionChanged: number
  editor: SlateEditor
  config: TextEditorPluginConfig
}

export function LinkControls({
  isSelectionChanged,
  editor,
  config,
}: LinkControlsProps) {
  const [element, setElement] = useState<Link | null>(null)
  const [value, setValue] = useState('')
  const [isEditMode, setIsEditMode] = useState(value.length === 0)
  const [quickbarData, setQuickbarData] = useState<QuickbarData | null>(null)

  const { selection } = editor

  const { serloLinkSearch } = useTextConfig(config)

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
  }, [isSelectionChanged, selection, editor])

  useEffect(() => {
    if (!serloLinkSearch) return
    if (element && !quickbarData) {
      fetchQuickbarData()
        .then((fetchedData) => fetchedData && setQuickbarData(fetchedData))
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, quickbarData, serloLinkSearch])

  useEffect(() => {
    setIsEditMode(value.length === 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element])

  function removeLink() {
    setElement(null)
    const path = ReactEditor.findPath(editor, element!)
    Transforms.unwrapNodes(editor, { at: path })
    ReactEditor.focus(editor)
  }

  function setHref(href: string) {
    setValue(href)
    const path = ReactEditor.findPath(editor, element!)
    Transforms.setNodes(editor, { href: href }, { at: path })
    // move cursor out of link
    Transforms.move(editor, { unit: 'offset' })
    ReactEditor.focus(editor)
  }

  if (!element) return null

  const shouldFocus = isEditMode && element.children[0].text.trim() !== ''

  return (
    <LinkOverlay element={element}>
      {isEditMode ? (
        <LinkOverlayEditMode
          config={config}
          setHref={setHref}
          removeLink={removeLink}
          value={value}
          shouldFocus={shouldFocus}
          quickbarData={quickbarData}
        />
      ) : (
        <LinkOverlayWithHref
          config={config}
          value={value}
          removeLink={removeLink}
          setIsEditMode={setIsEditMode}
          quickbarData={quickbarData}
        />
      )}
    </LinkOverlay>
  )
}
