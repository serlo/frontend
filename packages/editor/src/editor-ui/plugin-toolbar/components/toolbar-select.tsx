import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { cn } from '@editor/utils/cn'

interface ToolbarSelectProps {
  value: string
  dataQa?: string
  changeValue: (value: string, index: number) => void
  options: { value: string; text: string; dataQa?: string }[]
  tooltipText?: string
}

export function ToolbarSelect({
  tooltipText,
  value,
  changeValue,
  options,
  dataQa,
}: ToolbarSelectProps) {
  return (
    <label className="serlo-tooltip-trigger mx-1.5 text-sm">
      <EditorTooltip text={tooltipText} />
      <select
        value={value}
        onChange={(event) => {
          changeValue(event.target.value, event.target.selectedIndex)
        }}
        className={cn(`
            bg-editor-primary-10 mr-2 max-w-[13rem] cursor-pointer rounded-md !border
            border-gray-500 bg-transparent px-1 py-0.25 text-sm transition-all
            hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
            `)}
        data-qa={dataQa}
      >
        {options.map(({ value, text, dataQa }) => (
          <option key={value} value={value} data-qa={dataQa}>
            {text}
          </option>
        ))}
      </select>
    </label>
  )
}
