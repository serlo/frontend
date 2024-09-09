// import IconAudio from '@editor/editor-ui/assets/plugin-icons/icon-audio.svg?raw'
import IconScMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-auswahlaufgaben.svg?raw'
import IconBlanksDragAndDrop from '@editor/editor-ui/assets/plugin-icons/icon-blanks-dnd.svg?raw'
import IconBlanksTyping from '@editor/editor-ui/assets/plugin-icons/icon-blanks-typing.svg?raw'
import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg?raw'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg?raw'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg?raw'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg?raw'
import IconH5p from '@editor/editor-ui/assets/plugin-icons/icon-h5p.svg?raw'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg?raw'
import IconImage from '@editor/editor-ui/assets/plugin-icons/icon-image.svg?raw'
import IconInjection from '@editor/editor-ui/assets/plugin-icons/icon-injection.svg?raw'
import IconTextArea from '@editor/editor-ui/assets/plugin-icons/icon-input-exercise.svg?raw'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg?raw'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg?raw'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg?raw'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg?raw'
import IconVideo from '@editor/editor-ui/assets/plugin-icons/icon-video.svg?raw'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { loggedInData as loggedInDataDe } from '@/data/de'
import { loggedInData as loggedInDataEn } from '@/data/en'

// Need this tiny interface, because the mergeDeepObject seems to
// screw up the types of our i18n strings
type PluginStrings = Record<
  EditorPluginType,
  {
    title: string
    description: string
  }
>

const germanPluginStrings = loggedInDataDe.strings.editor
  .plugins as unknown as PluginStrings

const englishPluginStrings = loggedInDataEn.strings.editor
  .plugins as unknown as PluginStrings

const getPluginNameAndDescription = (
  locale: 'de' | 'en',
  pluginType: EditorPluginType
) => {
  let name: string
  let description: string
  if (locale === 'de') {
    name = germanPluginStrings[pluginType]?.title
    description = germanPluginStrings[pluginType]?.description
  } else if (locale === 'en') {
    name = englishPluginStrings[pluginType]?.title
    description = englishPluginStrings[pluginType]?.description
  } else {
    throw new Error('Invalid locale')
  }

  if (!name || !description) {
    throw new Error(
      'Missing plugin name or description for plugin type' + pluginType
    )
  }

  return {
    name,
    description,
  }
}

const getInternationalizedPluginStrings = (type: EditorPluginType) => ({
  de: getPluginNameAndDescription('de', type),
  en: getPluginNameAndDescription('en', type),
})

