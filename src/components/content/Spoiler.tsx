import React from 'react'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SpoilerContainer } from './SpoilerContainer'
import { SpoilerTitle } from './SpoilerTitle'
import { SpoilerBody } from './SpoilerBody'

// deprecated

function Spoiler(props) {
  const { defaultOpen, title, children } = props
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <SpoilerContainer>
      <SpoilerTitle onClick={() => setOpen(!open)} role="button">
        {open ? (
          <FontAwesomeIcon icon={faCaretDown} />
        ) : (
          <FontAwesomeIcon icon={faCaretRight} />
        )}{' '}
        {title}
      </SpoilerTitle>
      {open && <SpoilerBody>{children}</SpoilerBody>}
    </SpoilerContainer>
  )
}

export default Spoiler
