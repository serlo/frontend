import { onKeyDown as slateListsOnKeyDown } from '@prezly/slate-lists'
import isHotkey from 'is-hotkey'
import React, { useCallback, useMemo } from 'react'
import { Node, Editor as SlateEditor } from 'slate'

import {
  edtrBold,
  edtrClose,
  edtrFormula,
  EdtrIcon,
  edtrItalic,
  edtrLink,
  edtrListBullets,
  edtrListNumbered,
  edtrText,
  faCode,
  Icon,
} from '../../ui'
import { HoveringToolbarColorIcon } from '../components/hovering-toolbar-color-icon'
import { HoveringToolbarColorTextIcon } from '../components/hovering-toolbar-color-text-icon'
import { withLinks, withLists, withMath } from '../plugins'
import {
  TextEditorFormattingOption,
  ControlButton,
  TextEditorPluginConfig,
} from '../types'
import {
  getColorIndex,
  isAnyColorActive,
  isColorActive,
  resetColor,
  toggleColor,
} from '../utils/color'
import { isLinkActive, toggleLink } from '../utils/link'
import {
  isSelectionWithinList,
  isSelectionWithinOrderedList,
  isSelectionWithinUnorderedList,
  toggleOrderedList,
  toggleUnorderedList,
} from '../utils/list'
import { isMathActive, toggleMath } from '../utils/math'
import {
  isAnyHeadingActive,
  isBoldActive,
  isCodeActive,
  isHeadingActive,
  isItalicActive,
  toggleBoldMark,
  toggleCode,
  toggleHeading,
  toggleItalicMark,
} from '../utils/rich-text'
import { textColors } from './use-text-config'

type SetIsLinkNewlyCreated = (value: boolean) => void

const textPluginsMapper = {
  [TextEditorFormattingOption.math]: withMath,
  [TextEditorFormattingOption.links]: withLinks,
  [TextEditorFormattingOption.lists]: withLists,
}

const isRegisteredTextPlugin = (
  option: TextEditorFormattingOption
): option is keyof typeof textPluginsMapper => {
  return option in textPluginsMapper
}

const toggleLinkAndFlag =
  (setIsLinkNewlyCreated: SetIsLinkNewlyCreated) => (editor: SlateEditor) => {
    toggleLink(editor)
    setIsLinkNewlyCreated(true)
  }

const registeredHotkeys = (setIsLinkNewlyCreated: SetIsLinkNewlyCreated) => [
  {
    hotkey: 'mod+b',
    option: TextEditorFormattingOption.richText,
    handler: toggleBoldMark,
  },
  {
    hotkey: 'mod+i',
    option: TextEditorFormattingOption.richText,
    handler: toggleItalicMark,
  },
  {
    hotkey: 'mod+k',
    option: TextEditorFormattingOption.links,
    handler: toggleLinkAndFlag(setIsLinkNewlyCreated),
  },
  {
    hotkey: 'mod+m',
    option: TextEditorFormattingOption.math,
    handler: toggleMath,
  },
]

const registeredMarkdownShortcuts = [
  {
    keys: ['*', '-', '+'],
    option: TextEditorFormattingOption.lists,
    handler: toggleUnorderedList,
  },
  {
    keys: ['#'],
    option: TextEditorFormattingOption.headings,
    handler: toggleHeading(1),
  },
  {
    keys: ['##'],
    option: TextEditorFormattingOption.headings,
    handler: toggleHeading(2),
  },
  {
    keys: ['###'],
    option: TextEditorFormattingOption.headings,
    handler: toggleHeading(3),
  },
]

export const useFormattingOptions = (
  config: TextEditorPluginConfig,
  setIsLinkNewlyCreated: SetIsLinkNewlyCreated
) => {
  const { formattingOptions } = config

  const createTextEditor = useCallback(
    (baseEditor: SlateEditor) =>
      formattingOptions.reduce((currentEditor, currentOption) => {
        // If there is no initialization function for the current
        // formatting options, return the editor as it was received
        if (!isRegisteredTextPlugin(currentOption)) {
          return currentEditor
        }
        // Otherwise, apply the initialization function to the editor
        return textPluginsMapper[currentOption](currentEditor)
      }, baseEditor),
    [formattingOptions]
  )

  const toolbarControls: ControlButton[] = useMemo(
    () => createToolbarControls(config, setIsLinkNewlyCreated),
    [config, setIsLinkNewlyCreated]
  )

  const handleHotkeys = useCallback(
    (event: React.KeyboardEvent, editor: SlateEditor) => {
      // Go through the registered hotkeys
      for (const { hotkey, option, handler } of registeredHotkeys(
        setIsLinkNewlyCreated
      )) {
        // Check if their respective formatting option is enabled
        // and if the keyboard event contains the hotkey combination
        if (formattingOptions.includes(option) && isHotkey(hotkey, event)) {
          // If so, prevent the default event behavior,
          // handle the hotkey and break out of the loop
          event.preventDefault()
          handler(editor)
          break
        }
      }
    },
    [formattingOptions, setIsLinkNewlyCreated]
  )

  const handleMarkdownShortcuts = useCallback(
    (event: React.KeyboardEvent, editor: SlateEditor) => {
      // Exit if no selection or space key was not pressed
      const { selection } = editor
      if (!selection || event.key !== ' ') return

      // Get the text before the new empty space
      const firstNode = SlateEditor.first(editor, selection)
      const text = Node.string(firstNode[0])
      const key = text.slice(0, selection.focus.offset).replace(/\s*/g, '')

      // If the text before the new empty space matches one of the registered
      // markdown shortcuts and that formatting option is enabled,
      // handle that markdown shortcut and break out of the loop
      for (const { keys, option, handler } of registeredMarkdownShortcuts) {
        if (formattingOptions.includes(option) && keys.includes(key)) {
          event.preventDefault()
          handler(editor)
          editor.deleteBackward('word')
          break
        }
      }
    },
    [formattingOptions]
  )

  const handleListsShortcuts = useCallback(
    (event: React.KeyboardEvent, editor: SlateEditor) => {
      const isListsOptionEnabled = formattingOptions.includes(
        TextEditorFormattingOption.lists
      )
      if (!isListsOptionEnabled) return

      const isListActive = isSelectionWithinList(editor)
      const isTabShortcut =
        isHotkey('tab', event) || isHotkey('shift+tab', event)
      if (!isListActive && isTabShortcut) return

      return slateListsOnKeyDown(editor, event)
    },
    [formattingOptions]
  )

  return {
    createTextEditor,
    toolbarControls,
    handleHotkeys,
    handleMarkdownShortcuts,
    handleListsShortcuts,
  }
}

