import { useScopedStore } from '@edtr-io/core'
import { serializeRootDocument } from '@edtr-io/store'
import { has } from 'ramda'
import { useContext, useEffect, useState } from 'react'

import { storeState, SaveContext } from '@/edtr-io/serlo-editor'
import { SupportedTypesSerializedState } from '@/mutations/use-set-entity-mutation/types'

export function useHandleSave(visible: boolean, subscriptions?: boolean) {
  const store = useScopedStore()
  const { onSave, needsReview, showSkipCheckout } = useContext(SaveContext)
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

  if (
    serialized !== null &&
    serializedRoot?.plugin === 'type-text-exercise-group' &&
    has('cohesive', serialized)
  ) {
    // legacy server can only handle string attributes
    serialized.cohesive = String(serialized.cohesive)
  }

  const handleSave = (
    notificationSubscription?: boolean,
    emailSubscription?: boolean,
    autoCheckout?: boolean
  ) => {
    setPending(true)

    const subscriptionsControls = subscriptions
      ? {
          subscription: {
            subscribe: notificationSubscription ? 1 : 0,
            mailman: emailSubscription ? 1 : 0,
          },
        }
      : {}

    const checkoutControls =
      !needsReview || (showSkipCheckout && autoCheckout)
        ? {
            checkout: true,
          }
        : {}

    onSave({
      ...(serialized as SupportedTypesSerializedState),
      controls: {
        ...subscriptionsControls,
        ...checkoutControls,
      },
    })
      .then(() => {
        setTimeout(() => {
          storeState(undefined)
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

  return { handleSave, pending, hasError }
}
