import { cn } from '@editor/utils/cn'
import { useState } from 'react'

import { IndividualHelp } from './individual-help-editor'
import { Solution } from './solution-editor'
import { Strategy } from './strategy-editor'

const tabs = [
  { name: 'Musterlösung und Bewertungskriterien', content: Solution },
  { name: 'Lösungsstrategie', content: Strategy },
  { name: 'Individuelle Hilfestellungen', content: IndividualHelp },
]

export function SettingsTabs() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const tabContent = tabs[selectedTabIndex]

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-center">
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
      <div className="flex w-full flex-col gap-8 leading-10">
        <tabContent.content />
      </div>
    </>
  )
}
