/* eslint-disable import/no-internal-modules */
import { useScopedStore } from '@edtr-io/core'
import { StateTypeReturnType } from '@edtr-io/plugin'
import { serializeRootDocument } from '@edtr-io/store'
import clsx from 'clsx'
import React from 'react'
import BSAlert from 'react-bootstrap/lib/Alert'
import BSButton from 'react-bootstrap/lib/Button'
import BSControlLabel from 'react-bootstrap/lib/ControlLabel'
import BSFormControl from 'react-bootstrap/lib/FormControl'
import BSFormGroup from 'react-bootstrap/lib/FormGroup'
import BSModal from 'react-bootstrap/lib/Modal'

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
  setHasError,
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
        <BSAlert
          bsStyle="danger"
          onDismiss={() => {
            setHasError(false)
          }}
        >
          {editorStrings.edtrIo.errorSaving}
          <br />
          {editorStrings.edtrIo.saveLocallyAndRefresh}
        </BSAlert>
        <BSModal.Footer>
          <BSButton
            bsStyle="success"
            onClick={() => {
              const serializedRoot = serializeRootDocument()(store.getState())
              storeState(serializedRoot)
              setSavedToLocalstorage(true)
            }}
          >
            {savedToLocalstorage
              ? editorStrings.edtrIo.revisionSaved
              : editorStrings.edtrIo.saveRevision}
          </BSButton>
        </BSModal.Footer>
      </>
    )
  }

  function renderChanges() {
    if (!changes) return null
    return (
      <BSFormGroup controlId="changes">
        <BSControlLabel>{editorStrings.edtrIo.changes}</BSControlLabel>
        <BSFormControl
          componentClass="textarea"
          value={changes.value}
          onChange={(e) => {
            const { value } = e.target as HTMLTextAreaElement
            changes.set(value)
          }}
        />
      </BSFormGroup>
    )
  }

  function renderCheckout() {
    if (!mayCheckout) return null
    return (
      <>
        <input
          type="checkbox"
          checked={autoCheckout}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setAutoCheckout(checked)
          }}
          id="edtr-checkout"
        />{' '}
        <label htmlFor="edtr-checkout">{editorStrings.edtrIo.skipReview}</label>
      </>
    )
  }

  function renderLicense() {
    if (!license) return null
    return (
      <>
        <input
          type="checkbox"
          checked={agreement}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setAgreement(checked)
          }}
          id="edtr-checkout-license"
        />{' '}
        <label htmlFor="edtr-checkout-license">
          {' '}
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
      </>
    )
  }

  function renderSubscription() {
    if (!subscriptions) return null
    return (
      <>
        <div>
          <input
            type="checkbox"
            checked={notificationSubscription}
            onChange={(e) => {
              const { checked } = e.target as HTMLInputElement
              setNotificationSubscription(checked)
            }}
            id="edtr-checkout-notif"
          />{' '}
          <label htmlFor="edtr-checkout-notif">
            {' '}
            {editorStrings.edtrIo.enableNotifs}
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={emailSubscription}
            onChange={(e) => {
              const { checked } = e.target as HTMLInputElement
              setEmailSubscription(checked)
            }}
            id="edtr-checkout-notif-mail"
          />{' '}
          <label htmlFor="edtr-checkout-notif-mail">
            {' '}
            {editorStrings.edtrIo.enableNotifsMail}
          </label>
        </div>
      </>
    )
  }
}
