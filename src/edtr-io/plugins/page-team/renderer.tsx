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

// for now this is just used for the teampage plugin
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
        <img
          className="rounded-full mb-5 max-w-[11rem] mx-auto"
          alt={`${firstName} ${lastName}`}
          src={photo ?? getAvatarUrl(user)}
        />
        <b>
          {firstName} {lastName}
        </b>
        <br />
        <a href={`/user/profile/${user}`}>{user}</a>
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
