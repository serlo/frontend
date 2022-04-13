// eslint-disable-next-line import/no-internal-modules
import { Editor } from '@edtr-io/core/beta'
// eslint-disable-next-line import/no-internal-modules
import { createDefaultDocumentEditor } from '@edtr-io/default-document-editor/beta'
import clsx from 'clsx'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { loggedInData } from '@/data/de'
import { getPluginRegistry } from '@/edtr-io/get-plugin-registry'
import { createPlugins } from '@/edtr-io/plugins'

const simpleTextState = {
  plugin: 'text',
  state: [
    {
      type: 'p',
      children: [
        {
          text: 'Überblick über wichtige Formeln für den Zylinder',
          strong: true,
        },
      ],
    },
  ],
}

interface InitialStateData {
  plugin: string
  state?: unknown
}

const fallbackState = { plugin: 'text' }

const getErrorState = (msg: string) => {
  return {
    plugin: 'text',
    state: [
      {
        type: 'p',
        children: [
          {
            text: `Fehler: ${msg}`,
            strong: true,
            color: 2,
          },
        ],
      },
    ],
  }
}

const ContentPage: NextPage = () => {
  const [initialState, setInitialState] =
    useState<InitialStateData>(fallbackState)

  const inputField = useRef<HTMLInputElement>(null)

  const editorStrings = loggedInData.strings.editor

  const plugins = createPlugins({
    getCsrfToken: () => '',
    registry: getPluginRegistry('Article', editorStrings),
    editorStrings,
  })

  const DocumentEditor = createDefaultDocumentEditor({
    i18n: {
      settings: {
        buttonLabel: editorStrings.edtrIo.settings,
        modalTitle: editorStrings.edtrIo.extendedSettings,
        modalCloseLabel: editorStrings.edtrIo.close,
      },
    },
  })

  function onChangeHandler() {
    try {
      const parsed =
        inputField.current && inputField.current.value
          ? (JSON.parse(inputField.current.value) as InitialStateData)
          : fallbackState
      console.log(parsed)
      setInitialState(parsed)
    } catch (error) {
      console.log(error)
      setInitialState(getErrorState(error as string))
    }
  }

  return (
    <FrontendClientBase noHeaderFooter noContainers loadLoggedInData>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="relative bg-brand-100">
        <MaxWidthDiv>
          <main>
            <input
              className="border-2 my-12 serlo-input-font-reset w-full rounded-xl p-2"
              ref={inputField}
              onChange={onChangeHandler}
              placeholder="paste edtr state here (valid JSON)"
            />
            <div
              className={clsx(
                'max-w-[816px] mx-auto pt-6 mb-24 edtr-io serlo-editor-hacks',
                'border-t-4 border-brand bg-white px-3'
              )}
            >
              <Editor
                DocumentEditor={DocumentEditor}
                onError={(e) => {
                  console.log(e)
                }}
                plugins={plugins}
                initialState={initialState}
                editable
              ></Editor>
            </div>
          </main>
        </MaxWidthDiv>{' '}
      </div>
    </FrontendClientBase>
  )
}

export default ContentPage
