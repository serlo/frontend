import { useState, useRef, useEffect } from 'react'

import { WizardPageProps } from './wizard-page-props'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface TopicProps extends WizardPageProps {
  jumpToPage: (page: number) => void
  isSummary: boolean
  defaultTopic: string | null
  topic: string
  setTopic: (topic: string) => void
}

export const Topic: React.FC<TopicProps> = ({
  onNext,
  jumpToPage,
  isSummary,
  topic,
  setTopic,
  defaultTopic,
}) => {
  const { strings } = useLoggedInData() as LoggedInData

  const [selectedRadio, setSelectedRadio] = useState<string>(
    defaultTopic ? (defaultTopic === topic ? defaultTopic : 'custom') : 'custom'
  )

  const focusRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (selectedRadio === 'custom' && focusRef.current) {
      focusRef.current.focus()
    }
  }, [selectedRadio])

  if (isSummary) {
    return (
      <div className="flex items-center justify-start text-brand-700">
        <span onClick={() => jumpToPage(2)} className="mr-4 font-semibold">
          {strings.ai.exerciseGeneration.topic.defaultLabel}
        </span>
        <button onClick={() => jumpToPage(2)} className="underline">
          {topic}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <p className="mb-4 text-xl">
        {replacePlaceholders(strings.ai.exerciseGeneration.topic.title, {
          topic: <b>{strings.ai.exerciseGeneration.topic.topic}</b>,
        })}
      </p>
      {defaultTopic ? (
        <div className="flex items-center">
          <input
            type="radio"
            id="defaultTopic"
            name="topic"
            value={defaultTopic}
            checked={selectedRadio === defaultTopic}
            onChange={() => {
              setSelectedRadio(defaultTopic)
              setTopic(defaultTopic)
            }}
            className="focus:ring-lightblue text-brand-700"
          />
          <label htmlFor="defaultTopic" className="ml-2">
            {defaultTopic.charAt(0).toUpperCase() + defaultTopic.slice(1)}
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex items-center">
        <input
          type="radio"
          id="customTopic"
          name="topic"
          value="custom"
          checked={selectedRadio === 'custom'}
          onChange={() => {
            // we reset the topic when the user selects the custom topic
            setTopic('')
            setSelectedRadio('custom')
          }}
          className="focus:ring-lightblue text-brand-700"
        />
        <label htmlFor="customTopic" className="ml-2 ">
          {strings.ai.exerciseGeneration.topic.otherTopicLabel}
        </label>
        <input
          type="text"
          disabled={selectedRadio !== 'custom'}
          value={selectedRadio === 'custom' ? topic : ''}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="border-lightblue focus:border-lightblue ml-2 rounded-md border p-2 pl-2 focus:outline-brand-700"
          placeholder={
            strings.ai.exerciseGeneration.topic.customTopicPlaceholder
          }
          ref={focusRef}
        />
      </div>
    </div>
  )
}
