import { EditorInput, EditorInlineSettings } from '@edtr-io/editor-ui'
import {
  EditorPlugin,
  EditorPluginProps,
  string,
  StringStateType,
} from '@edtr-io/plugin'
import Script from 'next/script'
import { useState } from 'react'

export type H5pPluginState = StringStateType
export type H5pProps = EditorPluginProps<H5pPluginState>

const h5pLibraryWhitelist = [
  'H5P.AdvancedText',
  'FontAwesome',
  'jQuery.ui',
  'H5P.JoubelUI',
  'H5P.Transition',
  'H5P.FontIcons',
  'H5P.Question',
  'H5P.DragQuestion',
  'H5P.TextUtilities',
  'H5P.Blanks',
  'H5P.DragText',
  'H5P.ImageHotspotQuestion',
]

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
  const { state } = props

  const [mode, setMode] = useState<'edit' | 'loading' | 'preview'>('edit')
  const [url, setUrl] = useState('')

  const [error, setError] = useState('')

  if (mode == 'edit' || mode == 'loading') {
    return (
      <>
        <h2>Einfügen von H5P-Inhalt</h2>
        <div>
          Gehe in folgenden Schritten vor, um einen H5P-Inhalt zu erstellen und
          einzufügen:
          <ul>
            <li>
              Besuche{' '}
              <a
                href="https://app.lumi.education/"
                target="_blank"
                rel="noreferrer"
              >
                Lumi Cloud
              </a>
              .
            </li>
            <li>
              Registriere dich mit deiner E-Mail-Adresse und melde dich an.
            </li>
            <li>
              Klicke auf &quot;Neuen Inhalt erstellen&quot; und wähle eines der
              vier Inhaltstypen:
              <ul>
                <li>Fill in the Blanks</li>
                <li>Drag the Words</li>
                <li>Find the Hotspot</li>
                <li>Drag and Drop</li>
              </ul>
            </li>
            <li>
              Erstelle deinen Inhalt, speichere ihn und klicke dann auf
              &quot;Inhalt bereitstellen&quot;.
            </li>
            <li>Füge den Bereitstellungslink hier ein:</li>
          </ul>
        </div>
        <div>
          <EditorInlineSettings>
            <EditorInput
              label="URL zu Lumi-Bereitstellung"
              placeholder="https://app.lumi.education/run/J3j0eR"
              value={state.value}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                //console.log('on input', e.target.value)
                if (
                  e.target.value
                    .toLowerCase()
                    .startsWith('https://app.lumi.education/run/')
                ) {
                  setError('')
                } else {
                  setError(
                    'Die URL muss mit https://app.lumi.education/run/ beginnen.'
                  )
                }
                setUrl(e.target.value)
                state.set(e.target.value)
              }}
              inputWidth="70%"
              width="100%"
              ref={props.autofocusRef}
            />
          </EditorInlineSettings>
        </div>
        {error && <p className="text-red-500 mt-2 mx-side">{error}</p>}
        <p>
          <button
            className="mt-2 serlo-button bg-brandgreen-300 disabled:bg-gray-300 disabled:cursor-default"
            disabled={!!(!url || error || mode == 'loading')}
            onClick={() => {
              setMode('loading')
              void (async () => {
                const match = /https:\/\/app\.lumi\.education\/run\/(.+)/i.exec(
                  url
                )
                try {
                  const id = match ? match[1] : ''
                  const res = await fetch(
                    'https://app.lumi.education/api/v1/run/' + id
                  )
                  const json = (await res.json()) as {
                    dependencies: { machineName: string }[]
                  }
                  if (
                    !json.dependencies.every((dep) =>
                      h5pLibraryWhitelist.includes(dep.machineName)
                    )
                  ) {
                    setError(
                      'Unerlaubte Plugintypen - nutze bitte nur die vier genannten Inhaltstypen'
                    )
                    setMode('edit')
                  }
                  //console.log(json)
                  props.state.set(url)
                  setMode('preview')
                } catch (e) {
                  alert(e)
                  setMode('edit')
                }
              })()
            }}
          >
            {mode == 'loading' ? '... wird geladen ...' : 'Einfügen'}
          </button>
        </p>
        <p className="mt-4 text-gray-500 text-sm">
          <small>
            Hinweis: Um existierende Inhalte zu nutzen, lade diese herunter,
            lade sie in deinen Account hoch und stelle sie dort bereit.
          </small>
        </p>
      </>
    )
  }

  return (
    <>
      <p className="mb-8">
        H5P-Inhalt: <strong>{props.state.value}</strong>
        <button
          onClick={() => {
            setMode('edit')
          }}
          className="ml-4 serlo-button bg-brand-300"
        >
          Ändern
        </button>
      </p>
      <H5pRenderer {...props} disableCursorEvents />
    </>
  )
}

type H5pRendererProps = H5pProps & {
  disableCursorEvents?: boolean
}

export function H5pRenderer(props: H5pRendererProps) {
  const id = /https:\/\/app\.lumi\.education\/run\/(.+)/i.exec(
    props.state.value
  )
  return (
    <div className="mx-side mb-block">
      <iframe
        src={`https://app.Lumi.education/api/v1/run/${id ? id[1] : '_'}/embed`}
        width="727"
        height="500"
        allowFullScreen
        allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
      ></iframe>
      <Script src="/_assets/h5p-resizer.js" />
    </div>
  )
}
