import { pluginMenuItems } from './plugin-menu-data'

// exports for package

/**
 * An element of the Serlo editor which can be integrated as a block / plugin
 * in another editor (for example editor.js).
 *
 * Note: This is not the same as the list of plugins in the Serlo Editor. For
 * example the elements single choice question and multiple choice question
 * are both represented by the same plugin in the Serlo Editor (they only differ
 * by a configuration). In this list they are represented as two separate elements.
 */
export const PluginMenuItem = pluginMenuItems.map((item) => item.type)

/**
 * Object of PluginMenuItems and the info needed to render a menu.
 */
export const pluginMenu = pluginMenuItems.reduce(
  (previous, current) => ({ ...previous, [current.type]: current }),
  {}
)
