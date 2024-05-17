import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  list,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { CourseEditor } from './editor/course'

const courseState = object({
  content: child({ plugin: EditorPluginType.Rows }),
  pages: list(
    object({
      id: string(),
      title: string(),
      content: child({ plugin: EditorPluginType.Rows }),
    })
  ),
})

export type CoursePluginState = typeof courseState
export type CourseProps = EditorPluginProps<CoursePluginState>

export const coursePlugin: EditorPlugin<CoursePluginState> = {
  Component: CourseEditor,
  state: courseState,
  config: {},
}
