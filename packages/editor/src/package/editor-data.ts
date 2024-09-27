import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import type {
  LanguageData,
  SupportedLanguage,
  InstanceData,
} from '@editor/types/language-data'
import { instanceData as instanceDataDe } from '@serlo/frontend/src/data/de'
import { instanceData as instanceDataEn } from '@serlo/frontend/src/data/en'

export const editorData: Record<SupportedLanguage, LanguageData> = {
  de: {
    instanceData: instanceDataDe as unknown as InstanceData,
    editStrings: editStringsDe,
  },
  en: {
    instanceData: instanceDataEn as InstanceData,
    editStrings: editStringsEn,
  },
}
