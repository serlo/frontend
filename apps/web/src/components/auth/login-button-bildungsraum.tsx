import type { UiNodeInputAttributes } from '@ory/client'
import { cn } from '@serlo/tailwind/helper/cn'
import { type FormEvent } from 'react'

import MeinBildungsraumLogo from '@/assets-webkit/img/mein-bildungsraum-logo.svg'
import { useInstanceData } from '@/contexts/instance-context'

export interface NodeProps {
  attributes: UiNodeInputAttributes
  disabled: boolean
  onSubmit: (e: FormEvent | MouseEvent, method?: string) => Promise<void>
}

export function LoginButtonBildungsraum({
  attributes,
  onSubmit,
  disabled,
}: NodeProps) {
  const { strings } = useInstanceData()
  const label = strings.auth.messages.code1010002

  return (
    <div className="-mb-8 mt-10">
      <hr />
      <button
        className={cn(`
        mt-10 block inline-block w-full border border-transparent px-[22px] py-2 py-2
        text-lg font-bold shadow-menu transition-all hover:border-black focus-visible:border-black
        `)}
        name={attributes.name}
        onClick={(e) => {
          void onSubmit(e, (attributes as { value: string }).value)
        }}
        value={(attributes.value as string) || ''}
        disabled={attributes.disabled || disabled}
      >
        <MeinBildungsraumLogo className="mr-2 inline-block h-6 w-6" /> {label}
      </button>
    </div>
  )
}
