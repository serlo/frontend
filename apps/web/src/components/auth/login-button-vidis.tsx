import type { UiNodeInputAttributes } from '@ory/client'
import { type FormEvent } from 'react'

import VidisLogo from '@/assets-webkit/img/auth/vidis-logo.svg'
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
        className={cn(`
         mt-10 w-full items-center border border-transparent px-[22px] py-2 py-2 text-center
        text-lg font-bold shadow-menu transition-all hover:border-black focus-visible:border-black
        sm:flex sm:text-left
        `)}
        name={attributes.name}
        onClick={(e) => {
          void onSubmit(e, (attributes as { value: string }).value)
        }}
        value={(attributes.value as string) || ''}
        disabled={attributes.disabled || disabled}
      >
        <span>Anmelden mit</span> <VidisLogo className="scale-90" />
      </button>
    </div>
  )
}
