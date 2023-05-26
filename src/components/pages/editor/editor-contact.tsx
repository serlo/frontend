import Link from 'next/link'

import { TeamDataEntry } from './editor-team'

export function EditorContact({ contact }: { contact: TeamDataEntry }) {
  const { firstName, lastName, position, photo, extraLinkUrl, extraLinkText } =
    contact

  return (
    <div className="text-left flex text-base justify-center">
      <img
        className="rounded-full max-w-[6rem] mr-4"
        alt={`${firstName} ${lastName}`}
        src={photo}
      />
      <div className="h-min self-center -mt-2">
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
