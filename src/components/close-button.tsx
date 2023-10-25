import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { FaIcon } from './fa-icon'

interface CloseButtonProps {
  onClick: () => void
  title: string
  className?: string
  dataQa?: string
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  title,
  className,
  dataQa,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`inline-flex h-9 w-9 cursor-pointer items-center
        justify-center rounded-full border-none bg-transparent
        leading-tight text-almost-black hover:bg-brand hover:text-white
        ${className}`}
      data-qa={dataQa}
    >
      <FaIcon icon={faXmark} className="h-5" />
    </button>
  )
}
