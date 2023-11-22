import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FaIcon, useEditorStrings } from '@serlo/serlo-editor'
import { useContext } from 'react'

import type { SolutionProps } from '.'
import { SolutionRenderer } from './renderer'
import { SerloLicenseChooser } from './serlo-license-chooser'
import { InlineInput } from '../../plugin/helpers/inline-input'
import { InlineSettings } from '../../plugin/helpers/inline-settings'
import { InlineSettingsInput } from '../../plugin/helpers/inline-settings-input'
import { IsSerloContext } from '@/serlo-editor-integration/context/is-serlo-context'

export function SolutionEditor({ state, focused }: SolutionProps) {
  const { prerequisite, strategy, licenseId } = state
  const solutionStrings = useEditorStrings().templatePlugins.solution
  const showLicenseChooser = useContext(IsSerloContext) // only on serlo

  return (
    <SolutionRenderer
      elementBeforePrerequisite={
        showLicenseChooser ? (
          <SerloLicenseChooser licenseId={licenseId} />
        ) : null
      }
      prerequisite={renderPrerequisiteContent()}
      strategy={
        <div className="-mx-2 px-side">
          {strategy.render({
            config: {
              placeholder: solutionStrings.optionalExplanation,
            },
          })}
        </div>
      }
      steps={<div className="ml-1">{state.steps.render()}</div>}
      solutionVisibleOnInit
    />
  )

  function renderPrerequisiteContent() {
    const hasId = prerequisite.defined && prerequisite.id.value

    return (
      <>
        {focused ? (
          <InlineSettings
            onDelete={() => {
              if (prerequisite.defined) prerequisite.remove()
            }}
            position="below"
          >
            <InlineSettingsInput
              value={hasId ? `/${prerequisite.id.value}` : ''}
              placeholder={solutionStrings.idArticle}
              onChange={(event) => {
                const newValue = event.target.value.replace(/[^0-9]/g, '')
                if (prerequisite.defined) {
                  prerequisite.id.set(newValue)
                } else {
                  prerequisite.create({
                    id: newValue,
                    title: '',
                    alias: undefined,
                  })
                }
              }}
            />
            <a
              target="_blank"
              href={hasId ? `/${prerequisite.id.value}` : ''}
              rel="noopener noreferrer"
            >
              <span title={solutionStrings.openArticleTab} className="ml-2.5">
                <FaIcon icon={faUpRightFromSquare} />
              </span>
            </a>
          </InlineSettings>
        ) : null}
        <a className="serlo-link">
          <InlineInput
            value={prerequisite.defined ? prerequisite.title.value : ''}
            onChange={(value) => {
              if (prerequisite.defined) {
                prerequisite.title.set(value)
              } else {
                prerequisite.create({ id: '', title: value, alias: undefined })
              }
            }}
            placeholder={solutionStrings.linkTitle}
          />
        </a>
      </>
    )
  }
}
