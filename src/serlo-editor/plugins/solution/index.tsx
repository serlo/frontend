import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

import { SolutionRenderer } from './renderer'
import { InlineInput } from '../../plugin/helpers/inline-input'
import { InlineSettings } from '../../plugin/helpers/inline-settings'
import { InlineSettingsInput } from '../../plugin/helpers/inline-settings-input'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  EditorPlugin,
  EditorPluginProps,
  child,
  object,
  string,
  optional,
} from '@/serlo-editor/plugin'
import { selectIsDocumentEmpty, useAppSelector } from '@/serlo-editor/store'

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

function SolutionEditor({ editable, state, focused }: SolutionProps) {
  const { prerequisite, strategy } = state
  const hasStrategy = !useAppSelector((state) =>
    selectIsDocumentEmpty(state, strategy.id)
  )

  const solutionStrings = useEditorStrings().templatePlugins.solution

  return (
    <SolutionRenderer
      prerequisite={renderPrerequisiteContent()}
      strategy={
        hasStrategy || editable ? (
          <div className="-mx-2 px-side">
            {strategy.render({
              config: {
                placeholder: solutionStrings.optionalExplanation,
              },
            })}
          </div>
        ) : null
      }
      steps={<div className="ml-1">{state.steps.render()}</div>}
    />
  )

  function renderPrerequisiteContent() {
    if (editable) {
      return (
        <div>
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
                placeholder={solutionStrings.idArticle}
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
                <span title={solutionStrings.openArticleTab} className="ml-2.5">
                  <FaIcon icon={faUpRightFromSquare} />
                </span>
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
              placeholder={solutionStrings.linkTitle}
            />
          </a>
        </div>
      )
    }

    return prerequisite.defined &&
      prerequisite.id.value &&
      prerequisite.title.value ? (
      <a className="serlo-link" href={`/${prerequisite.id.value}`}>
        {prerequisite.title.value}
      </a>
    ) : null
  }
}
