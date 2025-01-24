import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { InteractiveVideoEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  child,
  list,
  number,
  boolean,
  string,
} from '../../plugin'

const interactiveVideoState = object({
  video: child({
    plugin: EditorPluginType.Video,
  }),
  marks: list(
    object({
      title: string(),
      child: child({
        plugin: EditorPluginType.Exercise, // could be other content as well
      }),
      startTime: number(),
      autoOpen: boolean(true), // open modal without interaction
      mandatory: boolean(false), // has to be successfully completed to continue video
    })
  ),
})

export type InteractiveVideoPluginState = typeof interactiveVideoState
export type InteractiveVideoProps =
  EditorPluginProps<InteractiveVideoPluginState>

export const interactiveVideoPlugin: EditorPlugin<InteractiveVideoPluginState> =
  {
    Component: InteractiveVideoEditor,
    state: interactiveVideoState,
    config: {},
  }
