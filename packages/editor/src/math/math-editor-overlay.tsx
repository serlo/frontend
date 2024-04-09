import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { MathEditorProps } from './editor'
import { MathEditorTextarea } from './textarea'

export function MathEditorOverlay({
  hasError,
  isVisualMode,
  ...props
}: { hasError: boolean; isVisualMode: boolean } & MathEditorProps) {
  const mathStrings = useEditorStrings().plugins.text.math

  return (
    <div
      className="fixed bottom-0 z-50 rounded-t-xl bg-editor-primary-100 p-3 shadow-menu"
      // Stops double/triple clicks inside the textArea field / modal to close
      // the overlay (see #2700)
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <p className="mr-0.5 mt-1 text-right text-sm font-bold text-gray-600">
          {hasError ? mathStrings.onlyLatex : mathStrings.latexEditorTitle}
        </p>
        <button
          onClick={props.closeMathEditorOverlay}
          className="mr-0.5 mt-1 text-sm font-bold text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
          aria-label="Close math formula editor"
          data-qa="plugin-math-close-formula-editor"
        >
          <FaIcon icon={faXmark} />
        </button>
      </div>
      {!isVisualMode && <MathEditorTextarea {...props} />}
    </div>
  )
}
