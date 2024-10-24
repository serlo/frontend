import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import { loginUrl } from './auth/utils'
import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { InfoPanel } from '../info-panel'
import { LoadingSpinner } from '../loading/loading-spinner'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { testAreaId } from '@/fetcher/testArea'
import { getTranslatedType } from '@/helper/get-translated-type'
import { isProduction } from '@/helper/is-production'
import { showToastNotice } from '@/helper/show-toast-notice'
import {
  SetEntityMutationData,
  TaxonomyCreateOrUpdateMutationData,
} from '@/mutations/use-set-entity-mutation/types'
import { useSetEntityMutation } from '@/mutations/use-set-entity-mutation/use-set-entity-mutation'
import { useTaxonomyCreateOrUpdateMutation } from '@/mutations/use-taxonomy-create-or-update-mutation'
import { SerloEditor } from '@/serlo-editor-integration/serlo-editor'

export function AddRevision({
  initialState,
  type,
  id,
  taxonomyParentId,
  breadcrumbsData,
}: EditorPageData) {
  const { strings } = useInstanceData()

  const auth = useAuthentication()
  const isInTestArea = Boolean(
    breadcrumbsData && breadcrumbsData.some((entry) => entry.id === testAreaId)
  )

  const setEntityMutation = useSetEntityMutation()
  const taxonomyCreateOrUpdateMutation = useTaxonomyCreateOrUpdateMutation()

  const [userReady, setUserReady] = useState<boolean | undefined>(undefined)

  const isPage = type === UuidType.Page

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

  const handleSave = async (
    data: SetEntityMutationData | TaxonomyCreateOrUpdateMutationData
  ) => {
    if (type === UuidType.TaxonomyTerm) {
      const success = await taxonomyCreateOrUpdateMutation(
        data as TaxonomyCreateOrUpdateMutationData
      )
      return success ? Promise.resolve() : Promise.reject()
    }

    const mutationData = {
      __typename: type,
      ...data,
    } as SetEntityMutationData
    const success = await setEntityMutation(mutationData, taxonomyParentId)
    return success ? Promise.resolve() : Promise.reject()
  }

  const typeString = getTranslatedType(strings, type)
  const title = `${strings.editOrAdd.button} | ${typeString}${id ? ` (${id})` : ''}`

  return (
    <>
      <HeadTags data={{ title }} />
      {renderBacklink()}
      <SerloEditor
        onSave={handleSave}
        isInTestArea={isInTestArea}
        initialState={initialState}
      />
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
