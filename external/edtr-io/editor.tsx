/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
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
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
// eslint-disable-next-line import/no-internal-modules
import { Editor as Core } from '@edtr-io/core/beta'
// eslint-disable-next-line import/no-internal-modules
import { createDefaultDocumentEditor } from '@edtr-io/default-document-editor/beta'
import { RowsConfig } from '@edtr-io/plugin-rows'
import {
  createIcon,
  faAnchor,
  faCaretSquareDown,
  faCode,
  faCubes,
  faFilm,
  faImages,
  faNewspaper,
  faParagraph,
  faPhotoVideo,
  faQuoteRight,
} from '@edtr-io/ui'
import { useI18n } from '@serlo/i18n'
import * as React from 'react'

import { CsrfContext } from './csrf-context'
import { deserialize, isError } from './deserialize'
import { createPlugins } from './plugins'

export interface EditorProps {
  getCsrfToken(): string

  children?: React.ReactNode
  mayCheckout: boolean
  onSave: (data: unknown) => Promise<void>
  onError?: (error: Error, context: Record<string, string>) => void
  initialState: unknown
  type: string
}

// it's a start
export interface LooseStateData {
  plugin: string
  state?: unknown
}

export interface LooseEdtrData {
  [key: string]: LooseStateData | undefined
}

export const SaveContext = React.createContext<{
  onSave: EditorProps['onSave']
  mayCheckout: boolean
}>({
  onSave: () => {
    return Promise.reject()
  },
  mayCheckout: false,
})

export function Editor(props: EditorProps) {
  const i18n = useI18n()

  let result = deserialize(props)
  const plugins = createPlugins({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    getCsrfToken: props.getCsrfToken,
    registry: getRegistry(),
    i18n,
  })

  const DocumentEditor = createDefaultDocumentEditor({
    i18n: {
      settings: {
        buttonLabel: i18n.t('edtr-io::Settings'),
        modalTitle: i18n.t('edtr-io::Extended Settings'),
        modalCloseLabel: i18n.t('edtr-io::Close'),
      },
    },
  })

  const legacyUrl = window.location.pathname
    .replace('add-revision', 'add-revision-old')
    .replace('create', 'create-old')
  if (isError(result)) {
    switch (result.error) {
      case 'type-unsupported':
        return (
          <div className="alert alert-danger" role="alert">
            {i18n.t(
              "edtr-io::This content type isn't supported by the new editor, yet."
            )}{' '}
            <a href={legacyUrl}>
              {i18n.t('edtr-io::Edit the content in the old editor.')}
            </a>
          </div>
        )
      case 'failure':
        return (
          <div className="alert alert-danger" role="alert">
            {i18n.t('edtr-io::An error occurred during the conversion.')}{' '}
            <a href={legacyUrl}>
              {i18n.t('edtr-io::Edit the content in the old editor.')}
            </a>
          </div>
        )
    }
  }
  const stored = getStored()
  if (
    stored &&
    confirm(
      i18n.t(
        'edtr-io::We found an old revision created by you. Do you want to restore it?'
      )
    )
  ) {
    result = {
      success: true,
      initialState: stored,
      converted: false,
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <CsrfContext.Provider value={props.getCsrfToken}>
      <SaveContext.Provider
        value={{ onSave: props.onSave, mayCheckout: props.mayCheckout }}
      >
        {result.converted ? (
          <div className="alert alert-warning" role="alert">
            {i18n.t(
              "edtr-io::This entity hasn't been converted to the new editor, yet."
            )}{' '}
            <a href={legacyUrl}>
              {i18n.t('edtr-io::Edit the content in the old editor.')}
            </a>
          </div>
        ) : null}
        <Core
          DocumentEditor={DocumentEditor}
          onError={props.onError}
          plugins={plugins}
          initialState={result.initialState}
          editable
        >
          {props.children}
        </Core>
      </SaveContext.Provider>
    </CsrfContext.Provider>
  )

  function getRegistry(): RowsConfig['plugins'] {
    const isExercise = [
      'grouped-text-exercise',
      'text-exercise',
      'text-exercise-group',
    ].includes(props.type)
    return [
      {
        name: 'text',
        title: i18n.t('edtr-io::Text'),
        description: i18n.t(
          'edtr-io::Compose content using rich text and math formulas.'
        ),
        icon: createIcon(faParagraph),
      },
      {
        name: 'blockquote',
        title: i18n.t('edtr-io::Quotation'),
        description: i18n.t('edtr-io::Create indented text for quotations.'),
        icon: createIcon(faQuoteRight),
      },
      {
        name: 'geogebra',
        title: i18n.t('edtr-io::GeoGebra Applet'),
        description: i18n.t(
          'edtr-io::Embed GeoGebra Materials applets via URL or ID.'
        ),
        icon: createIcon(faCubes),
      },
      {
        name: 'highlight',
        title: i18n.t('edtr-io::Source Code'),
        description: i18n.t('edtr-io::Highlight the syntax of source code.'),
        icon: createIcon(faCode),
      },
      {
        name: 'anchor',
        title: i18n.t('edtr-io::Anchor'),
        description: i18n.t('edtr-io::Insert an anchor.'),
        icon: createIcon(faAnchor),
      },
      {
        name: 'equations',
        title: i18n.t('edtr-io::Equations'),
        description: i18n.t(
          'edtr-io::Create mathematical equations and terms.'
        ),
      },
      {
        name: 'image',
        title: i18n.t('edtr-io::Image'),
        description: i18n.t('edtr-io::Upload images.'),
        icon: createIcon(faImages),
      },
      {
        name: 'important',
        title: i18n.t('edtr-io::Important Statement'),
        description: i18n.t(
          'edtr-io::A box to highlight important statements.'
        ),
      },
      {
        name: 'injection',
        title: i18n.t('edtr-io::serlo.org Content'),
        description: i18n.t('edtr-io::Embed serlo.org content via their ID.'),
        icon: createIcon(faNewspaper),
      },
      {
        name: 'multimedia',
        title: i18n.t('edtr-io::Multimedia content associated with text'),
        description: i18n.t(
          'edtr-io::Create an illustrating or explaining multimedia content associated with text.'
        ),
        icon: createIcon(faPhotoVideo),
      },
      {
        name: 'spoiler',
        title: i18n.t('edtr-io::Spoiler'),
        description: i18n.t('edtr-io::A collapsible box.'),
        icon: createIcon(faCaretSquareDown),
      },
      {
        name: 'table',
        title: i18n.t('edtr-io::Table'),
        description: i18n.t('edtr-io::Create tables using Markdown.'),
      },
      {
        name: 'video',
        title: i18n.t('edtr-io::Video'),
        description: i18n.t(
          'edtr-io::Embed YouTube, Vimeo, Wikimedia Commons or BR videos.'
        ),
        icon: createIcon(faFilm),
      },
      ...(isExercise
        ? [
            {
              name: 'separator',
              title: i18n.t('edtr-io::Solution Separator'),
              description: i18n.t(
                'edtr-io::Divide the solution into individual steps.'
              ),
            },
          ]
        : []),
    ]
  }
}

function getStored() {
  const edtr = localStorage.getItem('edtr')
  if (!edtr) return

  const state = JSON.parse(edtr) as LooseEdtrData
  return state[window.location.pathname]
}

export function storeState(state: LooseStateData) {
  const currentValue = localStorage.getItem('edtr')
  const edtr = currentValue ? (JSON.parse(currentValue) as LooseEdtrData) : {}

  edtr[window.location.pathname] = state

  localStorage.setItem('edtr', JSON.stringify(edtr))
}
