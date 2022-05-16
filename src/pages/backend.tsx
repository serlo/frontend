import {
  faBookSkull,
  faMap,
  faTrashAlt,
  faUserAstronaut,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import Head from 'next/head'

import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface Entry {
  url: string
  title: string
  icon: IconDefinition
}

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const { strings } = useInstanceData()

  const loggedInData = useLoggedInData()
  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.backend

  function getMenuData(): Entry[] {
    return [
      { url: '/pages', title: loggedInStrings.pages, icon: faFile },
      {
        url: '/authorization/roles',
        title: loggedInStrings.authorization,
        icon: faUserAstronaut,
      },
      {
        url: '/navigation/manage',
        title: loggedInStrings.navigation,
        icon: faMap,
      },
      {
        url: '/uuid/recycle-bin',
        title: loggedInStrings.recycleBin,
        icon: faTrashAlt,
      },
      { url: '/___bot_or_not', title: 'Bot Or Not', icon: faBookSkull },
    ]
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <PageTitle title={strings.pageTitles.diagon} headTitle />
      {renderMenu()}
    </>
  )

  function renderMenu() {
    return (
      <div className="flex flex-wrap text-center font-bold">
        {getMenuData().map(renderEntry)}
      </div>
    )
  }

  function renderEntry({ url, title, icon }: Entry) {
    const buttonClasses =
      'p-4 pt-8 w-40 h-40 bg-brand-100 rounded-xl m-side hover:bg-brand hover:text-white hover:no-underline'
    return (
      <Link href={url} className={buttonClasses}>
        <FaIcon icon={icon} className="h-16" />
        <br />
        {title}
      </Link>
    )
  }
}
