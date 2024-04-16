import { store, selectStaticDocument } from '@editor/store'
import { ROOT } from '@editor/store/root/constants'
import type { SupportedTypesSerializedState } from '@serlo/frontend/src/mutations/use-set-entity-mutation/types'
import { storeStateToLocalStorage } from '@serlo/frontend/src/serlo-editor-integration/components/local-storage-notice'
import { SaveContext } from '@serlo/frontend/src/serlo-editor-integration/context/save-context'
import { has } from 'ramda'
import { useContext, useEffect, useState } from 'react'

export function useHandleSave(
  visible: boolean,
  showSubscriptionOptions?: boolean
) {
  const { onSave, entityNeedsReview } = useContext(SaveContext)
  const [pending, setPending] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    //reset when modal opens
    if (visible) {
      setPending(false)
      setHasError(false)
    }
  }, [visible])

  const serializedRoot = selectStaticDocument(store.getState(), ROOT)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const serialized = has('state', serializedRoot) ? serializedRoot.state : null

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

  return { handleSave, pending, hasError }
}
