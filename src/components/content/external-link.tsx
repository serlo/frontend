import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'

import { FaIcon } from '../fa-icon'

export function ExternalLink() {
  return (
    <>
      {' '}
      <FaIcon
        icon={faExternalLinkAlt}
        style={{ verticalAlign: 0, fontSize: '0.75em' }}
      />
    </>
  )
}
