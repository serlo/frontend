import {
  EditorPlugin,
  EditorPluginProps,
  child,
  object,
  string,
  optional,
} from '@edtr-io/plugin'
import { selectIsDocumentEmpty, useAppSelector } from '@edtr-io/store'
import { Icon, styled } from '@edtr-io/ui'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

import { InlineInput } from './helpers/inline-input'
import { InlineSettings } from './helpers/inline-settings'
import { InlineSettingsInput } from './helpers/inline-settings-input'
import { SemanticSection } from './helpers/semantic-section'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

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
  const hasStrategy = !useAppSelector((state) =>
    selectIsDocumentEmpty(state, strategy.id)
  )

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <>
      {renderPrerequisite()}
      {hasStrategy || editable ? (
        <SemanticSection editable={editable}>
          {strategy.render({
            config: {
              placeholder: editorStrings.solution.optionalExplanation,
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
            {editorStrings.solution.fundamentalsNote}{' '}
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
                  placeholder={editorStrings.solution.idArticle}
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
                  <OpenInNewTab title={editorStrings.solution.openArticleTab}>
                    <Icon icon={faUpRightFromSquare} />
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
                placeholder={editorStrings.solution.linkTitle}
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
            {editorStrings.solution.fundamentalsNote}{' '}
            <a href={`/${prerequisite.id.value}`}>{prerequisite.title.value}</a>
          </p>
        )
      }

      return null
    }
  }
}
