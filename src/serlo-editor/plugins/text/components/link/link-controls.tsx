import { useContext, useEffect, useState } from 'react'
import { Range, Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'

import { LinkOverlayEditMode } from './edit-mode/link-overlay-edit-mode'
import { LinkOverlay } from './link-overlay'
import { LinkOverlayWithHref } from './link-overlay-with-href'
import type { Link } from '../../types/text-editor'
import {
  QuickbarData,
  fetchQuickbarData,
} from '@/components/navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import {
  getLinkElement,
  isLinkActive,
} from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/utils/link'
import { IsSerloContext } from '@/serlo-editor-integration/context/is-serlo-context'

export function LinkControls() {
  const [element, setElement] = useState<Link | null>(null)
  const [value, setValue] = useState('')
  const [isEditMode, setIsEditMode] = useState(value.length === 0)
  const [quickbarData, setQuickbarData] = useState<QuickbarData | null>(null)
  const { lang: instance } = useInstanceData()
  const editor = useSlate()
  const { selection } = editor

  const isSerloLinkSearchActive =
    useContext(IsSerloContext) && instance === Instance.De

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
    if (!isSerloLinkSearchActive) return
    if (element && !quickbarData) {
      fetchQuickbarData()
        .then((fetchedData) => fetchedData && setQuickbarData(fetchedData))
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, quickbarData, isSerloLinkSearchActive])

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
          isSerloLinkSearchActive={isSerloLinkSearchActive}
          setHref={setHref}
          removeLink={removeLink}
          value={value}
          shouldFocus={shouldFocus}
          quickbarData={quickbarData}
        />
      ) : (
        <LinkOverlayWithHref
          value={value}
          removeLink={removeLink}
          setIsEditMode={setIsEditMode}
          quickbarData={quickbarData}
        />
      )}
    </LinkOverlay>
  )
}
