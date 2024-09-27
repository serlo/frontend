import { type EditStrings } from '@editor/i18n/strings/en/edit'
import { InstanceData } from '@serlo/frontend/src/data-types'

export type SupportedLanguage = 'en' | 'de'

export interface LanguageData {
  instanceData: InstanceData
  editStrings: EditStrings
}

export type { InstanceData, EditStrings }
