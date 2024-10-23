import { LocalStorageButton } from '@editor/editor-ui/save/local-storage-button'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { selectStaticDocument, useStore } from '@editor/store'
import { ROOT } from '@editor/store/root/constants'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'ramda'
import { useEffect, useState } from 'react'

import type { SerloEditorProps } from '../serlo-editor'
import { useHandleSave } from '../use-handle-save'
import { InfoPanel } from '@/components/info-panel'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getLicense } from '@/data/licenses/licenses-helpers'
import { cn } from '@/helper/cn'
import { showToastNotice } from '@/helper/show-toast-notice'
import { type SupportedTypesSerializedState } from '@/mutations/use-set-entity-mutation/types'

export function SaveModal({
  open,
  setOpen,
  onSave,
  isInTestArea,
}: {
  open: boolean
  setOpen: (arg0: boolean) => void
  onSave: SerloEditorProps['onSave']
  isInTestArea?: boolean
}) {
  const store = useStore()
  // can be empty before first change
  const serializedRoot = isEmpty(store.getState().documents)
    ? undefined
    : selectStaticDocument(store.getState(), ROOT)
  const serializedRootState =
    serializedRoot?.state as SupportedTypesSerializedState

  const licenseId = serializedRootState?.licenseId
  const changes = serializedRootState?.changes

  const { handleSave, pending, hasError } = useHandleSave(
    open,
    serializedRootState,
    onSave
  )
  const [hasAgreedLicense, setHasAgreedLicense] = useState(false)
  const [changesText, setChangesText] = useState(changes ?? '')
  const [fireSave, setFireSave] = useState(false)
  const [highlightMissingFields, setHighlightMissingFields] = useState(false)
  const { licenses } = useInstanceData()

  const licenseAccepted = !licenseId || hasAgreedLicense
  const changesFilled = !changes || changesText
  const maySave = licenseAccepted && changesFilled
  const isNoEntity = serializedRoot
    ? [
        TemplatePluginType.User,
        TemplatePluginType.Page,
        TemplatePluginType.Taxonomy,
      ].includes(serializedRoot.plugin as TemplatePluginType)
    : false
  const needsNoReview = isInTestArea || isNoEntity
  const isOnlyText = needsNoReview && !licenseId && !changes

  const showChanges = serializedRoot ? !isNoEntity : true

  useEffect(() => {
    if (!fireSave) return
    handleSave(changesText)
    setFireSave(false)
  }, [fireSave, handleSave, changesText])

  useEffect(() => {
    // make sure generated change text is used
    if (!changesText) setChangesText(changes ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const edtrIoStrings = useEditStrings().edtrIo
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <ModalWithCloseButton
      isOpen={open}
      setIsOpen={setOpen}
      title={edtrIoStrings.save}
      className={cn(
        !isOnlyText &&
          'top-8 max-h-full w-[900px] -translate-x-1/2 translate-y-0 overflow-y-auto pb-20'
      )}
    >
      <div className="mx-side">
        {renderChanges()}
        {renderLicense()}
        {isOnlyText ? edtrIoStrings.ready : null}
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
          {edtrIoStrings.cancel}
        </button>
        <button
          onClick={() => {
            if (maySave) {
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
            ? edtrIoStrings.saving
            : needsNoReview
              ? edtrIoStrings.save
              : edtrIoStrings.saveWithReview}
        </button>
      </div>
    )
  }

  function getSaveHint() {
    if (maySave) return undefined
    if (licenseAccepted && !changesFilled) {
      return edtrIoStrings.missingChanges
    } else if (!licenseAccepted && changesFilled) {
      return edtrIoStrings.missingLicenseTerms
    } else {
      return edtrIoStrings.missingChangesAndLicenseTerms
    }
  }

  function renderAlert() {
    if (!hasError) return null
    return (
      <InfoPanel type="warning" icon={faExclamationCircle}>
        {edtrIoStrings.errorSaving}
        <br />
        {edtrIoStrings.saveLocallyAndRefresh}
        <LocalStorageButton open={open} />
      </InfoPanel>
    )
  }

  function renderChanges() {
    if (!showChanges) return null
    return (
      <label
        className={cn(
          'font-bold',
          highlightMissingFields && !changesFilled && 'bg-red-100'
        )}
      >
        {edtrIoStrings.changes}{' '}
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

  function renderLicense() {
    if (isNoEntity) return null
    const licenseAgreement = getLicense(licenses, licenseId).agreement.replace(
      /<a href/g,
      '<a target="_blank" href'
    )

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
}
