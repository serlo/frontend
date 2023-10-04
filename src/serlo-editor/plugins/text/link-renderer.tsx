import { ComponentProps, useContext } from 'react'

import { Link } from '@/components/content/link'
import { IsRevisionViewContext } from '@/contexts/is-revision-view'
import { LinkRenderer } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { RevisionViewExtraInfo } from '@/serlo-editor/static-renderer/revision-view-extra-info'

export function LinkRenderer({ href, children }: ComponentProps<LinkRenderer>) {
  const isRevisionView = useContext(IsRevisionViewContext)
  // TODO: isOnProfile logic
  const isOnProfile = false

  return (
    <>
      <Link href={href} unreviewed={isOnProfile}>
        {children}
      </Link>
      {isRevisionView ? (
        <RevisionViewExtraInfo>{href}</RevisionViewExtraInfo>
      ) : null}
    </>
  )
}
