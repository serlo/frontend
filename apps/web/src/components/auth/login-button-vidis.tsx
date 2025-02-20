import type { UiNodeInputAttributes } from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useRef, type FormEvent } from 'react'

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
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!router.isReady) return

    const { vidis_idp_hint } = router.query
    if (vidis_idp_hint && buttonRef.current) {
      buttonRef.current.click()
    }
  }, [router.isReady, router.query])

  return (
    <div className="-mb-8 mt-10">
      <hr />
      <button
        ref={buttonRef}
        className={cn(`
         mt-10 w-full items-center border border-transparent px-[22px] py-2 text-center
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
