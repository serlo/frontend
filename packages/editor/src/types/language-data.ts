import { InstanceData, LoggedInData } from '@serlo/frontend/src/data-types'

export type SupportedLanguage = 'en' | 'de'

export interface LanguageData {
  instanceData: InstanceData
  loggedInData: LoggedInData
}

export type { InstanceData, LoggedInData }
