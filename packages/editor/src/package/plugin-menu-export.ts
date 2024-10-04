import { getPluginMenuItems } from '@editor/plugins/rows/utils/plugin-menu'
import { mergeDeepRight } from 'ramda'

import { loggedInData as loggedInDataDe } from '@/data/de'
import { loggedInData as loggedInDataEn } from '@/data/en'

const editorStringsDe = loggedInDataDe.strings.editor
const editorStringsEn = loggedInDataEn.strings.editor

/*
An element of the Serlo editor which can be integrated as a block / plugin
in another editor (for example editor.js).

Note: This is not the same as the list of plugins in the Serlo Editor. For
example the elements single choice question and multiple choice question
are both represented by the same plugin in the Serlo Editor (they only differ
by a configuration). In this list they are represented as two separate elements.
*/

export const pluginMenuDe = getPluginMenuItems(
  mergeDeepRight(editorStringsEn, editorStringsDe)
).reduce((previous, current) => ({ ...previous, [current.type]: current }), {})

export const pluginMenuEn = getPluginMenuItems(editorStringsEn).reduce(
  (previous, current) => ({ ...previous, [current.type]: current }),
  {}
)
