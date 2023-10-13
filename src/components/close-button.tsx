import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { FaIcon } from './fa-icon'
import { tw } from '@/helper/tw'

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
      className={`${tw`
        inline-block h-9 w-9
        cursor-pointer rounded-full border-none bg-transparent text-center
        leading-tight text-almost-black hover:bg-brand hover:text-white
      `} ${className}`}
      data-qa={dataQa}
    >
      <FaIcon icon={faXmark} className="h-5" />
    </button>
  )
}
