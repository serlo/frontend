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
import * as React from 'react'

import { CsrfContext } from './csrf-context'
import { deserialize, isError } from './deserialize'
import { createPlugins } from './plugins'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

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
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  let result = deserialize(props)
  const plugins = createPlugins({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    getCsrfToken: props.getCsrfToken,
    registry: getRegistry(),
    editorStrings,
  })

  const DocumentEditor = createDefaultDocumentEditor({
    i18n: {
      settings: {
        buttonLabel: editorStrings.edtrIo.settings,
        modalTitle: editorStrings.edtrIo.extendedSettings,
        modalCloseLabel: editorStrings.edtrIo.close,
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
            {editorStrings.edtrIo.thisContentTypeIsnTSupportedByTheNewEditorYet}{' '}
            <a href={legacyUrl}>
              {editorStrings.edtrIo.editTheContentInTheOldEditor}
            </a>
          </div>
        )
      case 'failure':
        return (
          <div className="alert alert-danger" role="alert">
            {editorStrings.edtrIo.anErrorOccurredDuringTheConversion}{' '}
            <a href={legacyUrl}>
              {editorStrings.edtrIo.editTheContentInTheOldEditor}
            </a>
          </div>
        )
    }
  }
  const stored = getStored()
  if (
    stored &&
    confirm(
      editorStrings.edtrIo.weFoundAnOldRevisionCreatedByYouDoYouWantToRestoreIt
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
            {editorStrings.edtrIo.thisEntityHasnTBeenConvertedToTheNewEditorYet}{' '}
            <a href={legacyUrl}>
              {editorStrings.edtrIo.editTheContentInTheOldEditor}
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
        title: editorStrings.edtrIo.text,
        description:
          editorStrings.edtrIo.composeContentUsingRichTextAndMathFormulas,
        icon: createIcon(faParagraph),
      },
      {
        name: 'blockquote',
        title: editorStrings.edtrIo.quotation,
        description: editorStrings.edtrIo.createIndentedTextForQuotations,
        icon: createIcon(faQuoteRight),
      },
      {
        name: 'geogebra',
        title: editorStrings.edtrIo.geoGebraApplet,
        description:
          editorStrings.edtrIo.embedGeoGebraMaterialsAppletsViaUrlOrId,
        icon: createIcon(faCubes),
      },
      {
        name: 'highlight',
        title: editorStrings.edtrIo.sourceCode,
        description: editorStrings.edtrIo.highlightTheSyntaxOfSourceCode,
        icon: createIcon(faCode),
      },
      {
        name: 'anchor',
        title: editorStrings.edtrIo.anchor,
        description: editorStrings.edtrIo.insertAnAnchor,
        icon: createIcon(faAnchor),
      },
      {
        name: 'equations',
        title: editorStrings.edtrIo.termsAndEquations,
        description:
          editorStrings.edtrIo.writeTermManipulationsAndSolveMultilineEquations,
      },
      {
        name: 'image',
        title: editorStrings.edtrIo.image,
        description: editorStrings.edtrIo.uploadImages,
        icon: createIcon(faImages),
      },
      {
        name: 'important',
        title: editorStrings.edtrIo.importantStatement,
        description: editorStrings.edtrIo.aBoxToHighlightImportantStatements,
      },
      {
        name: 'injection',
        title: editorStrings.edtrIo.serloOrgContent,
        description: editorStrings.edtrIo.embedSerloOrgContentViaTheirId,
        icon: createIcon(faNewspaper),
      },
      {
        name: 'multimedia',
        title: editorStrings.edtrIo.multimediaContentAssociatedWithText,
        description:
          editorStrings.edtrIo
            .createAnIllustratingOrExplainingMultimediaContentAssociatedWithText,
        icon: createIcon(faPhotoVideo),
      },
      {
        name: 'spoiler',
        title: editorStrings.edtrIo.spoiler,
        description: editorStrings.edtrIo.aCollapsibleBox,
        icon: createIcon(faCaretSquareDown),
      },
      {
        name: 'table',
        title: editorStrings.edtrIo.table,
        description: editorStrings.edtrIo.createTablesUsingMarkdown,
      },
      {
        name: 'video',
        title: editorStrings.edtrIo.video,
        description:
          editorStrings.edtrIo.embedYouTubeVimeoWikimediaCommonsOrBrVideos,
        icon: createIcon(faFilm),
      },
      ...(isExercise
        ? [
            {
              name: 'separator',
              title: editorStrings.edtrIo.solutionSeparator,
              description:
                editorStrings.edtrIo.divideTheSolutionIntoIndividualSteps,
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

export function storeState(state?: unknown) {
  const currentValue = localStorage.getItem('edtr')
  const edtr = currentValue ? JSON.parse(currentValue) : {}

  edtr[window.location.pathname] = state

  localStorage.setItem('edtr', JSON.stringify(edtr))
}
