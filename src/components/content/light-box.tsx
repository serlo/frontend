import clsx from 'clsx'
import { ReactNode } from 'react'
import Modal from 'react-modal'

import { ModalClsx } from '../modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'

export interface LightBoxProps {
  open: boolean
  onClose: () => void
  src: string
  alt?: string
  label?: JSX.Element | ReactNode[]
}

export function LightBox({ open, onClose, label, src, alt }: LightBoxProps) {
  const { strings } = useInstanceData()
  if (!open) return null
  const pictureString = strings.content.picture

  return (
    <>
      <Modal
        className={clsx(ModalClsx, 'top-1/2 pb-7 text-center')}
        isOpen={open}
        onRequestClose={onClose}
      >
        <img
          onClick={onClose}
          src={src}
          alt={alt ?? pictureString}
          className="my-0 mx-auto h-auto max-h-[86vh] max-w-[100%] cursor-[zoom-out]"
        />
        <div className="pointer-events-auto">{label}</div>
      </Modal>
    </>
  )
}
