import { useScopedStore } from '@edtr-io/core'
import { StateTypeReturnType } from '@edtr-io/plugin'
import { serializeRootDocument } from '@edtr-io/store'
import clsx from 'clsx'
import { useContext, useState } from 'react'

import { entity } from '../plugins/types/common/common'
import { SaveContext, storeState } from '../serlo-editor'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export interface SaveModalProps {
  visible: boolean
  setVisibility: (arg0: boolean) => void
  handleSave: (arg0?: boolean, arg1?: boolean, arg2?: boolean) => void
  pending: boolean
  changes?: StateTypeReturnType<typeof entity['changes']>
  hasError: boolean
  license?: StateTypeReturnType<typeof entity['license']>
  subscriptions?: boolean
}

export function SaveModal({
  visible,
  setVisibility,
  pending,
  license,
  handleSave,
  changes,
  subscriptions,
  hasError,
}: SaveModalProps) {
  const [savedToLocalstorage, setSavedToLocalstorage] = useState(false)
  const { mayCheckout } = useContext(SaveContext)
  const [agreement, setAgreement] = useState(false)
  const [notificationSubscription, setNotificationSubscription] = useState(true)
  const [emailSubscription, setEmailSubscription] = useState(true)
  const [autoCheckout, setAutoCheckout] = useState(false)

  // TODO: Check if we really need this
  // useEffect(() => {
  // if (visible) {
  // Reset license agreement
  // setPending(false)
  // setHasError(false)
  // setSavedToLocalstorage(false)
  // setAgreement(false)
  // }
  // }, [visible])

  const store = useScopedStore()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <ModalWithCloseButton
      isOpen={visible}
      onCloseClick={() => {
        setVisibility(false)
      }}
      title={editorStrings.edtrIo.save}
    >
      <div className="mx-side">
        {renderAlert()}
        {renderChanges()}
        {renderLicense()}
        {renderSubscription()}
        {renderCheckout()}

        <hr className="mt-8 mb-8" />

        {renderModalButtons()}
      </div>
      <style jsx global>{`
        .ReactModal__Content {
          @apply mt-8 overflow-y-scroll top-0 translate-y-0 max-h-full bottom-4;
        }
      `}</style>
    </ModalWithCloseButton>
  )

  function renderModalButtons() {
    const isDisabled = !maySave() || pending

    return (
      <div className="mt-4 text-right mx-side">
        <button
          className="serlo-button serlo-make-interactive-transparent"
          onClick={() => {
            setVisibility(false)
          }}
        >
          {editorStrings.edtrIo.cancel}
        </button>
        <button
          onClick={() => {
            handleSave()
          }}
          className={clsx(
            'serlo-button',
            isDisabled
              ? 'cursor-default text-gray-300'
              : 'serlo-make-interactive-green'
          )}
          disabled={isDisabled}
          title={getSaveHint()}
        >
          {pending ? editorStrings.edtrIo.saving : editorStrings.edtrIo.save}
        </button>
      </div>
    )
  }

  function getSaveHint() {
    if (maySave()) return undefined
    if (licenseAccepted() && !changesFilledIn()) {
      return editorStrings.edtrIo.missingChanges
    } else if (!licenseAccepted() && changesFilledIn()) {
      return editorStrings.edtrIo.missingLicenseTerms
    } else {
      return editorStrings.edtrIo.missingChangesAndLicenseTerms
    }
  }

  function renderAlert() {
    if (!hasError) return null
    return (
      <>
        <div className="bg-yellow p-3 mb-16">
          {editorStrings.edtrIo.errorSaving}
          <br />
          {editorStrings.edtrIo.saveLocallyAndRefresh}
          <button
            className="serlo-button serlo-make-interactive-primary mt-3"
            onClick={() => {
              const serializedRoot = serializeRootDocument()(store.getState())
              storeState(serializedRoot)
              setSavedToLocalstorage(true)
            }}
          >
            {savedToLocalstorage
              ? editorStrings.edtrIo.revisionSaved
              : editorStrings.edtrIo.saveRevision}
          </button>
        </div>
      </>
    )
  }

  function renderChanges() {
    if (!changes) return null
    return (
      <label className="font-bold">
        {editorStrings.edtrIo.changes}
        <textarea
          value={changes.value}
          onChange={(e) => {
            const { value } = e.target as HTMLTextAreaElement
            changes.set(value)
          }}
          className={clsx(
            'mt-1 mb-7 flex items-center rounded-2xl w-full p-2',
            'bg-brand-150 border-2 border-brand-150 focus-within:outline-none focus-within:border-brand-light'
          )}
        />
      </label>
    )
  }

  function renderCheckout() {
    if (!mayCheckout) return null
    return (
      <label>
        <input
          type="checkbox"
          checked={autoCheckout}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setAutoCheckout(checked)
          }}
        />{' '}
        {editorStrings.edtrIo.skipReview}
      </label>
    )
  }

  function renderLicense() {
    if (!license) return null
    return (
      <label className="block pb-2">
        <input
          type="checkbox"
          checked={agreement}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setAgreement(checked)
          }}
        />{' '}
        <span
          className="license-wrapper"
          dangerouslySetInnerHTML={{ __html: license.agreement.value }}
        />
        <style jsx global>
          {`
            .license-wrapper a {
              @apply !text-brand hover:underline;
            }
          `}
        </style>
      </label>
    )
  }

  function renderSubscription() {
    if (!subscriptions) return null
    return (
      <>
        <label className="block pb-2">
          <input
            type="checkbox"
            checked={notificationSubscription}
            onChange={(e) => {
              const { checked } = e.target as HTMLInputElement
              setNotificationSubscription(checked)
            }}
          />{' '}
          {editorStrings.edtrIo.enableNotifs}
        </label>
        <label className="block pb-2">
          <input
            type="checkbox"
            checked={emailSubscription}
            onChange={(e) => {
              const { checked } = e.target as HTMLInputElement
              setEmailSubscription(checked)
            }}
          />{' '}
          {editorStrings.edtrIo.enableNotifsMail}
        </label>
      </>
    )
  }

  function licenseAccepted() {
    return !license || agreement
  }
  function changesFilledIn() {
    return !changes || changes.value
  }
  function maySave() {
    return licenseAccepted() && changesFilledIn()
  }
}
