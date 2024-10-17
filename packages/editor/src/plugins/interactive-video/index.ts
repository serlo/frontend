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
      //type: string(''), // 'overlay' | 'floatingMarker'
      child: child({
        plugin: EditorPluginType.Exercise, // could be other content as well
      }),
      startTime: number(),
      //endTime: number(), // should we make this a setting or always use a default duration?
      autoOpen: boolean(true), // open modal without interaction
      mandatory: boolean(false), // has to be successfully completed to continue video
      forceRewatch: boolean(false), // after a failed exercise the learners jump back to the last mark
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
