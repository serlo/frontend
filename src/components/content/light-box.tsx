import { ReactNode } from 'react'
import Modal from 'react-modal'

import { ModalClsx } from '../modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

export interface LightBoxProps {
  src: string
  alt?: string
  label: JSX.Element | ReactNode[] | null
  onClose: () => void
}

export function LightBox({ label, src, alt, onClose }: LightBoxProps) {
  const pictureString = useInstanceData().strings.content.picture

  return (
    <>
      <Modal
        className={cn(ModalClsx, 'top-1/2 pb-7 text-center')}
        isOpen
        onRequestClose={onClose}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          onClick={onClose}
          src={src}
          alt={alt ?? pictureString}
          className="mx-auto my-0 h-auto max-h-[86vh] max-w-[100%] cursor-[zoom-out]"
        />
        <div className="pointer-events-auto">{label}</div>
      </Modal>
    </>
  )
}
