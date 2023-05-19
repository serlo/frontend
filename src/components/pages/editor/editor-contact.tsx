import Link from 'next/link'
import { FC } from 'react'

import { teamData } from './editor-team'

type IEditorContactProps =
  | { firstName: string; lastName?: string }
  | { firstName?: string; lastName: string }

export const EditorContact: FC<IEditorContactProps> = ({
  firstName,
  lastName,
}) => {
  if (!firstName && !lastName) {
    throw new Error('firstName or lastName must be provided')
  }

  const {
    firstName: contactFirstName,
    lastName: contactLastName,
    position,
    photo,
    extraLinkUrl,
    extraLinkText,
  } = teamData.find((person) =>
    firstName ? person.firstName === firstName : person.lastName === lastName
  )!

  return (
    <div className="text-left flex text-base justify-center">
      <img
        className="rounded-full max-w-[6rem] mr-4"
        alt={`${contactFirstName} ${contactLastName}`}
        src={photo}
      />
      <div className="h-min self-center -mt-2">
        <b>
          {contactFirstName} {contactLastName}
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
