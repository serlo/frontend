import clsx from 'clsx'

import { tw } from '@/helper/tw'

interface ParentButtonProps {
  domFocus: boolean
  title: string
}

export function ParentButton({ domFocus, title }: ParentButtonProps) {
  return (
    <button
      className={clsx(
        tw`
          absolute -top-6 right-14 z-50 block h-6 rounded-t-md bg-gray-100
          px-2 pt-0.5 text-sm font-bold hover:bg-editor-primary-100
        `,
        domFocus && 'pointer-events-none opacity-0'
      )}
    >
      {title}
    </button>
  )
}
