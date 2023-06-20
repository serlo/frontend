import { faRandom, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { PropsWithChildren, useState } from 'react'
import styled from 'styled-components'

import { SemanticSection } from '../../plugin/helpers/semantic-section'
import { FaIcon } from '@/components/fa-icon'
import {
  EditorStrings,
  useEditorStrings,
} from '@/contexts/logged-in-data-context'
import { AddButton } from '@/serlo-editor/editor-ui'
import {
  EditorPlugin,
  EditorPluginProps,
  child,
  object,
  optional,
} from '@/serlo-editor/plugin'
import { PluginToolbarButton } from '@/serlo-editor/plugin/plugin-toolbar'
import { store, selectDocument } from '@/serlo-editor/store'

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

  const exStrings = useEditorStrings().templatePlugins.exercise
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
                className="relative"
                onMouseLeave={() => {
                  setShowOptions(false)
                }}
              >
                <PluginToolbarButton
                  icon={<FaIcon icon={faRandom} />}
                  label={exStrings.changeInteractive}
                  onClick={() => {
                    setShowOptions(true)
                  }}
                />
                <PluginToolbarButton
                  icon={<FaIcon icon={faTrashAlt} />}
                  label={exStrings.removeInteractive}
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
                            {plugin.title(exStrings)}
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
            <em>{exStrings.addOptionalInteractiveEx}</em>
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
                  {plugin.addLabel(exStrings)}
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
