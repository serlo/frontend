import { type EditStrings } from '@editor/i18n/strings/en/edit'
import { StaticStrings } from '@editor/i18n/strings/en/static'

export type SupportedLanguage = 'en' | 'de'

export interface LanguageData {
  staticStrings: StaticStrings
  editStrings: EditStrings
}

export type { EditStrings }
