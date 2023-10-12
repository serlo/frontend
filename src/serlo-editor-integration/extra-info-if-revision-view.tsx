import { useContext } from 'react'

import { RevisionViewContext } from '@/contexts/revision-view-context'

export function ExtraInfoIfRevisionView({
  children,
}: {
  children: React.ReactNode
}) {
  const isRevisionView = useContext(RevisionViewContext)

  if (!isRevisionView) return null

  // Styling copied from ExtraRevisionViewInfo
  return (
    <span className="m-1 break-all bg-editor-primary-100 px-1 text-sm">
      {children}
    </span>
  )
}
