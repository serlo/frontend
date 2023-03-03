import { EditorInput, EditorInlineSettings } from '@edtr-io/editor-ui'
import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '@edtr-io/plugin'
import Script from 'next/script'

export type H5pPluginState = StringStateType
export type H5pProps = EditorPluginProps<H5pPluginState>

export const H5pPlugin: EditorPlugin<H5pPluginState> = {
  Component: H5pEditor,
  config: {},
  state: string(),
  /*onText(value) {
      if (/geogebra\.org\/m\/(.+)/.test(value)) {
        return { state: value }
      }
    },*/
}

export function H5pEditor(props: H5pProps) {
  const { focused, editable, state } = props

  /*const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const injectionsStrings = loggedInData.strings.editor.injection*/

  if (!editable) return <H5pRenderer {...props} />

  return (
    <>
      <H5pRenderer {...props} disableCursorEvents />
      {focused ? (
        <EditorInlineSettings>
          <EditorInput
            label="URL zu Lumi-Bereitstellung"
            placeholder="https://app.lumi.education/run/P46cdL"
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

type H5pRendererProps = H5pProps & {
  disableCursorEvents?: boolean
}

export function H5pRenderer(props: H5pRendererProps) {
  const url = props.state.value
  if (!url)
    return (
      <div>
        Erstelle auf Lumi einen H5P-Inhalt, stelle ihn bereit und füge den Link
        hier ein.
      </div>
    )
  return (
    <div className="mx-side mb-block">
      <iframe
        src={props.state.value}
        width="1088"
        height="720"
        allowFullScreen
        allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
      ></iframe>
      <Script src="https://app.Lumi.education/api/v1/h5p/core/js/h5p-resizer.js" />
    </div>
  )
}
