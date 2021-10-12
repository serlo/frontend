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
import { PluginToolbarButton, useScopedStore } from '@edtr-io/core'
import { styled } from '@edtr-io/editor-ui'
// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui/internal'
import {
  EditorPlugin,
  EditorPluginProps,
  child,
  object,
  optional,
} from '@edtr-io/plugin'
import { getDocument } from '@edtr-io/store'
import { Icon, faRandom, faTrashAlt } from '@edtr-io/ui'
import { useI18n, I18n } from '@serlo/i18n'
import * as React from 'react'

import { SemanticSection } from './helpers/semantic-section'

const exerciseState = object({
  content: child({ plugin: 'rows' }),
  interactive: optional(
    child<'scMcExercise' | 'inputExercise'>({ plugin: 'scMcExercise' })
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
  name: 'scMcExercise' | 'inputExercise'
  addLabel: (i18n: I18n) => string
  title: (i18n: I18n) => string
}[] = [
  {
    name: 'scMcExercise',
    addLabel(i18n) {
      return i18n.t('exercise::Add choice exercise')
    },
    title(i18n) {
      return i18n.t('exercise::Choice exercise')
    },
  },
  {
    name: 'inputExercise',
    addLabel(i18n) {
      return i18n.t('exercise::Add input exercise')
    },
    title(i18n) {
      return i18n.t('exercise::Input exercise')
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

function InlineOptions(props: React.PropsWithChildren<{}>) {
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
  const i18n = useI18n()
  const store = useScopedStore()
  const { content, interactive } = state
  const [showOptions, setShowOptions] = React.useState(false)

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
                  // TODO: i18n
                  label="Interaktives Element ändern"
                  onClick={() => {
                    setShowOptions(true)
                  }}
                />
                <PluginToolbarButton
                  icon={<Icon icon={faTrashAlt} />}
                  // TODO: i18n
                  label="Interaktives Element entfernen"
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
                            {plugin.title(i18n)}
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
            <em>{i18n.t('exercise::Add an optional interactive exercise:')}</em>
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
                  {plugin.addLabel(i18n)}
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
    const doc = getDocument(interactive.id)(store.getState())
    return doc && doc.plugin
  }
}
