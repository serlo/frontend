import { PropsWithChildren } from 'react'

import { tw } from '@/helper/tw'
import { StateTypeReturnType, string } from '@/serlo-editor-repo/plugin'

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
        className={tw`
          mt-1 mb-7 flex w-full items-center rounded-2xl border-2
          border-editor-primary-100 bg-editor-primary-100 p-2
          focus-within:border-editor-primary focus-within:outline-none
        `}
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
