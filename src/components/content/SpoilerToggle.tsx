interface SpoilerToggleProps {
  open: boolean
}

export default function SpoilerToggle({ open }: SpoilerToggleProps) {
  return <>{open ? '▾ ' : '▸ '} </>
}
