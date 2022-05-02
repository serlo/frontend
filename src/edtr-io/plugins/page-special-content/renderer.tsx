import { Link } from '@/components/content/link'
import { getAvatarUrl } from '@/components/user/user-link'

export const supportedTypes = ['team-overview']

export interface PageSpecialContentRendererProps {
  type: string
  data: string
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
export const PageSpecialContentRenderer = ({
  type,
  data,
}: PageSpecialContentRendererProps) => {
  if (!supportedTypes.includes(type)) return null
  if (!data) return null

  const teamData = JSON.parse(data) as TeamDataEntry[]

  return (
    <div className="mobile: grid mobile:gap-2 mobile:grid-cols-2 sm:grid-cols-3 my-14">
      {teamData.map(renderEntry)}
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
    if (!user) return

    return (
      <div className="mb-10 text-center">
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
