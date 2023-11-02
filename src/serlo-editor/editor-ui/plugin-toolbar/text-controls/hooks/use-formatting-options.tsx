import {
  faCode,
  faListOl,
  faListUl,
  faSquareRootVariable,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { onKeyDown as slateListsOnKeyDown } from '@prezly/slate-lists'
import isHotkey from 'is-hotkey'
import React, { useCallback, useMemo } from 'react'
import { Node, Editor as SlateEditor } from 'slate'

import { ColorTextIcon } from '../color-text-icon'
import { textColors } from '../const'
import { TextEditorFormattingOption, ControlButton } from '../types'
import { isBlankActive, toggleBlank } from '../utils/blank'
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
import type { LoggedInData } from '@/data-types'
import { isMac } from '@/helper/client-detection'
import {
  editorBold,
  EditorSvgIcon,
  editorItalic,
  editorLink,
  editorText,
} from '@/serlo-editor/editor-ui'
import {
  withLinks,
  withLists,
  withMath,
  withBlanks,
} from '@/serlo-editor/plugins/text/plugins'

const textPluginsMapper = {
  [TextEditorFormattingOption.math]: withMath,
  [TextEditorFormattingOption.links]: withLinks,
  [TextEditorFormattingOption.lists]: withLists,
  [TextEditorFormattingOption.blank]: withBlanks,
}

const isRegisteredTextPlugin = (
  option: TextEditorFormattingOption
): option is keyof typeof textPluginsMapper => {
  return option in textPluginsMapper
}

const registeredHotkeys = [
  {
    hotkey: 'mod+b',
    option: TextEditorFormattingOption.richTextBold,
    handler: toggleBoldMark,
  },
  {
    hotkey: 'mod+i',
    option: TextEditorFormattingOption.richTextItalic,
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
  {
    hotkey: 'mod+shift+`',
    option: TextEditorFormattingOption.code,
    handler: toggleCode,
  },
  {
    hotkey: 'mod+shift+c',
    option: TextEditorFormattingOption.code,
    handler: toggleCode,
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
  formattingOptions: TextEditorFormattingOption[]
) => {
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
    () =>
      createToolbarControls(formattingOptions, textStrings, strings.keys.ctrl),
    [formattingOptions, strings, textStrings]
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
    textColors,
    handleHotkeys,
    handleMarkdownShortcuts,
    handleListsShortcuts,
  }
}

function createToolbarControls(
  formattingOptions: TextEditorFormattingOption[],
  textStrings: LoggedInData['strings']['editor']['plugins']['text'],
  ctrlKey: string
): ControlButton[] {
  const allFormattingOptions = [
    // Bold
    {
      name: TextEditorFormattingOption.richTextBold,
      title: textStrings.bold,
      isActive: isBoldActive,
      onClick: toggleBoldMark,
      renderIcon: () => <EditorSvgIcon pathData={editorBold} />,
    },
    // Italic
    {
      name: TextEditorFormattingOption.richTextItalic,
      title: textStrings.italic,
      isActive: isItalicActive,
      onClick: toggleItalicMark,
      renderIcon: () => <EditorSvgIcon pathData={editorItalic} />,
    },
    // Link
    {
      name: TextEditorFormattingOption.links,
      title: textStrings.link,
      isActive: isLinkActive,
      onClick: toggleLink,
      renderIcon: () => <EditorSvgIcon pathData={editorLink} />,
    },
    // Headings
    {
      name: TextEditorFormattingOption.headings,
      title: textStrings.headings,
      closeMenuTitle: textStrings.closeSubMenu,
      isActive: isAnyHeadingActive,
      renderIcon: () => <EditorSvgIcon pathData={editorText} />,
      renderCloseMenuIcon: () => <FaIcon icon={faXmark} />,
      subMenuButtons: ([1, 2, 3] as const).map((level) => ({
        name: TextEditorFormattingOption.headings,
        title: `${textStrings.heading} ${level}`,
        isActive: isHeadingActive(level),
        onClick: toggleHeading(level),
        renderIcon: () => (
          <span data-qa={`plugin-toolbar-heading-${level}`}>H{level}</span>
        ),
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
        return <ColorTextIcon color={color} />
      },
      renderCloseMenuIcon: () => <FaIcon icon={faXmark} />,
      subMenuButtons: [
        {
          name: TextEditorFormattingOption.colors,
          title: textStrings.resetColor,
          isActive: (editor: SlateEditor) => !isAnyColorActive(editor),
          onClick: resetColor,
          renderIcon: () => (
            <div className="m-[3px] inline-block h-[19px] w-[19px] rounded-full bg-black align-middle" />
          ),
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
          renderIcon: () => (
            <div
              className="m-[3px] inline-block h-[19px] w-[19px] rounded-full align-middle"
              style={{ backgroundColor: color.value }}
            />
          ),
        })),
      ],
    },
    // Ordered list
    {
      name: TextEditorFormattingOption.lists,
      title: textStrings.orderedList,
      isActive: isSelectionWithinOrderedList,
      onClick: toggleOrderedList,
      renderIcon: () => <FaIcon className="h-[15px]" icon={faListOl} />,
    },
    // Unordered list
    {
      name: TextEditorFormattingOption.lists,
      title: textStrings.unorderedList,
      isActive: isSelectionWithinUnorderedList,
      onClick: toggleUnorderedList,
      renderIcon: () => <FaIcon className="h-[15px]" icon={faListUl} />,
    },
    // Math
    {
      name: TextEditorFormattingOption.math,
      title: textStrings.mathFormula,
      isActive: isMathActive,
      onClick: toggleMath,
      renderIcon: () => (
        <FaIcon className="h-[15px]" icon={faSquareRootVariable} />
      ),
    },
    // Code
    {
      name: TextEditorFormattingOption.code,
      title: textStrings.code,
      isActive: isCodeActive,
      onClick: toggleCode,
      renderIcon: () => <FaIcon className="h-[15px]" icon={faCode} />,
    },
    // Blank (For Fill in the Blank Exercises)
    {
      name: TextEditorFormattingOption.blank,
      title: textStrings.blank,
      isActive: isBlankActive,
      onClick: toggleBlank,
      renderIcon: () => (
        <span className="relative -top-0.5 rounded-lg border-2 border-current px-1 text-[10px] font-bold">
          _
        </span>
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
