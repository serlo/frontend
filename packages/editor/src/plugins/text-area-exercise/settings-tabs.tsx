import { cn } from '@editor/utils/cn'
import { useState } from 'react'

const tabs = [
  { name: 'Musterlösung', content: Solution },
  { name: 'Lösungsstrategie', content: Strategy },
  { name: 'Feedbackkriterien', content: FeedbackCriteria },
]

export function SettingsTabs() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const tabContent = tabs[selectedTabIndex]

  return (
    <>
      <p className="serlo-p">
        {tabs.map((tab, index) => {
          return (
            <button
              key={tab.name}
              onClick={() => setSelectedTabIndex(index)}
              className={cn(
                'mb-2.5 mr-2',
                selectedTabIndex === index
                  ? 'serlo-button-learner-primary'
                  : 'serlo-button-learner-secondary',
                'capitalize'
              )}
            >
              {tab.name}
            </button>
          )
        })}
      </p>
      <tabContent.content />
    </>
  )
}

function Solution() {
  return <div>Solution</div>
}

function Strategy() {
  return <div>Strategy</div>
}

function FeedbackCriteria() {
  return <div>FeedbackCriteria</div>
}
