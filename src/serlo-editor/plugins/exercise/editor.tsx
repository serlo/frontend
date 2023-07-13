import { faRandom, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ReactNode, useState } from 'react'

import { ExerciseProps } from '.'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { AddButton } from '@/serlo-editor/editor-ui'
import { PluginToolbarButton } from '@/serlo-editor/plugin/plugin-toolbar'
import { store, selectDocument } from '@/serlo-editor/store'

const interactiveExerciseTypes = [
  EditorPluginType.ScMcExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.H5p,
] as const

export function ExerciseEditor({ editable, state }: ExerciseProps) {
  const { content, interactive } = state
  const [showOptions, setShowOptions] = useState(false)

  const exStrings = useEditorStrings().templatePlugins.exercise
  return (
    <>
      {content.render()}
      {interactive.defined ? (
        interactive.render({ renderToolbar })
      ) : editable ? (
        <>
          <p className="mb-2 text-gray-400">
            {exStrings.addOptionalInteractiveEx}
          </p>
          <div className="-ml-1.5 flex">
            {interactiveExerciseTypes.map((type) => {
              return (
                <AddButton
                  key={type}
                  onClick={() => interactive.create({ plugin: type })}
                >
                  {exStrings[type]}
                </AddButton>
              )
            })}
          </div>
        </>
      ) : null}
    </>
  )

  function renderToolbar(children: ReactNode) {
    return (
      <>
        <div className="relative" onMouseLeave={() => setShowOptions(false)}>
          <PluginToolbarButton
            icon={<FaIcon icon={faRandom} />}
            label={exStrings.changeInteractive}
            onClick={() => setShowOptions(true)}
          />
          <PluginToolbarButton
            icon={<FaIcon icon={faTrashAlt} />}
            label={exStrings.removeInteractive}
            onClick={() => {
              if (interactive.defined) interactive.remove()
            }}
          />
          {showOptions ? (
            <div className="absolute left-6 -top-3 whitespace-nowrap pl-3">
              <div className="rounded-md bg-[rgba(255,255,255,0.95)] p-2 shadow-menu">
                {interactiveExerciseTypes
                  .filter(
                    (type) =>
                      !interactive || type !== getCurrentInteractivePlugin()
                  )
                  .map((type) => {
                    return (
                      <div
                        key={type}
                        className="w-full min-w-[150px] cursor-pointer px-2.5 py-1.5 hover:text-[rgb(70,155,255)]"
                        onClick={() => {
                          if (interactive.defined) interactive.replace(type)
                          setShowOptions(false)
                        }}
                      >
                        {exStrings[type]}
                      </div>
                    )
                  })}
              </div>
            </div>
          ) : null}
        </div>
        {children}
      </>
    )
  }

  function getCurrentInteractivePlugin() {
    if (!interactive.defined) return null
    const doc = selectDocument(store.getState(), interactive.id)
    return doc && doc.plugin
  }
}
