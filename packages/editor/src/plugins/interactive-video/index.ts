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
  optional,
  string,
} from '../../plugin'

const interactiveVideoState = object({
  video: child({
    plugin: EditorPluginType.Video,
  }),
  // chapters: list(object({ title: string(''), startTime: number(0), endTime: number(0) })),
  marks: list(
    object({
      title: string(),
      //type: string(''), // 'overlay' | 'floatingMarker'
      child: child({
        plugin: EditorPluginType.Exercise, // could be other content as well
      }),
      startTime: number(),
      endTime: number(), // should we make this a setting or always use a default duration?
      autoOpen: boolean(true), // open modal without interaction
      mandatory: boolean(false), // has to be successfully completed to continue video
      timeAfterFail: optional(number()), // video timestamp to jump to
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
