import { StateTypeReturnType } from '@edtr-io/plugin'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useContext, useState } from 'react'

import { entity } from '../plugins/types/common/common'
import { SaveContext } from '../serlo-editor'
import { SaveLocalButton } from './save-local-button'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { StaticInfoPanel } from '@/components/static-info-panel'
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
  const { showSkipCheckout } = useContext(SaveContext)
  const [agreement, setAgreement] = useState(false)
  const [notificationSubscription, setNotificationSubscription] = useState(true)
  const [emailSubscription, setEmailSubscription] = useState(true)
  const [autoCheckout, setAutoCheckout] = useState(false)

  const licenseAccepted = !license || agreement
  const changesFilled = !changes || changes.value
  const maySave = licenseAccepted && changesFilled
  const buttonDisabled = !maySave || pending
  const isOnlyText = !showSkipCheckout && !subscriptions && !license && !changes

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const { edtrIo } = loggedInData.strings.editor

  return (
    <ModalWithCloseButton
      isOpen={visible}
      onCloseClick={() => {
        setVisibility(false)
      }}
      title={edtrIo.save}
    >
      <div className="mx-side">
        {renderChanges()}
        {renderLicense()}
        {renderSubscription()}
        {renderCheckout()}
        {isOnlyText ? edtrIo.ready : null}
        <hr className="mt-8 mb-8" />
        {renderAlert()}
        {renderModalButtons()}
      </div>
      {isOnlyText ? null : (
        <style jsx global>{`
          .ReactModal__Content {
            @apply mt-8 overflow-y-scroll top-0 translate-y-0 max-h-full bottom-4;
          }
        `}</style>
      )}
    </ModalWithCloseButton>
  )

  function renderModalButtons() {
    return (
      <div className="mt-4 text-right mx-side">
        <button
          className="serlo-button serlo-make-interactive-transparent"
          onClick={() => {
            setVisibility(false)
          }}
        >
          {edtrIo.cancel}
        </button>
        <button
          onClick={() => {
            handleSave(
              notificationSubscription,
              emailSubscription,
              autoCheckout
            )
          }}
          className={clsx(
            'serlo-button',
            buttonDisabled
              ? 'cursor-default text-gray-300'
              : 'serlo-make-interactive-green'
          )}
          disabled={buttonDisabled}
          title={getSaveHint()}
        >
          {pending ? edtrIo.saving : edtrIo.save}
        </button>
      </div>
    )
  }

  function getSaveHint() {
    if (maySave) return undefined
    if (licenseAccepted && !changesFilled) {
      return edtrIo.missingChanges
    } else if (!licenseAccepted && changesFilled) {
      return edtrIo.missingLicenseTerms
    } else {
      return edtrIo.missingChangesAndLicenseTerms
    }
  }

  function renderAlert() {
    if (!hasError) return null
    return (
      <StaticInfoPanel type="warning" icon={faExclamationCircle}>
        {edtrIo.errorSaving}
        <br />
        {edtrIo.saveLocallyAndRefresh}
        <SaveLocalButton visible={visible} />
      </StaticInfoPanel>
    )
  }

  function renderChanges() {
    if (!changes) return null
    return (
      <label className="font-bold">
        {edtrIo.changes}
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
    if (!showSkipCheckout) return null
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
        {edtrIo.skipReview}
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
          {edtrIo.enableNotifs}
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
          {edtrIo.enableNotifsMail}
        </label>
      </>
    )
  }
}
