import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorRowsDocument } from '@editor/types/editor-plugins'
import { useContext } from 'react'

import { ExerciseNumberContext } from '../../core/contexts/exercise-number-context'

export function RowsStaticRenderer({ state, id }: EditorRowsDocument) {
  const exerciseNumbers = useContext(ExerciseNumberContext)

  console.log('RowsStaticRenderer called!', { id })

  // Check if the row id is part of the context
  const renderExerciseNumber = id && exerciseNumbers[id]
  if (renderExerciseNumber) {
    console.log('RenderExerciseNumber: ', {
      renderExerciseNumber,
    })
  }

  return (
    <div className="flex flex-row flex-wrap">
      {/* Conditionally render ExerciseNumbering if an exercise number is available */}
      {renderExerciseNumber ? renderExerciseNumber() : null}
      {state.map((row, index) => {
        // we can usually use the id, but for older content we fall back to index and hope that's enough
        const key = row.id ?? `${row.plugin}${index}`

        return (
          <div
            key={key}
            id={row.id?.split('-')[0]}
            className="my-block flex flex-col"
          >
            <StaticRenderer document={row} />
          </div>
        )
      })}
    </div>
  )
}
