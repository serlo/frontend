import { useState, useRef, useEffect } from 'react'

import { WizardPageProps } from './wizard-page-props'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface SubjectProps extends WizardPageProps {
  jumpToPage: (page: number) => void
  defaultSubject: string | null
  subject: string
  setSubject: (subject: string) => void
}

export function Subject({
  isSummary,
  onNext,
  jumpToPage,
  subject,
  setSubject,
  defaultSubject,
}: SubjectProps) {
  const { subject: subjectStrings } =
    useLoggedInData()!.strings.ai.exerciseGeneration
  const [selectedRadio, setSelectedRadio] = useState<string>(
    defaultSubject
      ? defaultSubject === subject
        ? defaultSubject
        : 'custom'
      : 'custom'
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
          {subjectStrings.defaultLabel}
        </span>
        <button onClick={() => jumpToPage(1)} className="underline">
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <p className="mb-4 text-xl">
        {replacePlaceholders(subjectStrings.title, {
          subject: <b>{subjectStrings.subject}</b>,
        })}
      </p>
      {defaultSubject ? (
        <div className="flex items-center">
          <input
            type="radio"
            id="defaultSubject"
            name="subject"
            value={defaultSubject}
            checked={selectedRadio === defaultSubject}
            onChange={() => {
              setSelectedRadio(defaultSubject)
              setSubject(defaultSubject)
            }}
            className="text-brand-700 focus:ring-sky-200"
          />
          <label htmlFor="defaultSubject" className="ml-2">
            {defaultSubject.charAt(0).toUpperCase() + defaultSubject.slice(1)}
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex items-center">
        <input
          type="radio"
          id="customSubject"
          name="subject"
          value="custom"
          checked={selectedRadio === 'custom'}
          onChange={() => {
            // we reset the subject when the user selects the custom subject
            setSubject('')
            setSelectedRadio('custom')
          }}
          className="text-brand-700 focus:ring-sky-200"
        />
        <label htmlFor="customSubject" className="ml-2">
          {subjectStrings.otherSubjectLabel}
        </label>
        <input
          type="text"
          disabled={selectedRadio !== 'custom'}
          value={selectedRadio === 'custom' ? subject : ''}
          onChange={(e) => setSubject(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="ml-2 rounded-md border border-sky-200 p-2 pl-2 focus:border-sky-200 focus:outline-brand-700"
          placeholder={subjectStrings.customSubjectPlaceholder}
          ref={focusRef}
        />
      </div>
    </div>
  )
}
