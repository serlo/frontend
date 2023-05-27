import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'

export function ExternalLink() {
  return (
    <>
      {' '}
      <FaIcon
        icon={faUpRightFromSquare}
        style={{ verticalAlign: 0, fontSize: '0.75em' }}
      />
    </>
  )
}
