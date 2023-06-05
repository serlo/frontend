import clsx from 'clsx'
import Image from 'next/image'

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
        'my-14 mobile:grid mobile:grid-cols-2 mobile:gap-2 sm:grid-cols-3',
        extraCols && 'md:grid-cols-4 lg:grid-cols-5'
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
      <div key={firstName + lastName} className="mb-10 text-center">
        <div
          className={clsx(
            'relative mx-auto mb-5 aspect-square',
            compact ? 'max-w-[8rem]' : 'max-w-[11rem]'
          )}
        >
          <Image
            src={imageSrc}
            alt={`${firstName} ${lastName}`}
            fill
            style={{ borderRadius: '99rem' }}
          />
        </div>
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
