import { StateTypeReturnType } from '@edtr-io/plugin'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { gql } from 'graphql-request'
import { useContext, useEffect, useState } from 'react'

import { entity } from '../plugins/types/common/common'
import { useHandleSave } from '../plugins/types/helpers/use-handle-save'
import { SaveContext } from '../serlo-editor'
import { LocalStorageButton } from './local-storage-button'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { DefaultLicenseAgreementQuery } from '@/fetcher/graphql-types/operations'
import { showToastNotice } from '@/helper/show-toast-notice'

export interface SaveModalProps {
  open: boolean
  setOpen: (arg0: boolean) => void
  changes?: StateTypeReturnType<typeof entity['changes']>
  license?: StateTypeReturnType<typeof entity['license']>
  showSubscriptionOptions?: boolean
}

export function SaveModal({
  open,
  setOpen,
  license,
  changes,
  showSubscriptionOptions,
}: SaveModalProps) {
  const { handleSave, pending, hasError, link } = useHandleSave(
    open,
    showSubscriptionOptions
  )
  const { userCanSkipReview, entityNeedsReview } = useContext(SaveContext)
  const [agreement] = useState(true)
  const [notificationSubscription] = useState(true)
  const [emailSubscription] = useState(true)
  const [skipReview] = useState(false)
  const [changesText, setChangesText] = useState(changes?.value ?? '?')
  const [fireSave, setFireSave] = useState(false)
  const [highlightMissingFields, setHighlightMissingFields] = useState(false)
  const { lang } = useInstanceData()
  const defaultLicenseAgreement =
    useLicensesFetch(lang).data?.license.defaultLicense.agreement

  const licenseAccepted = !license || agreement
  const changesFilled = !changes || changesText || true
  const maySave = licenseAccepted && changesFilled
  const showSkipCheckout = userCanSkipReview && entityNeedsReview
  const isOnlyText =
    !showSkipCheckout && !showSubscriptionOptions && !license && !changes

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
  const { edtrIo } = loggedInData.strings.editor

  return (
    <ModalWithCloseButton
      isOpen={open}
      onCloseClick={() => {
        setOpen(false)
      }}
      title="Privaten Link zu dieser Version erstellen"
    >
      <div className="mx-side">
        <div className="my-8">
          <ul className="serlo-ul">
            <li>
              Mit dem privaten Link kannst du jederzeit auf diese Version des
              Inhalts zugreifen.
            </li>
            <li>
              Die Version ist fest und kann weder von dir noch von anderen
              Personen verändert werden.
            </li>
            <li>
              Speichere dir den Link, um den Zugriff auf diese Version zu
              behalten.
            </li>
          </ul>
        </div>
        {renderLicense()}
        {isOnlyText ? edtrIo.ready : null}
        <hr className="mt-8 mb-8" />
        {renderAlert()}
        {renderModalButtons()}
        {link && (
          <div>
            Dein Link:{' '}
            <input
              className="p-2 rounded bg-yellow-300 w-[400px]"
              defaultValue={link}
              readOnly
            />
          </div>
        )}
      </div>
      {isOnlyText ? null : (
        <style jsx global>{`
          .ReactModal__Content {
            overflow-y: auto;
            top: 0;
            bottom: 1rem;
            margin-top: 2rem;
            transform: translate(-50%, 0);
            max-height: 100%;
          }
        `}</style>
      )}
    </ModalWithCloseButton>
  )

  function renderModalButtons() {
    return (
      <div className="mt-4 text-right mx-side">
        <button
          className="serlo-button-transparent"
          onClick={() => setOpen(false)}
        >
          {edtrIo.cancel}
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
          className={clsx(
            'serlo-button ml-2',
            pending ? 'cursor-default text-gray-300' : 'serlo-button-green'
          )}
          disabled={pending}
          title="Link erstellen"
        >
          Link erstellen
        </button>
      </div>
    )
  }

  function renderAlert() {
    if (!hasError) return null
    return (
      <StaticInfoPanel type="warning" icon={faExclamationCircle}>
        {edtrIo.errorSaving}
        <br />
        {edtrIo.saveLocallyAndRefresh}
        <LocalStorageButton open={open} />
      </StaticInfoPanel>
    )
  }

  function renderLicense() {
    if (!license) return null

    const licenseAgreement =
      license && license.defined
        ? license.agreement.value.replace(/<a href/g, '<a target="_blank" href')
        : defaultLicenseAgreement

    if (!licenseAgreement) return null

    return (
      <label
        className={clsx(
          'block pb-2',
          highlightMissingFields && !licenseAccepted && 'bg-red-100'
        )}
      >
        <span
          className="license-wrapper [&_a]:!text-brand hover:[&_a]:underline"
          dangerouslySetInnerHTML={{ __html: licenseAgreement }}
        />{' '}
        <span className="font-bold text-red-500">*</span>
      </label>
    )
  }
}

const licensesQuery = gql`
  query defaultLicenseAgreement($instance: Instance!) {
    license {
      defaultLicense(instance: $instance) {
        agreement
      }
    }
  }
`

function useLicensesFetch(instance: string) {
  return useGraphqlSwr<DefaultLicenseAgreementQuery>({
    query: licensesQuery,
    variables: { instance },
    config: {
      refreshInterval: 24 * 60 * 60 * 1000, // day
    },
  })
}
