import { GeogebraProps } from '.'
import { EditorInput, EditorInlineSettings } from '../../editor-ui'
import { GeogebraRenderer } from './renderer'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function GeogebraEditor(props: GeogebraProps) {
  const { focused, editable, state } = props

  const editorStrings = useLoggedInData()!.strings.editor

  if (!editable) return <GeogebraRenderer {...props} />

  return (
    <>
      <GeogebraRenderer {...props} disableCursorEvents={editable} />
      {focused ? (
        <EditorInlineSettings>
          <EditorInput
            label={editorStrings.geogebra.urlOrId}
            placeholder="12345"
            value={state.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              state.set(e.target.value)
            }}
            inputWidth="70%"
            width="100%"
            ref={props.autofocusRef}
          />
        </EditorInlineSettings>
      ) : null}
    </>
  )
}
