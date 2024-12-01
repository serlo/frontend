import { cn } from '@editor/utils/cn'
import { useState } from 'react'

import { Solution } from './solution-editor'

const tabs = [
  { name: 'Musterlösung und Bewertungskriterien', content: Solution },
  { name: 'Lösungsstrategie', content: Strategy },
  { name: 'Individuelle Hilfestellungen', content: FeedbackCriteria },
]

export function SettingsTabs() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const tabContent = tabs[selectedTabIndex]

  return (
    <>
      <div className="flex flex-row items-center">
        {tabs.map((tab, index) => {
          return (
            <button
              key={tab.name}
              onClick={() => setSelectedTabIndex(index)}
              className={cn(
                'serlo-button-edit serlo-button-edit-primary mb-2.5 mr-2 max-w-52 rounded-md',
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
      <div className="w-full">
        <tabContent.content />
      </div>
    </>
  )
}

function Strategy() {
  return <div>Strategy</div>
}

function FeedbackCriteria() {
  return <div>FeedbackCriteria</div>
}
