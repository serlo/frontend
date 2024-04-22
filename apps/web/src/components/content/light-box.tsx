import { ReactNode } from 'react'
import Modal from 'react-modal'

import { defaultModalOverlayStyles } from '../modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

Modal.setAppElement('#serlo-root')

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
        className={cn('serlo-modal', 'pb-7 text-center')}
        overlayClassName={cn(defaultModalOverlayStyles, 'z-[101]')}
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
