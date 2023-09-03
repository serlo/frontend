import { startsWith } from 'ramda'

import { FocusPath } from '../types'

interface PathAndFocus {
  pluginId: string
  path: Array<string | number>
  targetPath?: Array<string | number>
  currentFocus: FocusPath
}

export function getPathDataAndIsFocus(arg: PathAndFocus) {
  return { isFocused: isFocused(arg), pathData: getPathDataForFocus(arg) }
}

export function getPathDataForFocus(arg: PathAndFocus) {
  const path = arg.targetPath !== undefined ? arg.targetPath : arg.path
  return getPathData(path, isFocused(arg) ? -1 : 0)
}

export function isFocused(arg: PathAndFocus) {
  const { pluginId, path, currentFocus } = arg

  const currentFocusPath =
    currentFocus.find((plugin) => plugin.id === pluginId)?.path ?? null

  return currentFocusPath !== null && startsWith(path, currentFocusPath)
}

export function getPathData(path?: Array<string | number>, tabIndex = 0) {
  if (path === undefined) return {}

  return { 'data-plugin-path': JSON.stringify(path), tabIndex }
}