function createToolbarControls(
  { i18n, formattingOptions }: TextEditorPluginConfig,
  setIsLinkNewlyCreated: SetIsLinkNewlyCreated
): ControlButton[] {
  const allFormattingOptions = [
    // Bold
    {
      name: TextEditorFormattingOption.richText,
      title: i18n.richText.toggleStrongTitle,
      isActive: isBoldActive,
      onClick: toggleBoldMark,
      renderIcon: () => <EdtrIcon icon={edtrBold} />,
    },
    // Italic
    {
      name: TextEditorFormattingOption.richText,
      title: i18n.richText.toggleEmphasizeTitle,
      isActive: isItalicActive,
      onClick: toggleItalicMark,
      renderIcon: () => <EdtrIcon icon={edtrItalic} />,
    },
    // Link
    {
      name: TextEditorFormattingOption.links,
      title: i18n.link.toggleTitle,
      isActive: isLinkActive,
      onClick: toggleLinkAndFlag(setIsLinkNewlyCreated),
      renderIcon: () => <EdtrIcon icon={edtrLink} />,
    },
    // Headings
    {
      name: TextEditorFormattingOption.headings,
      title: i18n.headings.openMenuTitle,
      closeMenuTitle: i18n.headings.closeMenuTitle,
      isActive: isAnyHeadingActive,
      renderIcon: () => <EdtrIcon icon={edtrText} />,
      renderCloseMenuIcon: () => <EdtrIcon icon={edtrClose} />,
      children: ([1, 2, 3] as const).map((heading) => ({
        name: TextEditorFormattingOption.headings,
        title: i18n.headings.setHeadingTitle(heading),
        isActive: isHeadingActive(heading),
        onClick: toggleHeading(heading),
        renderIcon: () => <span>H{heading}</span>,
      })),
    },
    // Colors
    {
      name: TextEditorFormattingOption.colors,
      title: i18n.colors.openMenuTitle,
      closeMenuTitle: i18n.colors.closeMenuTitle,
      isActive: () => false,
      renderIcon: (editor: SlateEditor) => {
        const colorIndex = getColorIndex(editor)
        const color = colorIndex ? textColors[colorIndex].value : 'black'
        return <HoveringToolbarColorTextIcon color={color} />
      },
      renderCloseMenuIcon: () => <EdtrIcon icon={edtrClose} />,
      children: [
        {
          name: TextEditorFormattingOption.colors,
          title: i18n.colors.resetColorTitle,
          isActive: (editor: SlateEditor) => !isAnyColorActive(editor),
          onClick: resetColor,
          renderIcon: () => <HoveringToolbarColorIcon color="black" />,
        },
        ...textColors.map((color, colorIndex) => ({
          name: TextEditorFormattingOption.colors,
          title: i18n.colors.colorNames[colorIndex],
          isActive: isColorActive(colorIndex),
          onClick: toggleColor(colorIndex),
          renderIcon: () => <HoveringToolbarColorIcon color={color.value} />,
        })),
      ],
    },
    // Ordered list
    {
      name: TextEditorFormattingOption.lists,
      title: i18n.list.toggleOrderedList,
      isActive: isSelectionWithinOrderedList,
      onClick: toggleOrderedList,
      renderIcon: () => <EdtrIcon icon={edtrListNumbered} />,
    },
    // Unordered list
    {
      name: TextEditorFormattingOption.lists,
      title: i18n.list.toggleUnorderedList,
      isActive: isSelectionWithinUnorderedList,
      onClick: toggleUnorderedList,
      renderIcon: () => <EdtrIcon icon={edtrListBullets} />,
    },
    // Math
    {
      name: TextEditorFormattingOption.math,
      title: i18n.math.toggleTitle,
      isActive: isMathActive,
      onClick: toggleMath,
      renderIcon: () => <EdtrIcon icon={edtrFormula} />,
    },
    // Code
    {
      name: TextEditorFormattingOption.code,
      title: i18n.code.toggleTitle,
      isActive: isCodeActive,
      onClick: toggleCode,
      renderIcon: () => <Icon icon={faCode} />,
    },
  ]

  return allFormattingOptions.filter((option) =>
    formattingOptions.includes(TextEditorFormattingOption[option.name])
  )
}
