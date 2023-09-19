import {
  faPencil,
  faPlusCircle,
  faTrashAlt,
  faTrashRestore,
} from '@fortawesome/free-solid-svg-icons'
import request, { gql } from 'graphql-request'
import { GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  Instance,
  PagesQuery,
  PagesQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { getEditUrl } from '@/helper/urls/get-edit-url'
import { useSetUuidStateMutation } from '@/mutations/use-set-uuid-state-mutation'

interface PagesProps {
  pages: PagesQuery['page']['pages']
}

export default renderedPageNoHooks<PagesProps>((props) => {
  return (
    <FrontendClientBase>
      <Content {...props} />
    </FrontendClientBase>
  )
})

function Content({ pages }: PagesProps) {
  const { strings } = useInstanceData()
  const setUuidState = useSetUuidStateMutation()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings

  return (
    <>
      {renderBackButton()}
      <PageTitle title={loggedInStrings.backend.pages} />

      <Link
        href="/page/create"
        className="serlo-button-blue float-right -mt-[4.4rem] mr-side sm:mr-48"
      >
        <FaIcon icon={faPlusCircle} /> {loggedInStrings.pages.newPage}
      </Link>
      <ul className="mx-side max-w-fit">{renderEntries(false)}</ul>

      <h2 className="serlo-h2 mt-12">{loggedInStrings.pages.deletedPages}</h2>
      <ul className="mx-side max-w-fit">{renderEntries(true)}</ul>
    </>
  )

  function renderBackButton() {
    return (
      <Breadcrumbs
        data={[{ label: strings.pageTitles.diagon, url: '/backend' }]}
        asBackButton
      />
    )
  }

  function renderEntries(onlyTrashed: boolean) {
    return pages.map(({ id, trashed, currentRevision, alias }) => {
      if (onlyTrashed !== trashed) return null
      return (
        <li
          key={id}
          className="my-3 -ml-3 flex justify-between rounded-md p-3 hover:bg-brand-50"
        >
          <Link href={alias}>
            {currentRevision ? currentRevision.title : 'no accepted revision'}
          </Link>
          <span className="ml-3">
            <Link
              className="serlo-button-blue-transparent"
              title={loggedInStrings.authorMenu.edit}
              href={getEditUrl(id)}
            >
              <FaIcon icon={faPencil} />
            </Link>
            <button
              className="serlo-button-blue-transparent"
              title={
                loggedInStrings.authorMenu[
                  trashed ? 'restoreContent' : 'moveToTrash'
                ]
              }
              onClick={async () => {
                await setUuidState({ id: [id], trashed: !trashed })
              }}
            >
              <FaIcon icon={trashed ? faTrashRestore : faTrashAlt} />
            </button>
          </span>
        </li>
      )
    })
  }
}

export const getStaticProps: GetStaticProps<PagesProps> = async (context) => {
  const instance = context.locale! as Instance

  const result = await request<PagesQuery, PagesQueryVariables>(
    endpoint,
    pagesQuery,
    { instance }
  )

  return {
    props: {
      pages: result.page.pages,
    },
    revalidate: 60 * 2, // 2 min,
  }
}

export const pagesQuery = gql`
  query pages($instance: Instance!) {
    page {
      pages(instance: $instance) {
        id
        alias
        trashed
        currentRevision {
          title
        }
      }
    }
  }
`
