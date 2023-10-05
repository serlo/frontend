import { ComponentProps, useContext } from 'react'

import { Link } from '@/components/content/link'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { LinkRenderer } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { RevisionViewExtraInfo } from '@/serlo-editor-integration/revision-view-extra-info'

export function LinkSerloRenderer({
  href,
  children,
}: ComponentProps<LinkRenderer>) {
  const isRevisionView = useContext(RevisionViewContext)

  return (
    <>
      <Link href={href}>{children}</Link>
      {isRevisionView ? (
        <RevisionViewExtraInfo>{href}</RevisionViewExtraInfo>
      ) : null}
    </>
  )
}
