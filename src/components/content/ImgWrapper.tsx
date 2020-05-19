import React from 'react'
import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'
import dynamic from 'next/dynamic'

const LightBox = dynamic(() => import('./LightBox'))

export default function ImgWrapper(props) {
  const [open, setOpen] = React.useState(false)
  const { image, linked } = props

  function toggleModal() {
    setOpen(true)
  }

  return (
    <>
      <StyledImgWrapper
        linked={linked}
        {...props}
        onClick={linked ? null : toggleModal}
      />
      {open && (
        <LightBox
          open={open}
          onClose={() => setOpen(false)}
          label={image.alt}
          src={image.src}
        />
      )}
    </>
  )
}

const StyledImgWrapper = styled.div<{ linked: boolean }>`
  ${makePadding}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  text-align: center;
  cursor: ${props => (props.linked ? 'pointer' : 'zoom-in')};
`
