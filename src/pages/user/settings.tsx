import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useAuthentication } from '@/auth/use-authentication'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { ProfileSettings } from '@/components/user/profile-settings'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
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
  const loggedInData = useLoggedInData()

  const auth = useAuthentication()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error } = useFetch(
    auth.current?.id ? `/${auth.current?.id}` : undefined,
    lang
  )

  if (!loggedInData) return null
  // const loggedInStrings = loggedInData.strings.subscriptions

  return (
    <>
      <Breadcrumbs
        data={[
          {
            label: strings.entities.userProfile,
            url: auth.current
              ? `/user/${auth.current.id}/${auth.current.username}`
              : '/user/me',
          },
        ]}
        asBackButton
      />
      <PageTitle title={strings.pageTitles.editProfile} headTitle />
      {auth.current ? renderSettings() : <PleaseLogIn />}
    </>
  )

  function renderSettings() {
    return (
      <>
        <Guard data={data} error={error} needsAuth>
          <>
            <ProfileSettings rawDescription={data?.uuid.description ?? ''} />
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
