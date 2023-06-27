import { faRandom, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { PropsWithChildren, useState } from 'react'

import { ExerciseProps } from '.'
import { FaIcon } from '@/components/fa-icon'
import {
  EditorStrings,
  useEditorStrings,
} from '@/contexts/logged-in-data-context'
import { AddButton } from '@/serlo-editor/editor-ui'
import { PluginToolbarButton } from '@/serlo-editor/plugin/plugin-toolbar'
import { store, selectDocument } from '@/serlo-editor/store'

const interactivePlugins: {
  name: 'scMcExercise' | 'inputExercise' | 'h5p'
  addLabel: (exStrings: EditorStrings['templatePlugins']['exercise']) => string
  title: (exStrings: EditorStrings['templatePlugins']['exercise']) => string
}[] = [
  {
    name: 'scMcExercise',
    addLabel(exStrings) {
      return exStrings.addChoiceExercise
    },
    title(exStrings) {
      return exStrings.choiceExercise
    },
  },
  {
    name: 'inputExercise',
    addLabel(exStrings) {
      return exStrings.addInputExercise
    },
    title(exStrings) {
      return exStrings.inputExercise
    },
  },
  {
    name: 'h5p',
    addLabel(exStrings) {
      return exStrings.addH5pExercise
    },
    title(exStrings) {
      return exStrings.h5pExercise
    },
  },
]

function InlineOptions(props: PropsWithChildren<{}>) {
  return (
    <div className="absolute left-6 -top-3 z-10 whitespace-nowrap pl-3">
      <div className="rounded-md bg-[rgba(255,255,255,0.95)] p-2 shadow-menu">
        {props.children}
      </div>
    </div>
  )
}

export function ExerciseEditor({ editable, state }: ExerciseProps) {
  const { content, interactive } = state
  const [showOptions, setShowOptions] = useState(false)

  const exStrings = useEditorStrings().templatePlugins.exercise
  return (
    <>
      {content.render()}
      {renderInteractive()}
    </>
  )

  function renderInteractive() {
    if (interactive.defined) {
      return interactive.render({
        renderToolbar(children) {
          return (
            <>
              <div
                className="relative"
                onMouseLeave={() => setShowOptions(false)}
              >
                <PluginToolbarButton
                  icon={<FaIcon icon={faRandom} />}
                  label={exStrings.changeInteractive}
                  onClick={() => setShowOptions(true)}
                />
                <PluginToolbarButton
                  icon={<FaIcon icon={faTrashAlt} />}
                  label={exStrings.removeInteractive}
                  onClick={() => interactive.remove()}
                />
                {showOptions ? (
                  <InlineOptions>
                    {interactivePlugins
                      .filter(
                        (plugin) =>
                          !interactive ||
                          plugin.name !== getCurrentInteractivePlugin()
                      )
                      .map((plugin) => {
                        return (
                          <div
                            key={plugin.name}
                            className="w-full min-w-[150px] cursor-pointer px-2.5 py-1.5 hover:text-[rgb(70,155,255)]"
                            onClick={() => {
                              interactive.replace(plugin.name)
                              setShowOptions(false)
                            }}
                          >
                            {plugin.title(exStrings)}
                          </div>
                        )
                      })}
                  </InlineOptions>
                ) : null}
              </div>
              {children}
            </>
          )
        },
      })
    }

    if (editable) {
      return (
        <>
          <p>
            <em>{exStrings.addOptionalInteractiveEx}</em>
          </p>
          <div className="flex">
            {interactivePlugins.map((plugin) => {
              return (
                <AddButton
                  key={plugin.name}
                  onClick={() => {
                    interactive.create({
                      plugin: plugin.name,
                    })
                  }}
                >
                  {plugin.addLabel(exStrings)}
                </AddButton>
              )
            })}
          </div>
        </>
      )
    }

    return null
  }

  function getCurrentInteractivePlugin() {
    if (!interactive.defined) return null
    const doc = selectDocument(store.getState(), interactive.id)
    return doc && doc.plugin
  }
}
