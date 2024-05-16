import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useAuthentication } from '@/auth/use-authentication'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Guard } from '@/components/guard'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { ProfileSettings } from '@/components/user/profile-settings'
import { useInstanceData } from '@/contexts/instance-context'
import { User } from '@/fetcher/query-types'
import { userByUsernameQuery } from '@/fetcher/user/query-by-username'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const { strings } = useInstanceData()
  const auth = useAuthentication()

  const { data, error } = useFetch(auth?.username)

  const userData = data?.user?.userByUsername

  const rawDescription =
    userData?.description && userData.description !== 'NULL'
      ? userData.description
      : ''

  return (
    <>
      <Breadcrumbs
        data={[
          {
            label: strings.entities.userProfile,
            url: auth ? `/user/profile/${auth.username}` : '/user/me',
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
          <ProfileSettings rawDescription={rawDescription} />
        </Guard>
      </>
    )
  }
}

function useFetch(username?: string) {
  return useGraphqlSwr<{ user: { userByUsername: User } }>({
    query: userByUsernameQuery,
    variables: { username },
    noKey: username === undefined,
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
  })
}
