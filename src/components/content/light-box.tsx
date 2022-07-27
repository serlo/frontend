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
  const isVector = src.endsWith('.svg')

  return (
    <>
      <Modal
        className={clsx(ModalClsx, 'text-center top-1/2 pb-7')}
        isOpen={open}
        onRequestClose={onClose}
      >
        <img
          onClick={onClose}
          src={src}
          alt={alt ?? pictureString}
          className={clsx(
            'my-0 mx-auto max-w-[100%] h-auto max-h-[86vh] cursor-[zoom-out]',
            isVector && 'w-[80vw]'
          )}
        />
        <p className="pointer-events-auto">{label}</p>
      </Modal>
    </>
  )
}
