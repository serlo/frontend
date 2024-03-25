import { SpoilerStaticRenderer } from '@editor/plugins/spoiler/static'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useAB } from '@/contexts/ab'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import { useExperimentCreateMutation } from '@/mutations/use-experiment-create-mutation'

export function SpoilerSerloStaticRenderer({
  ...props
}: EditorSpoilerDocument & { openOverwrite?: boolean; onOpen?: () => void }) {
  const [hasSentSpoilerTrackingEvent, setHasSentSpoilerTrackingEvent] =
    useState(false)

  const ab = useAB()
  const entityId = useEntityId()
  const revisionId = useRevisionId()
  const { asPath } = useRouter()

  // TODO: is this allowed to be here?
  const sessionStorageKey = '___serlo_ab_session___'
  const sessionId = sessionStorage.getItem(sessionStorageKey)

  const trackExperiment = useExperimentCreateMutation()
  const trackSpoilerOpened = async () => {
    const experimentIds = [30680, 23869, 66809]
    const shouldTrackSpoilerOpen = entityId && experimentIds.includes(entityId)

    if (!shouldTrackSpoilerOpen || !ab || hasSentSpoilerTrackingEvent) return
    // send tracking event
    await trackExperiment({
      path: asPath,
      entityId: entityId || -1,
      sessionId: sessionId || '',
      revisionId: revisionId || -1,
      result: 'open',
      type: 'spoiler',
    })
    setHasSentSpoilerTrackingEvent(true)
  }

  return (
    <SpoilerStaticRenderer
      onOpen={async () => await trackSpoilerOpened()}
      {...props}
    />
  )
}
