import * as Dialog from '@radix-ui/react-dialog'
import React, { ReactNode } from 'react'

interface FittingModalProps {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FittingModal({
  children,
  open,
  onOpenChange,
}: FittingModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content className="fixed bottom-0 left-1/2 top-[40%] h-fit w-[500px] max-w-[85%] -translate-x-1/2 -translate-y-1/2 pb-10 outline-none">
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
