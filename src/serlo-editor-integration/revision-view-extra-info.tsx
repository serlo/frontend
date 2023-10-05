// Copied from ExtraRevisionViewInfo
export function RevisionViewExtraInfo({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <span className="m-1 break-all bg-editor-primary-100 px-1 text-sm">
      {children}
    </span>
  )
}
