import { useExerciseFolderStats } from '@/contexts/exercise-folder-stats-context'
import { useEntityId } from '@/contexts/uuids-context'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorExerciseDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function ExerciseStaticRenderer({ state }: EditorExerciseDocument) {
  const { content, interactive, solution } = state
  const exerciseData = useExerciseFolderStats()
  const entityId = useEntityId()
  if (!content) return null

  return (
    <>
      <StaticRenderer document={content} />
      
      {renderExerciseStats()}
      <StaticRenderer document={interactive} />
      <StaticRenderer document={solution} />
    </>
  )

  function renderExerciseStats() {
    if (!exerciseData) return null

    const entry = exerciseData.data[entityId!.toString()]

    if (!entry) return null

    if (!state.interactive?.state) return null

    return (
      <>
        <div className="my-4 ml-2 rounded-xl border border-fuchsia-400 p-2">
          <div>
            {entry.correct} mal sofort gelöst / {entry.afterTrying} mal löst
            nach Versuchen / {entry.wrong} mal nicht gelöst
          </div>
          <div className="mt-2 flex h-2 w-full bg-gray-300">
            <div
              className="bg-green-500"
              style={{
                width: `${
                  (entry.correct / exerciseData.interactiveCount) * 100
                }%`,
              }}
            ></div>
            <div
              className="bg-yellow-500"
              style={{
                width: `${
                  (entry.afterTrying / exerciseData.interactiveCount) * 100
                }%`,
              }}
            ></div>
            <div
              className="bg-red-500"
              style={{
                width: `${
                  (entry.wrong / exerciseData.interactiveCount) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </>
    )
  }
}
