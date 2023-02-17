import Image from 'next/image'

import { Link } from '@/components/content/link'
import { getAvatarUrl } from '@/components/user/user-link'

export interface PageTeamRendererProps {
  data: TeamDataEntry[]
}

export interface TeamDataEntry {
  firstName: string
  lastName: string
  user: string
  position: string
  extraLinkUrl: string
  extraLinkText: string
  photo: string
}

export const PageTeamRenderer = ({ data }: PageTeamRendererProps) => {
  if (!data || !data.length) return null

  return (
    <div className="mobile: grid mobile:gap-2 mobile:grid-cols-2 sm:grid-cols-3 my-14">
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
    if (!user) return null

    return (
      <div key={user} className="mb-10 text-center">
        <div className="mb-5 max-w-[11rem] mx-auto relative aspect-square">
          <Image
            src={photo ?? getAvatarUrl(user)}
            alt={`${firstName} ${lastName}`}
            fill
            style={{ borderRadius: '99rem' }}
          />
        </div>
        <b>
          {firstName} {lastName}
        </b>
        <br />
        <Link href={`/user/profile/${user}`}>{user}</Link>
        <p className="mt-4">{position}</p>

        {extraLinkUrl && extraLinkText ? (
          <p className="mt-4">
            <Link href={extraLinkUrl}>{extraLinkText}</Link>
          </p>
        ) : null}
      </div>
    )
  }
}
