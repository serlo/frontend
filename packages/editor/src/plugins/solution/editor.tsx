import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { SerloAddButton } from '@editor/plugin/helpers/serlo-editor-button'
import { IsSerloContext } from '@editor/utils/is-serlo-context'
import {
  QuickbarData,
  fetchQuickbarData,
} from '@serlo/frontend/src/components/navigation/quickbar'
import { lazy, useContext, useEffect, useState } from 'react'

import type { SolutionProps } from '.'
import { SolutionRenderer } from './renderer'
import { LinkOverlayEditMode } from '../text/components/link/edit-mode/link-overlay-edit-mode'
import { LinkOverlayWithHref } from '../text/components/link/link-overlay-with-href'

const linkOverlayWrapperWidth = 460

const SerloLicenseChooser = lazy(() =>
  import('./serlo-license-chooser').then((module) => ({
    default: module.SerloLicenseChooser,
  }))
)

export function SolutionEditor({ state, focused }: SolutionProps) {
  const { prerequisite, strategy, licenseId } = state
  const editStrings = useEditStrings()
  const lang = editStrings.lang
  const solutionStrings = editStrings.templatePlugins.solution
  const isSerlo = useContext(IsSerloContext) // only on serlo
  const [quickbarData, setQuickbarData] = useState<QuickbarData | null>(null)
  const [showPrerequisiteLinkTool, setShowPrerequisiteLinkTool] =
    useState<boolean>(false)

  const isSerloLinkSearchActive = isSerlo && lang === 'de'

  useEffect(() => {
    if (!isSerloLinkSearchActive) return
    if (!quickbarData) {
      fetchQuickbarData()
        .then((fetchedData) => fetchedData && setQuickbarData(fetchedData))
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
  }, [isSerloLinkSearchActive, quickbarData])

  useEffect(() => {
    if (!focused) setShowPrerequisiteLinkTool(false)
  }, [focused])

  return (
    <SolutionRenderer
      elementBeforePrerequisite={
        isSerlo ? <SerloLicenseChooser licenseId={licenseId} /> : null
      }
      prerequisite={isSerlo ? renderPrerequisiteContent() : null}
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
    return (
      <>
        {showPrerequisiteLinkTool ? renderPrequisiteTool() : null}
        {prerequisite.defined ? (
          <a
            className="serlo-link"
            href={`/${prerequisite.id.value}`}
            onClick={(event) => {
              event.preventDefault()
              setShowPrerequisiteLinkTool(true)
            }}
          >
            {prerequisite.title.value}
          </a>
        ) : (
          <SerloAddButton
            text={solutionStrings.addPrerequisite}
            onClick={() => setShowPrerequisiteLinkTool(true)}
            className="mb-8 mt-4"
          />
        )}
      </>
    )
  }

  function renderPrequisiteTool() {
    return (
      <div
        className="absolute bottom-0 left-0 right-0 top-0"
        onClick={() => setShowPrerequisiteLinkTool(false)}
      >
        <div
          className="absolute left-12 top-28 z-[95] whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-[460px] rounded bg-white text-start not-italic shadow-menu"
            style={{ width: `${linkOverlayWrapperWidth}px` }}
          >
            {prerequisite.defined ? (
              <LinkOverlayWithHref
                value={prerequisite.defined ? `/${prerequisite.id.value}` : ''}
                removeLink={() => {
                  prerequisite.remove()
                  setShowPrerequisiteLinkTool(false)
                }}
                quickbarData={quickbarData}
              />
            ) : (
              <LinkOverlayEditMode
                isSerloLinkSearchActive
                setHref={(href, title) => {
                  if (!title) {
                    showToastNotice('Please choose an existing serlo content')
                    return
                  }
                  prerequisite.create({
                    id: href.replace('/', ''),
                    title,
                    alias: undefined,
                  })
                }}
                value=""
                shouldFocus
                quickbarData={quickbarData}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
