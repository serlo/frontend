import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { staticStrings as staticStringsDe } from '@editor/i18n/strings/de/static'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import { staticStrings as staticStringsEn } from '@editor/i18n/strings/en/static'
import type {
  LanguageData,
  SupportedLanguage,
} from '@editor/types/language-data'

export const editorData: Record<SupportedLanguage, LanguageData> = {
  de: {
    staticStrings: staticStringsDe,
    editStrings: editStringsDe,
  },
  en: {
    staticStrings: staticStringsEn,
    editStrings: editStringsEn,
  },
}
