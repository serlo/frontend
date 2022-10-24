import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import { Root, List } from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { EditOrInvite } from './edit-or-invite/edit-or-invite'
import { TaxAddOrInvite } from './edit-or-invite/tax-add-or-invite'
import { AuthorToolsData } from './foldout-author-menus/author-tools'
import { Share } from './share/share'
import { UserToolsItem } from './user-tools-item'
import { useAuthentication } from '@/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
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
  import('@/components/user-tools/foldout-author-menus/more-author-tools').then(
    (mod) => mod.MoreAuthorTools
  )
)

const MoreAuthorToolsCourse = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/more-author-tools-course'
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

  const isRevision = data && data.type.includes('Revision')
  const isTaxonomy = data && data.type === UuidType.TaxonomyTerm

  // note: we hide the ui on ssr and fade it in on the client
  const [firstPass, setFirstPass] = useState(true)

  useEffect(() => {
    if (firstPass) setFirstPass(false)
  }, [auth, firstPass])

  const fadeIn = clsx(
    'transition-opacity',
    firstPass ? 'opacity-0' : 'opacity-100'
  )
  // note: this component is added twice, once without aboveContent and once with it
  // (responsive variants)

  return (
    <Root
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
      <List
        className={clsx(
          aboveContent
            ? 'mr-4 -mt-4 mb-8 flex lg:hidden justify-end'
            : 'bg-white rounded-md pointer-events-auto flex-col flex items-start'
        )}
      >
        {renderButtons()}
      </List>
    </Root>
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
          isTaxonomy ? (
            <TaxAddOrInvite data={data} aboveContent={aboveContent} />
          ) : (
            <EditOrInvite
              data={data}
              unrevisedRevisions={unrevisedRevisions}
              aboveContent={aboveContent}
            />
          )
        ) : null}

        {auth.current ? (
          data?.type === UuidType.CoursePage ? (
            <MoreAuthorToolsCourse data={data} aboveContent={aboveContent} />
          ) : (
            <MoreAuthorTools data={data} aboveContent={aboveContent} />
          )
        ) : null}
        <Share data={data} aboveContent={aboveContent} />
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
