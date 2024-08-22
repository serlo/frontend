import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { v4 as uuidv4 } from 'uuid'

export function createEmptyImagePlugin(url: string, caption: string) {
  return {
    plugin: EditorPluginType.Image,
    state: {
      src: url,
      caption: {
        plugin: EditorPluginType.Text,
        state: [
          {
            type: 'p',
            children: [
              {
                text: caption,
              },
            ],
          },
        ],
        id: uuidv4(),
      },
    },
    id: uuidv4(),
  }
}
