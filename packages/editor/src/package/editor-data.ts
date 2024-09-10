import type {
  LanguageData,
  SupportedLanguage,
  InstanceData,
  LoggedInData,
} from '@editor/types/language-data'

import {
  instanceData as instanceDataDe,
  loggedInData as loggedInDataDe,
} from '@/data/de'
import {
  instanceData as instanceDataEn,
  loggedInData as loggedInDataEn,
} from '@/data/en'

export const editorData: Record<SupportedLanguage, LanguageData> = {
  de: {
    instanceData: instanceDataDe as unknown as InstanceData,
    loggedInData: loggedInDataDe as unknown as LoggedInData,
  },
  en: {
    instanceData: instanceDataEn as InstanceData,
    loggedInData: loggedInDataEn as LoggedInData,
  },
}
