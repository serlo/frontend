import { ReactNode, useState } from 'react'

import { SpoilerTitle } from './spoiler-title'
import { SpoilerToggle } from './spoiler-toggle'
import { submitEventWithPath } from '@/helper/submit-event'
import { NodePath } from '@/schema/article-renderer'

export interface SpoilerProps {
  body: ReactNode
  title: ReactNode
  path: NodePath
}

export function Spoiler({ body, title, path }: SpoilerProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col mb-block mobile:mx-side">
      <SpoilerTitle
        onClick={() => {
          setOpen(!open)
          if (!open) {
            submitEventWithPath('openspoiler', path)
          }
        }}
        open={open}
      >
        <SpoilerToggle open={open} />
        {title}
      </SpoilerTitle>
      {open && body}
    </div>
  )
}
