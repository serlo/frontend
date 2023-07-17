import { faCode } from '@fortawesome/free-solid-svg-icons'
import { onKeyDown as slateListsOnKeyDown } from '@prezly/slate-lists'
import isHotkey from 'is-hotkey'
import React, { useCallback, useMemo } from 'react'
import { Node, Editor as SlateEditor } from 'slate'

import { textColors } from './use-text-config'
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
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { isMac } from '@/helper/client-detection'
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
} from '@/serlo-editor/editor-ui'

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

const registeredHotkeys = [
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
    handler: toggleLink,
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

export const useFormattingOptions = (config: TextEditorPluginConfig) => {
  const { formattingOptions } = config
  const { strings } = useInstanceData()
  const textStrings = useEditorStrings().plugins.text

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
    () => createToolbarControls(config, textStrings, strings.keys.ctrl),
    [config, strings, textStrings]
  )

  const handleHotkeys = useCallback(
    (event: React.KeyboardEvent, editor: SlateEditor) => {
      // Go through the registered hotkeys
      for (const { hotkey, option, handler } of registeredHotkeys) {
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
    [formattingOptions]
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
  { formattingOptions }: TextEditorPluginConfig,
  textStrings: LoggedInData['strings']['editor']['plugins']['text'],
  ctrlKey: string
): ControlButton[] {
  const allFormattingOptions = [
    // Bold
    {
      name: TextEditorFormattingOption.richText,
      title: textStrings.bold,
      isActive: isBoldActive,
      onClick: toggleBoldMark,
      renderIcon: () => <EdtrIcon icon={edtrBold} />,
    },
    // Italic
    {
      name: TextEditorFormattingOption.richText,
      title: textStrings.italic,
      isActive: isItalicActive,
      onClick: toggleItalicMark,
      renderIcon: () => <EdtrIcon icon={edtrItalic} />,
    },
    // Link
    {
      name: TextEditorFormattingOption.links,
      title: textStrings.link,
      isActive: isLinkActive,
      onClick: toggleLink,
      renderIcon: () => <EdtrIcon icon={edtrLink} />,
    },
    // Headings
    {
      name: TextEditorFormattingOption.headings,
      title: textStrings.headings,
      closeMenuTitle: textStrings.closeSubMenu,
      isActive: isAnyHeadingActive,
      renderIcon: () => <EdtrIcon icon={edtrText} />,
      renderCloseMenuIcon: () => <EdtrIcon icon={edtrClose} />,
      children: ([1, 2, 3] as const).map((level) => ({
        name: TextEditorFormattingOption.headings,
        title: `${textStrings.heading} ${level}`,
        isActive: isHeadingActive(level),
        onClick: toggleHeading(level),
        renderIcon: () => <span>H{level}</span>,
      })),
    },
    // Colors
    {
      name: TextEditorFormattingOption.colors,
      title: textStrings.colors,
      closeMenuTitle: textStrings.closeSubMenu,
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
          title: textStrings.resetColor,
          isActive: (editor: SlateEditor) => !isAnyColorActive(editor),
          onClick: resetColor,
          renderIcon: () => <HoveringToolbarColorIcon color="black" />,
        },
        ...textColors.map((color, colorIndex) => ({
          name: TextEditorFormattingOption.colors,
          title: Object.hasOwn(textStrings.colorNames, color.name)
            ? textStrings.colorNames[
                color.name as keyof typeof textStrings.colorNames
              ]
            : color.name,
          isActive: isColorActive(colorIndex),
          onClick: toggleColor(colorIndex),
          renderIcon: () => <HoveringToolbarColorIcon color={color.value} />,
        })),
      ],
    },
    // Ordered list
    {
      name: TextEditorFormattingOption.lists,
      title: textStrings.orderedList,
      isActive: isSelectionWithinOrderedList,
      onClick: toggleOrderedList,
      renderIcon: () => <EdtrIcon icon={edtrListNumbered} />,
    },
    // Unordered list
    {
      name: TextEditorFormattingOption.lists,
      title: textStrings.unorderedList,
      isActive: isSelectionWithinUnorderedList,
      onClick: toggleUnorderedList,
      renderIcon: () => <EdtrIcon icon={edtrListBullets} />,
    },
    // Math
    {
      name: TextEditorFormattingOption.math,
      title: textStrings.mathFormula,
      isActive: isMathActive,
      onClick: toggleMath,
      renderIcon: () => <EdtrIcon icon={edtrFormula} />,
    },
    // Code
    {
      name: TextEditorFormattingOption.code,
      title: textStrings.code,
      isActive: isCodeActive,
      onClick: toggleCode,
      renderIcon: () => (
        <FaIcon icon={faCode} className="h-auto p-0.5 align-middle" />
      ),
    },
  ].map((option) => {
    return {
      ...option,
      title: option.title.replace('%ctrlOrCmd%', isMac ? '⌘' : ctrlKey),
    }
  })

  return allFormattingOptions.filter((option) =>
    formattingOptions.includes(TextEditorFormattingOption[option.name])
  )
}
