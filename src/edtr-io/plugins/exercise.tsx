import { PropsWithChildren, useState } from 'react'

import { SemanticSection } from './helpers/semantic-section'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { PluginToolbarButton } from '@/serlo-editor/core'
import { styled, AddButton } from '@/serlo-editor/editor-ui'
import {
  EditorPlugin,
  EditorPluginProps,
  child,
  object,
  optional,
} from '@/serlo-editor/plugin'
import { store, selectDocument } from '@/serlo-editor/store'
import { Icon, faRandom, faTrashAlt } from '@/serlo-editor/ui'

const exerciseState = object({
  content: child({ plugin: 'rows' }),
  interactive: optional(
    child<'scMcExercise' | 'inputExercise' | 'h5p'>({
      plugin: 'scMcExercise',
    })
  ),
})

export type ExercisePluginState = typeof exerciseState
export type ExerciseProps = EditorPluginProps<ExercisePluginState>

export const exercisePlugin: EditorPlugin<ExercisePluginState> = {
  Component: ExerciseEditor,
  state: exerciseState,
  config: {},
}

const ButtonContainer = styled.div({
  display: 'flex',
})

const interactivePlugins: {
  name: 'scMcExercise' | 'inputExercise' | 'h5p'
  addLabel: (editorStrings: LoggedInData['strings']['editor']) => string
  title: (editorStrings: LoggedInData['strings']['editor']) => string
}[] = [
  {
    name: 'scMcExercise',
    addLabel(editorStrings) {
      return editorStrings.exercise.addChoiceExercise
    },
    title(editorStrings) {
      return editorStrings.exercise.choiceExercise
    },
  },
  {
    name: 'inputExercise',
    addLabel(editorStrings) {
      return editorStrings.exercise.addInputExercise
    },
    title(editorStrings) {
      return editorStrings.exercise.inputExercise
    },
  },
  {
    name: 'h5p',
    addLabel(editorStrings) {
      return editorStrings.exercise.addH5pExercise
    },
    title(editorStrings) {
      return editorStrings.exercise.h5pExercise
    },
  },
]

const InlineOptionsWrapper = styled.div({
  position: 'absolute',
  top: '-30px',
  right: '0',
  padding: '30px',
  zIndex: 95,
  whiteSpace: 'nowrap',
})

const InlineOptionsContentWrapper = styled.div({
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '4px',
})

function InlineOptions(props: PropsWithChildren<{}>) {
  return (
    <InlineOptionsWrapper>
      <InlineOptionsContentWrapper>
        {props.children}
      </InlineOptionsContentWrapper>
    </InlineOptionsWrapper>
  )
}
const Option = styled.div({
  padding: '5px 10px',
  cursor: 'pointer',
  width: '100%',
  minWidth: '150px',
  '&:hover': {
    color: 'rgb(70, 155, 255)',
  },
})

function ExerciseEditor({ editable, state }: ExerciseProps) {
  const { content, interactive } = state
  const [showOptions, setShowOptions] = useState(false)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor
  return (
    <>
      <SemanticSection editable={editable}>{content.render()}</SemanticSection>
      <SemanticSection editable={editable}>
        {renderInteractive()}
      </SemanticSection>
    </>
  )

  function renderInteractive() {
    if (interactive.defined) {
      return interactive.render({
        renderToolbar(children) {
          return (
            <>
              <div
                style={{ position: 'relative' }}
                onMouseLeave={() => {
                  setShowOptions(false)
                }}
              >
                <PluginToolbarButton
                  icon={<Icon icon={faRandom} />}
                  label={editorStrings.exercise.changeInteractive}
                  onClick={() => {
                    setShowOptions(true)
                  }}
                />
                <PluginToolbarButton
                  icon={<Icon icon={faTrashAlt} />}
                  label={editorStrings.exercise.removeInteractive}
                  onClick={() => {
                    interactive.remove()
                  }}
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
                          <Option
                            key={plugin.name}
                            onClick={() => {
                              interactive.replace(plugin.name)
                              setShowOptions(false)
                            }}
                          >
                            {plugin.title(editorStrings)}
                          </Option>
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
            <em>{editorStrings.exercise.addOptionalInteractiveEx}</em>
          </p>
          <ButtonContainer>
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
                  {plugin.addLabel(editorStrings)}
                </AddButton>
              )
            })}
          </ButtonContainer>
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
