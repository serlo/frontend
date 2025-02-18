import { type StorageFormat, TemplatePluginType } from '@editor/package'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { type MutableRefObject, useContext, useEffect, useState } from 'react'

import { convertEditorStateToSetEntityMutationData } from '../convert-editor-state-to-set-entity-mutation-data'
import type { SerloEditorProps } from '../serlo-editor'
import { useHandleSave } from '../use-handle-save'
import { InfoPanel } from '@/components/info-panel'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { EntityMetaContext } from '@/contexts/entity-meta-context'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getDefaultLicense, getLicense } from '@/data/licenses/licenses-helpers'
import { cn } from '@/helper/cn'
import { showToastNotice } from '@/helper/show-toast-notice'

export function SaveModal({
  open,
  setOpen,
  onSave,
  editorState,
  isInTestArea,
  prefilledChanges,
}: {
  open: boolean
  setOpen: (arg0: boolean) => void
  onSave: SerloEditorProps['onSave']
  editorState: MutableRefObject<StorageFormat>
  isInTestArea?: boolean
  prefilledChanges?: string
}) {
  const editorDocument = editorState.current.document

  const { handleSave, pending, hasError } = useHandleSave(
    open,
    convertEditorStateToSetEntityMutationData(editorState.current),
    onSave
  )
  const [hasAgreedLicense, setHasAgreedLicense] = useState(false)
  const [changesText, setChangesText] = useState(prefilledChanges ?? '')
  const [fireSave, setFireSave] = useState(false)
  const [highlightMissingFields, setHighlightMissingFields] = useState(false)
  const { licenses, strings } = useInstanceData()

  const licenseId = useContext(EntityMetaContext)?.licenseId
  const licenseIdOrDefaultId = licenseId ?? getDefaultLicense(licenses).id

  const licenseAccepted = !licenseId || hasAgreedLicense
  const changesFilled = !prefilledChanges || changesText
  const isNoEntity = editorDocument
    ? [
        TemplatePluginType.User,
        TemplatePluginType.Page,
        TemplatePluginType.Taxonomy,
      ].includes(editorDocument.plugin as TemplatePluginType)
    : false
  const maySave = isNoEntity || (licenseAccepted && changesFilled)
  const needsNoReview = isInTestArea || isNoEntity
  const isOnlyText =
    isNoEntity || (needsNoReview && !licenseId && !prefilledChanges)

  const showChanges = editorDocument ? !isNoEntity : true

  useEffect(() => {
    if (!fireSave) return
    handleSave(changesText)
    setFireSave(false)
  }, [fireSave, handleSave, changesText])

  useEffect(() => {
    // make sure generated change text is used
    if (!changesText) setChangesText(prefilledChanges ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <ModalWithCloseButton
      isOpen={open}
      setIsOpen={setOpen}
      title={strings.saveButton.save}
      className={cn(
        !isOnlyText &&
          'top-8 max-h-full w-[900px] -translate-x-1/2 translate-y-0 overflow-y-auto pb-20'
      )}
    >
      <div className="mx-side">
        {renderChanges()}
        {renderLicense()}
        {isOnlyText ? strings.saveButton.ready : null}
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
          {strings.saveButton.cancel}
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
            'serlo-button-learner ml-2',
            pending ? 'cursor-default text-gray-300' : 'serlo-button-green'
          )}
          disabled={pending}
          title={getSaveHint()}
        >
          {pending
            ? strings.saveButton.saving
            : needsNoReview
              ? strings.saveButton.save
              : strings.saveButton.saveWithReview}
        </button>
      </div>
    )
  }

  function getSaveHint() {
    if (maySave) return undefined
    if (licenseAccepted && !changesFilled) {
      return strings.saveButton.missingChanges
    } else if (!licenseAccepted && changesFilled) {
      return strings.saveButton.missingLicenseTerms
    } else {
      return strings.saveButton.missingChangesAndLicenseTerms
    }
  }

  function renderAlert() {
    if (!hasError) return null
    return (
      <InfoPanel type="warning" icon={faExclamationCircle}>
        {strings.saveButton.errorSaving}
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
        {strings.saveButton.changes}{' '}
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
    const licenseAgreement = getLicense(
      licenses,
      licenseIdOrDefaultId
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
}
