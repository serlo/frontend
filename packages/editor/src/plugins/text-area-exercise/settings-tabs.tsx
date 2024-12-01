import { SwitchButton } from '@editor/editor-ui/switch-button'
import { cn } from '@editor/utils/cn'
import { useContext, useState } from 'react'

import { AnimateChangeInHeight } from './animate-change-in-height'
import { TextAreaEditorContext } from './text-area-exercise-props-context'
import { useTextAreaPluginStateValues } from './use-text-area-plugin-state-values'

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
                'serlo-button-edit mb-2.5 mr-2 max-w-52 rounded-md',
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

function Solution() {
  const { solution } = useTextAreaPluginStateValues()
  const textAreaPluginStateContext = useContext(TextAreaEditorContext)
  if (!textAreaPluginStateContext) throw new Error('Missing text area context')

  const { allowShowSolution } = textAreaPluginStateContext.state
  return (
    <>
      <div className="serlo-p">
        <label className="mr-5">Musterlösung anzeigen</label>
        <SwitchButton
          isOn={allowShowSolution.value}
          onClick={() => allowShowSolution.set((old) => !old)}
        />
      </div>
      <textarea
        className="w-full rounded-xl border-2 border-editor-primary-200 bg-editor-primary-100 px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none"
        value={solution}
        onChange={(e) => {
          const newValue = e.target.value
          textAreaPluginStateContext.state.solution.set(newValue)
        }}
      ></textarea>
    </>
  )
}

function Strategy() {
  return <div>Strategy</div>
}

function FeedbackCriteria() {
  return <div>FeedbackCriteria</div>
}
