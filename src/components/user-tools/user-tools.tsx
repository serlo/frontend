import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { EditOrInvite } from './edit-or-invite/edit-or-invite'
import { AuthorToolsData } from './more-autor-tools/author-tools-hover-menu'
import { MoreAutorTools } from './more-autor-tools/more-autor-tools'
import { RevisionTools } from './revision/revision-tools'
import { Share } from './share/share'
import { UserToolsItem } from './user-tools-item'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'

interface UserToolsProps {
  id?: number
  onShare?: () => void
  hideEditProfile?: boolean
  data?: AuthorToolsData
  unrevisedRevisions?: number
  aboveContent?: boolean
}

export interface UserToolsData {
  editHref: string
}

export function UserTools({
  // id,
  data,
  unrevisedRevisions,
  aboveContent,
  hideEditProfile,
}: UserToolsProps) {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()
  const loggedInComponents = useLoggedInComponents()

  const isRevision = data && data.type.includes('Revision')
  // note: we hide the ui on ssr and fade it in on the client
  const [firstPass, setFirstPass] = useState(true)

  useEffect(() => {
    if (firstPass && (!auth.current || (auth.current && loggedInComponents))) {
      setFirstPass(false)
    }
  }, [auth, loggedInComponents, firstPass])

  // note: this component is added twice, once without aboveContent and once with it
  // (responsive variants)

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List
        className={clsx(
          'serlo-user-tools mr-4 -mt-4 mb-8',
          'flex lg:hidden justify-end',
          fadeIn()
        )}
      >
        {renderButtons()}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )

  function renderButtons() {
    if (firstPass)
      return aboveContent ? (
        <UserToolsItem
          title="…"
          href=""
          aboveContent={aboveContent}
          icon={faCircle}
        />
      ) : null

    if (data && data.type === UuidType.User) return renderProfileButtons()

    return (
      <>
        {isRevision ? (
          <RevisionTools data={data} aboveContent={aboveContent} />
        ) : null}
        <EditOrInvite
          data={data}
          unrevisedRevisions={unrevisedRevisions}
          aboveContent={aboveContent}
        />
        <Share data={data} aboveContent={aboveContent} />
        {/* {auth.current ? } */}
        <MoreAutorTools data={data} aboveContent={aboveContent} />
      </>
    )
  }

  return <>{aboveContent ? renderInlineContainer() : renderSideContainer()}</>

  function renderInlineContainer() {
    return (
      <nav
        className={clsx(
          'serlo-user-tools mr-4 -mt-4 mb-8',
          'flex lg:hidden justify-end',
          fadeIn()
        )}
      >
        {renderButtons()}
      </nav>
    )
  }

  function fadeIn() {
    return clsx('transition-opacity', firstPass ? 'opacity-0' : 'opacity-100')
  }

  function renderSideContainer() {
    return (
      <nav
        className={clsx(
          'serlo-user-tools absolute z-50 right-8 bottom-8 h-full',
          'lg:flex hidden items-end pointer-events-none',
          fadeIn()
        )}
      >
        <div
          className={clsx(
            'sticky bottom-8 flex-col flex items-start',
            'bg-white rounded-md pointer-events-auto'
          )}
        >
          side
          {renderButtons()}
        </div>
      </nav>
    )
  }

  function renderProfileButtons() {
    if (!loggedInData || hideEditProfile) return null

    return (
      <UserToolsItem
        title={loggedInData.strings.authorMenu.editProfile}
        href="/user/settings"
        aboveContent={aboveContent}
        icon={faPencilAlt}
      />
    )
  }
}
