import {
  defaultPlugins,
  type SerloEditorProps,
  SerloRenderer,
} from '@editor/package'
import dynamic from 'next/dynamic'
import NextAdapterPages from 'next-query-params/pages'
import { useMemo, useState } from 'react'
import { QueryParamProvider } from 'use-query-params'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

const SerloEditor = dynamic(
  () => import('@editor/package').then((mod) => mod.SerloEditor),
  {
    ssr: false,
  }
)

export const exampleInitialState: SerloEditorProps['initialState'] = {
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

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      noIndex
      loadLoggedInData /* warn: enables preview editor without login */
      serloEntityData={{ entityId: props.id }}
    >
      <div className="relative">
        <QueryParamProvider adapter={NextAdapterPages}>
          <Content />
        </QueryParamProvider>
      </div>
    </FrontendClientBase>
  )
})

function Content() {
  const [editorState, setEditorState] = useState(exampleInitialState)

  const editor = useMemo(
    () => (
      <SerloEditor
        editorVariant="unknown"
        initialState={editorState}
        _testingSecret="VJN8pHhqVj8RtO+TfY2/Ka1JN4JdH/oSOAdPHz5a"
        plugins={defaultPlugins}
        onChange={(newState) => {
          console.log('newState: ', newState)
          setEditorState(newState.document)
        }}
      >
        {(editor) => {
          console.log('editor: ', editor)
          return <div>{editor.element}</div>
        }}
      </SerloEditor>
    ),
    []
  )

  return (
    <main id="content" className="flex">
      <section className="min-h-screen w-1/2 border-4 border-r-0 border-editor-primary">
        <div className="px-2">{editor}</div>
      </section>
      <section className="min-h-screen w-1/2 border-4 border-editor-primary">
        <h2 className="mx-side mb-12 font-bold text-editor-primary">Preview</h2>
        <div className="mt-[3rem]">
          <SerloRenderer state={editorState} editorVariant="unknown" />
        </div>
      </section>
    </main>
  )
}
