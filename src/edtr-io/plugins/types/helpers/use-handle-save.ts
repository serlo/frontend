import { useScopedStore } from '@edtr-io/core'
import { serializeRootDocument } from '@edtr-io/store'
import { has } from 'ramda'
import { useContext, useEffect, useState } from 'react'

import { storeStateToLocalStorage } from '@/edtr-io/components/local-storage-notice'
import { SaveContext } from '@/edtr-io/serlo-editor'
import { SupportedTypesSerializedState } from '@/mutations/use-set-entity-mutation/types'

export function useHandleSave(
  visible: boolean,
  showSubscriptionOptions?: boolean
) {
  const store = useScopedStore()
  const { onSave, entityNeedsReview, link } = useContext(SaveContext)
  const [pending, setPending] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    //reset when modal opens
    if (visible) {
      setPending(false)
      setHasError(false)
    }
  }, [visible])

  const serializedRoot = serializeRootDocument()(store.getState())
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const serialized = has('state', serializedRoot) ? serializedRoot.state : null

  // Currently still needed
  if (
    serialized !== null &&
    serializedRoot?.plugin === 'type-text-exercise-group' &&
    has('cohesive', serialized)
  ) {
    // backend can only handle string attributes
    serialized.cohesive = String(serialized.cohesive)
  }

  const handleSave = (
    notificationSubscription?: boolean,
    emailSubscription?: boolean,
    manualSkipReview?: boolean
  ) => {
    setPending(true)

    onSave({
      controls: {
        ...(showSubscriptionOptions
          ? { notificationSubscription, emailSubscription }
          : {}),
        noReview: manualSkipReview || !entityNeedsReview,
      },
      ...(serialized as SupportedTypesSerializedState),
    })
      .then(() => {
        setTimeout(() => {
          storeStateToLocalStorage(undefined)
          setPending(false)
          setHasError(false)
        }, 200)
      })
      .catch(() => {
        setTimeout(() => {
          setPending(false)
          setHasError(true)
        }, 200)
      })
  }

  return { handleSave, pending, hasError, link }
}
