import { faHeart } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState } from 'react'

import { FaIcon } from '../fa-icon'
import { useEntityId } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { submitEvent } from '@/helper/submit-event'

export function ThankYou() {
  const { lang } = useInstanceData()
  const id = useEntityId()
  const [submitted, setSubmitted] = useState(false)

  if (lang !== Instance.De) return null // de only

  return (
    <div className="serlo-p text-right mt-8 mb-16">
      Hat dir der Inhalt geholfen?{' '}
      <button
        className={clsx(
          submitted ? 'ml-4 cursor-default' : 'serlo-button-green ml-4'
        )}
        onClick={() => {
          if (!submitted) {
            submitEvent(`thank_you_${id}`)
            setSubmitted(true)
          }
        }}
      >
        <FaIcon icon={faHeart} className="mr-2" />
        {submitted ? 'abgeschickt' : 'Danke sagen'}
      </button>
    </div>
  )
}
