// eslint-disable-next-line import/no-internal-modules
import { Editor, EditorProps } from '@edtr-io/core/beta'
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
import { createPlugins } from './plugins'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export interface SerloEditorProps {
  getCsrfToken(): string
  children?: React.ReactNode
  mayCheckout: boolean
  onSave: (data: unknown) => Promise<void>
  onError?: (error: Error, context: Record<string, string>) => void
  initialState: EditorProps['initialState'] // expects "deserialized" state now
  type: string
}

export interface LooseEdtrData {
  [key: string]: EditorProps['initialState'] | null | undefined
}

export interface LooseEdtrDataDefined {
  [key: string]: EditorProps['initialState']
}

export const SaveContext = React.createContext<{
  onSave: SerloEditorProps['onSave']
  mayCheckout: boolean
}>({
  onSave: () => {
    return Promise.reject()
  },
  mayCheckout: false,
})

export function SerloEditor({
  getCsrfToken,
  onSave,
  mayCheckout,
  onError,
  initialState,
  children,
  type,
}: SerloEditorProps) {
  const loggedInData = useLoggedInData()
  if (!loggedInData)
    return (
      <p className="text-center">
        <LoadingSpinner />
      </p>
    )
  const editorStrings = loggedInData.strings.editor

  const plugins = createPlugins({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    getCsrfToken: getCsrfToken,
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

  const stored = getStored()
  const useStored = stored && confirm(editorStrings.edtrIo.oldRevisionFound)

  return (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <CsrfContext.Provider value={getCsrfToken}>
      <SaveContext.Provider
        value={{ onSave: onSave, mayCheckout: mayCheckout }}
      >
        <Editor
          DocumentEditor={DocumentEditor}
          onError={onError}
          plugins={plugins}
          initialState={useStored ? stored : initialState}
          editable
        >
          {children}
        </Editor>
      </SaveContext.Provider>
    </CsrfContext.Provider>
  )

  function getRegistry(): RowsConfig['plugins'] {
    const isExercise = [
      'grouped-text-exercise',
      'text-exercise',
      'text-exercise-group',
    ].includes(type)
    return [
      {
        name: 'text',
        title: editorStrings.edtrIo.text,
        description: editorStrings.edtrIo.textDesc,
        icon: createIcon(faParagraph),
      },
      {
        name: 'blockquote',
        title: editorStrings.edtrIo.blockquoteTitle,
        description: editorStrings.edtrIo.quoteDescription,
        icon: createIcon(faQuoteRight),
      },
      {
        name: 'geogebra',
        title: editorStrings.edtrIo.geogebraTitle,
        description: editorStrings.edtrIo.geogebraDesc,
        icon: createIcon(faCubes),
      },
      {
        name: 'highlight',
        title: editorStrings.edtrIo.highlightTitle,
        description: editorStrings.edtrIo.highlightDesc,
        icon: createIcon(faCode),
      },
      {
        name: 'anchor',
        title: editorStrings.edtrIo.anchor,
        description: editorStrings.edtrIo.anchorDesc,
        icon: createIcon(faAnchor),
      },
      {
        name: 'equations',
        title: editorStrings.edtrIo.equationsTitle,
        description: editorStrings.edtrIo.equationsDesc,
      },
      {
        name: 'image',
        title: editorStrings.edtrIo.image,
        description: editorStrings.edtrIo.imageDesc,
        icon: createIcon(faImages),
      },
      {
        name: 'important',
        title: editorStrings.edtrIo.importantTitle,
        description: editorStrings.edtrIo.importantDesc,
      },
      {
        name: 'injection',
        title: editorStrings.edtrIo.injectionTitle,
        description: editorStrings.edtrIo.injectionDesc,
        icon: createIcon(faNewspaper),
      },
      {
        name: 'multimedia',
        title: editorStrings.edtrIo.multimediaTitle,
        description: editorStrings.edtrIo.multimediaDesc,
        icon: createIcon(faPhotoVideo),
      },
      {
        name: 'spoiler',
        title: editorStrings.edtrIo.spoiler,
        description: editorStrings.edtrIo.spoilerDesc,
        icon: createIcon(faCaretSquareDown),
      },
      {
        name: 'table',
        title: editorStrings.edtrIo.table,
        description: editorStrings.edtrIo.tableDesc,
      },
      {
        name: 'video',
        title: editorStrings.edtrIo.video,
        description: editorStrings.edtrIo.videoDesc,
        icon: createIcon(faFilm),
      },
      ...(isExercise
        ? [
            {
              name: 'separator',
              title: editorStrings.edtrIo.solutionSeparator,
              description: editorStrings.edtrIo.solutionSeparatorDesc,
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

export function storeState(state?: EditorProps['initialState'] | null) {
  const currentValue = localStorage.getItem('edtr')
  const edtr = currentValue ? (JSON.parse(currentValue) as LooseEdtrData) : {}

  edtr[window.location.pathname] = state

  localStorage.setItem('edtr', JSON.stringify(edtr))
}
