/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2020 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2020 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { Editor as Core } from '@edtr-io/core'
import { RowsConfig } from '@edtr-io/plugin-rows'
import {
  createIcon,
  faAnchor,
  faCaretSquareDown,
  faCode,
  faCubes,
  faDotCircle,
  faFilm,
  faKeyboard,
  faImages,
  faNewspaper,
  faParagraph,
  faPhotoVideo,
  faQuoteRight
} from '@edtr-io/ui'
import * as React from 'react'

//import { CsrfContext } from './csrf-context'
//import { deserialize, isError } from './deserialize'
import { createPlugins } from './plugins'

/*export interface EditorProps {
  getCsrfToken(): string

  children?: React.ReactNode
  mayCheckout: boolean
  onSave: (data: unknown) => Promise<void>
  onError?: (error: Error, context: Record<string, string>) => void
  initialState: unknown
  type: string
}

export const SaveContext = React.createContext<{
  onSave: EditorProps['onSave']
  mayCheckout: boolean
}>({
  onSave: () => {
    return Promise.reject()
  },
  mayCheckout: false
})*/

export function Editor(props /*: EditorProps*/) {
  //let result = deserialize(props)
  const plugins = createPlugins(/*props.getCsrfToken,*/ getRegistry())

  /*if (isError(result)) {
    const url = window.location.pathname.replace(
      'add-revision',
      'add-revision-old'
    )
    switch (result.error) {
      case 'type-unsupported':
        return (
          <div className="alert alert-danger" role="alert">
            Dieser Inhaltstyp wird vom neuen Editor noch nicht unterstützt.
            Bitte erstelle eine Bearbeitung mit{' '}
            <a href={url}>dem alten Editor</a>.
          </div>
        )
      case 'failure':
        return (
          <div className="alert alert-danger" role="alert">
            Leider trat ein Fehler bei der Konvertierung auf. Die Entwickler
            wurden informiert. Bitte benutze in der Zwischenzeit noch{' '}
            <a href={url}>den alten Editor</a> für diesen Inhalt.
          </div>
        )
    }
  }
  const stored = getStored()
  if (
    stored &&
    confirm(
      'Es wurde eine alte Bearbeitung von dir gefunden. Möchtest du diese wiederherstellen?'
    )
  ) {
    result = {
      success: true,
      initialState: stored
    }
  }*/
  return (
    <>
      {/*<CsrfContext.Provider value={props.getCsrfToken}>
      <SaveContext.Provider
        value={{ onSave: props.onSave, mayCheckout: props.mayCheckout }}
  >*/}
      {/*<div className="alert alert-warning" role="alert">
        <strong>Willkommen im neuen Serlo-Editor :)</strong>
        <br />
        Bitte beachte, dass sich der neue Editor noch in einer Testphase
        befindet. Du kannst dein Feedback in{' '}
        <a
          href="https://docs.google.com/document/d/1Lb_hB0zgwzIHgmDPY75XXJKVu5sa33UUwvNTQdRGALk/edit"
          target="_blank"
        >
          diesem Google Doc
        </a>{' '}
        hinterlassen (oder alternativ via Mail an jonas@serlo.org). Dort findest
        du auch eine Liste von bekannten Problemen und ggf. Workarounds.
</div>*/}
      <Core
        onError={props.onError}
        plugins={plugins}
        initialState={props.initialState}
        editable
      >
        {props.children}
      </Core>
      {/*</SaveContext.Provider>
    </CsrfContext.Provider>*/}
    </>
  )

  function getRegistry(): RowsConfig['plugins'] {
    const isExercise = true /*[
      'grouped-text-exercise',
      'text-exercise',
      'text-exercise-group'
    ].includes(props.type)*/
    return [
      {
        name: 'text',
        title: 'Text',
        description: 'Schreibe Text und Matheformeln und formatiere sie.',
        icon: createIcon(faParagraph)
      },
      {
        name: 'blockquote',
        title: 'Zitat',
        description: 'Erzeuge eingerückten Text für Zitate.',
        icon: createIcon(faQuoteRight)
      },
      {
        name: 'geogebra',
        title: 'GeoGebra Applet',
        description:
          'Binde Applets von GeoGebra Materials via Link oder ID ein.',
        icon: createIcon(faCubes)
      },
      {
        name: 'highlight',
        title: 'Code',
        description:
          'Schreibe Code und hebe ihn je nach Programmiersprache hervor.',
        icon: createIcon(faCode)
      },
      {
        name: 'anchor',
        title: 'Anker',
        description: 'Füge eine Sprungmarke innerhalb deines Inhalts hinzu.',
        icon: createIcon(faAnchor)
      },
      {
        name: 'image',
        title: 'Bild',
        description:
          'Lade Bilder hoch oder verwende Bilder, die bereits online sind.',
        icon: createIcon(faImages)
      },
      {
        name: 'important',
        title: 'Merksatz'
      },
      {
        name: 'injection',
        title: 'Serlo Inhalt',
        description: 'Binde einen Inhalt von serlo.org via ID ein.',
        icon: createIcon(faNewspaper)
      },
      {
        name: 'multimedia',
        title: 'Erklärung mit Multimedia-Inhalt',
        description:
          'Erstelle einen veranschaulichenden oder erklärenden Multimedia-Inhalt mit zugehöriger Erklärung',
        icon: createIcon(faPhotoVideo)
      },
      ...(isExercise
        ? [
            {
              name: 'inputExercise',
              title: 'Eingabefeld',
              description:
                'Füge deiner Aufgabe ein Eingabefeld für die Lernenden hinzu.',
              icon: createIcon(faKeyboard)
            }
          ]
        : []),
      ...(isExercise
        ? [
            {
              name: 'scMcExercise',
              title: 'Auswahlaufgabe',
              description:
                'Füge deiner Aufgabe mehrere Single- oder Multiple-Choice-Antworten hinzu.',
              icon: createIcon(faDotCircle)
            }
          ]
        : []),
      {
        name: 'spoiler',
        title: 'Spoiler',
        description:
          'In diese ausklappbare Box kannst du zum Beispiel Exkurse hinzufügen.',
        icon: createIcon(faCaretSquareDown)
      },
      {
        name: 'table',
        title: 'Tabelle',
        description: 'Erstelle eine Tabelle mit Markdown.'
      },
      {
        name: 'video',
        title: 'Video',
        description:
          'Binde Videos von YouTube, Vimeo, Wikimedia Commons und BR ein.',
        icon: createIcon(faFilm)
      }
    ]
  }
}

/*function getStored(): { plugin: string; state?: unknown } | undefined {
  const edtr = localStorage.getItem('edtr')
  if (!edtr) return

  const state = JSON.parse(edtr)
  return state[window.location.pathname]
}

export function storeState(state: unknown) {
  const edtr = localStorage.getItem('edtr')
  if (!edtr) {
    localStorage.setItem(
      'edtr',
      JSON.stringify({
        [window.location.pathname]: state
      })
    )
  } else {
    const parsed = JSON.parse(edtr)
    localStorage.setItem(
      'edtr',
      JSON.stringify({
        ...parsed,
        [window.location.pathname]: state
      })
    )
  }
}*/
