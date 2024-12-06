import { SwitchButton } from '@editor/editor-ui/switch-button'

export function TextAreaTitleAndEnableSwitch({
  title,
  switchEnabled,
  toggleSwitch,
}: {
  title: string
  switchEnabled: boolean
  toggleSwitch: () => void
}) {
  return (
    <div className="flex flex-row items-center gap-5">
      <label className="mr-5">
        <b>{title}</b>
      </label>
      <div className="flex flex-row gap-2">
        <span>Dem Lernenden anzeigen</span>
        <SwitchButton isOn={switchEnabled} onClick={() => toggleSwitch()} />
      </div>
    </div>
  )
}
