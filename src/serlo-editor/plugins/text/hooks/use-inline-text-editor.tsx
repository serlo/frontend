import { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'

import { useFormattingOptions } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { selectIsFocused, useAppSelector } from '@/serlo-editor/store'

interface useInlineTextEditorArgs {
  id: string
  formattingOptions: TextEditorFormattingOption[]
}

export const useInlineTextEditor = ({
  id,
  formattingOptions,
}: useInlineTextEditorArgs) => {
  const [isChanged, setIsChanged] = useState(0)

  const textFormattingOptions = useFormattingOptions(formattingOptions)
  const { createTextEditor, toolbarControls } = textFormattingOptions
  const editor = useMemo(
    () => createTextEditor(withReact(createEditor())),
    [createTextEditor]
  )

  const isFocused = useAppSelector((state) => selectIsFocused(state, id))

  return {
    isChanged,
    setIsChanged,
    textFormattingOptions,
    toolbarControls,
    editor,
    isFocused,
  }
}
