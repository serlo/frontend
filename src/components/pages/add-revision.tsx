import { faWarning } from '@fortawesome/free-solid-svg-icons/faWarning'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Link } from '../content/link'
import { LoadingSpinner } from '../loading/loading-spinner'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { StaticInfoPanel } from '../static-info-panel'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { PageSerializedState } from '@/edtr-io/editor-response-to-state'
import { SerloEditor } from '@/edtr-io/serlo-editor'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { isProduction } from '@/helper/is-production'
import { useAddPageRevision } from '@/mutations/use-add-page-revision-mutation'
import {
  SetEntityMutationData,
  TaxonomyCreateOrUpdateMutationData,
} from '@/mutations/use-set-entity-mutation/types'
import { useSetEntityMutation } from '@/mutations/use-set-entity-mutation/use-set-entity-mutation'
import { useTaxonomyCreateOrUpdateMutation } from '@/mutations/use-taxonomy-create-or-update-mutation'

export function AddRevision({
  initialState,
  type,
  needsReview,
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
    if (!isProduction) {
      setUserReady(true)
      return
    }

    const makeDamnSureUserIsLoggedIn = async () => {
      if (auth.current === null) return false

      /*
      the better way would be to check if the authenticated cookie is still
      set since this seems to be the only cookie legacy actually removes,
      but since it's http-only this workaround is way easier.
      The fetch also makes sure the CSRF tokens are set
      This is only a hack until we don't use legacy authentication any more 
      */

      try {
        const result = await fetch(`/auth/password/change`)
        const resultHtml = await result.text()
        return resultHtml.includes('<a href="/auth/logout"')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return false
      }
    }

    void makeDamnSureUserIsLoggedIn().then((isLoggedIn) => {
      setUserReady(isLoggedIn)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <br />
        If that does not work head to{' '}
        <Link href="/auth/login">/auth/login</Link> and make sure you are logged
        in there.
      </StaticInfoPanel>
    )

  const onSave = async (
    data:
      | SetEntityMutationData
      | PageSerializedState
      | TaxonomyCreateOrUpdateMutationData
  ) => {
    console.log(data)
    // refactor and rename when removing legacy code
    const skipReview = hasOwnPropertyTs(data, 'controls')
      ? data.controls.checkout
      : undefined
    const _needsReview = skipReview ? false : needsReview

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
            _needsReview,
            initialState,
            taxonomyParentId
          )

    return new Promise((resolve: (value: void) => void, reject) => {
      if (success) resolve()
      else reject()
    })
  }

  return (
    <>
      {renderBacklink()}
      <div className="controls-portal sticky top-0 z-[94] bg-white" />
      <div
        className={clsx(
          'max-w-[816px] mx-auto mb-24 edtr-io serlo-editor-hacks'
        )}
      >
        <SerloEditor
          needsReview={needsReview}
          onSave={onSave}
          type={type}
          initialState={initialState}
        />
      </div>
    </>
  )

  function renderBacklink() {
    const backlink = {
      label: isPage ? 'Pages' : strings.revisions.toContent,
      url: isPage ? '/pages' : `/${id ?? taxonomyParentId!}`,
    }
    return (
      <Breadcrumbs
        data={breadcrumbsData ? [...breadcrumbsData, backlink] : [backlink]}
        asBackButton={!breadcrumbsData}
      />
    )
  }
}
