import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export function SpoilerToggle({ open }) {
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
