import { useScopedStore } from '@edtr-io/core'
import { StateTypeReturnType } from '@edtr-io/plugin'
import { serializeRootDocument } from '@edtr-io/store'
import clsx from 'clsx'

import { entity } from '../plugins/types/common'
import { storeState } from '../serlo-editor'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export interface SaveModalProps {
  visible: boolean
  setVisibility: (arg0: boolean) => void
  setSavedToLocalstorage: (arg0: boolean) => void
  savedToLocalstorage: boolean
  maySave: () => string | boolean
  handleSave: () => void
  pending: boolean
  setHasError: (arg0: boolean) => void
  setAutoCheckout: (arg0: boolean) => void
  licenseAccepted: () => boolean
  changesFilledIn: () => string | boolean
  changes?: StateTypeReturnType<typeof entity['changes']>
  hasError: boolean
  mayCheckout: boolean
  autoCheckout: boolean
  license?: StateTypeReturnType<typeof entity['license']>
  agreement: boolean
  setAgreement: (arg0: boolean) => void
  subscriptions?: boolean
  setNotificationSubscription: (arg0: boolean) => void
  notificationSubscription: boolean
  setEmailSubscription: (arg0: boolean) => void
  emailSubscription: boolean
}

export function SaveModal({
  visible,
  setVisibility,
  savedToLocalstorage,
  maySave,
  handleSave,
  pending,
  licenseAccepted,
  changesFilledIn,
  setSavedToLocalstorage,
  changes,
  hasError,
  mayCheckout,
  autoCheckout,
  setAutoCheckout,
  license,
  agreement,
  setAgreement,
  subscriptions,
  setEmailSubscription,
  setNotificationSubscription,
  emailSubscription,
  notificationSubscription,
}: SaveModalProps) {
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
            !isDisabled
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
}
