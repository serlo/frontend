import type { StateTypeReturnType } from '@editor/plugin'
import { entity } from '@editor/plugins/serlo-template-plugins/common/common'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'

import { LocalStorageButton } from './local-storage-button'
import { SaveContext } from '../context/save-context'
import { InfoPanel } from '@/components/info-panel'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getLicense } from '@/data/licenses/licenses-helpers'
import { cn } from '@/helper/cn'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useHandleSave } from '@/serlo-editor-integration/use-handle-save'

export interface SaveModalProps {
  open: boolean
  setOpen: (arg0: boolean) => void
  changes?: StateTypeReturnType<(typeof entity)['changes']>
  licenseId?: StateTypeReturnType<(typeof entity)['licenseId']>
  showSubscriptionOptions?: boolean
}

export function SaveModal({
  open,
  setOpen,
  licenseId,
  changes,
  showSubscriptionOptions,
}: SaveModalProps) {
  const { handleSave, pending, hasError } = useHandleSave(
    open,
    showSubscriptionOptions
  )
  const { userCanSkipReview, entityNeedsReview } = useContext(SaveContext)
  const [hasAgreedLicense, setHasAgreedLicense] = useState(false)
  const [notificationSubscription, setNotificationSubscription] = useState(true)
  const [emailSubscription, setEmailSubscription] = useState(true)
  const [skipReview, setSkipReview] = useState(false)
  const [changesText, setChangesText] = useState(changes?.value ?? '?')
  const [fireSave, setFireSave] = useState(false)
  const [highlightMissingFields, setHighlightMissingFields] = useState(false)
  const { licenses } = useInstanceData()

  const licenseAccepted = !licenseId || hasAgreedLicense
  const changesFilled = !changes || changesText
  const maySave = licenseAccepted && changesFilled
  const showSkipCheckout = userCanSkipReview && entityNeedsReview
  const isOnlyText =
    !showSkipCheckout && !showSubscriptionOptions && !licenseId && !changes

  useEffect(() => {
    if (fireSave) {
      handleSave(notificationSubscription, emailSubscription, skipReview)
      setFireSave(false)
    }
  }, [
    skipReview,
    emailSubscription,
    fireSave,
    handleSave,
    notificationSubscription,
  ])

  useEffect(() => {
    // make sure generated change text is used
    if (!changesText) setChangesText(changes?.value ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor.edtrIo

  return (
    <ModalWithCloseButton
      isOpen={open}
      setIsOpen={setOpen}
      title={editorStrings.save}
      className={cn(
        !isOnlyText &&
          'top-8 max-h-full w-[900px] -translate-x-1/2 translate-y-0 overflow-y-auto pb-20'
      )}
    >
      <div className="mx-side">
        {renderChanges()}
        {renderLicense()}
        {renderSubscription()}
        {renderCheckout()}
        {isOnlyText ? editorStrings.ready : null}
        <hr className="mb-8 mt-8" />
        {renderAlert()}
        {renderModalButtons()}
      </div>
    </ModalWithCloseButton>
  )

  function renderModalButtons() {
    return (
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="serlo-button-transparent"
          onClick={() => setOpen(false)}
        >
          {editorStrings.cancel}
        </button>
        <button
          onClick={() => {
            if (maySave) {
              changes?.set(changesText)
              setFireSave(true)
            } else {
              setHighlightMissingFields(true)
              showToastNotice(
                loggedInData!.strings.mutations.errors.valueMissing,
                'warning'
              )
            }
          }}
          className={cn(
            'serlo-button ml-2',
            pending ? 'cursor-default text-gray-300' : 'serlo-button-green'
          )}
          disabled={pending}
          title={getSaveHint()}
        >
          {pending
            ? editorStrings.saving
            : (showSkipCheckout && skipReview) || !showSkipCheckout
              ? editorStrings.save
              : editorStrings.saveWithReview}
        </button>
      </div>
    )
  }

  function getSaveHint() {
    if (maySave) return undefined
    if (licenseAccepted && !changesFilled) {
      return editorStrings.missingChanges
    } else if (!licenseAccepted && changesFilled) {
      return editorStrings.missingLicenseTerms
    } else {
      return editorStrings.missingChangesAndLicenseTerms
    }
  }

  function renderAlert() {
    if (!hasError) return null
    return (
      <InfoPanel type="warning" icon={faExclamationCircle}>
        {editorStrings.errorSaving}
        <br />
        {editorStrings.saveLocallyAndRefresh}
        <LocalStorageButton open={open} />
      </InfoPanel>
    )
  }

  function renderChanges() {
    if (!changes) return null
    return (
      <label
        className={cn(
          'font-bold',
          highlightMissingFields && !changesFilled && 'bg-red-100'
        )}
      >
        {editorStrings.changes}{' '}
        <span className="font-bold text-red-500">*</span>
        <textarea
          autoFocus
          value={changesText}
          onChange={(e) => {
            const { value } = e.target as HTMLTextAreaElement
            setChangesText(value)
          }}
          className={cn(`
            focus-within:border-truegray-400 mb-7 mt-1 flex w-full items-center rounded-2xl
            border-2 border-yellow-200 bg-yellow-200 p-2 focus-within:outline-none
          `)}
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
          checked={skipReview}
          onChange={({ target }) => setSkipReview(target.checked)}
        />{' '}
        {editorStrings.skipReview}
      </label>
    )
  }

  function renderLicense() {
    if (licenseId === undefined) return null
    const licenseAgreement = getLicense(
      licenses,
      licenseId?.defined ? licenseId.value : undefined
    ).agreement.replace(/<a href/g, '<a target="_blank" href')

    if (!licenseAgreement) return null

    return (
      <label
        className={cn(
          'block pb-2',
          highlightMissingFields && !licenseAccepted && 'bg-red-100'
        )}
      >
        <input
          type="checkbox"
          checked={hasAgreedLicense}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setHasAgreedLicense(checked)
          }}
        />{' '}
        <span
          className="license-wrapper [&_a]:!text-brand hover:[&_a]:underline"
          dangerouslySetInnerHTML={{ __html: licenseAgreement }}
        />{' '}
        <span className="font-bold text-red-500">*</span>
      </label>
    )
  }

  function renderSubscription() {
    if (!showSubscriptionOptions) return null
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
          {editorStrings.enableNotifs}
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
          {editorStrings.enableNotifsMail}
        </label>
      </>
    )
  }
}
