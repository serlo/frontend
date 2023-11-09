import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import type { ExerciseProps } from '.'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { isProduction } from '@/helper/is-production'
import { tw } from '@/helper/tw'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { store, selectDocument } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const allInteractiveExerciseTypes = isProduction
  ? ([
      EditorPluginType.ScMcExercise,
      EditorPluginType.InputExercise,
      EditorPluginType.H5p,
    ] as const)
  : ([
      EditorPluginType.ScMcExercise,
      EditorPluginType.InputExercise,
      EditorPluginType.H5p,
      EditorPluginType.FillInTheBlanksExercise,
    ] as const)

export function ExerciseEditor({ editable, state }: ExerciseProps) {
  const { content, interactive, solution } = state
  const exStrings = useEditorStrings().templatePlugins.exercise

  const interactiveExerciseTypes = allInteractiveExerciseTypes.filter((type) =>
    editorPlugins.getAllWithData().some((plugin) => plugin.type === type)
  )

  return (
    <>
      {content.render()}
      {interactive.defined ? (
        <>
          <nav className="relative flex justify-end">
            {editable ? renderChildTools() : null}
          </nav>
          {interactive.render()}
        </>
      ) : editable ? (
        <div className="mx-side">
          <p className="mb-2 text-gray-400">
            {exStrings.addOptionalInteractiveEx}
          </p>
          <div className="-ml-1.5 flex">
            {interactiveExerciseTypes.map((type) => {
              return (
                <AddButton
                  key={type}
                  onClick={() => interactive.create({ plugin: type })}
                  secondary
                >
                  {exStrings[type]}
                </AddButton>
              )
            })}
          </div>
        </div>
      ) : null}
      {solution.defined ? (
        <div className="-ml-side mt-block">
          <nav className="flex justify-end">
            <button
              className="serlo-button-editor-secondary serlo-tooltip-trigger relative top-7 z-20 mr-side"
              onClick={() => solution.remove()}
            >
              <EditorTooltip text={exStrings.removeSolution} />
              <FaIcon icon={faTrashAlt} />
            </button>
          </nav>
          {solution.render()}
        </div>
      ) : (
        <div className="-ml-1.5 mt-12 max-w-[50%]">
          <AddButton onClick={() => solution.create()}>
            {exStrings.createSolution}
          </AddButton>
        </div>
      )}
    </>
  )

  function renderChildTools() {
    return (
      <>
        <label className="serlo-tooltip-trigger mr-2">
          <EditorTooltip text={exStrings.changeInteractive} />
          <select
            onChange={({ target }) => {
              if (interactive.defined)
                interactive.replace(
                  target.value as (typeof interactiveExerciseTypes)[number]
                )
            }}
            className={tw`
                    mr-2 cursor-pointer rounded-md !border border-gray-500 bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
                  hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
                  `}
            value={getCurrentInteractivePlugin() ?? ''}
          >
            {interactiveExerciseTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {exStrings[type]}
                </option>
              )
            })}
          </select>
        </label>
        <button
          className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
          onClick={() => {
            if (interactive.defined) interactive.remove()
          }}
        >
          <EditorTooltip text={exStrings.removeInteractive} />
          <FaIcon icon={faTrashAlt} />
        </button>
      </>
    )
  }

  function getCurrentInteractivePlugin() {
    if (!interactive.defined) return null
    const doc = selectDocument(store.getState(), interactive.id)
    return doc && doc.plugin
  }
}
