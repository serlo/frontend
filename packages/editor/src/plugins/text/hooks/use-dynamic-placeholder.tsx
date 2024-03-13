import { RefObject, useCallback, useEffect } from 'react'
import { Editor, Element, NodeEntry, Range } from 'slate'

interface UseDynamicPlaceholderArgs {
  id: string
  editor: Editor
  focused: boolean
  containerRef: RefObject<HTMLDivElement> | undefined
  staticPlaceholder: string | undefined
  noLinebreaks: boolean
}

export function useDynamicPlacehoder(args: UseDynamicPlaceholderArgs) {
  const { id, editor, focused, containerRef, staticPlaceholder, noLinebreaks } =
    args

  // Workaround for removing double empty lines on editor blur.
  // Normalization is forced on blur and handled in
  // `withEmptyLinesRestriction` plugin.
  // `useEffect` and event delegation are used because `<Editable`
  // `onBlur` doesn't work when custom-empty-line-placeholder is
  // shown before bluring the editor. More info on event delegation:
  // https://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
  useEffect(() => {
    const handleBlur = () => {
      // @ts-expect-error custom operation to do special normalization only on blur.
      editor.normalize({ force: true, operation: { type: 'blur_container' } })
    }
    const container = containerRef?.current
    container?.addEventListener('blur', handleBlur, true)
    return () => {
      container?.removeEventListener('blur', handleBlur, true)
    }
  }, [containerRef, editor, id])

  // Show a placeholder on empty lines.
  // https://jkrsp.com/slate-js-placeholder-per-line/
  const decorateEmptyLines = useCallback(
    ([node, path]: NodeEntry) => {
      const { selection } = editor

      const isEmptyElement =
        Element.isElement(node) && Editor.isEmpty(editor, node)

      const isFirstLine = path[0] === 0
      if (
        (!focused && !isFirstLine) ||
        selection === null ||
        Editor.isEditor(node) ||
        !Range.includes(selection, path) ||
        !Range.isCollapsed(selection) ||
        Editor.string(editor, [path[0]]) !== '' ||
        !isEmptyElement
      ) {
        return []
      }
      return [{ ...selection, showPlaceholder: true }]
    },
    [editor, focused]
  )

  // fallback to static placeholder when:
  // - for inline text plugins
  // - we define a custom placeholder text
  // - when the editor was newly created and never had a selection
  //   (e.g.on a new box plugin) to make sure the text plugin never just an empty line
  //   decorator unfortunately does not work when there is no selection.
  const shouldShow = !noLinebreaks && !staticPlaceholder && editor.selection

  return {
    decorateEmptyLines,
    shouldShow,
  }
}