export const AllPlugins = {
  // {
  //   ...getInternationalizedPluginStrings(EditorPluginType.Audio),
  //   icon: IconAudio,
  //   type: EditorPluginType.Audio,
  //   initialState: { plugin: 'audio', state: { src: '' } },
  // },
  [EditorPluginType.Box]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Box),
    icon: IconBox,
    type: EditorPluginType.Box,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'box',
          state: {
            type: 'example',
            title: {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
            },
            anchorId: '',
            content: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              ],
            },
          },
        },
      ],
    },
  },
  [EditorPluginType.Equations]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Equations),
    icon: IconEquation,
    type: EditorPluginType.Equations,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'equations',
          state: {
            steps: [
              {
                left: '',
                sign: 'equals',
                right: '',
                transform: '',
                explanation: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              },
              {
                left: '',
                sign: 'equals',
                right: '',
                transform: '',
                explanation: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              },
            ],
            firstExplanation: {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
            },
            transformationTarget: 'equation',
          },
        },
      ],
    },
  },
  [EditorPluginType.Geogebra]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Geogebra),
    icon: IconGeogebra,
    type: EditorPluginType.Geogebra,
    initialState: {
      plugin: 'rows',
      state: [{ plugin: 'geogebra', state: '' }],
    },
  },
  [EditorPluginType.H5p]: {
    ...getInternationalizedPluginStrings(EditorPluginType.H5p),
    icon: IconH5p,
    type: EditorPluginType.H5p,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'exercise',
          state: {
            content: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              ],
            },
            interactive: { plugin: 'h5p', state: '' },
          },
        },
      ],
    },
  },
  [EditorPluginType.Highlight]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Highlight),
    icon: IconHighlight,
    type: EditorPluginType.Highlight,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'highlight',
          state: { code: '', language: 'text', showLineNumbers: false },
        },
      ],
    },
  },
  [EditorPluginType.Image]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Image),
    icon: IconImage,
    type: EditorPluginType.Image,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'image',
          state: {
            src: '',
            caption: {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
            },
          },
        },
      ],
    },
  },
  [EditorPluginType.ImageGallery]: {
    ...getInternationalizedPluginStrings(EditorPluginType.ImageGallery),
    icon: undefined,
    type: EditorPluginType.ImageGallery,
    initialState: { plugin: 'imageGallery', state: { images: [] } },
  },
  [EditorPluginType.Injection]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Injection),
    icon: IconInjection,
    type: EditorPluginType.Injection,
    initialState: {
      plugin: 'rows',
      state: [{ plugin: 'injection', state: '' }],
    },
  },
  [EditorPluginType.Multimedia]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Multimedia),
    icon: IconMultimedia,
    type: EditorPluginType.Multimedia,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'articleIntroduction',
          state: {
            explanation: {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
            },
            multimedia: {
              plugin: 'image',
              state: {
                src: '',
                caption: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              },
            },
            illustrating: true,
            width: 50,
          },
        },
      ],
    },
  },
  [EditorPluginType.SerloTable]: {
    ...getInternationalizedPluginStrings(EditorPluginType.SerloTable),
    icon: IconTable,
    type: EditorPluginType.SerloTable,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'serloTable',
          state: {
            rows: [
              {
                columns: [
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                ],
              },
              {
                columns: [
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                ],
              },
              {
                columns: [
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                ],
              },
              {
                columns: [
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                ],
              },
            ],
            tableType: 'OnlyColumnHeader',
          },
        },
      ],
    },
  },
  [EditorPluginType.Spoiler]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Spoiler),
    icon: IconSpoiler,
    type: EditorPluginType.Spoiler,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'spoiler',
          state: {
            richTitle: {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
            },
            content: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              ],
            },
          },
        },
      ],
    },
  },
  [EditorPluginType.Text]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Text),
    icon: IconText,
    type: EditorPluginType.Text,
    initialState: {
      plugin: 'rows',
      state: [
        { plugin: 'text', state: [{ type: 'p', children: [{ text: '' }] }] },
      ],
    },
  },
  [EditorPluginType.Video]: {
    ...getInternationalizedPluginStrings(EditorPluginType.Video),
    icon: IconVideo,
    type: EditorPluginType.Video,
    initialState: {
      plugin: 'rows',
      state: [{ plugin: 'video', state: { src: '', alt: '' } }],
    },
  },
  [EditorPluginType.DropzoneImage]: {
    ...getInternationalizedPluginStrings(EditorPluginType.DropzoneImage),
    icon: IconDropzones,
    type: EditorPluginType.DropzoneImage,
    initialState: {
      plugin: 'dropzoneImage',
      state: { src: '', dropzones: [] },
    },
  },
  [EditorPluginType.ScMcExercise]: {
    ...getInternationalizedPluginStrings(EditorPluginType.ScMcExercise),
    icon: IconScMcExercise,
    type: EditorPluginType.ScMcExercise,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'exercise',
          state: {
            content: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              ],
            },
            interactive: {
              plugin: 'scMcExercise',
              state: {
                isSingleChoice: false,
                answers: [
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                    isCorrect: false,
                    feedback: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                  {
                    content: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                    isCorrect: false,
                    feedback: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  },
  [EditorPluginType.InputExercise]: {
    ...getInternationalizedPluginStrings(EditorPluginType.InputExercise),
    icon: IconTextArea,
    type: EditorPluginType.InputExercise,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'exercise',
          state: {
            content: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              ],
            },
            interactive: {
              plugin: 'inputExercise',
              state: {
                type: 'input-number-exact-match-challenge',
                unit: '',
                answers: [
                  {
                    value: '',
                    isCorrect: true,
                    feedback: {
                      plugin: 'text',
                      state: [{ type: 'p', children: [{ text: '' }] }],
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  },
  [EditorPluginType.TextAreaExercise]: {
    ...getInternationalizedPluginStrings(EditorPluginType.TextAreaExercise),
    icon: IconTextArea,
    type: EditorPluginType.TextAreaExercise,
    initialState: { plugin: 'textAreaExercise', state: { feedback: '' } },
  },
  [EditorPluginType.BlanksExercise]: {
    ...getInternationalizedPluginStrings(EditorPluginType.BlanksExercise),
    icon: IconBlanksTyping,
    type: EditorPluginType.BlanksExercise,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'exercise',
          state: {
            content: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              ],
            },
            interactive: {
              plugin: 'blanksExercise',
              state: {
                text: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
                mode: 'typing',
              },
            },
          },
        },
      ],
    },
  },
  [EditorPluginType.BlanksExerciseDragAndDrop]: {
    ...getInternationalizedPluginStrings(
      EditorPluginType.BlanksExerciseDragAndDrop
    ),
    icon: IconBlanksDragAndDrop,
    type: EditorPluginType.BlanksExerciseDragAndDrop,
    initialState: {
      plugin: 'rows',
      state: [
        {
          plugin: 'exercise',
          state: {
            content: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
              ],
            },
            interactive: {
              plugin: 'blanksExercise',
              state: {
                text: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
                mode: 'drag-and-drop',
              },
            },
          },
        },
      ],
    },
  },
}
