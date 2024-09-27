import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { staticStrings as staticStringsDe } from '@editor/i18n/strings/de/static'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import {
  StaticStrings,
  staticStrings as staticStringsEn,
} from '@editor/i18n/strings/en/static'
import type {
  EditStrings,
  LanguageData,
  SupportedLanguage,
} from '@editor/types/language-data'

export const editorData: Record<SupportedLanguage, LanguageData> = {
  de: {
    staticStrings: staticStringsDe as unknown as StaticStrings,
    editStrings: editStringsDe as unknown as EditStrings,
  },
  en: {
    staticStrings: staticStringsEn,
    editStrings: editStringsEn,
  },
}
