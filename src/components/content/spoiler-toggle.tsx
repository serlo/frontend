interface SpoilerToggleProps {
  open: boolean
}

export function SpoilerToggle({ open }: SpoilerToggleProps) {
  return <span className="inline w-4">{open ? '▾ ' : '▸ '} </span>
}
