import { SerloEditorProps } from '@serlo/editor'

export type InitialState = SerloEditorProps['initialState']

export function isInitialState(obj: any): obj is InitialState {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === 'object' &&
    'plugin' in obj
  )
}

export const exampleInitialState: InitialState = {
  plugin: 'rows',
  state: [
    {
      plugin: 'text',
      state: [
        {
          type: 'h',
          level: 1,
          children: [
            {
              text: 'Beispiel überschrift',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Bestimme den Differenzenquotient der Funktion ',
            },
            {
              type: 'math',
              src: 'f(x)=x^2',
              inline: true,
              children: [
                {
                  text: 'f(x)=x^2',
                },
              ],
            },
            {
              text: ' im Intervall  ',
            },
            {
              type: 'math',
              src: '\\left[1;3\\right]',
              inline: true,
              children: [
                {
                  text: '\\left[1;3\\right]',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              type: 'math',
              src: '\\Rightarrow x_1=1',
              inline: true,
              children: [
                {
                  text: '\\Rightarrow x_1=1\\;x_2=3',
                },
              ],
            },
            {
              text: ' und ',
            },
            {
              type: 'math',
              src: 'x_2=3',
              inline: true,
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              text: '.',
            },
          ],
        },
      ],
    },
    {
      plugin: 'equations',
      state: {
        transformationTarget: 'equation',
        firstExplanation: {
          plugin: 'text',
          state: [
            {
              type: 'p',
              children: [{}],
            },
          ],
        },
        steps: [
          {
            left: 'm',
            sign: 'equals',
            right: '\\frac{f(3)-f(1)}{3-1}',
            transform: '',
            explanation: {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'Ausrechnen',
                    },
                  ],
                },
              ],
            },
          },
          {
            left: '',
            sign: 'equals',
            right: '4',
            transform: '',
            explanation: {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [{}],
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
