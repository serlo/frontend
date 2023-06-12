import { useEffect, useRef, useState } from 'react'
import { Editor as SlateEditor, Range, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import type { Link, TextEditorPluginConfig } from '../types'
import { getLinkElement, isLinkActive } from '../utils/link'
import { InlineOverlay, InlineOverlayPosition } from './inline-overlay'
import { LinkControlsInput } from './link-controls-input'
import { legacyEditorTheme } from '@/helper/colors'
import {
  faExternalLinkAlt,
  faTrashAlt,
  Icon,
  styled,
} from '@/serlo-editor-repo/ui'

const InlinePreview = styled.span({
  padding: '0px 8px',
})

const ChangeButton = styled.div({
  padding: '5px 5px 5px 10px',
  display: 'inline-block',
  borderLeft: `2px solid ${legacyEditorTheme.backgroundColor}`,
  cursor: 'pointer',
  margin: '2px',
  '&:hover': {
    color: legacyEditorTheme.primary.background,
  },
})

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
  const input = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (element && isLinkNewlyCreated) {
      timeout = setTimeout(() => {
        setIsLinkNewlyCreated(false)
        input.current?.focus()
      })
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [element, isLinkNewlyCreated, setIsLinkNewlyCreated])

  if (!element) return null

  return (
    <InlineOverlay
      config={config}
      initialPosition={InlineOverlayPosition.below}
    >
      <InlinePreview>
        <LinkControlsInput
          ref={input}
          value={value}
          placeholder={config.i18n.link.placeholder}
          onChange={(event) => {
            setValue(event.target.value)
            const path = ReactEditor.findPath(editor, element)
            Transforms.setNodes(
              editor,
              { href: event.target.value },
              { at: path }
            )
          }}
        />
      </InlinePreview>
      <ChangeButton
        as="a"
        target="_blank"
        href={value}
        rel="noopener noreferrer"
      >
        <Icon icon={faExternalLinkAlt} />
      </ChangeButton>
      <ChangeButton
        onClick={() => {
          setElement(null)
          const path = ReactEditor.findPath(editor, element)
          Transforms.unwrapNodes(editor, { at: path })
        }}
      >
        <Icon icon={faTrashAlt} />
      </ChangeButton>
    </InlineOverlay>
  )
}
