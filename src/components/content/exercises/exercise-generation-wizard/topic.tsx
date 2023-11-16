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
        <span onClick={() => jumpToPage(2)} className="mr-4 font-semibold">
          {topicStrings.defaultLabel}
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
        {replacePlaceholders(topicStrings.title, {
          topic: <b>{topicStrings.topic}</b>,
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
            className="text-brand-700 focus:ring-sky-200"
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
          className="text-brand-700 focus:ring-sky-200"
        />
        <label htmlFor="customTopic" className="ml-2 ">
          {topicStrings.otherTopicLabel}
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
          className="ml-2 rounded-md border border-sky-200 p-2 pl-2 focus:border-sky-200 focus:outline-brand-700"
          placeholder={topicStrings.customTopicPlaceholder}
          ref={focusRef}
        />
      </div>
    </div>
  )
}

// Helper function to extract the topic from title.
// E.g Aufgaben zum Dreisatz => Dreisatz
export function extractTopicFromTitle(
  title: string | undefined
): string | null {
  if (!title) {
    return null
  }

  const match = title.match(/Aufgaben zu(?:m|r)? (.+)/)
  return match ? match[1].trim() : null
}
