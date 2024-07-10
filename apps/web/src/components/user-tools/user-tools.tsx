import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { Root, List } from '@radix-ui/react-navigation-menu'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import type { EditOrInviteProps } from './edit-or-invite/edit-or-invite'
import type { TaxAddOrInviteProps } from './edit-or-invite/tax-add-or-invite'
import { AuthorToolsData } from './foldout-author-menus/author-tools'
import { Share } from './share/share'
import { UserToolsItem } from './user-tools-item'
import { useAuthentication } from '@/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { UuidType } from '@/data-types'
import { cn } from '@/helper/cn'

interface UserToolsProps {
  data?: AuthorToolsData
  unrevisedRevisions?: number
  aboveContent?: boolean
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

const EditOrInvite = dynamic<EditOrInviteProps>(() =>
  import('./edit-or-invite/edit-or-invite').then((mod) => mod.EditOrInvite)
)

const TaxAddOrInvite = dynamic<TaxAddOrInviteProps>(() =>
  import('./edit-or-invite/tax-add-or-invite').then((mod) => mod.TaxAddOrInvite)
)

export function UserTools({
  data,
  unrevisedRevisions,
  aboveContent,
}: UserToolsProps) {
  const auth = useAuthentication()

  const isRevision = data && data.typename.includes('Revision')
  const isTaxonomy = data && data.typename === UuidType.TaxonomyTerm

  // note: we hide the ui on ssr and fade it in on the client
  const [firstPass, setFirstPass] = useState(true)

  useEffect(() => {
    if (firstPass) setFirstPass(false)
  }, [auth, firstPass])

  const fadeIn = cn(
    'transition-opacity',
    firstPass ? 'opacity-0' : 'opacity-100'
  )
  // note: this component is added twice, once without aboveContent and once with it
  // (responsive variants)

  return (
    <Root
      className={cn(
        'serlo-user-tools',
        aboveContent
          ? ''
          : 'pointer-events-none absolute bottom-8 right-8 z-50 hidden h-full items-end lg:flex [&>div]:!sticky [&>div]:bottom-8',
        fadeIn
      )}
      aria-label="Tool Menu"
    >
      <List
        className={cn(
          aboveContent
            ? 'mb-8 mr-4 mt-4 justify-end text-right mobile:flex sm:-mt-6 sm:text-left lg:hidden'
            : 'pointer-events-auto flex flex-col items-start rounded-md bg-white'
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

        {auth ? (
          <MoreAuthorTools data={data} aboveContent={aboveContent} />
        ) : null}
        <Share data={data} aboveContent={aboveContent} />
      </>
    )
  }
}
