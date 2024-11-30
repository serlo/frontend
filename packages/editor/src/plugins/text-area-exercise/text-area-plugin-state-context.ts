import type { PrettyStaticState } from '@editor/plugin/internal-plugin-state'
import type { EditorTextAreaExerciseDocument } from '@editor/types/editor-plugins'
import { createContext, useContext } from 'react'

import type { TextAreaExercisePluginState, TextAreaExerciseProps } from '.'

// Provide text area exercise plugin state to all child components
// - Editor component (author view) provides TextAreaExerciseProps containing state and "set state" functions
// - Static Renderer (learner view) provides EditorTextAreaExerciseDocument containing only state
export const TextAreaPluginStateContext = createContext<
  EditorTextAreaExerciseDocument | TextAreaExerciseProps
>(
  // @ts-expect-error Force not null so we don't have to check for null when using context. Should be fine as long as we don't use the context outside the provider.
  null as EditorTextAreaExerciseDocument
)

export function useTextAreaPluginStateValues(): PrettyStaticState<TextAreaExercisePluginState> {
  const textAreaPluginStateContext = useContext(TextAreaPluginStateContext)
  const isEditor = 'focused' in textAreaPluginStateContext
  const state = textAreaPluginStateContext.state
  if (isEditor) {
    const shallowClone = { ...state }
    Object.keys(shallowClone).forEach((key) => {
      // @ts-expect-error todo
      const oldValue = shallowClone[key] as { value: any }
      // @ts-expect-error todo
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      shallowClone[key] = oldValue.value
    })

    return shallowClone as PrettyStaticState<TextAreaExercisePluginState>
  } else return textAreaPluginStateContext.state
}
