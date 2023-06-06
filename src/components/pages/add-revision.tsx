import { faWarning } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { generate } from 'shortid'

import { Link } from '../content/link'
import { LoadingSpinner } from '../loading/loading-spinner'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { StaticInfoPanel } from '../static-info-panel'
import { loginUrl } from './auth/utils'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { ArticleSerializedState } from '@/edtr-io/editor-response-to-state'
import { SerloEditor } from '@/edtr-io/serlo-editor'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { getTranslatedType } from '@/helper/get-translated-type'
import { isProduction } from '@/helper/is-production'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useSetEntityMutation } from '@/mutations/use-set-entity-mutation/use-set-entity-mutation'

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

  const onSave = async (data: ArticleSerializedState) => {
    /*const willNeedReview = Object.hasOwn(data, 'controls')
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
          )*/
    const key = generate()
    const content = data.content
    const title = data.title
    const id = data.id

    void (async () => {
      await fetch('/api/frontend/private-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, content, title, id }),
      })
    })()
    // @ts-expect-error Directly access sub-component
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    window.__setLink(
      'https://frontend-git-poc-remix-serlo.vercel.app/private-link/' + key
    )

    return Promise.resolve()
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
      <div className="bg-brand-50 rounded flex justify-start">
        <img
          src="/_assets/img/community-menu-bird.svg"
          className="w-[8.1rem] py-6 pl-4"
        />
        <div className="[&>p]:serlo-p py-3">
          <p className="pt-6">
            Wir laden dich diese Woche ein, unseren Editor auszuprobieren
            <br />
            Hier kannst du Inhalte nach deinem Bedarf verändern, kürzen oder
            ergänzen.
          </p>
          <p>
            Dir steht dann die Möglichkeit zur Verfügung, deine Änderungen über
            einen <strong>privaten Link</strong> zu speichern und anderen
            Personen, wie z.B deiner Klasse, weiterzugeben.
          </p>
          <p>
            Interesse geweckt? Die Inhalte auf Serlo werden von einer
            ehrenamtlichen Autor*innen-Community gepflegt:{' '}
            <a
              className="serlo-link"
              target="_blank"
              href="https://de.serlo.org/community"
              rel="noreferrer"
            >
              Finde mehr heraus
            </a>
            .
          </p>
        </div>
      </div>
      <div className="controls-portal sticky top-0 z-[94] bg-white" />
      <div
        className={clsx(
          'edtr-io serlo-editor-hacks mx-auto mb-24 max-w-[816px]'
        )}
      >
        <SerloEditor
          entityNeedsReview={entityNeedsReview}
          // @ts-expect-error Pin it to article
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
