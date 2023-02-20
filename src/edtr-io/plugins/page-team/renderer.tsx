import clsx from 'clsx'

import { Link } from '@/components/content/link'
import { getAvatarUrl } from '@/components/user/user-link'

export interface PageTeamRendererProps {
  data: TeamDataEntry[]
  extraCols?: boolean
  compact?: boolean
}

export interface TeamDataEntry {
  firstName: string
  lastName: string
  user?: string
  position: string
  extraLinkUrl: string
  extraLinkText: string
  photo: string
}

export const PageTeamRenderer = ({
  data,
  extraCols,
  compact,
}: PageTeamRendererProps) => {
  if (!data || !data.length) return null

  return (
    <div
      className={clsx(
        'mobile: grid mobile:gap-2 mobile:grid-cols-2 sm:grid-cols-3 my-14',
        extraCols && 'lg:grid-cols-4'
      )}
    >
      {data.map(renderEntry)}
    </div>
  )

  function renderEntry({
    firstName,
    lastName,
    user,
    position,
    extraLinkText,
    extraLinkUrl,
    photo,
  }: TeamDataEntry) {
    const imageSrc = photo ?? getAvatarUrl(user ?? '?')

    return (
      <div key={photo} className="mb-10 text-center">
        <img
          className="rounded-full mb-5 max-w-[11rem] mx-auto"
          alt={`${firstName} ${lastName}`}
          src={imageSrc}
        />
        <b>
          {firstName} {lastName}
        </b>
        <br />
        {user ? <Link href={`/user/profile/${user}`}>{user}</Link> : null}
        <p className={compact ? '' : 'mt-4'}>{position}</p>

        {extraLinkUrl && extraLinkText ? (
          <p className={compact ? 'mt-2' : 'mt-4'}>
            <Link href={extraLinkUrl}>{extraLinkText}</Link>
          </p>
        ) : null}
      </div>
    )
  }
}
