import { tw } from '@/helper/tw'

export interface OverlayTextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string
}

export function OverlayTextarea({ label, ...props }: OverlayTextareaProps) {
  return (
    <label className="mx-auto mb-0 mt-5 flex flex-row justify-between">
      <span className="w-[20%]">{label}</span>
      <textarea
        {...props}
        className={tw`
        serlo-input-font-reset
        mt-1.5 min-h-[100px] w-3/4 resize-none rounded-md
        border-2 border-editor-primary-100  bg-editor-primary-100 p-2.5 
        focus:border-editor-primary-300 focus:outline-none
      `}
      />
    </label>
  )
}
