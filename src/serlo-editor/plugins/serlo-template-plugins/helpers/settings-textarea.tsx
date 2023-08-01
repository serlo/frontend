import { tw } from '@/helper/tw'
import { StateTypeReturnType, string } from '@/serlo-editor/plugin'

export function SettingsTextarea({
  label,
  state,
}: {
  label: string
  state: StateTypeReturnType<ReturnType<typeof string>>
}) {
  return (
    <label className="font-bold">
      {label}
      <textarea
        value={state.value}
        onChange={(e) => state.set(e.target.value)}
        className={tw`
          mb-7 mt-1 flex w-full items-center rounded-2xl border-2
          border-editor-primary-100 bg-editor-primary-100 p-2
          focus-within:border-editor-primary focus-within:outline-none
        `}
      />
    </label>
  )
}
