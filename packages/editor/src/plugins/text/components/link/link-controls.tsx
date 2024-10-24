import {
  getLinkElement,
  isLinkActive,
} from '@editor/editor-ui/plugin-toolbar/text-controls/utils/link'
import { SlateOverlay } from '@editor/editor-ui/slate-overlay'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { SerloOnlyFeaturesContext } from '@editor/utils/serlo-extra-context'
import { useContext, useEffect, useState } from 'react'
import { Range, Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'

import { LinkOverlayEditMode } from './edit-mode/link-overlay-edit-mode'
import { LinkOverlayWithHref } from './link-overlay-with-href'
import type { Link } from '../../types/text-editor'

const wrapperWidth = 460

export function LinkControls() {
  const [element, setElement] = useState<Link | null>(null)
  const [value, setValue] = useState('')
  const [isEditMode, setIsEditMode] = useState(value.length === 0)
  const { lang } = useEditStrings()
  const editor = useSlate()
  const { selection } = editor

  const isSerloLinkSearchActive =
    useContext(SerloOnlyFeaturesContext).isSerlo && lang === 'de'

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
  }, [selection, editor])

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
    <SlateOverlay width={wrapperWidth} anchor={element}>
      {isEditMode ? (
        <LinkOverlayEditMode
          isSerloLinkSearchActive={isSerloLinkSearchActive}
          setHref={setHref}
          removeLink={removeLink}
          value={value}
          shouldFocus={shouldFocus}
        />
      ) : (
        <LinkOverlayWithHref
          value={value}
          removeLink={removeLink}
          setIsEditMode={setIsEditMode}
        />
      )}
    </SlateOverlay>
  )
}
