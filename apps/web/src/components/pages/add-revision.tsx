import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { finalizeEvent, generateSecretKey } from 'nostr-tools/pure'
import { Relay } from 'nostr-tools/relay'
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
import { getTranslatedType } from '@/helper/get-translated-type'
import { isProduction } from '@/helper/is-production'
import { showToastNotice } from '@/helper/show-toast-notice'
import {
  SetEntityMutationData,
  TaxonomyCreateOrUpdateMutationData,
} from '@/mutations/use-set-entity-mutation/types'
import { useSetEntityMutation } from '@/mutations/use-set-entity-mutation/use-set-entity-mutation'
import { SerloEditor } from '@/serlo-editor-integration/serlo-editor'

const sk = generateSecretKey()

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
  const router = useRouter()

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

  const onSave = async (
    data: SetEntityMutationData | TaxonomyCreateOrUpdateMutationData
  ) => {

    const relay = await Relay.connect('wss://relay.sc24.steffen-roertgen.de')

    const title =
      ('title' in data ? data.title : undefined) ?? 'Neuer Serlo Artikel'
    const id = 'https://serlo.org/60730?title=' + encodeURIComponent(title)

    await relay.publish(
      finalizeEvent(
        {
          kind: 30142,
          created_at: Math.floor(Date.now() / 1000),
          tags: [
            ['d', id],
            ['r', id],
            ['id', id],
            ['name', title],
            ['author', 'Serlo Education'],
            ['image', 'https://de.serlo.org/_assets/apple-touch-icon.png'],
            ['resourceType', 'Article'],
            ['inLanguage', 'de'],
            ['license', 'https://creativecommons.org/licenses/by-sa/3.0'],
            ['source', 'https://serlo.org/', 'Serlo'],
          ],
          content: '',
        },
        sk
      )
    )

    console.log('published')

    setTimeout(() => {
      window.onbeforeunload = null
      void router.push('/60730#success')
    }, 200)

    return Promise.resolve()
  }

  const typeString = getTranslatedType(strings, type)
  const title = `${strings.editOrAdd.button} | ${typeString}${id ? ` (${id})` : ''}`

  return (
    <>
      <HeadTags data={{ title }} />
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
