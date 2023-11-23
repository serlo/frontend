import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { FaIcon } from './fa-icon'
import { cn } from '@/helper/cn'

interface CloseButtonProps {
  onClick: () => void
  title: string
  className?: string
  dataQa?: string
}

export function CloseButton({
  onClick,
  title,
  className,
  dataQa,
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn('serlo-close-button', className)}
      data-qa={dataQa}
    >
      <FaIcon icon={faXmark} className="h-5" />
    </button>
  )
}
