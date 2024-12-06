import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faMicrophone, faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import { ChangeEventHandler } from 'react'

export function EditorTextArea({
  className,
  value,
  onChange,
  placeholder,
  showMicrophoneIcon = true,
  showAiGenerateIcon = true,
}: {
  className?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  showMicrophoneIcon?: boolean
  showAiGenerateIcon?: boolean
}) {
  return (
    <div className={cn('flex flex-row items-end gap-3', className)}>
      <textarea
        placeholder={placeholder}
        className={cn(
          'text-area-chrome-autogrow flex-grow resize-none rounded-xl border-2 border-editor-primary-200 bg-editor-primary-100 px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none'
        )}
        value={value}
        onChange={onChange}
      ></textarea>
      {showMicrophoneIcon ? (
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-editor-primary-200 p-2 hover:bg-editor-primary-300"
          title="Text diktieren"
        >
          <FaIcon className="h-5 w-5" icon={faMicrophone} />
        </button>
      ) : null}
      {showAiGenerateIcon ? (
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-editor-primary-200 p-2 hover:bg-editor-primary-300"
          title="Text mit KI generieren"
        >
          <FaIcon className="h-5 w-5" icon={faWandSparkles} />
        </button>
      ) : null}
    </div>
  )
}
