import { cn } from '@editor/utils/cn'
import { useState } from 'react'

import { EvaluationCriteriaEditor } from './evaluation-criteria-editor'
import { IndividualHelpEditor } from './individual-help-editor'
import { SolutionEditor } from './solution-editor'

const tabs = [
  { name: 'Lösung', content: SolutionEditor },
  { name: 'Bewertung', content: EvaluationCriteriaEditor },
  { name: 'Hilfestellung', content: IndividualHelpEditor },
]

export function SettingsTabs() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const tabContent = tabs[selectedTabIndex]

  return (
    <div className="w-full">
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-3">
        {tabs.map((tab, index) => {
          return (
            <button
              key={tab.name}
              onClick={() => setSelectedTabIndex(index)}
              className={cn(
                'serlo-button-edit serlo-button-edit-primary mb-2.5 mr-2 max-w-48 rounded-md',
                selectedTabIndex === index
                  ? 'serlo-button-edit-primary'
                  : 'serlo-button-edit-secondary'
              )}
            >
              {tab.name}
            </button>
          )
        })}
      </div>
      <div className="flex w-full flex-col gap-8 p-3">
        <tabContent.content />
      </div>
    </div>
  )
}
