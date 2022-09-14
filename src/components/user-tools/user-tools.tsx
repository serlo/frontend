import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { AuthorToolsData } from './author-tools'
import { EditOrInvite } from './edit-or-invite/edit-or-invite'
import { Share } from './share/share'
import { UserToolsItem } from './user-tools-item'
import { useAuthentication } from '@/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@/components/user-tools/more-author-tools/more-author-tools'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'

interface UserToolsProps {
  id?: number
  hideEditProfile?: boolean
  data?: AuthorToolsData
  unrevisedRevisions?: number
  aboveContent?: boolean
}

export interface UserToolsData {
  editHref: string
}

const RevisionTools = dynamic<MoreAuthorToolsProps>(() =>
  import('@/components/user-tools/revision/revision-tools').then(
    (mod) => mod.RevisionTools
  )
)

const MoreAuthorTools = dynamic<MoreAuthorToolsProps>(() =>
  import('@/components/user-tools/more-author-tools/more-author-tools').then(
    (mod) => mod.MoreAuthorTools
  )
)

const MoreAuthorToolsCourse = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/more-author-tools/more-author-tools-course'
  ).then((mod) => mod.MoreAuthorToolsCourse)
)

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

  const fadeIn = clsx(
    'transition-opacity',
    firstPass ? 'opacity-0' : 'opacity-100'
  )
  // note: this component is added twice, once without aboveContent and once with it
  // (responsive variants)

  return (
    <NavigationMenu.Root
      className={
        aboveContent
          ? fadeIn
          : clsx(
              'serlo-user-tools absolute z-50 right-8 bottom-8 h-full',
              'lg:flex hidden items-end pointer-events-none',
              '[&>div]:!sticky [&>div]:bottom-8',
              fadeIn
            )
      }
    >
      <NavigationMenu.List
        className={clsx(
          aboveContent
            ? 'mr-4 -mt-4 mb-8 flex lg:hidden justify-end'
            : 'bg-white rounded-md pointer-events-auto flex-col flex items-start'
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
        {data ? (
          <EditOrInvite
            data={data}
            unrevisedRevisions={unrevisedRevisions}
            aboveContent={aboveContent}
          />
        ) : null}

        <Share data={data} aboveContent={aboveContent} />

        {auth.current ? (
          data?.type === UuidType.CoursePage ? (
            <MoreAuthorToolsCourse data={data} aboveContent={aboveContent} />
          ) : (
            <MoreAuthorTools data={data} aboveContent={aboveContent} />
          )
        ) : null}
      </>
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
