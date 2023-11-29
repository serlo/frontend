import { useEffect, useState } from 'react'

import { H5pRenderer, parseH5pUrl } from './renderer'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'
import { EditorInput } from '@/serlo-editor/editor-ui'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type StringStateType,
  string,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

export type H5pPluginState = StringStateType
export type H5pProps = EditorPluginProps<H5pPluginState>

/**
 * A mapping between the H5P exercise key (they call it library) and the
 * friendly value of how it should be displayed in the editor.
 */
const availableH5pExercises: Record<string, string> = {
  'H5P.DragQuestion': 'Drag and Drop',
  'H5P.Blanks': 'Fill in the Blanks',
  'H5P.DragText': 'Drag the Words',
  'H5P.ImageHotspotQuestion': 'Find the Hotspot',
  'H5P.ImagePair': 'Image pairing',
  'H5P.MultiMediaChoice': 'Bildauswahl (Image Choice)',
  'H5P.ImageMultipleHotspotQuestion':
    'Hotspots in Bild suchen (mehrere) (Find Multiple Hotspots)',
  'H5P.MemoryGame': 'Memory',
  'H5P.Flashcards': 'Flashcards',
  'H5P.MarkTheWords': 'Mark The Words',
}

export const H5pPlugin: EditorPlugin<H5pPluginState> = {
  Component: H5pEditor,
  config: {},
  state: string(),
}

// Note: This plugin will not be translated for now, as i18n work is deprioritized
function H5pEditor({ state, id }: H5pProps) {
  const hasState = !!state.value

  const [mode, setMode] = useState<'edit' | 'loading' | 'preview'>(
    hasState ? 'preview' : 'edit'
  )

  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')

  function validateInput(str: string) {
    if (!parseH5pUrl(str)) {
      setError('Die URL muss mit https://app.lumi.education/run/ beginnen.')
    } else {
      setError('')
    }
  }

  async function checkContent() {
    const id = parseH5pUrl(state.value)
    if (!id) {
      validateInput(state.value)
    } else {
      try {
        const res = await fetch('https://app.lumi.education/api/v1/run/' + id)
        const json = (await res.json()) as {
          downloadPath: string
          integration: {
            contents: { [key: string]: { library: string } }
          }
        }
        const mainLib = Object.values(
          json.integration.contents
        )[0].library.split(' ')[0]

        if (!Object.keys(availableH5pExercises).includes(mainLib)) {
          setError(
            'Unerlaubter Inhaltstyp - nutze bitte nur die oben genannten Inhaltstypen'
          )
          setMode('edit')
        } else {
          setMode('preview')
          setDownloadUrl(json.downloadPath)
        }
      } catch (e) {
        // e.g. invalid id
        setError(
          'H5P-Inhalt konnte nicht geladen werden, prüfe nochmal die URL'
        )
        setMode('edit')
      }
    }
  }

  useEffect(() => {
    if (hasState) {
      validateInput(state.value)
      void checkContent()
    }
    // only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (mode === 'edit' || mode === 'loading') {
    return (
      <div className="mb-12 mt-24 pt-4">
        <PluginToolbar
          pluginType={EditorPluginType.H5p}
          pluginControls={<InteractiveToolbarTools id={id} />}
        />

        <div className="rounded-xl bg-editor-primary-50 p-2">
          <h2 className="serlo-h2">Einfügen von H5P-Inhalt</h2>
          <div>
            Gehe in folgenden Schritten vor, um einen H5P-Inhalt zu erstellen
            und einzufügen:
            <ul className="serlo-ul">
              <li>
                Besuche{' '}
                <a
                  className="serlo-link"
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
                Klicke auf &quot;Neuen Inhalt erstellen&quot; und wähle eines
                der folgenden Inhaltstypen:
                <ul className="serlo-ul">
                  {Object.values(availableH5pExercises).map((exercise) => (
                    <li key={exercise}>{exercise}</li>
                  ))}
                </ul>
              </li>
              <li>
                Erstelle deinen Inhalt, speichere ihn und klicke dann auf
                &quot;Inhalt bereitstellen&quot;.
              </li>
              <li>Füge die Verknüpfung zur Bereitstellung hier ein:</li>
            </ul>
          </div>
          <div className="mt-4">
            <EditorInput
              label="URL zu Lumi-Bereitstellung "
              placeholder="https://app.lumi.education/run/J3j0eR"
              value={state.value}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value
                validateInput(val)
                state.set(val)
              }}
              inputWidth="70%"
              width="100%"
            />
            <button
              className="serlo-button ml-3 mt-2 bg-brandgreen-300 disabled:cursor-default disabled:bg-gray-300"
              disabled={
                state.value === '' || error !== '' || mode === 'loading'
              }
              onClick={() => {
                setMode('loading')
                void checkContent()
              }}
            >
              {mode === 'loading' ? '... wird geladen ...' : 'Einfügen'}
            </button>
          </div>
          {error && <p className="mx-side mt-2 text-red-500">{error}</p>}
          <p className="mt-4 max-w-[67%] text-sm text-gray-500">
            Hinweis: Um existierende Inhalte zu nutzen, lade diese herunter,
            lade sie in deinen Account hoch und stelle sie dort bereit.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <p className="mb-8 rounded-xl bg-editor-primary-100 p-2">
        H5P-Inhalt: <strong>{state.value}</strong>
        <button
          onClick={() => {
            setMode('edit')
          }}
          className="serlo-button-editor-primary ml-4"
        >
          Ändern
        </button>
        {downloadUrl && (
          <a
            href={`https://app.lumi.education${downloadUrl}`}
            className="serlo-link ml-3"
            target="_blank"
            rel="noreferrer"
          >
            herunterladen
          </a>
        )}
      </p>
      <H5pRenderer url={state.value} />
    </>
  )
}
