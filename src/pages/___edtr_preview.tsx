// eslint-disable-next-line import/no-internal-modules
import { Editor } from '@edtr-io/core/beta'
// eslint-disable-next-line import/no-internal-modules
import { createDefaultDocumentEditor } from '@edtr-io/default-document-editor/beta'
import clsx from 'clsx'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { instanceData, loggedInData } from '@/data/de'
import { getPluginRegistry } from '@/edtr-io/get-plugin-registry'
import { createPlugins } from '@/edtr-io/plugins'

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
  const { strings } = instanceData
  const [initialState, setInitialState] =
    useState<InitialStateData>(fallbackState)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sourceUrl = params.get('source') // 'chrome-instant'
    try {
      if (!sourceUrl)
        throw new Error('provide a source url for the edtr state json')

      void fetch(sourceUrl)
        .then((res) => res.json())
        .then((json) => {
          setInitialState(json as InitialStateData)
        })
    } catch (error) {
      console.log(error)
      setInitialState(getErrorState(error as string))
    }
  }, [])

  const editorStrings = loggedInData.strings.editor

  const plugins = createPlugins({
    registry: getPluginRegistry('page', editorStrings),
    type: 'page',
    editorStrings,
    strings,
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

  return (
    <FrontendClientBase noHeaderFooter noContainers loadLoggedInData>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="relative bg-brand-100">
        <MaxWidthDiv>
          <main>
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
