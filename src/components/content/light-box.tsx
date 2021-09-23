import clsx from 'clsx'
import Modal from 'react-modal'

import { ModalClsx } from '../modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'

export interface LightBoxProps {
  open: boolean
  onClose: () => void
  src: string
  label?: string
}

export function LightBox(props: LightBoxProps) {
  const { strings } = useInstanceData()
  const { open, onClose, label, src } = props
  if (!open) return null

  const pictureString = strings.content.picture

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
          alt={label ?? pictureString}
          className="my-0 mx-auto max-w-[100%] h-auto max-h-[86vh] cursor-[zoom-out]"
        />
        <p className="pointer-events-auto">{label}</p>
      </Modal>
    </>
  )
}
