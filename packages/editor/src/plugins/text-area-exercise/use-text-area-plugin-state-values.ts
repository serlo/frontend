import type { PrettyStaticState } from '@editor/plugin/internal-plugin-state'
import { useContext } from 'react'

import type { TextAreaExercisePluginState } from './index.jsx'
import { TextAreaEditorContext } from './text-area-exercise-props-context.js'
import { TextAreaStaticRendererContext } from './text-area-static-renderer-context.js'

export function useTextAreaPluginStateValues(): PrettyStaticState<TextAreaExercisePluginState> {
  // We get one of those two depending on if we are rendered by the editor or static renderer
  const textAreaEditorContext = useContext(TextAreaEditorContext)
  const textAreaStaticRendererContext = useContext(
    TextAreaStaticRendererContext
  )

  if (textAreaEditorContext) {
    const state = textAreaEditorContext.state
    const shallowClone = { ...state }
    Object.keys(shallowClone).forEach((key) => {
      // @ts-expect-error todo
      const oldValue = shallowClone[key] as { value: any }
      // @ts-expect-error todo
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      shallowClone[key] = oldValue.value
    })

    return shallowClone as unknown as PrettyStaticState<TextAreaExercisePluginState>
  } else if (textAreaStaticRendererContext) {
    return textAreaStaticRendererContext.state
  } else {
    throw new Error('Missing text area context')
  }
}
