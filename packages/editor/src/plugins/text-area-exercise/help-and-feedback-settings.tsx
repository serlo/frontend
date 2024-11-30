import { SettingsTabs } from './settings-tabs'

export function HelpAndFeedbackSettings() {
  return (
    <div className="flex flex-col items-center gap-4 bg-editor-primary-100">
      <div className="my-8 pb-4 pt-4">Hilfe und Feedback hinzufügen</div>
      <SettingsTabs />
    </div>
  )
}
