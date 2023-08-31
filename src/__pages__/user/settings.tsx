import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useAuthentication } from '@/auth/use-authentication'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { ProfileSettings } from '@/components/user/profile-settings'
import { useInstanceData } from '@/contexts/instance-context'
import { User } from '@/fetcher/query-types'
import { userQuery } from '@/fetcher/user/query'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const { lang, strings } = useInstanceData()
  const auth = useAuthentication()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error } = useFetch(auth?.id ? `/${auth?.id}` : undefined, lang)

  const rawDescription =
    data?.uuid.description && data.uuid.description !== 'NULL'
      ? data.uuid.description
      : ''

  return (
    <>
      <Breadcrumbs
        data={[
          {
            label: strings.entities.userProfile,
            url: auth ? `/user/${auth.id}/${auth.username}` : '/user/me',
          },
        ]}
        asBackButton
      />
      <PageTitle title={strings.pageTitles.editProfile} headTitle />
      {auth ? renderSettings() : <PleaseLogIn />}
    </>
  )

  function renderSettings() {
    return (
      <>
        <Guard data={data} error={error} needsAuth>
          <>
            <ProfileSettings rawDescription={rawDescription} />
          </>
        </Guard>
      </>
    )
  }
}

function useFetch(path?: string, instance?: string) {
  return useGraphqlSwr<{ uuid: User }>({
    query: userQuery,
    variables: { path, instance },
    noKey: path === undefined,
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
  })
}
