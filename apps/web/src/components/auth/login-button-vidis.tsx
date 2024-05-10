import type { UiNodeInputAttributes } from '@ory/client'
import { type FormEvent } from 'react'

import { cn } from '@/helper/cn'
import { frontendOrigin } from '@/helper/urls/frontent-origin'

export interface NodeProps {
  attributes: UiNodeInputAttributes
  disabled: boolean
  onSubmit: (e: FormEvent | MouseEvent, method?: string) => Promise<void>
}

const loginUrl = `${frontendOrigin}/auth/login`
console.log('loginUrl', loginUrl)
const vidisScript = `<vidis-login loginurl={${loginUrl}}></vidis-login>`
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
        VIDIS
      </button>
      <span dangerouslySetInnerHTML={{ __html: vidisScript }}></span>
    </div>
  )
}
