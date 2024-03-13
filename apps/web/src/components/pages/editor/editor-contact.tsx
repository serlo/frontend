import Link from 'next/link'

import { TeamDataEntry } from './editor-team'

export function EditorContact({ contact }: { contact: TeamDataEntry }) {
  const { firstName, lastName, position, photo, extraLinkUrl, extraLinkText } =
    contact

  return (
    <div className="flex justify-center text-left text-base">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="mr-4 max-w-[6rem] rounded-full"
        alt={`${firstName} ${lastName}`}
        src={photo}
      />
      <div className="-mt-2 h-min self-center">
        <b>
          {firstName} {lastName}
        </b>
        <br />
        {position}
        <br />
        <Link href={extraLinkUrl} className="mt-1 inline-block">
          {extraLinkText}
        </Link>
      </div>
    </div>
  )
}
