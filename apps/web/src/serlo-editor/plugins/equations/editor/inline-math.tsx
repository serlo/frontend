import { useContext } from 'react'

import {
  PreferenceContext,
  setDefaultPreference,
} from '@/serlo-editor/core/contexts'
import { MathEditor } from '@/serlo-editor/math'
import type {
  StateTypeReturnType,
  StringStateType,
} from '@/serlo-editor/plugin'

interface InlineMathProps {
  state: StateTypeReturnType<StringStateType>
  placeholder: string
  onChange: (state: string) => void
  onFocusNext: () => void
  onFocusPrevious: () => void
  closeMathEditorOverlay?: () => void
  focused?: boolean
  prefix?: string
  suffix?: string
}

const preferenceKey = 'katex:usevisualmath'

setDefaultPreference(preferenceKey, true)

export function InlineMath(props: InlineMathProps) {
  const {
    focused,
    onFocusNext,
    onFocusPrevious,
    closeMathEditorOverlay,
    onChange,
    state,
    prefix = '',
    suffix = '',
  } = props

  const preferences = useContext(PreferenceContext)

  return (
    <MathEditor
      readOnly={!focused}
      state={`${prefix}${state.value}${suffix}`}
      inline
      disableBlock
      visual={preferences.getKey(preferenceKey) === true}
      onEditorChange={(visual) => {
        preferences.setKey(preferenceKey, visual)
      }}
      onInlineChange={() => {}}
      onChange={onChange}
      onMoveOutRight={onFocusNext}
      onMoveOutLeft={onFocusPrevious}
      // When the math editor is rendered within the equations plugin, we simply
      // close the mathEditorOverlay without focusing the next plugin
      closeMathEditorOverlay={closeMathEditorOverlay || onFocusNext}
    />
  )
}
