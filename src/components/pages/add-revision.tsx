import { faWarning } from '@fortawesome/free-solid-svg-icons/faWarning'
import clsx from 'clsx'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Link } from '../content/link'
import { LoadingSpinner } from '../loading/loading-spinner'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { StaticInfoPanel } from '../static-info-panel'
import { loginUrl } from './auth/utils'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { PageSerializedState } from '@/edtr-io/editor-response-to-state'
import { SerloEditor } from '@/edtr-io/serlo-editor'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { getTranslatedType } from '@/helper/get-translated-type'
import { isProduction } from '@/helper/is-production'
import { useAddPageRevision } from '@/mutations/use-add-page-revision-mutation'
import {
  OnSaveData,
  SetEntityMutationData,
  TaxonomyCreateOrUpdateMutationData,
} from '@/mutations/use-set-entity-mutation/types'
import { useSetEntityMutation } from '@/mutations/use-set-entity-mutation/use-set-entity-mutation'
import { useTaxonomyCreateOrUpdateMutation } from '@/mutations/use-taxonomy-create-or-update-mutation'

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
  }, [auth])

  if (!setEntityMutation) return null

  const isPage = type === UuidType.Page

  if (!id && !isPage && !taxonomyParentId) return null

  if (userReady === undefined) return <LoadingSpinner noText />
  if (userReady === false)
    return (
      <StaticInfoPanel icon={faWarning} type="failure">
        Sorry, Something is wrong!
        <br />
        Please: Logout and Login again and try to edit again.
        <br />
        <br /> If that does not work head to{' '}
        <Link href={loginUrl}>{loginUrl}</Link> and make sure you are logged in
        there.
      </StaticInfoPanel>
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
      <div className="controls-portal sticky top-0 z-[94] bg-white" />
      <div
        className={clsx(
          'max-w-[816px] mx-auto mb-24 edtr-io serlo-editor-hacks'
        )}
      >
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
