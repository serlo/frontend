import { partition } from 'ramda'

import { Link } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'

type Roles = UserPage['userData']['roles']

interface ProfileRolesProps {
  roles: Roles
}

export function ProfileRoles({ roles }: ProfileRolesProps) {
  const { strings, lang } = useInstanceData()

  const [instanceRoles, otherRoles] = partition(
    (role) => role.instance === null || role.instance === lang,
    roles
  )

  return (
    <>
      {renderRoles(instanceRoles, true)}
      {renderRoles(otherRoles, false)}
    </>
  )

  function renderRoles(roles: Roles, instance: boolean) {
    if (roles.length < 1) return null

    const title = instance
      ? strings.profiles.instanceRoles.replace('%lang%', lang)
      : strings.profiles.otherRoles

    return (
      <p className="mb-5">
        {title}{' '}
        {roles.map((role) => {
          const text = instance
            ? role.role
            : `${role.instance ?? ''}: ${role.role}`
          return <Role key={text} text={text} role={role.role} />
        })}
      </p>
    )
  }

  function Role({ text, role }: { text: string; role: string }) {
    const label = (
      <span className="serlo-button-light ml-1 text-sm">{text}</span>
    )

    return (
      <>
        {lang === Instance.De ? (
          <Link href={`/community/202923/rollen-der-serlo-community#${role}`}>
            {label}
          </Link>
        ) : (
          label
        )}
      </>
    )
  }
}
