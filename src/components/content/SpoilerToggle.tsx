import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'

interface SpoilerToggleProps {
  open: boolean
}

export default function SpoilerToggle({ open }: SpoilerToggleProps) {
  return (
    <>
      {open ? (
        <FontAwesomeIcon icon={faCaretDown} />
      ) : (
        <FontAwesomeIcon icon={faCaretRight} />
      )}{' '}
    </>
  )
}
