import { cn } from '@editor/utils/cn'
import { ChangeEventHandler } from 'react'

export function EditorTextArea({
  className,
  value,
  onChange,
  placeholder,
}: {
  className?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
}) {
  return (
    <textarea
      placeholder={placeholder}
      className={cn(
        'text-area-chrome-autogrow w-full resize-none rounded-xl border-2 border-editor-primary-200 bg-editor-primary-100 px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none',
        className
      )}
      value={value}
      onChange={onChange}
    ></textarea>
  )
}
