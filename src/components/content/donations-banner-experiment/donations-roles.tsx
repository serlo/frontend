export function Roles({ roles }: { roles: string[] | undefined }) {
  if (!roles) return null

  return (
    <b className="-mt-1 block text-[16px] text-brand">{roles.join(', ')}</b>
  )
}
