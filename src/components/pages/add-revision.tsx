import { faWarning } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { loginUrl } from './auth/utils'
import { Link } from '../content/link'
import { InfoPanel } from '../info-panel'
import { LoadingSpinner } from '../loading/loading-spinner'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { getTranslatedType } from '@/helper/get-translated-type'
import { isProduction } from '@/helper/is-production'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useAddPageRevision } from '@/mutations/use-add-page-revision-mutation'
import {
  OnSaveData,
  SetEntityMutationData,
  TaxonomyCreateOrUpdateMutationData,
} from '@/mutations/use-set-entity-mutation/types'
import { useSetEntityMutation } from '@/mutations/use-set-entity-mutation/use-set-entity-mutation'
import { useTaxonomyCreateOrUpdateMutation } from '@/mutations/use-taxonomy-create-or-update-mutation'
import type { PageSerializedState } from '@/serlo-editor-integration/convert-editor-response-to-state'
import { SerloEditor } from '@/serlo-editor-integration/serlo-editor'

export function AddRevision({
  initialState,
  type,
  entityNeedsReview,
  id,
  taxonomyParentId,
  breadcrumbsData,
}: EditorPageData) {
  const { strings } = useInstanceData()

  const auth = useAuthentication()

  const setEntityMutation = useSetEntityMutation()
  const addPageRevision = useAddPageRevision()
  const taxonomyCreateOrUpdateMutation = useTaxonomyCreateOrUpdateMutation()

  const [userReady, setUserReady] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    async function confirmAuth() {
      await fetchAndPersistAuthSession()
      setUserReady(isProduction ? auth !== null : true)
    }
    void confirmAuth()

    // special case for add-revision route
    if (userReady !== undefined && !auth) {
      showToastNotice(strings.notices.warningLoggedOut, 'warning', 18000)
    }
    // do not rerun on userReady change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, strings])

  if (!setEntityMutation) return null

  const isPage = type === UuidType.Page

  if (!id && !isPage && !taxonomyParentId) return null

  if (userReady === undefined) return <LoadingSpinner noText />
  if (userReady === false)
    return (
      <InfoPanel icon={faWarning} type="failure">
        Sorry, Something is wrong!
        <br />
        Please: Logout and Login again and try to edit again.
        <br />
        <br /> If that does not work head to{' '}
        <Link href={loginUrl}>{loginUrl}</Link> and make sure you are logged in
        there.
      </InfoPanel>
    )

  // types needs refactoring here. splitting controls and data would probably make sense

  const onSave = async (
    data:
      | SetEntityMutationData
      | PageSerializedState
      | TaxonomyCreateOrUpdateMutationData
  ) => {
    const willNeedReview = Object.hasOwn(data, 'controls')
      ? !(data as OnSaveData).controls.noReview
      : entityNeedsReview

    const success =
      type === UuidType.Page
        ? await addPageRevision(data as PageSerializedState)
        : type === UuidType.TaxonomyTerm
        ? await taxonomyCreateOrUpdateMutation(
            data as TaxonomyCreateOrUpdateMutationData
          )
        : await setEntityMutation(
            {
              ...data,
              __typename: type,
            } as SetEntityMutationData,
            willNeedReview,
            initialState,
            taxonomyParentId
          )

    return success ? Promise.resolve() : Promise.reject()
  }

  return (
    <>
      <Head>
        <title>{`${strings.editOrAdd.button} | ${getTranslatedType(
          strings,
          type
        )}${id ? ` (${id})` : ''}`}</title>
      </Head>
      {renderBacklink()}
      <div className="controls-portal pointer-events-none sticky top-0 z-[90] bg-white md:bg-transparent" />
      <div className="serlo-editor-hacks mx-auto mb-24 max-w-[816px]">
        <SerloEditor
          entityNeedsReview={entityNeedsReview}
          onSave={onSave}
          type={type}
          initialState={initialState}
        />
      </div>
    </>
  )

  function renderBacklink() {
    if (!breadcrumbsData) return null
    const backlink = {
      label: strings.revisions.toContent,
      url: `/${id ?? taxonomyParentId!}`,
    }
    return <Breadcrumbs data={[...breadcrumbsData, backlink]} />
  }
}
