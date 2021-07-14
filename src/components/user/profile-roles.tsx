import clsx from 'clsx'
import * as R from 'ramda'
import { Fragment } from 'react'

import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface ProfileRolesProps {
  roles: UserPage['userData']['roles']
}

export function ProfileRoles({ roles }: ProfileRolesProps) {
  const { strings, lang } = useInstanceData()

  const [instanceRoles, otherRoles] = R.partition(
    (role) => role.instance === null || role.instance === lang,
    roles
  )

  return (
    <>
      {instanceRoles.length > 0 && (
        <p className="mb-5">
          {replacePlaceholders(strings.profiles.instanceRoles, { lang })}{' '}
          {instanceRoles.map((role, index) => (
            <Fragment key={index}>{renderRole(role.role)}</Fragment>
          ))}
        </p>
      )}
      {otherRoles.length > 0 && (
        <p className="mb-block">
          {strings.profiles.otherRoles}{' '}
          {otherRoles.map((role, index) => (
            <Fragment key={index}>
              {renderRole(`${role.instance ?? ''}: ${role.role}`)}
            </Fragment>
          ))}
        </p>
      )}
    </>
  )

  function renderRole(text: string) {
    return (
      <span
        className={clsx(
          'text-white bg-gray-400 inline-block rounded-2xl font-bold',
          'py-1 px-2 mx-1'
        )}
      >
        {text}
      </span>
    )
  }
}
