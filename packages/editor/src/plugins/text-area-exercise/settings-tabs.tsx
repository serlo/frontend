import { cn } from '@editor/utils/cn'
import { useContext, useState } from 'react'

import { TextAreaExerciseProps } from '.'
import {
  TextAreaPluginStateContext,
  useTextAreaPluginStateValues,
} from './text-area-plugin-state-context'

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
  const { solution } = useTextAreaPluginStateValues()
  const textAreaPluginStateContext = useContext(
    TextAreaPluginStateContext
  ) as TextAreaExerciseProps
  return (
    <textarea
      className="rounded-xl border-2 border-editor-primary-100 bg-editor-primary-100 px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none"
      value={solution}
      onChange={(e) => {
        const newValue = e.target.value
        textAreaPluginStateContext.state.solution.set(newValue)
      }}
    ></textarea>
  )
}

function Strategy() {
  return <div>Strategy</div>
}

function FeedbackCriteria() {
  return <div>FeedbackCriteria</div>
}
