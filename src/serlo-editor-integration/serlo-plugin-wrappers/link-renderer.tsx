import { ComponentProps, useContext } from 'react'

import { Link } from '@/components/content/link'
import { LinkRenderer } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { IsRevisionViewContext } from '@/serlo-editor-integration/context/is-revision-view'
import { RevisionViewExtraInfo } from '@/serlo-editor-integration/revision-view-extra-info'

export function LinkSerloRenderer({
  href,
  children,
}: ComponentProps<LinkRenderer>) {
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
