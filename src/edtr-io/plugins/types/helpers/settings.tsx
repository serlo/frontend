import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import { StateTypeReturnType, string } from 'test-edtr-io/plugin'

export function Settings(props: PropsWithChildren<{}>) {
  return <>{props.children}</>
}

Settings.Textarea = function SettingsTextarea({
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
        onChange={(e) => {
          const { value } = e.target as HTMLTextAreaElement
          state.set(value)
        }}
        className={clsx(
          'mt-1 mb-7 flex items-center rounded-2xl w-full p-2',
          'bg-brand-200 border-2 border-brand-200 focus-within:outline-none focus-within:border-brand-500'
        )}
      />
    </label>
  )
}

Settings.Select = function SettingsSelect({
  label,
  state,
  options,
}: {
  label: string
  state: StateTypeReturnType<ReturnType<typeof string>>
  options: { label: string; value: string }[]
}) {
  return (
    <div>
      <label className="font-bold">
        {label}
        <select
          placeholder="select"
          value={state.value}
          onChange={(e) => {
            const { value } = e.target as HTMLSelectElement
            state.set(value)
          }}
          className="ml-2 border-2"
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}
