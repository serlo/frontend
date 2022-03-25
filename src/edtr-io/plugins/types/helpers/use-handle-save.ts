import { useScopedStore } from '@edtr-io/core'
import { serializeRootDocument } from '@edtr-io/store'
import * as R from 'ramda'
import { useContext, useEffect, useState } from 'react'

import { CsrfContext } from '@/edtr-io/csrf-context'
import { storeState, SaveContext } from '@/edtr-io/serlo-editor'
import { SupportedTypesSerializedState } from '@/helper/mutations/revision'

export function useHandleSave(visible: boolean, subscriptions?: boolean) {
  const store = useScopedStore()
  const getCsrfToken = useContext(CsrfContext)
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
  const serialized = R.has('state', serializedRoot)
    ? serializedRoot.state
    : null

  if (
    serialized !== null &&
    serializedRoot?.plugin === 'type-text-exercise-group' &&
    R.has('cohesive', serialized)
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
      csrf: getCsrfToken(),
      controls: {
        ...subscriptionsControls,
        ...checkoutControls,
      },
    })
      .then(() => {
        storeState(undefined)
        setPending(false)
        setHasError(false)
      })
      .catch(() => {
        setPending(false)
        setHasError(true)
      })
  }

  return { handleSave, pending, hasError }
}
