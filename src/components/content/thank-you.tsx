import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { submitEvent } from '@/helper/submit-event'

export function ThankYou() {
  const { lang } = useInstanceData()
  const [submitted, setSubmitted] = useState(false)

  if (lang !== Instance.De) return null // de only

  return (
    <p className="serlo-p text-right mt-8 mb-16">
      {submitted ? (
        <b>Danke für dein Feedback! 💙</b>
      ) : (
        <>
          Hat dir der Inhalt geholfen?{' '}
          <button
            className="serlo-button-green ml-4"
            onClick={() => {
              submitEvent(`thank_you_article`)
              setSubmitted(true)
            }}
          >
            <FaIcon icon={faHeart} className="mr-2" />
            Danke sagen
          </button>
        </>
      )}
    </p>
  )
}
