import type { UiNodeInputAttributes } from '@ory/client'
import { type FormEvent } from 'react'

import { cn } from '@/helper/cn'

export interface NodeProps {
  attributes: UiNodeInputAttributes
  disabled: boolean
  onSubmit: (e: FormEvent | MouseEvent, method?: string) => Promise<void>
}

export function LoginButtonVidis({
  attributes,
  onSubmit,
  disabled,
}: NodeProps) {
  return (
    <div className="-mb-8 mt-10">
      <hr />
      <button
        className={cn(
          `bg-vidis-lightBlue
          text-vidis-blue
          hover:bg-vidis-blue
          rounded-md
          px-4
          py-2
          transition-colors
          duration-300
          hover:text-white`
        )}
        name={attributes.name}
        onClick={(e) => {
          void onSubmit(e, (attributes as { value: string }).value)
        }}
        value={(attributes.value as string) || ''}
        disabled={attributes.disabled || disabled}
      >
        VIDIS
      </button>
    </div>
  )
}
