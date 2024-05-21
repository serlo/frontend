import { StateTypeReturnType, string } from '@editor/plugin'
import { cn } from '@serlo/frontend/src/helper/cn'

export function SettingsTextarea({
  label,
  state,
  autoFocus,
}: {
  label: string
  state: StateTypeReturnType<ReturnType<typeof string>>
  autoFocus?: boolean
}) {
  return (
    <label className="font-bold">
      {label}
      <textarea
        autoFocus={autoFocus}
        value={state.value}
        onChange={(e) => state.set(e.target.value)}
        className={cn(`
          mb-7 mt-1 flex w-full items-center rounded-2xl border-2
          border-editor-primary-100 bg-editor-primary-100 p-2
          focus-within:border-editor-primary focus-within:outline-none
        `)}
      />
    </label>
  )
}
