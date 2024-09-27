import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import { mergeDeepRight } from 'ramda'

import { getPluginMenuItems } from './plugin-menu'

/*
An element of the Serlo editor which can be integrated as a block / plugin
in another editor (for example editor.js).

Note: This is not the same as the list of plugins in the Serlo Editor. For
example the elements single choice question and multiple choice question
are both represented by the same plugin in the Serlo Editor (they only differ
by a configuration). In this list they are represented as two separate elements.
*/

export const pluginMenuDe = getPluginMenuItems(
  mergeDeepRight(editStringsEn, editStringsDe)
).reduce((previous, current) => ({ ...previous, [current.type]: current }), {})

export const pluginMenuEn = getPluginMenuItems(editStringsEn).reduce(
  (previous, current) => ({ ...previous, [current.type]: current }),
  {}
)
