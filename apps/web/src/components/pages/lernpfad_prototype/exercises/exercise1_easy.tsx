import type { ExerciseProps } from '../types.js'
import { BackLink } from './back-link.jsx'
import { DoneState } from './done.jsx'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export function Exercise1Easy(props: ExerciseProps) {
  const { id, data, onSubmitClick } = props

  if (id === null) return null

  return (
    <div className="mx-auto max-w-2xl">
      <BackLink {...props} />

      <div className="flex h-full flex-col items-center justify-center">
        <h1>{data.title}</h1>
        <EditorRenderer document={editorContent} />
        {data.done ? (
          <DoneState {...props} />
        ) : (
          <button
            className="serlo-button-edit-primary"
            onClick={() => onSubmitClick(id)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

const editorContent = {
  plugin: 'rows',
  state: [
    {
      plugin: 'text',
      state: [
        { type: 'h', children: [{ text: 'Think-Pair-Share' }], level: 1 },
      ],
      id: 'd9fd4a6e-f053-4ef2-af6c-8689065a58fc',
    },
    {
      plugin: 'multimedia',
      state: {
        explanation: {
          plugin: 'rows',
          state: [
            {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'Read the statement below and share your opinion on it with your neighbour.',
                      strong: true,
                    },
                  ],
                },
                { type: 'p', children: [{ text: '' }] },
                {
                  type: 'p',
                  children: [{ text: 'Use vocabulary from last lesson like:' }],
                },
                {
                  children: [
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: '“I agree”' }],
                        },
                      ],
                      type: 'list-item',
                    },
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: '“I think”' }],
                        },
                      ],
                      type: 'list-item',
                    },
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: '“I disagree”' }],
                        },
                      ],
                      type: 'list-item',
                    },
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: '“In my opinion”' }],
                        },
                      ],
                      type: 'list-item',
                    },
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: '“I don’t think”' }],
                        },
                      ],
                      type: 'list-item',
                    },
                  ],
                  type: 'unordered-list',
                },
                { type: 'p', children: [{ strong: true, text: '' }] },
              ],
              id: '6d03576c-91de-4b31-b8be-0855ebfcdee4',
            },
          ],
          id: '05d61186-0b16-40ab-b2b7-fea7682f7448',
        },
        multimedia: {
          plugin: 'image',
          state: {
            src: 'https://editor.serlo.dev/media/serlo-org/l7r0j4tijim3vfbume174lh2/image.png',
            alt: 'Screenshot from Supertux game',
            caption: {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
              id: '2d873bfb-f737-49f8-ab8e-bcf935331b31',
            },
          },
          id: '7b73edef-4410-48f1-8145-97cfec7d68f8',
        },
        illustrating: true,
        width: 50,
      },
      id: '0bb1c090-014a-4b61-9fdb-3c6b0352cef0',
    },
    {
      plugin: 'box',
      state: {
        type: 'blank',
        title: {
          plugin: 'text',
          state: [{ type: 'p', children: [{ text: '' }] }],
          id: 'ad099dab-e70a-4e6c-8a3c-cd86e868e16c',
        },
        anchorId: '',
        content: {
          plugin: 'rows',
          state: [
            {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [
                    {
                      text: '"Video games are a waste of time!"',
                      strong: true,
                      em: true,
                    },
                  ],
                },
              ],
              id: '06d23898-0417-4a13-86c6-ad29550dc3d7',
            },
          ],
          id: '42201a21-e904-4d02-bf63-8f1413a6dcd7',
        },
      },
      id: 'e1b81aa4-1a7f-47bc-9655-b18be2cfe281',
    },
    {
      plugin: 'text',
      state: [{ type: 'p', children: [{ strong: true, text: '' }] }],
      id: '4d43c235-0f41-4114-a31f-3f3219a85ad2',
    },
  ],
}
