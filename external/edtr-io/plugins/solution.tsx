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
import { useScopedSelector } from '@edtr-io/core'
import {
  EditorPlugin,
  EditorPluginProps,
  child,
  object,
  string,
  optional,
} from '@edtr-io/plugin'
import { isEmpty } from '@edtr-io/store'
import { Icon, faExternalLinkAlt, styled } from '@edtr-io/ui'
import { useI18n } from '@serlo/i18n'
import * as React from 'react'

import { InlineInput } from './helpers/inline-input'
import { InlineSettings } from './helpers/inline-settings'
import { InlineSettingsInput } from './helpers/inline-settings-input'
import { SemanticSection } from './helpers/semantic-section'

const solutionState = object({
  prerequisite: optional(
    object({
      id: string(),
      title: string(),
    })
  ),
  strategy: child({
    plugin: 'text',
  }),
  steps: child({ plugin: 'rows' }),
})

export type SolutionPluginState = typeof solutionState
export type SolutionProps = EditorPluginProps<SolutionPluginState>

export const solutionPlugin: EditorPlugin<SolutionPluginState> = {
  Component: SolutionEditor,
  state: solutionState,
  config: {},
}

const OpenInNewTab = styled.span({ margin: '0 0 0 10px' })

function SolutionEditor({ editable, state, focused }: SolutionProps) {
  const { prerequisite, strategy } = state
  const i18n = useI18n()

  const hasStrategy = !useScopedSelector(isEmpty(strategy.id))

  return (
    <>
      {renderPrerequisite()}
      {hasStrategy || editable ? (
        <SemanticSection editable={editable}>
          {strategy.render({
            config: {
              placeholder: i18n.t(
                'solution::Optionally explain the solution strategy here'
              ),
            },
          })}
        </SemanticSection>
      ) : null}
      <SemanticSection editable={editable}>
        {state.steps.render()}
      </SemanticSection>
    </>
  )

  function renderPrerequisite() {
    return (
      <SemanticSection editable={editable}>{renderContent()}</SemanticSection>
    )

    function renderContent() {
      if (editable) {
        return (
          <div>
            {i18n.t(
              'solution::For this exercise, you need the following fundamentals:'
            )}{' '}
            {focused ? (
              <InlineSettings
                onDelete={() => {
                  if (prerequisite.defined) {
                    prerequisite.remove()
                  }
                }}
                position="below"
              >
                <InlineSettingsInput
                  value={
                    prerequisite.defined && prerequisite.id.value !== ''
                      ? `/${prerequisite.id.value}`
                      : ''
                  }
                  placeholder={i18n.t('solution::ID of an article, e.g. 1855')}
                  onChange={(event) => {
                    const newValue = event.target.value.replace(/[^0-9]/g, '')
                    if (prerequisite.defined) {
                      prerequisite.id.set(newValue)
                    } else {
                      prerequisite.create({
                        id: newValue,
                        title: '',
                      })
                    }
                  }}
                />
                <a
                  target="_blank"
                  href={
                    prerequisite.defined && prerequisite.id.value !== ''
                      ? `/${prerequisite.id.value}`
                      : ''
                  }
                  rel="noopener noreferrer"
                >
                  <OpenInNewTab
                    title={i18n.t('solution::Open the article in a new tab:')}
                  >
                    <Icon icon={faExternalLinkAlt} />
                  </OpenInNewTab>
                </a>
              </InlineSettings>
            ) : null}
            <a>
              <InlineInput
                value={prerequisite.defined ? prerequisite.title.value : ''}
                onChange={(value) => {
                  if (prerequisite.defined) {
                    prerequisite.title.set(value)
                  } else {
                    prerequisite.create({ id: '', title: value })
                  }
                }}
                placeholder={i18n.t('solution::Title of the link')}
              />
            </a>
          </div>
        )
      }

      if (
        prerequisite.defined &&
        prerequisite.id.value &&
        prerequisite.title.value
      ) {
        return (
          <p>
            {i18n.t(
              'solution::For this exercise, you need the following fundamentals:'
            )}{' '}
            <a href={`/${prerequisite.id.value}`}>{prerequisite.title.value}</a>
          </p>
        )
      }

      return null
    }
  }
}
