import { useState, useRef, useEffect } from 'react'

import { WizardPageProps } from './wizard-page-props'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface TopicProps extends WizardPageProps {
  jumpToPage: (page: number) => void
  isSummary: boolean
  defaultTopic: string | null
  topic: string
  setTopic: (topic: string) => void
}

export function Topic({
  onNext,
  jumpToPage,
  isSummary,
  topic,
  setTopic,
  defaultTopic,
}: TopicProps) {
  const { topic: topicStrings } =
    useLoggedInData()!.strings.ai.exerciseGeneration

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
        <span onClick={() => jumpToPage(1)} className="mr-4 font-semibold">
          {topicStrings.defaultLabel}
        </span>
        <button onClick={() => jumpToPage(1)} className="underline">
          {topic}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <p className="mb-4 text-xl">
        {replacePlaceholders(topicStrings.title, {
          topic: <b>{topicStrings.topic}</b>,
        })}
      </p>
      {defaultTopic ? (
        <label className="pl-2">
          <input
            type="radio"
            name="topic"
            value={defaultTopic}
            checked={selectedRadio === defaultTopic}
            onChange={() => {
              setSelectedRadio(defaultTopic)
              setTopic(defaultTopic)
            }}
            className="mr-2 text-brand-700 focus:ring-brand-300"
          />
          {defaultTopic.charAt(0).toUpperCase() + defaultTopic.slice(1)}
        </label>
      ) : null}

      <label className="mt-3 pl-2">
        <input
          type="radio"
          name="topic"
          value="custom"
          checked={selectedRadio === 'custom'}
          onChange={() => {
            // we reset the topic when the user selects the custom topic
            setTopic('')
            setSelectedRadio('custom')
          }}
          className="mr-2 text-brand-700 focus:ring-brand-300"
        />
        {topicStrings.otherTopicLabel}
        <input
          type="text"
          value={selectedRadio === 'custom' ? topic : ''}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onNext()
          }}
          onFocus={() => {
            if (selectedRadio !== 'custom') {
              setTopic('')
              setSelectedRadio('custom')
            }
          }}
          className="ml-2 rounded-md border border-brand-300 p-2 pl-2 focus:border-brand-300 focus:outline-brand-700"
          placeholder={topicStrings.customTopicPlaceholder}
          ref={focusRef}
        />
      </label>
    </div>
  )
}
